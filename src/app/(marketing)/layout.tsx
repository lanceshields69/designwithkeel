import type { Metadata } from "next"

import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"
import {
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialDescription,
  socialTitle,
} from "@/config/site"

const SHARE_ALT =
  "Keel by Raft: One living system for your brand, product, and AI. The Keel workspace with a voice section and the assistant, and a Reserve your spot button for designwithkeel.com."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: "/teaser/share-card.jpg",
        width: 1200,
        height: 627,
        alt: SHARE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [{ url: "/teaser/share-card.jpg", alt: SHARE_ALT }],
  },
}

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  )
}
