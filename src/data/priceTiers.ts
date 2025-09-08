import { env } from "./env/server"

export type TierNames = keyof typeof pricingTiers
export type PaidTierNames = Exclude<TierNames, "Free">

export const pricingTiers = {
    Free: {
        name: "Free",
        priceInCents: 0,
        maxNumberOfProducts: 1,
        maxNumberOfVisits: 5000,
        canAccessAnalytics: false,
        canCustomizeBanner: false,
        canRemoveBranding: false,
        stripePriceId: null
    },

    Basic: {
        name: "Basic",
        priceInCents: 1900,
        maxNumberOfProducts: 5,
        maxNumberOfVisits: 10000,
        canAccessAnalytics: true,
        canCustomizeBanner: false,
        canRemoveBranding: true,
        stripePriceId: env.STRIPE_BASIC_PLAN_PRICE_ID,
    },

    Standart: {
        name: "Standart",
        priceInCents: 4900,
        maxNumberOfProducts: 30,
        maxNumberOfVisits: 50000,
        canAccessAnalytics: true,
        canCustomizeBanner: true,
        canRemoveBranding: true,
        stripePriceId: env.STRIPE_STANDART_PLAN_PRICE_ID,
    },
    
    Premium: {
        name: "Premium",
        priceInCents: 9900,
        maxNumberOfProducts: 100,
        maxNumberOfVisits: 100000,
        canAccessAnalytics: true,
        canCustomizeBanner: true,
        canRemoveBranding: true,
        stripePriceId: env.STRIPE_PREMIUM_PLAN_PRICE_ID,
    },
} as const

export const pricingTiersInOrder = [
    pricingTiers.Free,
    pricingTiers.Basic,
    pricingTiers.Standart,
    pricingTiers.Premium,
] as const

export function getTierByPriceId(stripePriceId: string) {
  return Object.values(pricingTiers).find(
    tier => tier.stripePriceId === stripePriceId
  )
}