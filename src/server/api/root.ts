import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

import { bookingRouter } from './routers/booking/booking.procedure'
import { stripeRouter } from './routers/stripe/stripe.procedure'
import { userRouter } from './routers/user/user.procedure'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  booking: bookingRouter
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
