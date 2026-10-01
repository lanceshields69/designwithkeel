"use client"

import Image from "next/image"
import * as React from "react"

const query = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

// The water behind the hero. The still photo loads first and stays underneath,
// so there is never an empty frame. Once the page is ready, a muted looping
// video plays over it. Visitors who prefer reduced motion keep the still
// photo and never download the video. Decorative.
//
// Parallax: the outer box covers the whole hero and clips (clip-path), while the
// inner layer is fixed to the window. The water stays still as the page scrolls
// and the text slides over it, but it only shows inside the hero.
function HeroWater() {
  // The server snapshot says "reduced", so the video only starts on the client
  // after we know the visitor is fine with motion.
  const reduced = React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true
  )
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 [clip-path:inset(0)]"
    >
      <div className="fixed inset-x-0 top-0 h-lvh overflow-hidden opacity-60">
        <Image
          src="/teaser/hero-water.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        {reduced ? null : (
          <video
            src="/teaser/hero-water.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
    </div>
  )
}

export { HeroWater }
