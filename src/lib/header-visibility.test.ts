import { describe, expect, it } from "vitest"

import { nextHeaderState, type HeaderScrollState } from "./header-visibility"

const H = 56
const start: HeaderScrollState = { visible: true, anchorY: 0 }

describe("nextHeaderState", () => {
  it("stays visible near the top of the page", () => {
    expect(nextHeaderState(start, 30, H).visible).toBe(true)
    expect(nextHeaderState(start, H, H).visible).toBe(true)
  })

  it("hides when scrolling down past the header", () => {
    expect(nextHeaderState(start, 400, H)).toEqual({
      visible: false,
      anchorY: 400,
    })
  })

  it("shows again as soon as the visitor scrolls up", () => {
    const hidden = { visible: false, anchorY: 400 }
    expect(nextHeaderState(hidden, 380, H)).toEqual({
      visible: true,
      anchorY: 380,
    })
  })

  it("ignores tiny movements in either direction", () => {
    const hidden = { visible: false, anchorY: 400 }
    expect(nextHeaderState(hidden, 396, H)).toBe(hidden)
    const shown = { visible: true, anchorY: 400 }
    expect(nextHeaderState(shown, 404, H)).toBe(shown)
  })

  it("is visible again after returning to the top", () => {
    const hidden = { visible: false, anchorY: 900 }
    expect(nextHeaderState(hidden, 0, H)).toEqual({ visible: true, anchorY: 0 })
  })
})
