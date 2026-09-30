import { BothSides } from "@/components/marketing/both-sides"
import { FounderWaitlist } from "@/components/marketing/founder-waitlist"
import { Hero } from "@/components/marketing/hero"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { LargerIdea } from "@/components/marketing/larger-idea"
import { Problem } from "@/components/marketing/problem"
import { Product } from "@/components/marketing/product"
import { siteDescription, siteName, siteUrl } from "@/config/site"
import { env } from "@/env"

// Structured data for search and AI crawlers. It only states what the page
// itself says: Keel is a pre-release product from Raft Design, with no pricing.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    parentOrganization: { "@type": "Organization", name: "Raft Design" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    releaseNotes: "Pre-release. Join the waitlist for the private beta.",
    creator: { "@type": "Organization", name: "Raft Design" },
  },
]

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Product />
      <BothSides />
      <LargerIdea />
      <FounderWaitlist endpoint={env.NEXT_PUBLIC_FORMSPREE_ENDPOINT} />
      <script
        type="application/ld+json"
        // Static, first-party JSON. "<" is escaped so it can never close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}
