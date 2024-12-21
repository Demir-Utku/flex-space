'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import { IconBuildingSkyscraper, IconDesk, IconDeviceRemote, IconLamp2, IconMap2, IconUsersGroup } from '@tabler/icons-react'
import { toast } from 'sonner'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { solutions } from '@/constants/solutions'
import type { CreateBookingInput, Solution } from '@/server/api/routers/booking/booking.input'
import { createBookingSchema } from '@/server/api/routers/booking/booking.input'

import LocationSearch from './location-search'

type BookingFormProps = {
  solutionType: Solution
  initialValues?: Partial<CreateBookingInput>
  handleSubmit: (data: CreateBookingInput) => Promise<void>
  submitText?: string
}

const solutionOptions = [
  { ...solutions[0], icon: <IconUsersGroup className="w-10 h-10 shrink-0" /> },
  { ...solutions[1], icon: <IconLamp2 className="w-10 h-10 shrink-0" /> },
  { ...solutions[2], icon: <IconDeviceRemote className="w-10 h-10 shrink-0" /> },
  { ...solutions[3], icon: <IconDesk className="w-10 h-10 shrink-0" /> },
  { ...solutions[4], icon: <IconMap2 className="w-10 h-10 shrink-0" /> },
  { ...solutions[5], icon: <IconBuildingSkyscraper className="w-10 h-10 shrink-0" /> }
]

export default function BookingForm({
  solutionType,
  initialValues,
  handleSubmit,
  submitText = 'Request Booking'
}: BookingFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      solutionType,
      location: 'London',
      ...initialValues
    }
  })

  const onSubmit = (data: CreateBookingInput) => {
    startTransition(async () => {
      try {
        await handleSubmit(data)

        toast.success('Booking processed successfully!')

        if (!initialValues) {
          form.reset()
        }
      } catch (error) {
        console.error('Error with booking:', error)

        toast.error('Failed to process booking request. Please try again.')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Pick an option</h3>

          <FormField
            control={form.control}
            name="solutionType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {solutionOptions.map(option => (
                      <div key={option.value} className="flex flex-col items-center">
                        <Button
                          type="button"
                          variant={field.value === option.value ? 'solid' : 'outline'}
                          className="w-full h-24 flex flex-col gap-2 items-center justify-center font-normal transition-colors duration-300 ease"
                          onClick={() => field.onChange(option.value)}
                        >
                          {option.icon}

                          {option.label}
                        </Button>
                      </div>
                    ))}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Fill in your details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" {...field} />
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
                    <TextField.Root type="email" size="3" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Location</FormLabel>

                <FormControl>
                  <LocationSearch
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    onSelect={value => {
                      console.log(value)

                      form.setValue('location', value)
                    }}

                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>

                  <FormControl>
                    <TextField.Root size="3" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>

                  <FormControl>
                    <TextField.Root type="number" size="3" {...field} onChange={e => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Any additional information you&apos;d like to share</FormLabel>

                <FormControl>
                  <TextArea size="3" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="3" disabled={isPending}>
          {isPending ? 'Processing...' : submitText}
        </Button>
      </form>
    </Form>
  )
}
