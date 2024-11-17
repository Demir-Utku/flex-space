'use server'

import { randomInt } from 'node:crypto'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { hash, verify } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'
import { generateId, TimeSpan } from 'lucia'
import type { infer as Infer } from 'zod'

import { env } from '@/env'
import { EmailTemplate, sendMail } from '@/lib/email'
import { lucia, validateRequest } from '@/lib/lucia'
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema
} from '@/lib/validators/auth'
import { db } from '@/server/db'
import { emailVerificationCodeTable, passwordResetTokenTable, userTable } from '@/server/db/schema'

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>
  formError?: string
}

export async function hashPassword(password: string) {
  return await hash(password)
}

export async function login(data: Infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()

    console.log('err', err)

    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0]
      }
    }
  }

  const { email, password } = parsed.data

  const existingUser = await db.query.userTable.findFirst({
    where: (table, { eq }) => eq(table.email, email)
  })

  if (!existingUser?.hashedPassword) {
    return {
      formError: 'Incorrect email or password'
    }
  }

  const isValid = await verify(existingUser.hashedPassword, password)

  if (!isValid) {
    console.log('isValid', isValid)

    return {
      formError: 'Incorrect email or password'
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  cookies().set('user', JSON.stringify(existingUser))

  return redirect('/')
}

export async function signup(data: Infer<typeof signupSchema>) {
  const parsed = signupSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0]
      }
    }
  }

  const { username, email, password } = parsed.data

  const existingUser = await db.query.userTable.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true }
  })

  if (existingUser) {
    return {
      formError: 'Cannot create account with that email'
    }
  }

  const userId = generateId(21)

  const hashedPassword = await hash(password)

  await db.insert(userTable).values({
    id: userId,
    email,
    hashedPassword,
    username
  })

  const verificationCode = await generateEmailVerificationCode(userId, email)
  await sendMail(email, EmailTemplate.EmailVerification, { code: verificationCode })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/verify-email')
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'No session found'
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/')
}

export async function resendVerificationEmail(): Promise<{
  error?: string
  success?: boolean
}> {
  const { user } = await validateRequest()
  if (!user) {
    return redirect('/login')
  }
  const lastSent = await db.query.emailVerificationCodeTable.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
    columns: { expiresAt: true }
  })

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`
    }
  }

  if (!user.email) {
    return {
      error: 'Please connect your email to resend the verification email'
    }
  }

  const verificationCode = await generateEmailVerificationCode(user.id, user.email)
  await sendMail(user.email, EmailTemplate.EmailVerification, { code: verificationCode })

  return { success: true }
}

export async function verifyEmail(data: Infer<typeof verifyEmailSchema>): Promise<{ error: string } | void> {
  const parsed = verifyEmailSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      error: err.fieldErrors.code?.[0] ?? 'Invalid code'
    }
  }

  const { code } = parsed.data

  if (typeof code !== 'string' || code.length !== 8) {
    return { error: 'Invalid code' }
  }

  const { user } = await validateRequest()

  if (!user) {
    return redirect('/login')
  }

  const dbCode = await db.transaction(async tx => {
    const item = await tx.query.emailVerificationCodeTable.findFirst({
      where: (table, { eq }) => eq(table.userId, user.id)
    })
    if (item) {
      await tx.delete(emailVerificationCodeTable).where(eq(emailVerificationCodeTable.id, item.id))
    }
    return item
  })

  if (!dbCode || dbCode.code !== code) return { error: 'Invalid verification code' }

  if (!isWithinExpirationDate(dbCode.expiresAt)) return { error: 'Verification code expired' }

  if (dbCode.email !== user.email) return { error: 'Email does not match' }

  await lucia.invalidateUserSessions(user.id)
  await db.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, user.id))
  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  redirect('/')
}

export async function sendPasswordResetLink(
  data: Infer<typeof forgotPasswordSchema>
): Promise<{ error?: string; success?: boolean }> {
  const parsed = forgotPasswordSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'Provided email is invalid.' }
  }

  const { email } = parsed.data

  try {
    const user = await db.query.userTable.findFirst({
      where: (table, { eq }) => eq(table.email, email)
    })

    if (!user?.emailVerified) return { error: 'Provided email is invalid.' }

    const verificationToken = await generatePasswordResetToken(user.id)

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`

    if (!user.email) {
      return {
        error: 'Please connect your email to send the password reset link'
      }
    }

    await sendMail(user.email, EmailTemplate.PasswordReset, { link: verificationLink })

    return { success: true }
  } catch {
    return { error: 'Failed to send verification email.' }
  }
}

export async function resetPassword(
  data: Infer<typeof resetPasswordSchema>
): Promise<{ error?: string; success?: boolean }> {
  const parsed = resetPasswordSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0]
    }
  }

  const { token, password } = parsed.data

  const dbToken = await db.transaction(async tx => {
    const item = await tx.query.passwordResetTokenTable.findFirst({
      where: (table, { eq }) => eq(table.id, token)
    })
    if (item) {
      await tx.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.id, item.id))
    }
    return item
  })

  if (!dbToken) return { error: 'Invalid password reset link' }

  if (!isWithinExpirationDate(dbToken.expiresAt)) return { error: 'Password reset link expired.' }

  await lucia.invalidateUserSessions(dbToken.userId)

  const hashedPassword = await hash(password)

  await db.update(userTable).set({ hashedPassword }).where(eq(userTable.id, dbToken.userId))

  const session = await lucia.createSession(dbToken.userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  redirect('/')
}

function timeFromNow(time: Date) {
  const now = new Date()
  const diff = time.getTime() - now.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const seconds = Math.floor(diff / 1000) % 60
  return `${minutes}m ${seconds}s`
}

async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
  await db.delete(emailVerificationCodeTable).where(eq(emailVerificationCodeTable.userId, userId))

  const code = generateRandomIntegerArray(8).join('')

  await db.insert(emailVerificationCodeTable).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, 'm')) // 10 minutes
  })
  return code
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db.delete(passwordResetTokenTable).where(eq(passwordResetTokenTable.userId, userId))
  const tokenId = generateId(40)
  await db.insert(passwordResetTokenTable).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, 'h'))
  })
  return tokenId
}

function generateRandomIntegerArray(length: number) {
  const randomIntegers = new Set<number>()

  while (randomIntegers.size < length) {
    randomIntegers.add(randomInt(0, 10))
  }

  return Array.from(randomIntegers)
}

function isWithinExpirationDate(date: Date) {
  return Date.now() < date.getTime()
}

function createDate(timeSpan: TimeSpan) {
  return new Date(Date.now() + timeSpan.milliseconds())
}
