"use server"

import { PaidTierNames, pricingTiers } from "@/data/priceTiers"
import { auth, currentUser, User } from "@clerk/nextjs/server"
import { getUserSubscription, createUserSubscription } from "../db/subscription"
import { Stripe } from "stripe"
import { env as serverEnv } from "@/data/env/server"
import { env as clientEnv } from "@/data/env/client"
import { redirect } from "next/navigation"

const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

export async function createCancelSession() {
  const user = await currentUser()
  if (user == null) throw new Error("User not authenticated.")

  let subscription = await getUserSubscription(user.id)
  if (!subscription) {
    await createUserSubscription({ clerkUserId: user.id, tier: "Free" })
    subscription = await getUserSubscription(user.id)
    if (!subscription) throw new Error("Subscription creation failed.")
  }

  if (
    subscription.stripeCustomerId == null ||
    subscription.stripeSubscriptionId == null
  ) {
    throw new Error("Stripe customer or subscription ID is missing.")
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    flow_data: {
      type: "subscription_cancel",
      subscription_cancel: {
        subscription: subscription.stripeSubscriptionId,
      },
    },
  })

  redirect(portalSession.url)
}

export async function createCustomerPortalSession() {
  const { userId } = await auth()
  if (userId == null) throw new Error("User not authenticated.")

  let subscription = await getUserSubscription(userId)
  if (!subscription) {
    await createUserSubscription({ clerkUserId: userId, tier: "Free" })
    subscription = await getUserSubscription(userId)
    if (!subscription) throw new Error("Subscription creation failed.")
  }

  if (subscription.stripeCustomerId == null) {
    throw new Error("Stripe customer ID not found.")
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  })

  redirect(portalSession.url)
}

export async function createCheckoutSession(tier: PaidTierNames) {
  const user = await currentUser()
  if (user == null) throw new Error("User not authenticated.")

  let subscription = await getUserSubscription(user.id)
  if (!subscription) {
    await createUserSubscription({ clerkUserId: user.id, tier: "Free" })
    subscription = await getUserSubscription(user.id)
    if (!subscription) throw new Error("Subscription creation failed.")
  }

  if (subscription.stripeCustomerId == null) {
    const url = await getCheckoutSession(tier, user)
    if (url == null) throw new Error("Failed to create checkout session.")
    redirect(url)
  } else {
    const url = await getSubscriptionUpgradeSession(tier, subscription)
    redirect(url)
  }
}

async function getCheckoutSession(tier: PaidTierNames, user: User) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.primaryEmailAddress?.emailAddress,
    subscription_data: {
      metadata: {
        clerkUserId: user.id,
      },
    },
    line_items: [
      {
        price: pricingTiers[tier].stripePriceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    cancel_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  })

  return session.url
}

async function getSubscriptionUpgradeSession(
  tier: PaidTierNames,
  subscription: {
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeSubscriptionItemId: string | null
  }
) {
  if (
    subscription.stripeCustomerId == null ||
    subscription.stripeSubscriptionId == null ||
    subscription.stripeSubscriptionItemId == null
  ) {
    throw new Error("Missing Stripe subscription details for upgrade.")
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
    flow_data: {
      type: "subscription_update_confirm",
      subscription_update_confirm: {
        subscription: subscription.stripeSubscriptionId,
        items: [
          {
            id: subscription.stripeSubscriptionItemId,
            price: pricingTiers[tier].stripePriceId,
            quantity: 1,
          },
        ],
      },
    },
  })

  return portalSession.url
}
