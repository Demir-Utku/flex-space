import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

import { createBookingSchema, Solution } from './booking.input'
import { bookingService } from './booking.service'

export const bookingRouter = createTRPCRouter({
  createBooking: protectedProcedure.input(createBookingSchema).mutation(async ({ input }) => {
    try {
      const newBooking = await bookingService.createBooking(input)

      return newBooking
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred, please try again later.'
      })
    }
  }),

  getBookingById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const booking = await bookingService.getBookingById(input)

      if (!booking) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Booking not found'
        })
      }

      return booking
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred, please try again later.'
      })
    }
  }),

  getBookingsBySolutionType: protectedProcedure
    .input(
      z.object({
        solutionType: z.nativeEnum(Solution)
      })
    )
    .query(async ({ input }) => {
      try {
        const bookings = await bookingService.getBookingsBySolutionType(input.solutionType)

        return bookings
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.'
        })
      }
    }),

  getAllBookings: protectedProcedure.query(async () => {
    try {
      const bookings = await bookingService.getAllBookings()
      return bookings
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred, please try again later.'
      })
    }
  }),

  updateBooking: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updateData: createBookingSchema.partial()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updatedBooking = await bookingService.updateBooking(input.id, input.updateData)
        if (!updatedBooking) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Booking not found'
          })
        }
        return updatedBooking
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.'
        })
      }
    }),

  deleteBooking: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
    try {
      const success = await bookingService.deleteBooking(input)
      if (!success) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Booking not found'
        })
      }
      return { success: true }
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred, please try again later.'
      })
    }
  })
})
