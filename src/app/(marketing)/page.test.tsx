import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it } from "vitest"

import { teaser } from "@/content/teaser"

import Page from "./page"

// jsdom has no layout engine: give the carousel library the browser APIs it
// looks for.
beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
  class Observer {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver ??= Observer as typeof ResizeObserver
  globalThis.IntersectionObserver ??=
    Observer as unknown as typeof IntersectionObserver
})

afterEach(cleanup)

describe("Teaser page", () => {
  it("has one h1 with the Keel headline", () => {
    render(<Page />)
    const h1s = screen.getAllByRole("heading", { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(teaser.hero.headline)
  })

  it("renders every section heading in order", () => {
    render(<Page />)
    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent)
    expect(headings).toEqual([
      teaser.problem.headline,
      teaser.howItWorks.headline,
      teaser.product.headline,
      teaser.bothSides.headline,
      teaser.largerIdea.headline,
      teaser.founder.headline,
    ])
  })

  it("points the hero calls to action at the right places", () => {
    render(<Page />)
    expect(
      screen.getByRole("link", { name: teaser.hero.primaryCta.label })
    ).toHaveAttribute("href", "#waitlist")
    expect(
      screen.getByRole("link", { name: teaser.hero.secondaryCta.label })
    ).toHaveAttribute("href", "#how-it-works")
    // The targets exist.
    expect(document.getElementById("waitlist")).not.toBeNull()
    expect(document.getElementById("how-it-works")).not.toBeNull()
  })

  it("marks the Figma library and code repository steps as planned", () => {
    render(<Page />)
    const planned = screen.getAllByText(teaser.howItWorks.plannedLabel)
    expect(planned).toHaveLength(2)
    for (const badge of planned) {
      const chip = badge.closest("li")
      expect(chip).not.toBeNull()
      expect(
        within(chip as HTMLElement).getByText(/Figma library|Code repository/)
      ).toBeInTheDocument()
    }
  })

  it("offers the three product surfaces as tabs", () => {
    render(<Page />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs.map((t) => t.textContent)).toEqual(
      teaser.product.tabs.map((t) => t.label)
    )
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
  })

  it("gives the hero previews real alt text", () => {
    render(<Page />)
    for (const slide of teaser.hero.slides) {
      expect(screen.getByAltText(slide.alt)).toBeInTheDocument()
    }
  })

  it("adds Organization and SoftwareApplication structured data", () => {
    const { container } = render(<Page />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent ?? "[]")
    expect(data.map((d: { "@type": string }) => d["@type"])).toEqual([
      "Organization",
      "SoftwareApplication",
    ])
    expect(data[0].parentOrganization.name).toBe("Raft Design")
    expect(data[1].applicationCategory).toBe("DesignApplication")
    expect(data[1].offers).toBeUndefined()
  })
})
