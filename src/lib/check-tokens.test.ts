import { describe, expect, it } from "vitest"

import { findTokenViolations } from "../../scripts/check-tokens"

// Test fixtures: these strings are the bad code the checker must catch.
describe("findTokenViolations", () => {
  it("allows semantic token classes and var() references", () => {
    const ok = `<div className="bg-primary text-primary-foreground border-border ring-ring/50 bg-primary-foreground/10" style={{ color: "var(--primary)" }} />`
    expect(findTokenViolations(ok)).toEqual([])
  })

  it("allows page anchors that look a little like hex", () => {
    expect(
      findTokenViolations(`<a href="#waitlist" /><a href="#main" />`)
    ).toEqual([])
  })

  it("flags raw hex colors", () => {
    const found = findTokenViolations(`const c = "#22c55e"\nconst d = "#fff"`)
    expect(found.map((v) => [v.line, v.match])).toEqual([
      [1, "#22c55e"],
      [2, "#fff"],
    ])
  })

  it("flags rgb, hsl and oklch functions", () => {
    for (const text of [
      "rgb(0 0 0)",
      "rgba(0,0,0,.5)",
      "hsl(1 2% 3%)",
      "oklch(1 0 0)",
    ]) {
      expect(findTokenViolations(text)).toHaveLength(1)
    }
  })

  it("flags arbitrary Tailwind color values", () => {
    expect(findTokenViolations(`className="bg-[#15803d]"`)).not.toHaveLength(0)
    expect(findTokenViolations(`className="text-[color:red]"`)).toHaveLength(1)
    expect(
      findTokenViolations(`className="border-[oklch(0.5_0_0)]"`)
    ).not.toHaveLength(0)
  })

  it("flags raw palette classes, including green 500", () => {
    expect(findTokenViolations(`className="bg-green-500"`)).toHaveLength(1)
    expect(findTokenViolations(`className="text-white"`)).toHaveLength(1)
    expect(
      findTokenViolations(`className="border-neutral-200/50"`)
    ).toHaveLength(1)
  })
})
