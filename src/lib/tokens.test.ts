import { readFileSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { contrastRatio } from "@/lib/color"
import { parseColorTokens } from "@/lib/tokens"

const css = readFileSync(
  path.resolve(import.meta.dirname, "../styles/tokens.css"),
  "utf8"
)
const tokens = parseColorTokens(css)
const byName = new Map(tokens.map((t) => [t.name, t]))
const get = (name: string) => {
  const token = byName.get(name)
  if (!token) throw new Error(`Missing token --${name}`)
  return token
}

describe("tokens.css", () => {
  it("reads the light theme only", () => {
    // The .dark block is preset defaults and must not leak into the reference.
    expect(get("background").hex).toBe("#ffffff")
    expect(get("primary").hex).toBe("#15803d")
  })

  it("keeps every hex comment in step with its OKLCH value", () => {
    const withComments = tokens.filter((t) => t.commentHex)
    expect(withComments.length).toBeGreaterThan(10)
    for (const token of withComments) {
      expect(token.hex, `--${token.name}`).toBe(token.commentHex)
    }
  })

  it("uses brand/700 for primary and brand/200 + brand/800 for secondary", () => {
    expect(get("primary").hex).toBe("#15803d")
    expect(get("primary-foreground").hex).toBe("#ffffff")
    expect(get("secondary").hex).toBe("#f0fdf4")
    expect(get("secondary-foreground").hex).toBe("#166534")
  })

  it("meets WCAG AA for text pairs the page uses", () => {
    const pairs: [string, string][] = [
      ["primary-foreground", "primary"],
      ["secondary-foreground", "secondary"],
      ["foreground", "background"],
      ["muted-foreground", "background"],
      ["muted-foreground", "sidebar"],
      ["sidebar-foreground", "sidebar"],
      ["sidebar-accent-foreground", "background"],
      ["planned-foreground", "planned"],
      ["destructive", "background"],
    ]
    for (const [fg, bg] of pairs) {
      const ratio = contrastRatio(get(fg).rgb, get(bg).rgb)
      expect(ratio, `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it("meets 3:1 for the focus ring and primary UI edges", () => {
    expect(
      contrastRatio(get("ring").rgb, get("background").rgb)
    ).toBeGreaterThanOrEqual(3)
    expect(
      contrastRatio(get("primary").rgb, get("background").rgb)
    ).toBeGreaterThanOrEqual(3)
    // Form field edges.
    expect(
      contrastRatio(get("input").rgb, get("background").rgb)
    ).toBeGreaterThanOrEqual(3)
  })
})
