# Keel design system

Keel's design system is **shadcn/ui's own variable system, set to Keel's
values.** There is no second token system next to it. Every shadcn component
reads variables like `--primary` and `--border`; Keel changes what those
variables are. Change a value in one place and every component follows.

- Source of truth for values: the Figma file "Keel"
  (`LSGH1UYTD1IWPKkkFjxApl`), using the shadcn kit's `theme` and
  `shadcn colors` collections.
- Where the values live in code: [`src/styles/tokens.css`](src/styles/tokens.css).
- Where they are connected to Tailwind: [`src/app/globals.css`](src/app/globals.css).
- A live reference of everything below: the `/design-system` page (see the end
  of this file).

## How it fits together

1. **Primitives** (`--primitive-*` in `tokens.css`). The raw scale steps:
   neutrals, brand green, destructive red, amber. Components never use them
   directly, and they are deliberately not registered with Tailwind, so there
   is no `bg-primitive-brand-700`.
2. **Semantic variables** (`--background`, `--primary`, `--ring`, ...). These
   point at primitives. shadcn components use only these.
3. **Tailwind mapping** (`@theme inline` in `globals.css`). Turns the semantic
   variables into classes such as `bg-primary` and `text-muted-foreground`.

Colors are written in OKLCH (what shadcn uses), with the Figma hex beside each
one in a comment. A test (`src/lib/tokens.test.ts`) converts each OKLCH value
back to hex and fails if it stops matching the comment, so the two cannot
drift apart.

**Tailwind version:** v4 (`@theme inline`, no `tailwind.config`).

**Light theme only.** The `.dark` block at the bottom of `tokens.css` is
exactly what shadcn generated. Its values are defaults, not designed for Keel,
and nothing applies the `dark` class (`theme-provider.tsx` forces light).

## Where each value came from

| Variable                                 | Value                                         | Figma source                                              |
| ---------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| `--background`, `--card`, `--popover`    | white                                         | `shadcn colors/general/*`                                 |
| `--foreground`, `--accent-foreground`    | black                                         | `shadcn colors/general/foreground`                        |
| `--primary`                              | `#15803d` (brand/700)                         | Decision, see below. Figma may still say `#16a34a` (600). |
| `--primary-foreground`                   | white                                         | `shadcn colors/general/primary foreground`                |
| `--secondary` / `--secondary-foreground` | `#f0fdf4` (brand/200) / `#166534` (brand/800) | `shadcn colors/general/secondary*`                        |
| `--muted`, `--accent`                    | `#f5f5f5`                                     | `shadcn colors/general/muted`, `accent`                   |
| `--muted-foreground`                     | `#737373`                                     | `shadcn colors/general/muted foreground`                  |
| `--destructive`                          | `#dc2626`                                     | `theme/destructive/600`                                   |
| `--border`                               | `#e5e5e5`                                     | `shadcn colors/general/border`                            |
| `--input`                                | `#737373`                                     | **Changed.** Figma is `#e5e5e5`; see "Contrast".          |
| `--ring`                                 | `#15803d`                                     | **Changed.** Figma is `#d4d4d4`; see "Contrast".          |
| `--sidebar*`                             | neutrals                                      | `shadcn colors/sidebar/*` (the design uses these a lot)   |
| `--radius`                               | 10px                                          | `radius-lg (radius)`                                      |
| `--planned*`                             | amber 50 / 700 / 200                          | `tw-raw/amber/*`, used by the "Planned" badge             |
| `--chart-1` to `--chart-5`               | shadcn preset green defaults                  | Not defined in the Figma kit. Unused by the teaser.       |

Type comes from the Figma typography collection (Geist): h1 48/48 (-1.5px),
h2 28/28 (-1px), h3 24/28 (-0.5px), h4 18/21.6, all bold; paragraph large
18/27, regular 16/24, small 14/20, mini 12/16; caption 13/20.5. Spacing and
shadows are Tailwind's defaults: Figma's spacing steps land exactly on them.
Radius follows Figma (6, 8, 10, 14, 16, 22, 26, full); the one difference from
the preset is `rounded-2xl`, 16px instead of 18px.

Layout widths: `max-w-prose` 680px, `max-w-content` 1152px (the Figma column,
including its 32px gutters), `max-w-wide` 1280px.

## The primary color

Primary is **brand/700 (`#15803d`)**, not brand/600. Reason: white text on
`#15803d` is 5.0:1 (passes AA); on `#16a34a` it is 3.3:1 (fails). Green 500
(`#22c55e`) is never used for text or button backgrounds. Recorded in
[`docs/decisions/0003-design-system-on-shadcn.md`](docs/decisions/0003-design-system-on-shadcn.md).

## Contrast rules

- Normal text: 4.5:1. Large text and UI edges (form field borders, the focus
  ring): 3:1.
- If the design asks for a color below the threshold, use the nearest step that
  passes and record it here.

Where the code differs from Figma because of this:

- **Focus ring** is brand/700 instead of neutral/300 (`#d4d4d4` is 1.5:1).
- **Form field borders** (`--input`) are neutral/500 (4.7:1) instead of
  neutral/200 (1.3:1). One-line revert in `tokens.css` if you decide otherwise.
- **Step numerals "01" to "04"** are `text-muted-foreground` instead of the
  pale `#e5e5e5` (1.25:1).
- **Destructive Button and Badge** are solid red with white text (4.8:1)
  instead of shadcn's pale red tint (4.1:1). The teaser does not use them.

Known near-miss, not used by the page: `--muted-foreground` on `--muted` is
4.35:1.

## Variants

Only these variants exist beyond stock shadcn. Each was approved.

| Component | Variant           | Use                                                       |
| --------- | ----------------- | --------------------------------------------------------- |
| Badge     | `planned`         | The amber "Planned" label.                                |
| Badge     | `outline-inverse` | Tag pills on dark surfaces.                               |
| Button    | `outline-inverse` | Outline buttons on dark surfaces (hero, carousel arrows). |
| Card      | `inverse`         | Cards on the dark "larger idea" section.                  |

Layout helpers, not a second component library:
`src/components/layout/container.tsx` (width) and `section.tsx` (vertical
rhythm and background band: `default`, `surface`, `inverse`).

Button size `xl` (48px tall, 24px side padding, 16px text) is used by the two hero
buttons, matching Figma. The tag-pill height and the tab list still use stock sizes.

Stock changes made on request: the ToggleGroup "outline" items are white when
off and black at 5% when selected or hovered, with 16px side padding (Figma
"Button combo").

Link-buttons: for a link that should look like a button, use
`<a className={buttonVariants({ ... })}>`. Base UI's `render={<a />}` on
`Button` adds `role="button"` to the anchor, which is wrong for navigation.

## Folders

- `src/components/ui/`: shadcn components. Styled only through tokens and
  variants. Never restyled per page.
- `src/components/layout/`: `Container`, `Section`.
- `src/components/marketing/`: teaser sections, built only from the two
  folders above. Copy is not here; it is in `src/content/teaser.ts`.

## How to change things

**A value** (for example a color): edit it in `src/styles/tokens.css`, keep
the hex comment, run `pnpm test`. Check `/design-system` for contrast.

**A new token:** add the primitive and a semantic variable in `tokens.css`,
then register the semantic one in the `@theme inline` block in `globals.css`.
Only add one when the design needs it. Do not add status tokens (success,
warning) until something uses them.

**A new variant:** add it to the component's `cva` list in
`src/components/ui/`, using semantic classes only, and add it to the table
above. Get approval first: a page needing a new look becomes a variant, it is
not restyled in place.

**A new component:** `pnpm dlx shadcn@latest docs <component>` first (this
project uses Base UI, not Radix), then `pnpm dlx shadcn@latest add <component>`,
then add it to `/design-system`.

**Enforcement:** `pnpm check:tokens` (part of `pnpm check` and CI) fails if
`src/components` or `src/app` contain a raw hex, `rgb(`, `hsl(`, `oklch(`, an
arbitrary color like `bg-[#22c55e]`, or a raw palette class like
`bg-green-500` or `text-white`. Raw colors live only in `src/styles`.

## Motion

Nothing is animated except: smooth scrolling for the in-page anchor buttons,
shadcn's small hover/focus transitions, and the top bar (it slides away when scrolling down and back when scrolling up) and the hero carousel (a tall guide
image waits 1.5 seconds, scrolls, holds 3 seconds, then starts over). All of it is switched off
under `prefers-reduced-motion`. See decision 0005.

## Not built yet

Scoped customer brand theming (showing a customer's colors inside Keel without
overriding Keel's own tokens) is planned for the product milestones.

## The reference page

`/design-system` shows every token (swatches, hex, contrast ratios), the type
scale, spacing, radius, shadows, and every installed component in all its
variants. It exists only when the site is built with `SHOW_DESIGN_SYSTEM=true`;
otherwise it is a 404. It is `noindex` and left out of the sitemap.

```bash
SHOW_DESIGN_SYSTEM=true pnpm build && pnpm start   # then open /design-system
# or, in development:
SHOW_DESIGN_SYSTEM=true pnpm dev
```
