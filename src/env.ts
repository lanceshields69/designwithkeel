import { z } from "zod"

/**
 * Validates `process.env` with Zod and exposes it as a typed `env` object.
 *
 * Server and client variables are validated by two separate schemas.
 * `NEXT_PUBLIC_*` variables are inlined into the client bundle by Next.js at
 * build time, so they're readable by anyone — nothing secret belongs there.
 * Everything else is server-only: accessing a server key from browser code
 * throws immediately (see the Proxy below), rather than silently returning
 * `undefined` and failing somewhere confusing later.
 *
 * Nothing is required in this milestone. Every entry below is commented out
 * because the corresponding service doesn't exist yet — this just makes the
 * eventual shape visible. Uncomment and mark `.min(1)` (or similar) as each
 * one becomes real.
 */

// Exported so tests can validate the pattern itself (extending these with a
// throwaway field) without needing a real secret to exist. See env.test.ts.
export const serverSchema = z.object({
  // Build-time switch for the /design-system reference page. Unset or
  // anything but "true" makes that route return 404.
  SHOW_DESIGN_SYSTEM: z.enum(["true", "false"]).optional(),
  // SUPABASE_URL: z.string().url(),
  // SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  // ANTHROPIC_API_KEY: z.string().min(1),
  // FIRECRAWL_API_KEY: z.string().min(1),
  // UPSTASH_REDIS_REST_URL: z.string().url(),
  // UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  // JOB_SERVICE_URL: z.string().url(),
  // JOB_SERVICE_TOKEN: z.string().min(1),
  // SENTRY_DSN: z.string().url(),
})

export const clientSchema = z.object({
  // Formspree form endpoint for the teaser waitlist. Optional: when it is
  // missing the form shows "Signups open soon" instead of failing.
  NEXT_PUBLIC_FORMSPREE_ENDPOINT: z.url().optional(),
  // NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  // NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

// An empty z.object({}) infers as Record<string, never>, which can't be
// intersected with real keys. Drop the index signature and keep named keys.
type KnownKeys<T> = { [K in keyof T as string extends K ? never : K]: T[K] }
type ServerEnv = KnownKeys<z.infer<typeof serverSchema>>
type ClientEnv = KnownKeys<z.infer<typeof clientSchema>>
type Env = ServerEnv & ClientEnv

export function parseEnv(): Env {
  const server = serverSchema.safeParse(process.env)
  if (!server.success) {
    throw new Error(
      `Invalid server environment variables:\n${server.error.issues
        .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`
    )
  }

  const client = clientSchema.safeParse(process.env)
  if (!client.success) {
    throw new Error(
      `Invalid client environment variables:\n${client.error.issues
        .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`
    )
  }

  return { ...server.data, ...client.data }
}

const parsed = parseEnv()
const clientKeys = new Set(Object.keys(clientSchema.shape))

/**
 * `env.SOME_SERVER_KEY` throws if evaluated in browser code.
 * `env.NEXT_PUBLIC_SOME_KEY` works in both.
 */
export const env: Env = new Proxy(parsed, {
  get(target, prop: string) {
    if (typeof window !== "undefined" && !clientKeys.has(prop)) {
      throw new Error(
        `Attempted to access server-only env var "${prop}" from client code. ` +
          `Only NEXT_PUBLIC_* variables are available in the browser.`
      )
    }
    return target[prop as keyof Env]
  },
})
