// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest"

// The real reader is server-only and touches the file system.
vi.mock("@/server/token-css", () => ({ readTokensCss: async () => "" }))

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

async function loadPage() {
  vi.resetModules()
  return (await import("./page")).default
}

describe("/design-system", () => {
  it("is a 404 unless SHOW_DESIGN_SYSTEM=true", async () => {
    vi.stubEnv("SHOW_DESIGN_SYSTEM", undefined)
    const Page = await loadPage()
    await expect(Page()).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    })
  })

  it("is a 404 when SHOW_DESIGN_SYSTEM=false", async () => {
    vi.stubEnv("SHOW_DESIGN_SYSTEM", "false")
    const Page = await loadPage()
    await expect(Page()).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    })
  })

  it("renders when SHOW_DESIGN_SYSTEM=true", async () => {
    vi.stubEnv("SHOW_DESIGN_SYSTEM", "true")
    const Page = await loadPage()
    await expect(Page()).resolves.toBeTruthy()
  })
})
