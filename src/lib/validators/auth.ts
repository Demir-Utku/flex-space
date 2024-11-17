import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z.string({ required_error: 'Username is required!' }).min(1, 'Username is required!').max(15),
    email: z.string({ required_error: 'Email is required!' }).email('Please enter a valid email!'),
    password: z.string({ required_error: 'Password is required!' }).min(1, 'Password is required!'),
    confirmPassword: z
      .string({ required_error: 'Password confirmation is required!' })
      .min(1, 'Password confirmation is required!')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })
export type SignupInput = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email('Please enter a valid email.'),
  password: z
    .string({ required_error: 'Password is required!' })
    .min(8, 'Password is too short. Minimum 8 characters required.')
})
export type LoginInput = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email('Please enter a valid email!')
})
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  token: z.string({ required_error: 'Token is required!' }).min(1, 'Invalid token'),
  password: z.string({ required_error: 'Password is required!' }).min(8, 'Password is too short')
})
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export const verifyEmailSchema = z.object({
  code: z.string({ required_error: 'Code is required!' }).min(8, 'Invalid code').max(8)
})
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
