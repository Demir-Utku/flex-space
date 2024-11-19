'use client'

import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextField } from '@radix-ui/themes'
import { toast } from 'sonner'
import type { infer as Infer } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { resetPassword } from '@/lib/lucia/actions'
import { resetPasswordSchema } from '@/lib/validators/auth'

export default function ResetPassword({ token }: { token: string }) {
  const router = useRouter()

  const form = useForm<Infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token
    }
  })

  function onSubmit(data: Infer<typeof resetPasswordSchema>) {
    resetPassword(data)
      .then(res => {
        if (res.error) {
          toast.error(res.error)
        } else if (res.success) {
          toast.success('Password reset successfully!')

          router.push('/login')
        }
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap="4">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <TextField.Root type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>

                <FormControl>
                  <TextField.Root
                    size="3"
                    placeholder="********"
                    autoComplete="new-password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="3" mt="2">
            Reset Password
          </Button>
        </Flex>
      </form>
    </Form>
  )
}
