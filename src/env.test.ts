import { z } from "zod"
import { describe, expect, it } from "vitest"

import { clientSchema, parseEnv, serverSchema } from "./env"

describe("env", () => {
  it("parses successfully when nothing required is missing", () => {
    // Nothing is required in this milestone — every real key is still
    // commented out in src/env.ts — so parsing the current process.env
    // (whatever it happens to contain in CI or locally) must succeed.
    expect(() => parseEnv()).not.toThrow()
  })

  it("rejects a malformed value once a field is required", () => {
    // The base schemas have no fields yet by design (nothing is real).
    // Extending them here tests the same validation pattern src/env.ts
    // will use the moment a real, required variable is uncommented.
    const testServerSchema = serverSchema.extend({
      TEST_REQUIRED_URL: z.string().url(),
    })

    const valid = testServerSchema.safeParse({
      TEST_REQUIRED_URL: "https://example.com",
    })
    expect(valid.success).toBe(true)

    const malformed = testServerSchema.safeParse({
      TEST_REQUIRED_URL: "not-a-url",
    })
    expect(malformed.success).toBe(false)
  })

  it("clientSchema only ever contains NEXT_PUBLIC_ keys", () => {
    for (const key of Object.keys(clientSchema.shape)) {
      expect(key.startsWith("NEXT_PUBLIC_")).toBe(true)
    }
  })
})
