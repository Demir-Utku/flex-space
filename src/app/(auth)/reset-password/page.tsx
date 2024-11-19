import { redirect } from 'next/navigation'

import { Card, Heading } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'
import { validateRequest } from '@/lib/lucia'

import SendResetEmail from './send-reset-email'

export default async function SendResetEmailPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect('/')
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <Heading>Forgot Password?</Heading>

      <Text>Password reset link will be sent to your email.</Text>

      <SendResetEmail />
    </Card>
  )
}
