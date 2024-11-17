import { eq } from 'drizzle-orm'

import { db } from '@/server/db'
import { type Booking, bookingTable, type NewBooking } from '@/server/db/schema'

export const bookingService = {
  createBooking: async (booking: NewBooking): Promise<Booking> => {
    const [newBooking] = await db.insert(bookingTable).values(booking).returning()

    if (!newBooking) {
      throw new Error('Failed to create booking.')
    }

    return newBooking
  },

  getBookingById: async (id: number): Promise<Booking | undefined> => {
    const [booking] = await db.select().from(bookingTable).where(eq(bookingTable.id, id))

    return booking
  },

  getBookingsBySolutionType: async (solutionType: number): Promise<Booking[]> => {
    const bookings = await db.select().from(bookingTable).where(eq(bookingTable.solutionType, solutionType))

    return bookings
  },

  getAllBookings: async (): Promise<Booking[]> => {
    const bookings = await db.select().from(bookingTable)

    return bookings
  },

  updateBooking: async (id: number, updateData: Partial<NewBooking>): Promise<Booking | undefined> => {
    const [updatedBooking] = await db.update(bookingTable).set(updateData).where(eq(bookingTable.id, id)).returning()

    return updatedBooking
  },

  deleteBooking: async (id: number): Promise<boolean> => {
    const result = await db.delete(bookingTable).where(eq(bookingTable.id, id)).returning()

    return result.length > 0
  }
}
