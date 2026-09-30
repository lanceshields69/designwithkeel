import type { MetadataRoute } from "next"

import { siteUrl } from "@/config/site"

// Only the teaser is public. /design-system is deliberately left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }]
}
