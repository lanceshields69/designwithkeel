import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { env } from "@/env"
import { contrastRatio } from "@/lib/color"
import { parseColorTokens } from "@/lib/tokens"
import { readTokensCss } from "@/server/token-css"

// Internal reference page. It exists only when the build is made with
// SHOW_DESIGN_SYSTEM=true; otherwise the route is a 404. It is never indexed
// and is left out of the sitemap and robots allow-list.
export const metadata: Metadata = {
  title: "Keel design system (internal)",
  robots: { index: false, follow: false },
}

const semanticColors = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "planned",
  "planned-foreground",
  "planned-border",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
]

// Text pairs the teaser uses. AA needs 4.5 for normal text.
const textPairs: [string, string][] = [
  ["foreground", "background"],
  ["sidebar-accent-foreground", "background"],
  ["sidebar-foreground", "background"],
  ["sidebar-foreground", "sidebar"],
  ["muted-foreground", "background"],
  ["muted-foreground", "sidebar"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["primary", "background"],
  ["planned-foreground", "planned"],
  ["destructive", "background"],
  ["card-foreground", "card"],
  ["accent-foreground", "accent"],
]

// Edges and indicators. WCAG needs 3 for UI components.
const edgePairs: [string, string][] = [
  ["ring", "background"],
  ["primary", "background"],
  ["input", "background"],
]

const spacing: [string, string, number][] = [
  ["3xs", "2px", 0.5],
  ["2xs", "4px", 1],
  ["1.5", "6px", 1.5],
  ["xs", "8px", 2],
  ["sm", "12px", 3],
  ["md", "16px", 4],
  ["lg", "20px", 5],
  ["xl", "24px", 6],
  ["2xl", "32px", 8],
  ["3xl", "40px", 10],
  ["4xl", "48px", 12],
  ["5xl", "64px", 16],
  ["7xl", "96px", 24],
]

// Full class names, written out so Tailwind can see them.
const radii: [string, string][] = [
  ["sm", "rounded-sm"],
  ["md", "rounded-md"],
  ["lg", "rounded-lg"],
  ["xl", "rounded-xl"],
  ["2xl", "rounded-2xl"],
  ["3xl", "rounded-3xl"],
  ["4xl", "rounded-4xl"],
  ["full", "rounded-full"],
]
const shadows: [string, string][] = [
  ["xs", "shadow-xs"],
  ["sm", "shadow-sm"],
  ["md", "shadow-md"],
  ["lg", "shadow-lg"],
  ["xl", "shadow-xl"],
  ["2xl", "shadow-2xl"],
]

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const buttonSizes = ["xs", "sm", "default", "lg"] as const
const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "planned",
  "destructive",
  "ghost",
  "link",
] as const

function Block({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-border py-12">
      <div>
        <h2 className="text-h3">{title}</h2>
        {note ? (
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            {note}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function Ratio({ value, min }: { value: number; min: number }) {
  const pass = value >= min
  return (
    <span
      className={
        pass
          ? "font-medium text-secondary-foreground"
          : "font-medium text-destructive"
      }
    >
      {value.toFixed(2)}:1 {pass ? "pass" : "FAIL"}
    </span>
  )
}

export default async function DesignSystemPage() {
  if (env.SHOW_DESIGN_SYSTEM !== "true") notFound()

  const tokens = parseColorTokens(await readTokensCss())
  const byName = new Map(tokens.map((t) => [t.name, t]))
  const get = (name: string) => byName.get(name)

  return (
    <main className="py-16">
      <Container>
        <header className="flex flex-col gap-2 pb-12">
          <Badge variant="outline" className="w-fit text-eyebrow">
            Internal
          </Badge>
          <h1 className="text-h1">Keel design system</h1>
          <p className="max-w-prose text-base text-muted-foreground">
            Keel&apos;s design system is shadcn/ui&apos;s CSS variables set to
            Keel&apos;s values from Figma. Everything below reads from
            src/styles/tokens.css and the installed components. See DESIGN.md.
          </p>
        </header>

        <Block
          title="Color tokens"
          note="Semantic variables that components read. Hex is computed from the OKLCH value in tokens.css. Chart colors are still the shadcn preset defaults because the Figma kit does not define them."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {semanticColors.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <span
                  aria-hidden="true"
                  className="size-10 shrink-0 rounded-md border border-border"
                  style={{ backgroundColor: `var(--${name})` }}
                />
                <span className="flex flex-col text-sm">
                  <span className="font-medium">--{name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {get(name)?.hex ?? "n/a"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          title="Text contrast"
          note="WCAG 2.1 AA: 4.5:1 for normal text. Muted text on the muted background is the one known near-miss (4.35:1); the teaser avoids that pair, so it is not listed."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Text</th>
                  <th className="py-2 pr-4 font-medium">On</th>
                  <th className="py-2 pr-4 font-medium">Swatch</th>
                  <th className="py-2 font-medium">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {textPairs.map(([fg, bg]) => {
                  const a = get(fg)
                  const b = get(bg)
                  if (!a || !b) return null
                  return (
                    <tr key={`${fg}-${bg}`} className="border-b border-border">
                      <td className="py-2 pr-4">--{fg}</td>
                      <td className="py-2 pr-4">--{bg}</td>
                      <td className="py-2 pr-4">
                        <span
                          aria-hidden="true"
                          className="flex size-8 items-center justify-center rounded-md border border-border"
                          style={{ backgroundColor: `var(--${bg})` }}
                        >
                          <span
                            className="size-4 rounded-sm"
                            style={{ backgroundColor: `var(--${fg})` }}
                          />
                        </span>
                      </td>
                      <td className="py-2">
                        <Ratio value={contrastRatio(a.rgb, b.rgb)} min={4.5} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <h3 className="text-h4">Edges and focus (3:1)</h3>
          <p className="max-w-prose text-sm text-muted-foreground">
            Field edges (--input) and the focus ring must reach 3:1. --border
            (1.3:1) is only used for decorative dividers and card outlines.
          </p>
          <ul className="flex flex-col gap-1 text-sm">
            {edgePairs.map(([fg, bg]) => {
              const a = get(fg)
              const b = get(bg)
              if (!a || !b) return null
              return (
                <li key={`${fg}-${bg}`}>
                  --{fg} on --{bg}:{" "}
                  <Ratio value={contrastRatio(a.rgb, b.rgb)} min={3} />
                </li>
              )
            })}
          </ul>
        </Block>

        <Block
          title="Type scale"
          note="Geist. Headings h1 to h4 are bold with Figma's line heights and letter spacing. Body sizes follow Figma's paragraph styles."
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-h1">Heading 1: 48 / 48, -1.5px</h1>
            <h2 className="text-h2">Heading 2: 28 / 28, -1px</h2>
            <h3 className="text-h3">Heading 3: 24 / 28, -0.5px</h3>
            <h4 className="text-h4">Heading 4: 18 / 21.6</h4>
            <p className="text-lg">Paragraph large: 18 / 27</p>
            <p className="text-base">Paragraph regular: 16 / 24</p>
            <p className="text-sm">Paragraph small: 14 / 20</p>
            <p className="text-xs">Paragraph mini: 12 / 16</p>
            <p className="text-caption">Caption: 13 / 20.5, 1px tracking</p>
            <p className="text-eyebrow">Eyebrow: Medium 12 / 16, uppercase</p>
            <p className="font-mono text-sm">Geist Mono small: 14 / 20</p>
          </div>
        </Block>

        <Block
          title="Spacing"
          note="Figma's spacing tokens land exactly on Tailwind's default steps, so Keel uses Tailwind's scale unchanged."
        >
          <ul className="flex flex-col gap-2">
            {spacing.map(([name, px, step]) => (
              <li key={name} className="flex items-center gap-4 text-sm">
                <span className="w-16 font-mono text-xs">{name}</span>
                <span className="w-12 text-muted-foreground">{px}</span>
                <span
                  aria-hidden="true"
                  className="h-3 rounded-sm bg-primary"
                  style={{ width: `calc(var(--spacing) * ${step * 4})` }}
                />
              </li>
            ))}
          </ul>
        </Block>

        <Block
          title="Radius"
          note="--radius is 10px (Figma radius-lg). The scale follows Figma: 6, 8, 10, 14, 16, 22, 26 and full."
        >
          <ul className="flex flex-wrap gap-4">
            {radii.map(([name, cls]) => (
              <li
                key={name}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <span
                  aria-hidden="true"
                  className={`size-16 border border-border bg-muted ${cls}`}
                />
                {cls}
              </li>
            ))}
          </ul>
        </Block>

        <Block
          title="Shadows"
          note="Tailwind defaults. Figma's shadow styles were not exported, so nothing is customized here."
        >
          <ul className="flex flex-wrap gap-6 bg-sidebar p-6">
            {shadows.map(([name, cls]) => (
              <li
                key={name}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <span
                  aria-hidden="true"
                  className={`size-16 rounded-lg bg-popover ${cls}`}
                />
                {cls}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Layout widths">
          <ul className="flex flex-col gap-2 text-sm">
            <li>max-w-prose: 680px (reading width)</li>
            <li>max-w-content: 1152px (page column, includes 32px gutters)</li>
            <li>max-w-wide: 1280px</li>
          </ul>
        </Block>

        <Block
          title="Button"
          note="Every variant and size. Disabled is shown on the right. Hover, focus and active states use the stock shadcn behavior: try them with the mouse and keyboard."
        >
          <div className="flex flex-col gap-4">
            {buttonVariants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground">
                  {variant}
                </span>
                {buttonSizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
                <Button variant={variant} disabled>
                  disabled
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-xs text-muted-foreground">
                icon sizes
              </span>
              {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((s) => (
                <Button key={s} variant="outline" size={s} aria-label={s}>
                  +
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 bg-foreground p-4">
              <span className="w-24 text-xs text-primary-foreground/70">
                outline-inverse
              </span>
              {buttonSizes.map((size) => (
                <Button key={size} variant="outline-inverse" size={size}>
                  {size}
                </Button>
              ))}
              <Button variant="outline-inverse" disabled>
                disabled
              </Button>
            </div>
          </div>
        </Block>

        <Block title="Badge">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {badgeVariants.map((v) => (
                <Badge key={v} variant={v}>
                  {v}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 bg-foreground p-4">
              <Badge variant="outline-inverse">outline-inverse</Badge>
            </div>
          </div>
        </Block>

        <Block title="Card">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Default card</CardTitle>
                <CardDescription>On a light surface.</CardDescription>
              </CardHeader>
              <CardContent>Card content uses card foreground.</CardContent>
            </Card>
            <div className="bg-sidebar-accent-foreground p-6">
              <Card variant="inverse">
                <CardHeader>
                  <CardTitle>Inverse card</CardTitle>
                  <CardDescription className="text-primary-foreground/60">
                    On a dark section.
                  </CardDescription>
                </CardHeader>
                <CardContent>Translucent white on near-black.</CardContent>
              </Card>
            </div>
          </div>
        </Block>

        <Block title="Tabs">
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">One</TabsTrigger>
              <TabsTrigger value="two">Two</TabsTrigger>
              <TabsTrigger value="three">Three</TabsTrigger>
            </TabsList>
            <TabsContent value="one">First panel.</TabsContent>
            <TabsContent value="two">Second panel.</TabsContent>
            <TabsContent value="three">Third panel.</TabsContent>
          </Tabs>
        </Block>

        <Block
          title="Form controls"
          note="Input, Textarea, Label and ToggleGroup, including disabled and invalid states."
        >
          <div className="grid max-w-xl gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="ds-input">Label</Label>
              <Input id="ds-input" placeholder="Placeholder" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ds-invalid">Invalid</Label>
              <Input
                id="ds-invalid"
                aria-invalid="true"
                defaultValue="not an email"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ds-disabled">Disabled</Label>
              <Input id="ds-disabled" disabled defaultValue="Can't edit" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ds-textarea">Textarea</Label>
              <Textarea id="ds-textarea" placeholder="Tell us more" />
            </div>
            <ToggleGroup variant="outline" spacing={0} aria-label="Choice">
              <ToggleGroupItem value="a">Brand system</ToggleGroupItem>
              <ToggleGroupItem value="b">Product design system</ToggleGroupItem>
              <ToggleGroupItem value="c">Both</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Block>

        <Block title="Separator">
          <div className="flex h-8 items-center gap-4 text-sm">
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </div>
          <Separator />
        </Block>

        <Block title="Carousel">
          <div className="mx-auto w-full max-w-md px-12">
            <Carousel aria-label="Example carousel">
              <CarouselContent>
                {["One", "Two", "Three"].map((label) => (
                  <CarouselItem key={label}>
                    <Card>
                      <CardContent className="flex h-24 items-center justify-center text-h4">
                        {label}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Block>
      </Container>
    </main>
  )
}
