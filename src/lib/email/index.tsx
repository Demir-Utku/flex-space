import 'server-only'

import type { ComponentProps } from 'react'

import { render } from '@react-email/render'
import { createTransport, type TransportOptions } from 'nodemailer'

import { env } from '@/env'
import { logger } from '@/lib/logger'

import { EmailVerificationTemplate } from './templates/email-verification'
import { ResetPasswordTemplate } from './templates/reset-password'

export enum EmailTemplate {
  EmailVerification = 'EmailVerification',
  PasswordReset = 'PasswordReset'
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerificationTemplate>
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>
}

const EMAIL_SENDER = 'Pavotra <no-reply@pavotra.com>'

const getEmailTemplate = async <T extends EmailTemplate>(template: T, props: PropsMap[NoInfer<T>]) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: 'Verify your email address',
        body: await render(<EmailVerificationTemplate {...(props as PropsMap[EmailTemplate.EmailVerification])} />)
      }
    case EmailTemplate.PasswordReset:
      return {
        subject: 'Reset your password',
        body: await render(<ResetPasswordTemplate {...(props as PropsMap[EmailTemplate.PasswordReset])} />)
      }
    default:
      throw new Error('Invalid email template')
  }
}

const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT
}

if (!env.SMTP_HOST || !env.SMTP_PORT) {
  throw new Error('SMTP credentials are not defined')
}

const transporter = createTransport(smtpConfig as TransportOptions)

if (!transporter) {
  throw new Error('Failed to create email transporter')
}

export const sendMail = async <T extends EmailTemplate>(to: string, template: T, props: PropsMap[NoInfer<T>]) => {
  if (env.MOCK_SEND_EMAIL) {
    logger.info('📨 Email sent to:', to, 'with template:', template, 'and props:', props)
    return
  }

  const { subject, body } = await getEmailTemplate(template, props)

  return transporter.sendMail({ from: EMAIL_SENDER, to, subject, html: body })
}
