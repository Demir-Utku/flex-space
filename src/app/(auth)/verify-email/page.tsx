import { redirect } from 'next/navigation'

import { Card, Heading } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'
import { validateRequest } from '@/lib/lucia'

import VerifyCode from './verify-code'

export default async function VerifyEmailPage() {
  const { user } = await validateRequest()

  if (!user) {
    return redirect('/login')
  }

  if (user.emailVerified) {
    return redirect('/')
  }

  return (
    <Card className="mx-auto w-full max-w-md p-8">
      <Heading>Verify your email</Heading>

      <Text>
        Verification code was sent to <strong>{user.email}</strong>. Check your spam folder if you can&apos;t find the
        email.
      </Text>

      <VerifyCode />
    </Card>
  )
}
