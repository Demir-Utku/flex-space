import Link from 'next/link'

import { Button, Card, Heading } from '@radix-ui/themes'
import { IconCheck } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { formatDate } from '@/lib/utils'
import { type RouterOutputs } from '@/trpc/react'

import ManageSubscriptionForm from './manage-subscription-form'

interface BillingProps {
  plans: RouterOutputs['stripe']['getPlans']
  plan: RouterOutputs['stripe']['getPlan']
}

export function Billing({ plans, plan }: BillingProps) {
  return (
    <>
      <Card size="3">
        <Heading size="5" mb="2">
          {plan?.name ?? 'Free'} plan
        </Heading>

        <Text>
          {!plan?.isPro
            ? 'The free plan is limited to 2 posts. Upgrade to the Pro plan to unlock unlimited posts.'
            : plan.isCanceled
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}

          {plan?.stripeCurrentPeriodEnd ? formatDate(plan.stripeCurrentPeriodEnd) : null}
        </Text>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        {plans.map(item => (
          <Card key={item.name} size="3">
            <Heading size="6" className="line-clamp-1">
              {item.name}
            </Heading>

            <Text className="line-clamp-2">{item.description}</Text>

            <div className="mt-4 space-y-6">
              <Heading size="7" className="text-3xl font-bold">
                {item.price}

                <span className="text-muted-foreground text-sm font-normal">/month</span>
              </Heading>

              <div className="space-y-2">
                {item.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="bg-foreground text-background aspect-square shrink-0 rounded-full p-px">
                      <IconCheck className="size-4" aria-hidden="true" />
                    </div>

                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              {item.name === 'Free' ? (
                <Button className="w-full" asChild>
                  <Link href="/dashboard">
                    Get started
                    <span className="sr-only">Get started</span>
                  </Link>
                </Button>
              ) : (
                <ManageSubscriptionForm
                  stripePriceId={item.stripePriceId}
                  isPro={plan?.isPro ?? false}
                  stripeCustomerId={plan?.stripeCustomerId}
                  stripeSubscriptionId={plan?.stripeSubscriptionId}
                />
              )}
            </div>
          </Card>
        ))}
      </section>
    </>
  )
}
