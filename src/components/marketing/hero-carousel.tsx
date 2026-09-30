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

// Two product previews. Both are taller than their window and scroll slowly
// once they are showing (see .hero-guide-scroll in globals.css). The first
// waits 2 seconds after the page loads, the second 1.5 seconds after it
// appears. Both scroll at the same speed, so the shorter first image takes
// less time. The scrolling is switched off for people who prefer reduced motion.
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
          <div
            className="hero-guide-box relative aspect-956/456 overflow-hidden rounded-lg bg-popover shadow-2xl"
            data-active={selected === 0}
            style={
              {
                "--hero-scroll-name": "hero-workspace-scroll",
                "--hero-scroll-total": "6.2s",
                "--hero-scroll-delay": "2s",
              } as React.CSSProperties
            }
          >
            <Image
              src={dashboard.src}
              alt={dashboard.alt}
              width={dashboard.width}
              height={dashboard.height}
              priority
              sizes="(min-width: 1024px) 956px, 100vw"
              className="hero-guide-scroll h-auto w-full"
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
