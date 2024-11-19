import { Card, Heading } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'

import ResetPassword from './reset-password'

export default async function ResetPasswordPage(props: { params: Promise<{ token: string }> }) {
  const params = await props.params
  return (
    <Card className="mx-auto w-full max-w-md">
      <Heading>Reset password</Heading>

      <Text>Enter your new password</Text>

      <ResetPassword token={params.token} />
    </Card>
  )
}
