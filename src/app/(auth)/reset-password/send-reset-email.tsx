'use client'

import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextField } from '@radix-ui/themes'
import { toast } from 'sonner'
import type { infer as Infer } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Text } from '@/components/ui/text'
import { sendPasswordResetLink } from '@/lib/lucia/actions'
import { forgotPasswordSchema } from '@/lib/validators/auth'

export default function SendResetEmail() {
  const router = useRouter()

  const form = useForm<Infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(forgotPasswordSchema)
  })

  function onSubmit(data: Infer<typeof forgotPasswordSchema>) {
    sendPasswordResetLink(data)
      .then(res => {
        if (res.error) {
          toast.error(res.error)
        } else if (res.success) {
          toast.success('Password reset link sent to your email')

          router.push('/login')
        }
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
  }

  return (
    <Form {...form}>
      <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap="4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <TextField.Root size="3" placeholder="email@example.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="3" mt="2">
            Send Reset Email
          </Button>

          <Text as="p" align="center" color="gray">
            Don&apos;t have an account{' '}

            <Link className="ml-auto cursor-pointer font-medium text-[var(--indigo-9)] hover:underline" href="/login">
              Sign up
            </Link>
          </Text>
        </Flex>
      </form>
    </Form>
  )
}
