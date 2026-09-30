import type { MetadataRoute } from "next"

import { siteUrl } from "@/config/site"

// Search and AI crawlers are welcome on the public teaser.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/design-system" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
