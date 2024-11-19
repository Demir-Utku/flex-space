'use client'

import { useForm } from 'react-hook-form'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Flex, Heading, Separator, TextField } from '@radix-ui/themes'
import type { infer as Infer } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Text } from '@/components/ui/text'
import { signup } from '@/lib/lucia/actions'
import { signupSchema } from '@/lib/validators/auth'

export default function RegisterForm() {
  const form = useForm<Infer<typeof signupSchema>>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(signupSchema)
  })

  async function onSubmit(data: Infer<typeof signupSchema>) {
    console.log(data)
    await signup(data)
  }

  return (
    <Card className="space-y-4 p-6 lg:p-9 xl:p-12">
      <Heading mb="2">Register your account!</Heading>

      <Text>Fill in the form below to register your account!</Text>

      <Button asChild variant="outline" className="w-full" size="3">
        <Link href="/login/github" prefetch={false}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="inline-block h-6 w-6 fill-current align-middle">
            {/* eslint-disable-next-line @stylistic/max-len */}
            <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
          </svg>
          Continue with GitHub
        </Link>
      </Button>

      <div className="my-2 flex items-center">
        <Separator className="flex-1" />

        <Text mx="2" color="gray" size="2">
          or
        </Text>

        <Separator className="flex-1" />
      </div>

      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="johndoe" type="text" autoComplete="username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <TextField.Root
                      size="3"
                      placeholder="email@example.com"
                      autoComplete="email"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="********" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="********" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="3" mt="2">
              Sign Up
            </Button>

            <Text as="p" align="center" color="gray">
              Already have an account?{' '}

              <Link className="ml-auto cursor-pointer font-medium text-[var(--indigo-9)] hover:underline" href="/login">
                Login
              </Link>
            </Text>
          </Flex>
        </form>
      </Form>
    </Card>
  )
}
