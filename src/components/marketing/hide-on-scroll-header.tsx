"use client"

import * as React from "react"

import {
  nextHeaderState,
  type HeaderScrollState,
} from "@/lib/header-visibility"
import { cn } from "@/lib/utils"

/**
 * The page's top bar. It stays put at the top, slides away when the visitor
 * scrolls down, and slides back as soon as they scroll up. It also comes back
 * whenever something inside it gets keyboard focus, so keyboard users never
 * tab into a bar they cannot see. The slide is instant for people who prefer
 * reduced motion (see globals.css).
 */
function HideOnScrollHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  const ref = React.useRef<HTMLElement>(null)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    let state: HeaderScrollState = { visible: true, anchorY: window.scrollY }
    let frame = 0

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const height = ref.current?.offsetHeight ?? 56
      state = nextHeaderState(state, y, height)
      setVisible(state.visible)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      ref={ref}
      data-visible={visible}
      onFocus={() => setVisible(true)}
      className={cn(
        "sticky top-0 z-40 transition-transform duration-200 ease-out data-[visible=false]:-translate-y-full",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export { HideOnScrollHeader }
