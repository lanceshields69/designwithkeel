import { describe, expect, it } from "vitest"

import { normalizeWebsite, waitlistSchema } from "./waitlist"

const valid = {
  email: "ada@example.com",
  company: "Acme Inc.",
  role: "",
  website: "",
  need: "",
  details: "",
}

describe("normalizeWebsite", () => {
  it("adds https:// to a bare domain", () => {
    expect(normalizeWebsite("example.com")).toBe("https://example.com")
    expect(normalizeWebsite("  www.example.com/about ")).toBe(
      "https://www.example.com/about"
    )
  })

  it("leaves full URLs and empty values alone", () => {
    expect(normalizeWebsite("http://example.com")).toBe("http://example.com")
    expect(normalizeWebsite("https://example.com")).toBe("https://example.com")
    expect(normalizeWebsite("   ")).toBe("")
  })
})

describe("waitlistSchema", () => {
  it("accepts the minimum: work email and company", () => {
    expect(waitlistSchema.safeParse(valid).success).toBe(true)
  })

  it("requires a valid email and a company", () => {
    expect(waitlistSchema.safeParse({ ...valid, email: "nope" }).success).toBe(
      false
    )
    expect(waitlistSchema.safeParse({ ...valid, company: "  " }).success).toBe(
      false
    )
  })

  it("treats website as optional and normalizes it when given", () => {
    const parsed = waitlistSchema.parse({ ...valid, website: "acme.com" })
    expect(parsed.website).toBe("https://acme.com")
    expect(waitlistSchema.parse(valid).website).toBe("")
  })

  it("rejects things that are not a website", () => {
    for (const website of ["not a site", "localhost", "acme"]) {
      expect(waitlistSchema.safeParse({ ...valid, website }).success).toBe(
        false
      )
    }
  })

  it("only allows the three need options (or none)", () => {
    for (const need of ["", "Brand system", "Product design system", "Both"]) {
      expect(waitlistSchema.safeParse({ ...valid, need }).success).toBe(true)
    }
    expect(waitlistSchema.safeParse({ ...valid, need: "Other" }).success).toBe(
      false
    )
  })
})
