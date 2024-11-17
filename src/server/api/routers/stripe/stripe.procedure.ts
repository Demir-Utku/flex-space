import { manageSubscriptionSchema } from './stripe.input'
import { getStripePlan, getStripePlans, manageSubscription } from './stripe.service'

import { createTRPCRouter, protectedProcedure } from '../../trpc'

export const stripeRouter = createTRPCRouter({
  getPlans: protectedProcedure.query(({ ctx }) => getStripePlans(ctx)),

  getPlan: protectedProcedure.query(({ ctx }) => getStripePlan(ctx)),

  managePlan: protectedProcedure
    .input(manageSubscriptionSchema)
    .mutation(({ ctx, input }) => manageSubscription(ctx, input))
})
