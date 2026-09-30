import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const FORMSPREE = "https://formspree.io/f/e2e-test"

// Nothing in these tests may reach the real Formspree form.
async function mockFormspree(
  page: Page,
  handler: (route: import("@playwright/test").Route) => Promise<void>
) {
  await page.route(FORMSPREE, handler)
}

async function fillValid(page: Page) {
  await page.getByLabel(/Work email/).fill("ada@example.com")
  await page.getByLabel(/Company/).fill("Acme Inc.")
}

test.describe("page structure", () => {
  test("is served as a static page", async ({ request }) => {
    const res = await request.get("/")
    expect(res.ok()).toBe(true)
    // Prerendered pages are cacheable at the edge; dynamic pages are not.
    expect(res.headers()["cache-control"]).toContain("s-maxage")
    expect(res.headers()["x-nextjs-prerender"]).toContain("1")
  })

  test("renders every section in order", async ({ page }) => {
    await page.goto("/")
    const headings = await page
      .getByRole("heading", { level: 2 })
      .allTextContents()
    expect(headings).toEqual([
      "Your brand is in a slide deck. Your product is in Figma and code. They stopped agreeing a while ago.",
      "From what you have to a system that works.",
      "One system. Three surfaces.",
      "One system. Both sides of the company.",
      "Designed for people. Structured for AI.",
      "Built by someone who's designed both sides.",
    ])
    await expect(page.getByRole("contentinfo")).toContainText(
      "© 2026 Raft Design. All rights reserved."
    )
  })

  test("has SEO metadata, structured data and crawler files", async ({
    page,
    request,
  }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Keel/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://designwithkeel.com"
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /og-image\.jpg/
    )
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    )
    const ld = await page
      .locator('script[type="application/ld+json"]')
      .textContent()
    expect(
      JSON.parse(ld ?? "[]").map((d: { "@type": string }) => d["@type"])
    ).toEqual(["Organization", "SoftwareApplication"])

    const robots = await (await request.get("/robots.txt")).text()
    expect(robots).toContain("Sitemap: https://designwithkeel.com/sitemap.xml")
    expect(robots).not.toMatch(/Disallow: \/\s*$/m)
    const sitemap = await (await request.get("/sitemap.xml")).text()
    expect(sitemap).toContain("https://designwithkeel.com")
    expect(sitemap).not.toContain("design-system")
    const llms = await (await request.get("/llms.txt")).text()
    expect(llms).toContain("# Keel")
    expect(llms).toContain("What is planned")
  })
})

test.describe("navigation and calls to action", () => {
  test("hero and header buttons scroll to the waitlist form", async ({
    page,
  }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "Reserve your spot" }).click()
    await expect(page).toHaveURL(/#waitlist$/)
    await expect(page.locator("#waitlist")).toBeInViewport()

    await page.goto("/")
    await page.getByRole("link", { name: "Join early access" }).click()
    await expect(page).toHaveURL(/#waitlist$/)
    await expect(page.locator("#waitlist")).toBeInViewport()
  })

  test("the secondary hero button scrolls to How Keel works", async ({
    page,
  }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "See how Keel works" }).click()
    await expect(page).toHaveURL(/#how-it-works$/)
    await expect(page.locator("#how-it-works")).toBeInViewport()
  })

  test("desktop nav links go to their sections", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")
    for (const [name, id] of [
      ["Product", "product"],
      ["For teams", "for-teams"],
      ["How it works", "how-it-works"],
    ]) {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name })
        .click()
      await expect(page.locator(`#${id}`)).toBeInViewport()
    }
  })
})

test.describe("product tabs", () => {
  test("switch between Living guide, Workspace and Assistant", async ({
    page,
  }) => {
    await page.goto("/")
    await expect(page.getByText("Raft Design Brand Guide")).toBeVisible()

    await page.getByRole("tab", { name: "Workspace" }).click()
    await expect(page.getByText("Brand workspace")).toBeVisible()
    await expect(page.getByText("Publish changes")).toBeVisible()
    await expect(page.getByText("Needs review")).toBeVisible()

    await page.getByRole("tab", { name: "Assistant" }).click()
    await expect(page.getByText("Brand assistant")).toBeVisible()
    await expect(
      page.getByText(
        "Which logo should I use for a dark background presentation?"
      )
    ).toBeVisible()
  })
})

test.describe("hero carousel", () => {
  test("arrows switch to the brand guide preview and back", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto("/")
    const guide = page.locator(".hero-guide-box")
    await expect(guide).toHaveAttribute("data-active", "false")

    await page.getByRole("button", { name: "Next slide" }).click()
    await expect(guide).toHaveAttribute("data-active", "true")
    await expect(guide.getByAltText(/published Keel brand guide/)).toBeVisible()

    await page.getByRole("button", { name: "Previous slide" }).click()
    await expect(guide).toHaveAttribute("data-active", "false")
  })

  test("the brand guide scrolls once it is showing", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto("/")
    await page.getByRole("button", { name: "Next slide" }).click()
    const img = page.locator(".hero-guide-scroll")
    const name = await img.evaluate((el) => getComputedStyle(el).animationName)
    expect(name).toBe("hero-guide-scroll")
    const duration = await img.evaluate(
      (el) => getComputedStyle(el).animationDuration
    )
    // 12s of scrolling plus a 3s hold before it starts over.
    expect(duration).toBe("15s")
  })

  test("does not animate when the visitor prefers reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" })
    const page = await context.newPage()
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto("/")
    await page.getByRole("button", { name: "Next slide" }).click()
    const name = await page
      .locator(".hero-guide-scroll")
      .evaluate((el) => getComputedStyle(el).animationName)
    expect(name).toBe("none")
    await context.close()
  })
})

test.describe("waitlist form", () => {
  test("validates required fields before sending anything", async ({
    page,
  }) => {
    let requests = 0
    await mockFormspree(page, async (route) => {
      requests++
      await route.fulfill({ status: 200, body: "{}" })
    })
    await page.goto("/")
    await page.getByRole("button", { name: "Join the private beta" }).click()

    const email = page.getByLabel(/Work email/)
    await expect(email).toBeFocused()
    await expect(email).toHaveAttribute("aria-invalid", "true")
    await expect(page.getByText("Enter a valid work email.")).toBeVisible()
    await expect(page.getByText("Enter your company name.")).toBeVisible()
    expect(requests).toBe(0)
  })

  test("sends the form, shows a loading state, then the thank-you message", async ({
    page,
  }) => {
    let body: Record<string, string> = {}
    await mockFormspree(page, async (route) => {
      body = route.request().postDataJSON()
      await new Promise((r) => setTimeout(r, 600))
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      })
    })
    await page.goto("/")
    await fillValid(page)
    await page.getByLabel(/Website/).fill("acme.com")
    await page.getByRole("button", { name: "Both" }).click()
    await page.getByRole("button", { name: "Join the private beta" }).click()

    const sending = page.getByRole("button", { name: "Sending…" })
    await expect(sending).toBeDisabled()
    await expect(
      page.getByText("Thank you! We'll be in touch shortly.")
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Join the private beta" })
    ).toHaveCount(0)

    expect(body).toMatchObject({
      email: "ada@example.com",
      company: "Acme Inc.",
      website: "https://acme.com",
      need: "Both",
      _gotcha: "",
    })
    // The thank-you text is announced through a polite live region.
    await expect(
      page.locator('[role="status"][aria-live="polite"]')
    ).toContainText("Thank you!")
  })

  test("shows an inline error and lets the visitor retry", async ({ page }) => {
    let calls = 0
    await mockFormspree(page, async (route) => {
      calls++
      if (calls === 1) await route.fulfill({ status: 500, body: "{}" })
      else await route.fulfill({ status: 200, body: "{}" })
    })
    await page.goto("/")
    await fillValid(page)
    await page.getByRole("button", { name: "Join the private beta" }).click()

    await expect(page.locator('form [role="alert"]')).toContainText(
      "Something went wrong"
    )
    await page.getByRole("button", { name: "Try again" }).click()
    await expect(
      page.getByText("Thank you! We'll be in touch shortly.")
    ).toBeVisible()
    expect(calls).toBe(2)
  })

  test("hides the honeypot from people and screen readers", async ({
    page,
  }) => {
    await page.goto("/")
    const honeypot = page.locator('input[name="_gotcha"]')
    await expect(honeypot).toHaveCount(1)
    await expect(honeypot).toBeHidden()
    await expect(honeypot).toHaveAttribute("tabindex", "-1")
  })
})

test.describe("responsive layout", () => {
  for (const width of [320, 768, 1024, 1440]) {
    test(`${width}px: no sideways scrolling and key content is reachable`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto("/")
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      expect(overflow).toBeLessThanOrEqual(0)
      await page.getByRole("link", { name: "Reserve your spot" }).click()
      await expect(page.getByLabel(/Work email/)).toBeInViewport()
      await expect(
        page.getByRole("button", { name: "Join the private beta" })
      ).toBeVisible()
    })
  }
})

test.describe("accessibility (axe)", () => {
  test("/ has no violations", async ({ page }) => {
    await page.goto("/")
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test("/ has no violations with a product tab and slide open", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto("/")
    await page.getByRole("tab", { name: "Assistant" }).click()
    await page.getByRole("button", { name: "Next slide" }).click()
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test("/ has no violations on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto("/")
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test("/design-system has no violations", async ({ page }) => {
    await page.goto("/design-system")
    await expect(
      page.getByRole("heading", { level: 1, name: "Keel design system" })
    ).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe("design system reference page", () => {
  test("is not indexed", async ({ page }) => {
    await page.goto("/design-system")
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/
    )
  })

  test("shows tokens with contrast ratios and components", async ({ page }) => {
    await page.goto("/design-system")
    await expect(
      page.getByText("--primary", { exact: true }).first()
    ).toBeVisible()
    await expect(page.getByText("#15803d").first()).toBeVisible()
    await expect(page.getByText(/:1 pass/).first()).toBeVisible()
    await expect(page.getByText("FAIL")).toHaveCount(0)
    await expect(page.getByRole("heading", { name: "Button" })).toBeVisible()
  })
})
