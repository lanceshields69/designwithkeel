/**
 * Decides whether a top bar that hides on scroll should be showing.
 *
 * - Near the top of the page it is always showing.
 * - Scrolling down hides it. Scrolling up shows it again.
 * - Tiny movements (under `threshold` pixels) are ignored, so a shaky
 *   trackpad does not make it flicker. `anchorY` is the scroll position the
 *   last real movement started from.
 */
export type HeaderScrollState = { visible: boolean; anchorY: number }

export function nextHeaderState(
  prev: HeaderScrollState,
  y: number,
  headerHeight: number,
  threshold = 8
): HeaderScrollState {
  if (y <= headerHeight) return { visible: true, anchorY: y }
  const delta = y - prev.anchorY
  if (Math.abs(delta) < threshold) return prev
  return { visible: delta < 0, anchorY: y }
}
