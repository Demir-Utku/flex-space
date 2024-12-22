import './style.css'

import { useEffect, useRef, useState } from 'react'

import { Button, Flex, Link, TextField } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'

export function VerificationInput({
  codeLength = 6,
  onVerify,
  onResendCode
}: {
  codeLength?: number
  onVerify: (code: string) => void
  onResendCode: () => void
}) {
  const [code, setCode] = useState<string[]>([])

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setCode(Array(codeLength).fill(''))
  }, [codeLength])

  function handleChange(value: string, index: number) {
    setCode(prev => {
      const newCode = [...prev]

      newCode[index] = value

      return newCode
    })
  }

  function focusToNext(value: string, index: number) {
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <Flex direction="column" mt="6" gap="5">
      <div className="input-otp flex w-full items-center justify-between">
        {code.map((value, index) => (
          <div key={index} className="h-14 w-14">
            <TextField.Root
              ref={el => {
                if (el) {
                  inputRefs.current[index] = el
                }
              }}
              value={value}
              className="!h-14 !w-14 text-center outline-none"
              maxLength={1}
              type="number"
              size="3"
              radius="large"
              onChange={event => handleChange(event.target.value, index)}
              onInput={event => focusToNext((event.target as HTMLInputElement).value, index)}
            />
          </div>
        ))}
      </div>

      <Flex direction="column" mx="6" gap="4">
        <Button size="3" radius="medium" onClick={() => onVerify(code.join(''))}>
          Verify Email
        </Button>

        <Text as="p" align="center">
          Didn&apos;t receive code?{' '}

          <Link className="ml-auto cursor-pointer font-medium hover:underline" color="indigo" onClick={onResendCode}>
            Resend
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
