/**
 * All teaser copy lives here. Text comes from the Figma frame "Keel -
 * Pre-release" (node 42:10238), the tab frames 53:13577 and 54:14478, and the
 * thank-you frame 61:14952. Components render this object and hold no copy of
 * their own.
 */

export type IconName =
  | "anchor"
  | "bot"
  | "building"
  | "code"
  | "file-text"
  | "git-branch"
  | "globe"
  | "layers"
  | "message-circle"
  | "palette"
  | "sparkles"
  | "users"
  | "zap"

export type Link = { label: string; href: string }

export const teaser = {
  nav: {
    logoAlt: "Keel",
    byline: "by Raft",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Product", href: "#product" },
      { label: "For teams", href: "#for-teams" },
    ] satisfies Link[],
    cta: { label: "Join early access", href: "#waitlist" } satisfies Link,
  },

  hero: {
    eyebrow: "A new kind of design system",
    headline: "The brand and design system you never had time to build.",
    body: "Share your website, and Keel creates your brand guide and your design system in minutes. You approve what's right. Then everyone, including your AI tools, works from the same rules.",
    primaryCta: {
      label: "Reserve your spot",
      href: "#waitlist",
    } satisfies Link,
    secondaryCta: {
      label: "See how Keel works",
      href: "#how-it-works",
    } satisfies Link,
    slides: [
      {
        src: "/teaser/hero-workspace.webp",
        width: 1359,
        height: 888,
        alt: 'The Keel workspace for Raft Design. The Overview shows "Your first brand draft is ready" and 3 of 4 sections ready, with Brand foundation, Visual identity and Voice marked Ready and Assets marked Missing. A Raft Assistant panel on the right proposes a revised company description with Apply change and Keep current buttons.',
      },
      {
        src: "/teaser/hero-brand-guide.webp",
        width: 1359,
        height: 1545,
        alt: "A published Keel brand guide for Raft Design, showing the company overview, brand foundation, voice, logos, colors, typography and assets on a single shareable page.",
      },
    ],
    carouselLabel: "Product previews",
  },

  problem: {
    headline:
      "Your brand is in a slide deck. Your product is in Figma and code. They stopped agreeing a while ago.",
    body: "Most growing companies never wrote either one down properly. The brand lives in a founder's head. The design system is whatever the last three designers left behind. Every new hire fills in the gaps differently, and now AI tools are filling them in too. Each guess drifts a little further from who you are.",
    items: [
      {
        icon: "file-text",
        title: "Brand guidance trapped in PDFs and presentations",
        body: "Guidelines live in documents no one opens, distributed via Slack, and out of date by the time they're shared.",
      },
      {
        icon: "layers",
        title: "Product decisions scattered across Figma, Storybook, and code",
        body: "Design tokens, component decisions, and usage rules live in three places — and rarely agree.",
      },
      {
        icon: "bot",
        title: "AI tools generating work without the right context",
        body: "Copilot, Claude, and Midjourney don't know your brand voice, your tokens, or what's approved. They guess.",
      },
      {
        icon: "zap",
        title: "Systems drifting as the company grows",
        body: "What started as a consistent brand becomes a collection of regional variations, past-version components, and undocumented exceptions.",
      },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },

  howItWorks: {
    tag: "How Keel works",
    headline: "From what you have to a system that works.",
    plannedLabel: "Planned",
    steps: [
      {
        number: "01",
        title: "Start with what you have",
        body: "A website is enough. Brand files help. Figma libraries and codebases will too, once those connections open up",
        sources: [
          { label: "Website", icon: "globe", planned: false },
          { label: "Brand files", icon: "file-text", planned: false },
          { label: "Figma library", icon: "layers", planned: true },
          { label: "Code repository", icon: "git-branch", planned: true },
        ] satisfies { label: string; icon: IconName; planned: boolean }[],
      },
      {
        number: "02",
        title: "Keel drafts both sides",
        body: "Your brand guide covers your story, voice, logos, color and type. Your design foundations cover color tokens, type scale, spacing and the core components Keel finds in your live product.",
      },
      {
        number: "03",
        title: "You approve",
        body: "Every finding shows where it came from, and every change Keel suggests waits for your yes.",
      },
      {
        number: "04",
        title: "Everyone works from it",
        body: "One live guide for people, and structured, approved context for AI tools.",
      },
    ],
  },

  product: {
    tag: "The product",
    headline: "One system. Three surfaces.",
    tabsLabel: "Product surfaces",
    tabs: [
      {
        id: "living-guide",
        label: "Living guide",
        description:
          "A polished, shareable site containing current brand and product guidance.",
      },
      {
        id: "workspace",
        label: "Workspace",
        description:
          "The private place where owners review content, manage assets, and update the system.",
      },
      {
        id: "assistant",
        label: "Assistant",
        description:
          "An AI collaborator that understands the system, answers questions, identifies gaps, and proposes changes.",
      },
    ],
    livingGuide: {
      title: "Raft Design Brand Guide",
      nav: ["Our brand", "Voice", "Visual identity", "Assets"],
      askLabel: "Ask the brand",
      heading: "Raft Design",
      body: "We design software experiences for founders, growth teams, and established companies.",
      cards: [
        {
          label: "Who we are",
          text: "At the intersection of product design and strategy.",
        },
        {
          label: "Who we serve",
          text: "Founders and growth-stage product teams.",
        },
        {
          label: "Brand character",
          text: "Adaptable. Experienced. Forward-looking.",
        },
      ],
    },
    workspace: {
      title: "Brand workspace",
      liveLabel: "Live",
      publishLabel: "Publish changes",
      cards: [
        {
          title: "Brand foundation",
          status: "Ready",
          tone: "ready",
          detail:
            "We design software experiences for founders and growth teams...",
          mono: false,
        },
        {
          title: "Visual identity",
          status: "Ready",
          tone: "ready",
          detail: "#171717, #22c55e, #737373 · Geist Semibold + Regular",
          mono: true,
        },
        {
          title: "Voice",
          status: "Needs review",
          tone: "review",
          detail: "Clear, direct, and human. Avoids jargon.",
          mono: false,
        },
        {
          title: "Assets",
          status: "Missing",
          tone: "missing",
          detail: "raft-logo-primary.svg",
          mono: true,
        },
      ] satisfies {
        title: string
        status: string
        tone: "ready" | "review" | "missing"
        detail: string
        mono: boolean
      }[],
    },
    assistant: {
      title: "Brand assistant",
      subtitle: "— Raft Design",
      messages: [
        {
          from: "user",
          text: "Which logo should I use for a dark background presentation?",
        },
        {
          from: "assistant",
          text: "Use raft-logo-dark.svg. It's in your Assets section, labeled 'Dark background'.",
        },
        {
          from: "user",
          text: "Can you write a one-paragraph company description in our voice?",
        },
        {
          from: "assistant",
          text: "Raft Design works at the intersection of product design and strategy — building software experiences that feel considered, from first concept to shipped product.",
        },
      ] satisfies { from: "user" | "assistant"; text: string }[],
      inputPlaceholder: "Ask anything about the brand…",
    },
  },

  bothSides: {
    tag: "For every team",
    headline: "One system. Both sides of the company.",
    brand: {
      icon: "palette",
      title: "Brand and marketing",
      items: [
        "Brand foundation",
        "Voice and messaging",
        "Logos and visual assets",
        "Colors and typography",
        "Instructions for creative AI tools",
      ],
    },
    center: ["One company.", "One system.", "Shared context."],
    product: {
      icon: "code",
      title: "Product and engineering",
      items: [
        "Design foundations",
        "Tokens and components",
        "Usage guidance",
        "Figma and code references",
        "Instructions for coding agents",
      ],
    },
  },

  largerIdea: {
    tag: "The larger idea",
    headline: "Designed for people. Structured for AI.",
    body: "A PDF brand book and a design-system wiki can be read, but they can't be used. Keel keeps your brand and product decisions as approved, structured information, so the tools doing the work can follow them and your team stays in charge of what's true.",
    examples: [
      {
        icon: "users",
        title: "Marketing",
        body: "A marketer asks Claude to create an on-brand campaign brief using the approved voice and visual guidelines.",
      },
      {
        icon: "palette",
        title: "Design",
        body: "A designer checks which component or visual pattern to use before starting a new screen.",
      },
      {
        icon: "code",
        title: "Engineering",
        body: "A coding agent like Claude Code or Codex builds with your approved tokens instead of inventing new ones.",
      },
      {
        icon: "building",
        title: "Partners",
        body: "A partner downloads the right logo without emailing anyone.",
      },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },

  founder: {
    tag: "Who's building this",
    headline: "Built by someone who's designed both sides.",
    body: "I'm Lance Shields, founder of Raft Design. I've led design at Adobe and Walmart, where our work reached 580 million visitors a month, and I've built brand and design systems for startups in the U.S. and Japan. The same problem shows up everywhere: brand and product drift apart, and nobody has time to hold them together. Keel is built to do that for you.",
    name: "Lance Shields",
    role: "Founder, Raft Design · Building Keel",
    photo: {
      src: "/teaser/founder-lance-shields.webp",
      alt: "Portrait of Lance Shields, founder of Raft Design.",
    },
    // Figma shows the button with no destination. This address is inferred
    // from the Raft Design site named in the hero mockup; confirm it.
    cta: {
      label: "Learn about Raft Design",
      href: "https://raftdesign.studio",
    },
  },

  waitlist: {
    title: "Reserve your spot",
    intro:
      "We're building with a small group of early teams. Tell us a bit about your situation.",
    fields: {
      email: { label: "Work email", placeholder: "you@company.com" },
      company: { label: "Company", placeholder: "Acme Inc." },
      role: { label: "Your role", placeholder: "Head of Design" },
      website: { label: "Website", placeholder: "acme.com" },
      need: {
        label: "Which do you need most?",
        options: ["Brand system", "Product design system", "Both"],
      },
      details: {
        label: "Where does your brand or design system live today?",
        optional: "(optional)",
        placeholder:
          "Figma, Notion, a PDF, or nowhere yet — all useful to know.",
      },
    },
    submit: "Join the private beta",
    sending: "Sending…",
    reassurance: "No spam. We'll reach out personally before access opens.",
    errors: {
      email: "Enter a valid work email.",
      company: "Enter your company name.",
      website: "Enter a website like acme.com.",
      submit: "Something went wrong sending that. Please try again.",
    },
    retry: "Try again",
    unavailable: "Signups open soon.",
    success: "Thank you! We'll be in touch shortly.",
  },

  footer: {
    logoAlt: "Keel",
    byPrefix: "By ",
    company: "Raft Design",
    companyHref: "https://raftdesign.studio",
    suffix: " · Pre-release",
    copyright: "© 2026 Raft Design. All rights reserved.",
  },
}

export type Teaser = typeof teaser
