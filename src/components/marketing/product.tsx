import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import {
  AssistantMockup,
  LivingGuideMockup,
  WorkspaceMockup,
} from "@/components/marketing/product-mockups"
import { SectionTag } from "@/components/marketing/section-tag"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teaser } from "@/content/teaser"

const mockups = {
  "living-guide": LivingGuideMockup,
  workspace: WorkspaceMockup,
  assistant: AssistantMockup,
} as const

function Product() {
  const { product } = teaser
  return (
    <Section id="product" border="bottom" aria-labelledby="product-heading">
      <Container>
        <SectionTag>{product.tag}</SectionTag>
        <h2
          id="product-heading"
          className="mt-4 text-sidebar-accent-foreground"
        >
          {product.headline}
        </h2>
        <Tabs defaultValue={product.tabs[0].id} className="mt-10 gap-0">
          <TabsList aria-label={product.tabsLabel}>
            {product.tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {product.tabs.map((tab) => {
            const Mockup = mockups[tab.id as keyof typeof mockups]
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-4">
                <p className="max-w-lg text-sm text-muted-foreground">
                  {tab.description}
                </p>
                <div className="mt-6">
                  <Mockup />
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </Container>
    </Section>
  )
}

export { Product }
