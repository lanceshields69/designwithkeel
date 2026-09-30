# 0002: Application stack

**Status:** Accepted

## Context

Milestone 0 needs a concrete, deployable application shell. The product
brief's "Initial technical direction to evaluate" section proposed Next.js,
TypeScript, Tailwind, shadcn/ui and Vercel as a starting point, explicitly
inviting changes if a simpler or safer option existed for this stage.

## Decision

- **Next.js** (App Router, current stable — 16.x at the time of this
  milestone) with **TypeScript** in strict mode.
- **pnpm** as the package manager.
- **Tailwind CSS v4** (installed via shadcn's own scaffold, which defaults
  to v4 for a fresh Next.js project — see Milestone 0's summary for the
  exact versions).
- **shadcn/ui**, initialized from Lance's own preset (`b2oWHw3we`), which
  fixes the style, base component library (Base UI, not Radix), icon
  library (Lucide) and fonts (Geist / Geist Mono). Not re-chosen here.
- **Vercel** for hosting, connected by Lance directly (not through any CLI
  login or deploy command run by Claude Code).

None of this is a change from the brief's proposed direction — it's
confirmed as-is, because nothing about building the placeholder shell gave a
reason to deviate.

## Alternatives considered

Not seriously evaluated at this stage: the brief's direction is common,
well-supported, and appropriate for a solo founder who needs to move fast
without taking on infrastructure they'd have to operate themselves. A real
alternatives review makes more sense once there's an actual feature (the
website scan, the AI generation step) to design against, not for the
placeholder shell.

## Consequences

- Committing to shadcn's preset now means the _style itself_ (spacing
  scale, corner radii, base component behavior) is locked in early; only the
  color/typography _values_ change in the next milestone, per the brief's
  own scoping (custom design tokens are explicitly out of scope for M0).
- Base UI (not Radix) as the underlying primitive library is a real,
  slightly less common choice worth remembering if a future session reaches
  for Radix-specific documentation or examples — they won't apply directly.
