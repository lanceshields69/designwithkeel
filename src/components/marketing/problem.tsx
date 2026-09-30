import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TeaserIcon } from "@/components/marketing/icon"
import { Card, CardContent } from "@/components/ui/card"
import { teaser } from "@/content/teaser"

function Problem() {
  const { problem } = teaser
  return (
    <Section border="bottom" aria-labelledby="problem-heading">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2
            id="problem-heading"
            className="text-balance text-sidebar-accent-foreground"
          >
            {problem.headline}
          </h2>
          <p className="text-base text-muted-foreground">{problem.body}</p>
        </div>
        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {problem.items.map((item) => (
            <li key={item.title} className="flex">
              <Card className="w-full">
                <CardContent className="flex-row items-start gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-popover">
                    <TeaserIcon name={item.icon} className="size-4" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs leading-4 font-bold tracking-normal text-sidebar-accent-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { Problem }
