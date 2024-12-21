'use client'

import { useState } from 'react'

import { Button, Dialog, Heading } from '@radix-ui/themes'

import BookingForm from '@/app/(main)/solutions/_components/booking-form'
import { Text } from '@/components/ui/text'
import { solutions } from '@/constants/solutions'
import type { CreateBookingInput } from '@/server/api/routers/booking/booking.input'
import type { Booking } from '@/server/db/schema'
import { api } from '@/trpc/react'

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<Booking | undefined>()

  const {
    data: bookings,
    isLoading,
    error
  } = api.booking.getAllBookings.useQuery()

  const utils = api.useUtils()

  const { mutateAsync: updateBooking } = api.booking.updateBooking.useMutation({
    onSuccess: () => {
      utils.booking.getAllBookings.invalidate()
    }
  })

  const { mutateAsync: deleteBooking, isPending: isDeleting } = api.booking.deleteBooking.useMutation({
    onSuccess: () => {
      utils.booking.getAllBookings.invalidate()
      setBookingToDelete(undefined)
    }
  })

  const handleDelete = async (id: number) => {
    try {
      await deleteBooking(id)
    } catch (error) {
      console.error('Failed to delete booking:', error)
    }
  }

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsFormOpen(true)
  }

  const handleUpdateSubmit = async (data: CreateBookingInput) => {
    if (!selectedBooking) return

    const updateData = {
      ...data,
      notes: data.notes ?? undefined,
      companyName: data.companyName ?? undefined,
      employeeCount: data.employeeCount ?? undefined
    }

    await updateBooking({
      id: selectedBooking.id,
      updateData
    })

    setIsFormOpen(false)
    setSelectedBooking(undefined)
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <div className="px-4 py-6">
      <Heading size="8" mb="4">Your Bookings</Heading>

      {(!bookings || bookings.length === 0) ? (
        <Text>No bookings found.</Text>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map(booking => (
            <li
              key={booking.id}
              className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Text weight="bold" size="5">
                      {solutions.find(solution => Number(solution.value) === booking.solutionType)?.label}
                    </Text>

                    {booking.companyName && (
                      <Text color="gray" size="3">
                        • {booking.companyName}
                      </Text>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Text size="2" color="gray">
                      Contact: {booking.firstName} {booking.lastName}
                    </Text>

                    <Text size="2" color="gray">
                      Email: {booking.email}
                    </Text>

                    {booking.phone && (
                      <Text size="2" color="gray">
                        Phone: {booking.phone}
                      </Text>
                    )}

                    <Text size="2" color="gray">
                      Location: {booking.location}
                    </Text>

                    {!!booking.employeeCount && (
                      <Text size="2" color="gray">
                        Employees: {booking.employeeCount}
                      </Text>
                    )}

                    {booking.notes && (
                      <div className="mt-3">
                        <Text size="2" color="gray">Notes:</Text>

                        <Text size="2" className="italic">
                          {booking.notes}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(booking)}
                    variant="soft"
                    className="transition-colors hover:bg-gray-100"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => setBookingToDelete(booking)}
                    variant="soft"
                    color="red"
                    className="transition-colors hover:bg-red-100"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Dialog */}
      <Dialog.Root open={isFormOpen} onOpenChange={setIsFormOpen}>
        <Dialog.Content aria-describedby="edit-booking-form" aria-description="Edit Booking">
          <Dialog.Title>Edit Booking</Dialog.Title>

          {selectedBooking && (
            <BookingForm
              solutionType={selectedBooking.solutionType}
              initialValues={{
                firstName: selectedBooking.firstName,
                lastName: selectedBooking.lastName,
                email: selectedBooking.email,
                phone: selectedBooking.phone,
                location: selectedBooking.location,
                companyName: selectedBooking.companyName ?? undefined,
                employeeCount: selectedBooking.employeeCount ?? undefined,
                notes: selectedBooking.notes ?? undefined
              }}
              handleSubmit={handleUpdateSubmit}
              submitText="Save Changes"
            />
          )}
        </Dialog.Content>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={Boolean(bookingToDelete)} onOpenChange={open => !open && setBookingToDelete(undefined)}>
        <Dialog.Content aria-describedby="delete-booking-confirmation" aria-description="Delete Booking Confirmation">
          <Dialog.Title>Confirm Deletion</Dialog.Title>

          <div className="py-6">
            <Text>
              Are you sure you want to delete this booking for {bookingToDelete?.solutionType}

              {bookingToDelete?.companyName ? ` from ${bookingToDelete.companyName}` : ''}?
            </Text>

            <Text size="2" color="gray" mt="2">
              This action cannot be undone.
            </Text>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="soft"
              onClick={() => setBookingToDelete(undefined)}
            >
              Cancel
            </Button>

            <Button
              color="red"
              disabled={isDeleting}
              onClick={() => bookingToDelete && handleDelete(bookingToDelete.id)}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
