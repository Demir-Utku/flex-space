'use client'

import { useTransition } from 'react'

import { Button } from '@radix-ui/themes'
import { toast } from 'sonner'

import type { ManageSubscriptionInput } from '@/server/api/routers/stripe/stripe.input'
import { api } from '@/trpc/react'

export default function ManageSubscriptionForm({
  isPro,
  stripeCustomerId,
  stripeSubscriptionId,
  stripePriceId
}: ManageSubscriptionInput) {
  const [isPending, startTransition] = useTransition()
  const managePlanMutation = api.stripe.managePlan.useMutation()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      try {
        const session = await managePlanMutation.mutateAsync({
          isPro,
          stripeCustomerId,
          stripeSubscriptionId,
          stripePriceId
        })

        if (session) {
          window.location.href = session.url ?? '/billing'
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      }
    })
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <Button className="w-full" disabled={isPending}>
        {isPending ? 'Loading...' : isPro ? 'Manage plan' : 'Subscribe now'}
      </Button>
    </form>
  )
}
