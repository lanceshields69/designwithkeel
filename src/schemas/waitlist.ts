import { z } from "zod"

export const needOptions = [
  "Brand system",
  "Product design system",
  "Both",
] as const

/**
 * Turns "example.com" into "https://example.com". Empty stays empty. Anything
 * that already starts with http:// or https:// is left alone.
 */
export function normalizeWebsite(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ""
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function isPlausibleWebsite(value: string): boolean {
  if (value === "") return true
  try {
    const url = new URL(value)
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".") &&
      !/\s/.test(value)
    )
  } catch {
    return false
  }
}

/**
 * Waitlist submission. Work email and company are required. Website, role, the
 * "which do you need most" choice and the free-text answer are optional.
 * `website` is normalized before it is validated and sent.
 */
export const waitlistSchema = z.object({
  email: z.string().trim().pipe(z.email()),
  company: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200),
  website: z
    .string()
    .transform(normalizeWebsite)
    .refine(isPlausibleWebsite, { message: "Invalid website" }),
  need: z.union([z.enum(needOptions), z.literal("")]),
  details: z.string().trim().max(2000),
})

export type WaitlistInput = z.input<typeof waitlistSchema>
export type WaitlistData = z.output<typeof waitlistSchema>
