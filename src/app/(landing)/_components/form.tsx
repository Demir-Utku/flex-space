'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Heading, Select, TextField } from '@radix-ui/themes'
import type { infer as Infer } from 'zod'
import { number, object, string } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Text } from '@/components/ui/text'

const schema = object({
  fullName: string({ required_error: 'Full name is required' }),
  email: string({ required_error: 'Invalid email address' }).email(),
  companyName: string({ required_error: 'Company name is required' }),
  phoneNumber: string({ required_error: 'Phone number is required' }),
  location: string({ required_error: 'Location is required' }),
  peopleCount: number({ required_error: 'At least one person is required' })
})

export default function LandingForm() {
  const form = useForm<Infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      location: 'new-york',
      peopleCount: 1
    }
  })

  const onSubmit = (data: Infer<typeof schema>) => {
    console.log(data)
  }

  return (
    <Box>
      <Heading size={{ initial: '5', sm: '6', md: '7', lg: '8' }} mb="4">
        Let us find a solution that works for you
      </Heading>

      <Text as="p" size={{ initial: '2', sm: '3', md: '4' }} mb="4">
        Complete the form below and our team will reach out to learn more about your workspace needs.
      </Text>

      <Flex direction="column" gap="4" className="max-w-96 mx-auto">
        <Form {...form}>
          <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="Full name" {...field} />
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
                  <FormLabel>Email address</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="Email address" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="Company name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" placeholder="Phone number" type="tel" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Find workspace in</FormLabel>

                  <Select.Root defaultValue={field.value} size="3" onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <Select.Trigger placeholder="Find workspace in" />
                    </FormControl>

                    <Select.Content>
                      <Select.Item value="new-york">New York City</Select.Item>

                      <Select.Item value="london">London</Select.Item>

                      <Select.Item value="tokyo">Tokyo</Select.Item>
                    </Select.Content>
                  </Select.Root>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peopleCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>For how many people?</FormLabel>

                  <FormControl>
                    <TextField.Root type="number" size="3" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="3">
              Submit
            </Button>
          </form>
        </Form>
      </Flex>

      <Text size="1" color="gray" mt="4" className="max-w-96 mx-auto text-center">
        By clicking the button above, you agree to our Terms of Service and acknowledge our Global Privacy Policy.
      </Text>
    </Box>
  )
}
