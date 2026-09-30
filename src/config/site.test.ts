import { describe, expect, it } from "vitest"

import {
  siteDescription,
  siteTitle,
  socialDescription,
  socialTitle,
} from "./site"

// The exact copy for search results and social cards, with the lengths that
// keep each one from being cut off.
describe("site meta text", () => {
  it("has the agreed wording", () => {
    expect(siteTitle).toBe(
      "Keel: Your brand and design system, built from your website"
    )
    expect(siteDescription).toBe(
      "Keel turns your website into a brand guide and a design system your team and AI tools can follow. Join the private beta."
    )
    expect(socialTitle).toBe(
      "The brand and design system you never had time to build"
    )
    expect(socialDescription).toBe(
      "Your brand is in a slide deck. Your product is in Figma and code. Keel brings them together for your team and your AI tools. Join the private beta."
    )
  })

  it("fits the usual display limits", () => {
    expect(siteTitle.length).toBe(59)
    expect(siteTitle.length).toBeLessThanOrEqual(60)
    expect(siteDescription.length).toBe(120)
    expect(siteDescription.length).toBeLessThanOrEqual(160)
    expect(socialTitle.length).toBe(55)
    expect(socialDescription.length).toBe(147)
  })
})
