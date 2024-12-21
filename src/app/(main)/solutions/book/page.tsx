import type { CreateBookingInput } from '@/server/api/routers/booking/booking.input'
import { api } from '@/trpc/server'

import BookingForm from '../_components/booking-form'

type BookingSearchParams = {
  solutionType: string
}

export default async function BookPage(props: { searchParams: Promise<BookingSearchParams> }) {
  const searchParams = await props.searchParams

  async function handleSubmit(data: CreateBookingInput) {
    'use server'

    const createdBooking = await api.booking.createBooking(data)

    if (!createdBooking) {
      throw new Error('Failed to create booking')
    }
  }

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 lg:px-8 lg:py-12">
      {/* eslint-disable-next-line @stylistic/max-len */}
      <BookingForm solutionType={Number(searchParams.solutionType)} handleSubmit={handleSubmit} />
    </div>
  )
}
