import Image from "next/image"

import { Container } from "@/components/layout/container"
import { teaser } from "@/content/teaser"

function SiteFooter() {
  const { footer } = teaser
  return (
    <footer className="border-t border-border bg-popover py-10">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Image
          src="/teaser/footer-keel-logo.png"
          alt={footer.logoAlt}
          width={88}
          height={24}
          className="opacity-70"
        />
        <div className="flex items-center gap-2">
          <Image
            src="/teaser/raft-design-mark.svg"
            alt=""
            width={34}
            height={34}
          />
          <p className="text-sm text-muted-foreground">
            {footer.byPrefix}
            <a
              href={footer.companyHref}
              className="rounded-sm text-sidebar-accent-foreground underline outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {footer.company}
            </a>
            {footer.suffix}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{footer.copyright}</p>
      </Container>
    </footer>
  )
}

export { SiteFooter }
