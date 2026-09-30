import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionTag } from "@/components/marketing/section-tag"
import { WaitlistForm } from "@/components/marketing/waitlist-form"
import { buttonVariants } from "@/components/ui/button"
import { teaser } from "@/content/teaser"

function FounderWaitlist({ endpoint }: { endpoint?: string }) {
  const { founder } = teaser
  return (
    <Section border="top" aria-labelledby="founder-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,480fr)_minmax(0,528fr)] lg:gap-20">
          <div className="flex flex-col items-start">
            <SectionTag>{founder.tag}</SectionTag>
            <h2
              id="founder-heading"
              className="mt-6 text-sidebar-accent-foreground"
            >
              {founder.headline}
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              {founder.body}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                width={65}
                height={65}
                className="size-16 rounded-full border border-border object-cover"
              />
              <div>
                <p className="text-sm font-medium text-sidebar-accent-foreground">
                  {founder.name}
                </p>
                <p className="text-xs text-muted-foreground">{founder.role}</p>
              </div>
            </div>
            <a
              href={founder.cta.href}
              className={buttonVariants({
                variant: "outline",
                className: "mt-8",
              })}
            >
              {founder.cta.label}
            </a>
          </div>
          <WaitlistForm endpoint={endpoint} />
        </div>
      </Container>
    </Section>
  )
}

export { FounderWaitlist }
