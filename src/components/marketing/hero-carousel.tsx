"use client"

import Image from "next/image"
import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { teaser } from "@/content/teaser"

// Two product previews. The second is a tall page that scrolls once it is
// showing (see .hero-guide-scroll in globals.css) and is switched off for
// people who prefer reduced motion.
function HeroCarousel() {
  const { slides, carouselLabel } = teaser.hero
  const [api, setApi] = React.useState<CarouselApi>()
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("select", onChange)
      return () => {
        api.off("select", onChange)
      }
    },
    [api]
  )
  const selected = React.useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  )

  const [dashboard, guide] = slides

  return (
    <Carousel
      setApi={setApi}
      aria-label={carouselLabel}
      className="mx-auto mt-12 w-full max-w-[956px]"
    >
      <CarouselContent className="ml-0">
        <CarouselItem
          className="pl-0"
          aria-label="1 of 2"
          aria-hidden={selected !== 0}
        >
          <div className="relative aspect-956/456 overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={dashboard.src}
              alt={dashboard.alt}
              fill
              priority
              sizes="(min-width: 1024px) 956px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </CarouselItem>
        <CarouselItem
          className="pl-0"
          aria-label="2 of 2"
          aria-hidden={selected !== 1}
        >
          <div
            className="hero-guide-box relative aspect-956/456 overflow-hidden rounded-lg bg-popover shadow-2xl"
            data-active={selected === 1}
          >
            <Image
              src={guide.src}
              alt={guide.alt}
              width={guide.width}
              height={guide.height}
              sizes="(min-width: 1024px) 956px, 100vw"
              className="hero-guide-scroll h-auto w-full"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        variant="outline-inverse"
        className="max-lg:left-2 lg:-left-[62px]"
      />
      <CarouselNext
        variant="outline-inverse"
        className="max-lg:right-2 lg:-right-[62px]"
      />
    </Carousel>
  )
}

export { HeroCarousel }
