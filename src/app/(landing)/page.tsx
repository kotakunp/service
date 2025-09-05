import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">
            Second section text
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">

          </div>
        </div>
      </section>
    </>
  )
}