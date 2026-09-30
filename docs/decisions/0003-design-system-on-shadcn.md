# 0003: Design system is shadcn's variables set to Keel's values

**Status:** Accepted

## Context

Keel needs a design system that the marketing teaser uses now and the full
product uses later, kept in step with Figma. The project already runs on
shadcn/ui (Base UI, `base-vega` preset) with Tailwind v4. shadcn components
read a fixed set of CSS variables (`--background`, `--primary`, `--radius`,
...). The Figma file uses the shadcn kit, whose variable collections map
one-to-one onto those names.

## Decision

Keel's design system **is** shadcn's variable system, set to Keel's values.
Values live in `src/styles/tokens.css` (OKLCH, with the Figma hex in a
comment) and are connected to Tailwind in `src/app/globals.css`. There is no
parallel token layer. Components are customized only through those variables
and through approved variants. `pnpm check:tokens` blocks raw colors in UI
code. `DESIGN.md` documents the mapping.

**Primary is brand/700 (`#15803d`), not brand/600 (`#16a34a`).** White text on
700 is 5.0:1 (passes WCAG AA for normal text); on 600 it is 3.3:1 (fails).
The Figma file may still resolve primary to 600 in some places. The code
follows 700. Secondary is brand/200 with brand/800 text.

Other contrast-driven differences from Figma: the focus ring is brand/700
(Figma's neutral/300 is 1.5:1), form field borders are neutral/500
(Figma's neutral/200 is 1.3:1), and step numerals use muted-foreground.

## Alternatives considered

- **A separate token layer (for example a `--keel-*` set) that maps onto
  shadcn.** More indirection to maintain, and two places to change a color.
- **Editing each component's classes to Keel's look.** Fast at first, but
  the look drifts per page and future shadcn updates get harder to take.
- **Following Figma exactly for primary (brand/600).** Fails contrast for
  every primary button.

## Consequences

Changing a token restyles every component at once, and updating shadcn
components stays straightforward. Everything the design needs beyond stock
must be a variant (approved first), which keeps the system small but means
some pages need a short review step. Chart colors are still shadcn's green
defaults because the Figma kit does not define them.
