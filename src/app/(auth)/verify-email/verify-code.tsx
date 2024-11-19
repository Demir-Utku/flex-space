'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '@radix-ui/themes'
import { toast } from 'sonner'

import { Text } from '@/components/ui/text'
import { VerificationInput } from '@/components/verification-input'
import { logout, resendVerificationEmail, verifyEmail } from '@/lib/lucia/actions'

export default function VerifyCode() {
  const [resendState, resendAction] = useFormState(resendVerificationEmail, null)

  useEffect(() => {
    if (resendState?.error) {
      toast.error(resendState.error)
    }

    if (resendState?.success) {
      toast.success('Verification email resent!')
    }
  }, [resendState?.error, resendState?.success])

  function onSubmit(code: string) {
    verifyEmail({ code })
      .then(res => {
        if (res?.error) {
          toast.error(res.error)
        } else {
          toast.success('Email verified!')
        }
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
  }

  return (
    <div className="flex flex-col gap-2">
      <VerificationInput codeLength={8} onVerify={onSubmit} onResendCode={resendAction} />

      <Text as="div" align="center" color="gray">
        Want to use a different email?{' '}

        <Button variant="ghost" size="2" onClick={logout}>
          Logout
        </Button>
      </Text>
    </div>
  )
}
