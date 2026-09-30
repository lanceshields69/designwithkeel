import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TeaserIcon } from "@/components/marketing/icon"
import { SectionTag } from "@/components/marketing/section-tag"
import { Card, CardContent } from "@/components/ui/card"
import { teaser } from "@/content/teaser"

function LargerIdea() {
  const { largerIdea } = teaser
  return (
    <Section tone="inverse" aria-labelledby="larger-idea-heading">
      <Container>
        <div className="mx-auto flex max-w-prose flex-col items-center text-center">
          <SectionTag inverse>{largerIdea.tag}</SectionTag>
          <h2
            id="larger-idea-heading"
            className="mt-6 max-w-72 text-balance text-primary-foreground"
          >
            {largerIdea.headline}
          </h2>
          <p className="mt-5 text-base text-primary-foreground/60">
            {largerIdea.body}
          </p>
        </div>
        <ul className="mt-16 grid gap-4 md:grid-cols-2">
          {largerIdea.examples.map((example) => (
            <li key={example.title} className="flex">
              <Card variant="inverse" className="w-full">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-sm border border-primary-foreground/10">
                      <TeaserIcon name={example.icon} className="size-3.5" />
                    </span>
                    <h3 className="text-xs leading-4 font-bold tracking-normal text-primary-foreground/50">
                      {example.title}
                    </h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">
                    {example.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { LargerIdea }
