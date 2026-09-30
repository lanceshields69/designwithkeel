import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TeaserIcon } from "@/components/marketing/icon"
import { SectionTag } from "@/components/marketing/section-tag"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { teaser } from "@/content/teaser"
import type { IconName } from "@/content/teaser"

function SideCard({
  icon,
  title,
  items,
}: {
  icon: IconName
  title: string
  items: string[]
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-sm border border-border">
            <TeaserIcon name={icon} className="size-3.5" />
          </span>
          <h3 className="text-xs leading-4 font-bold tracking-normal text-sidebar-accent-foreground">
            {title}
          </h3>
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-sidebar-foreground"
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-primary"
              />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function BothSides() {
  const { bothSides } = teaser
  return (
    <Section
      id="for-teams"
      tone="surface"
      border="bottom"
      aria-labelledby="both-sides-heading"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionTag>{bothSides.tag}</SectionTag>
          <h2
            id="both-sides-heading"
            className="mt-4 text-sidebar-accent-foreground"
          >
            {bothSides.headline}
          </h2>
        </div>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <SideCard
            {...bothSides.brand}
            icon={bothSides.brand.icon as IconName}
          />
          <div className="flex flex-row items-center justify-center gap-4 lg:h-full lg:min-w-35 lg:flex-col">
            <Separator
              className="hidden lg:block lg:h-10 lg:w-px"
              orientation="vertical"
            />
            <p className="px-4 py-6 text-center text-sm font-bold text-sidebar-accent-foreground">
              {bothSides.center.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <Separator
              className="hidden lg:block lg:h-10 lg:w-px"
              orientation="vertical"
            />
          </div>
          <SideCard
            {...bothSides.product}
            icon={bothSides.product.icon as IconName}
          />
        </div>
      </Container>
    </Section>
  )
}

export { BothSides }
