import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { HideOnScrollHeader } from "@/components/marketing/hide-on-scroll-header"
import { buttonVariants } from "@/components/ui/button"
import { teaser } from "@/content/teaser"

function SiteHeader() {
  const { nav } = teaser
  return (
    <HideOnScrollHeader className="border-b border-border bg-popover">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-end gap-1 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src="/teaser/keel-logo.svg"
            alt={nav.logoAlt}
            width={85}
            height={23}
            priority
          />
          <span className="text-xs leading-3 text-foreground">
            {nav.byline}
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={nav.cta.href} className={buttonVariants()}>
          {nav.cta.label}
        </a>
      </Container>
    </HideOnScrollHeader>
  )
}

export { SiteHeader }
