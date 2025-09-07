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
    },

    Basic: {
        name: "Basic",
        priceInCents: 1900,
        maxNumberOfProducts: 5,
        maxNumberOfVisits: 10000,
        canAccessAnalytics: true,
        canCustomizeBanner: false,
        canRemoveBranding: true,
    },

    Standart: {
        name: "Standart",
        priceInCents: 4900,
        maxNumberOfProducts: 30,
        maxNumberOfVisits: 50000,
        canAccessAnalytics: true,
        canCustomizeBanner: true,
        canRemoveBranding: true,
    },
    
    Premium: {
        name: "Premium",
        priceInCents: 9900,
        maxNumberOfProducts: 100,
        maxNumberOfVisits: 100000,
        canAccessAnalytics: true,
        canCustomizeBanner: true,
        canRemoveBranding: true,
    },
} as const

export const pricingTiersInOrder = [
    pricingTiers.Free,
    pricingTiers.Basic,
    pricingTiers.Standart,
    pricingTiers.Premium,
] as const
