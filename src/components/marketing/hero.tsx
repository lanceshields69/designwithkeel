import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { HeroCarousel } from "@/components/marketing/hero-carousel"
import { HeroWater } from "@/components/marketing/hero-water"
import { SectionTag } from "@/components/marketing/section-tag"
import { buttonVariants } from "@/components/ui/button"
import { teaser } from "@/content/teaser"

function Hero() {
  const { hero } = teaser
  return (
    <section className="relative isolate overflow-hidden bg-foreground py-16 text-primary-foreground md:pt-24 md:pb-24">
      <HeroWater />
      {/* The Keel symbol on the water, top right. Decorative: the SVG is an
          alpha mask filled with green 500 at about 50% opacity. It fades in,
          then floats and breathes (see .hero-mark in globals.css). */}
      <div
        aria-hidden="true"
        className="hero-mark pointer-events-none absolute top-[69px] right-[4.6%] hidden h-[106px] w-[104px] lg:block"
      >
        <div className="hero-mark-drift size-full bg-[var(--hero-mark)] [mask-image:url(/teaser/keel-symbol.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat]" />
      </div>
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
              className={buttonVariants({ size: "xl" })}
            >
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className={buttonVariants({
                size: "xl",
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
