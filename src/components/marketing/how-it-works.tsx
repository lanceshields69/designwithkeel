import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TeaserIcon } from "@/components/marketing/icon"
import { SectionTag } from "@/components/marketing/section-tag"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { teaser } from "@/content/teaser"

function HowItWorks() {
  const { howItWorks } = teaser
  return (
    <Section
      id="how-it-works"
      tone="surface"
      border="bottom"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-0"
    >
      <Container>
        <SectionTag>{howItWorks.tag}</SectionTag>
        <h2
          id="how-it-works-heading"
          className="mt-4 text-sidebar-accent-foreground"
        >
          {howItWorks.headline}
        </h2>
        <ol className="mt-12 flex flex-col gap-6">
          {howItWorks.steps.map((step) => (
            <li key={step.number}>
              <Card>
                <CardContent className="flex flex-col gap-2 md:flex-row md:gap-8">
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-h1 font-bold text-muted-foreground md:w-16"
                  >
                    {step.number}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-h4 text-sidebar-accent-foreground">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {step.body}
                    </p>
                    {"sources" in step && step.sources ? (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {step.sources.map((source) => (
                          <li
                            key={source.label}
                            className="flex items-center gap-1.5 rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-sidebar-foreground"
                          >
                            <TeaserIcon name={source.icon} className="size-3" />
                            {source.label}
                            {source.planned ? (
                              <Badge variant="planned">
                                {howItWorks.plannedLabel}
                              </Badge>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

export { HowItWorks }
