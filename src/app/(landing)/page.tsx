import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TestIcon from "./_icons/logo";
import { pricingTiersInOrder } from "@/data/priceTiers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatters";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "../components/BrandLogo";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4 bg-radial">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          This is a test website
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          this is just a bunch of text that should look like there is a cool description here
        </p>
        <SignUpButton>
          <Button className="flex text-lg p-6 rounded-xl gap-2">
            Lezgo <ArrowRightIcon className="size-5" />
          </Button>
        </SignUpButton>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">
            Second section text
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
            <Link href="https://youtube.com/@kotakunp">
              <TestIcon />
            </Link>
          </div>
        </div>
      </section>
      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Just a pricing section text that i will change later
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {pricingTiersInOrder.map(tier => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
      <footer className="container mx-auto pt-16 pb-8 flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between items-start">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-8">
            <FooterLinkGroup title="About" links={[
            { label: "EzMuzik services", href: "#"},
            { label: "Muzik labels", href: "#"},
          ]}
          />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Line up"
              links={[
                { label: "Artists", href: "#" },
                { label: "Producers", href: "#" },
                { label: "Engineers", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Request"
              links={[
                { label: "Submit request", href: "#" }
              ]}
            />
            <FooterLinkGroup
              title="Products"
              links={[
                { label: "Vocal synth", href: "#" },
                { label: "Virtual models", href: "#" },
                { label: "VST Plugins", href: "#" },
              ]}
            />
          </div>
        </div>
      </footer>
    </>
  )
}

function PricingCard ({
  name,
  priceInCents,
  maxNumberOfVisits,
  maxNumberOfProducts,
  canRemoveBranding,
  canAccessAnalytics,
  canCustomizeBanner,
}: (typeof pricingTiersInOrder)[number]) {
  const isMostPopular = name === "Standart"


  return (
    <Card>
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle>${priceInCents / 100} /mo</CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
          </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpButton>
          <Button className="text-lg w-full rounded-lg"
                  variant={isMostPopular ? "destructive" : "default"}
          >
            Get Started
          </Button>
        </SignUpButton>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {maxNumberOfProducts}{" "}
          {maxNumberOfProducts === 1 ? "product" : "products"}
        </Feature>
        {canAccessAnalytics && <Feature> Analytics access</Feature>}
        {canCustomizeBanner && <Feature> Banner customization</Feature>}
        {canRemoveBranding && <Feature> Removable EzMuzik branding</Feature>}
      </CardFooter>
    </Card>
  )
}

function Feature({ children, className }: { children: ReactNode, className?: string}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  )
}

function FooterLinkGroup ({ title, links, }: {title: string; links: { label: string; href: string }[]}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map(link => (
          <li key={`${link.label}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}