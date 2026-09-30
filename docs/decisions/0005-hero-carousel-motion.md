# 0005: Hero carousel, and the one exception to "no motion"

**Status:** Accepted

## Context

The teaser brief says nothing on the page is animated, apart from smooth
scrolling for the in-page buttons. The Figma design's hero, however, has
previous/next arrows beside the product preview. The design owner decided the
arrows should show one other image (a full brand guide page), that this image
should scroll once it is showing, hold for 3 seconds, and start over.

## Decision

- The hero preview is a two-slide carousel using shadcn's Carousel
  (`embla-carousel-react`), approved as a new dependency.
- Slide one is the dashboard image. Slide two is the brand guide page, in the
  same window. When it appears it waits 1.5 seconds, then scrolls down over 12
  seconds, holds for 3 seconds, and starts over (CSS keyframes, 15 seconds per
  pass; the 1.5 second wait happens once, when the slide appears).
- It is the only animation on the page and is an approved exception to the
  no-motion rule.
- Under `prefers-reduced-motion`, nothing scrolls: slide two sits at the top
  and the arrows still work.
- No pause button and no pause-on-hover, by the design owner's decision.

## Alternatives considered

- **A plain React/CSS two-slide switcher with no new dependency.** Simpler,
  and was recommended. The design owner chose the shadcn Carousel for
  consistency with the component system.
- **Drop the arrows and show one static image.** Matches the original rule but
  not the design.

## Consequences

One small dependency and one client component on an otherwise static page.
**Known accessibility gap:** WCAG 2.2.2 asks for a way to pause, stop or hide
content that moves for more than five seconds. With no pause control, a visitor
who cannot use the reduced-motion setting cannot stop the scroll. Automated
checks (axe) do not test for this. Revisit if the page gets an accessibility
review: a small pause button is the smallest fix.
