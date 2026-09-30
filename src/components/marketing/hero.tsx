import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { HeroCarousel } from "@/components/marketing/hero-carousel"
import { SectionTag } from "@/components/marketing/section-tag"
import { buttonVariants } from "@/components/ui/button"
import { teaser } from "@/content/teaser"

function Hero() {
  const { hero } = teaser
  return (
    <section className="relative isolate overflow-hidden bg-foreground py-16 text-primary-foreground md:pt-24 md:pb-24">
      <Image
        src="/teaser/hero-water.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
      />
      {/* The Keel "D" mark on the water, top right. Decorative. */}
      <Image
        src="/teaser/hero-mark.webp"
        alt=""
        width={104}
        height={106}
        className="pointer-events-none absolute top-[69px] right-[4.6%] hidden lg:block"
      />
      <Container className="max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <SectionTag inverse>{hero.eyebrow}</SectionTag>
          <h1 className="mt-6 max-w-3xl text-balance">{hero.headline}</h1>
          <p className="mt-6 max-w-prose text-lg text-primary-foreground/70">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={hero.primaryCta.href}
              className={buttonVariants({ size: "lg" })}
            >
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className={buttonVariants({
                size: "lg",
                variant: "outline-inverse",
              })}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <HeroCarousel />
      </Container>
    </section>
  )
}

export { Hero }
