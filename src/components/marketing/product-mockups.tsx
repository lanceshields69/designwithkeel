import { ArrowUp } from "lucide-react"

import { TeaserIcon } from "@/components/marketing/icon"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { teaser } from "@/content/teaser"
import { cn } from "@/lib/utils"

// The three product surfaces, rebuilt as real components so their text is
// readable by people, screen readers and crawlers. Content is in
// src/content/teaser.ts. Everything here is a static picture of the product,
// not working UI.

function MockupFrame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card
      className={cn("gap-0 overflow-hidden rounded-xl py-0", className)}
      {...props}
    />
  )
}

function LivingGuideMockup() {
  const guide = teaser.product.livingGuide
  return (
    <MockupFrame className="bg-muted">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-popover px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-sm bg-sidebar-accent-foreground text-primary-foreground">
            <TeaserIcon name="anchor" className="size-3.5" />
          </span>
          <span className="text-base font-bold text-sidebar-accent-foreground">
            {guide.title}
          </span>
        </div>
        <ul className="hidden items-center gap-6 md:flex">
          {guide.nav.map((item) => (
            <li key={item} className="text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">
          <TeaserIcon name="message-circle" className="size-3" />
          {guide.askLabel}
        </span>
      </div>
      <div className="px-6 py-8 md:px-8 md:py-10">
        <p className="text-h2 font-bold text-sidebar-accent-foreground">
          {guide.heading}
        </p>
        <p className="mt-3 max-w-lg text-base text-sidebar-foreground">
          {guide.body}
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {guide.cards.map((card) => (
            <li key={card.label}>
              <Card size="sm" className="h-full rounded-xl">
                <div className="flex flex-col gap-2 px-4">
                  <p className="text-eyebrow text-xs text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="text-sm text-sidebar-foreground">{card.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </MockupFrame>
  )
}

const statusVariant = {
  ready: "secondary",
  review: "planned",
  missing: "outline",
} as const

function WorkspaceMockup() {
  const workspace = teaser.product.workspace
  return (
    <MockupFrame>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-popover px-6 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-sidebar-accent-foreground">
            {workspace.title}
          </span>
          <Badge variant="secondary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            {workspace.liveLabel}
          </Badge>
        </div>
        <span className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
          {workspace.publishLabel}
        </span>
      </div>
      <ul className="grid gap-4 bg-sidebar p-6 md:grid-cols-2">
        {workspace.cards.map((card) => (
          <li key={card.title}>
            <Card size="sm" className="h-full">
              <div className="flex flex-col gap-2 px-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-sidebar-accent-foreground">
                    {card.title}
                  </span>
                  <Badge variant={statusVariant[card.tone]}>
                    {card.status}
                  </Badge>
                </div>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    card.mono && "font-mono"
                  )}
                >
                  {card.detail}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </MockupFrame>
  )
}

function ChatBubble({
  from,
  children,
}: {
  from: "user" | "assistant"
  children: React.ReactNode
}) {
  if (from === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[26rem] rounded-lg rounded-tr-sm bg-sidebar-accent-foreground px-3 py-2 text-sm leading-relaxed text-primary-foreground">
          {children}
        </p>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-2">
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      >
        <TeaserIcon name="sparkles" className="size-2.5" />
      </span>
      <p className="max-w-3xl rounded-lg rounded-tl-sm border border-border bg-popover px-3 py-2 text-sm leading-relaxed text-sidebar-foreground">
        {children}
      </p>
    </div>
  )
}

function AssistantMockup() {
  const assistant = teaser.product.assistant
  return (
    <MockupFrame>
      <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
        <TeaserIcon name="sparkles" className="size-3.5" />
        <span className="text-sm font-bold text-sidebar-accent-foreground">
          {assistant.title}
        </span>
        <span className="pl-1 text-xs text-muted-foreground">
          {assistant.subtitle}
        </span>
      </div>
      <div className="flex flex-col gap-3 bg-sidebar p-5">
        {assistant.messages.map((message) => (
          <ChatBubble key={message.text} from={message.from}>
            {message.text}
          </ChatBubble>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-popover px-4 py-2.5">
          <span className="text-sm text-muted-foreground">
            {assistant.inputPlaceholder}
          </span>
          <ArrowUp aria-hidden="true" className="size-3.5" />
        </div>
      </div>
    </MockupFrame>
  )
}

export { AssistantMockup, LivingGuideMockup, WorkspaceMockup }
