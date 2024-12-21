import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Heading } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'
import { env } from '@/env'
import { validateRequest } from '@/lib/lucia'
import { api } from '@/trpc/server'

import { Billing } from './_components/billing'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Billing',
  description: 'Manage your billing and subscription'
}

export default async function BillingPage() {
  const { user } = await validateRequest()

  if (!user) {
    redirect('/login')
  }

  const plans = await api.stripe.getPlans()
  const plan = await api.stripe.getPlan()

  return (
    <div className="grid gap-8 p-8">
      <div>
        <Heading size="8">Billing</Heading>

        <Text mt="2">Manage your billing and subscription</Text>
      </div>

      <Billing plans={plans} plan={plan} />
    </div>
  )
}
