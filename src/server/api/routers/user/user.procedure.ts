import { validateRequest } from '@/lib/lucia'

import { createTRPCRouter, publicProcedure } from '../../trpc'

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .query(async () => {
      try {
        const { session, user } = await validateRequest()

        if (!session) {
          return null
        }

        return user
      } catch (error) {
        return null
      }
    })
})
