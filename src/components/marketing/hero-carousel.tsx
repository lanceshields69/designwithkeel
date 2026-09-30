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

// Product previews. Each one is taller than its window and scrolls slowly once
// it is showing, all at the same speed (see .hero-guide-scroll in globals.css
// and the `scroll` timing on each slide in content/teaser.ts). The first waits
// 2 seconds after the page loads, the others 1.5 seconds after they appear.
// When a preview finishes scrolling (and its 3 second hold at the bottom), the
// carousel moves on to the next one, and back to the first after the last.
// Hovering over the carousel or focusing inside it pauses everything. Reduced
// motion switches the scrolling off, so nothing rotates by itself.
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
  // A slide only starts (and keeps) scrolling once the carousel has finished
  // sliding to it, so the one sliding out does not jump back to its top.
  const [settled, setSettled] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    const onSettle = () => setSettled(api.selectedScrollSnap())
    api.on("settle", onSettle)
    return () => {
      api.off("settle", onSettle)
    }
  }, [api])
  const selected = React.useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  )

  const advance = (index: number) => {
    if (!api || api.selectedScrollSnap() !== index) return
    if (api.canScrollNext()) api.scrollNext()
    else api.scrollTo(0)
  }

  return (
    <Carousel
      setApi={setApi}
      aria-label={carouselLabel}
      className="hero-carousel mx-auto mt-12 w-full max-w-[956px]"
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide.src}
            className="pl-0"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={selected !== index}
          >
            <div
              className="hero-guide-box relative aspect-956/456 overflow-hidden rounded-lg bg-popover shadow-2xl"
              data-active={settled === index}
              style={
                {
                  "--hero-scroll-name": slide.scroll.name,
                  "--hero-scroll-total": slide.scroll.total,
                  "--hero-scroll-delay": slide.scroll.delay,
                } as React.CSSProperties
              }
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                priority={index === 0}
                sizes="(min-width: 1024px) 956px, 100vw"
                className="hero-guide-scroll h-auto w-full"
                onAnimationEnd={() => advance(index)}
              />
            </div>
          </CarouselItem>
        ))}
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
