import { headers } from 'next/headers'

import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

import { env } from '@/env'
import { stripe } from '@/lib/stripe'
import { db } from '@/server/db'
import { userTable } from '@/server/db/schema'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook Error: ', err)

    return new Response(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error.'}`, { status: 400 })
  }

  let userId: string | undefined
  let subscription: Stripe.Response<Stripe.Subscription> | undefined

  switch (event.type) {
    case 'checkout.session.completed':
      // eslint-disable-next-line no-case-declarations
      const checkoutSessionCompleted = event.data.object

      userId = checkoutSessionCompleted?.metadata?.userId

      if (!userId) {
        return new Response('User ID not found in metadata', { status: 404 })
      }

      // Retrieve the subscription details from Stripe
      subscription = await stripe.subscriptions.retrieve(checkoutSessionCompleted.subscription as string)

      // Update the user's subscription status in the database
      // Since this is the initial subscription, we need to update the user's subscription id and customer id
      await db
        .update(userTable)
        .set({
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        })
        .where(eq(userTable.id, userId))

      break
    case 'invoice.payment_succeeded':
      // eslint-disable-next-line no-case-declarations
      const invoicePaymentSucceeded = event.data.object

      userId = invoicePaymentSucceeded?.metadata?.userId

      if (!userId) {
        return new Response('User ID not found in metadata', { status: 404 })
      }

      // Retrieve the subscription details from Stripe
      subscription = await stripe.subscriptions.retrieve(invoicePaymentSucceeded.subscription as string)

      // Update the user's subscription status in the database
      await db
        .update(userTable)
        .set({
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        })
        .where(eq(userTable.id, userId))

      break
    default:
      console.info(`Unhandled event type: ${event.type}`)
      break
  }

  return new Response(null, { status: 200 })
}
