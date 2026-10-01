# Progress

This file tracks milestone status for the Keel build, following the milestone
plan in [product-brief.md](./product-brief.md#suggested-build-milestones).

## Milestone status

| Milestone | Name                                    | Status                 |
| --------- | --------------------------------------- | ---------------------- |
| M0        | Repository and working agreement        | Merged                 |
| Teaser    | Design system on shadcn + static teaser | Done, pending approval |
| M1        | Clickable application shell             | Not started            |
| M2        | Authentication and brand persistence    | Not started            |
| M3        | Website scanning job                    | Not started            |
| M4        | Structured AI generation                | Not started            |
| M5        | Owner assistant and proposed changes    | Not started            |
| M6        | Assets                                  | Not started            |
| M7        | Publish and public guide                | Not started            |
| M8        | Public assistant and beta hardening     | Not started            |

## M0: Repository and working agreement

**Status:** Merged to `main` (PR #1).

### Scope delivered

- Next.js 16 (App Router) + TypeScript strict application shell, deployable as-is.
- Placeholder home page (`/`) and a health check endpoint (`/api/health`).
- Folder conventions (`src/app`, `src/components`, `src/lib`, `src/server`, `src/schemas`).
- Zod-validated environment handling (`src/env.ts`) with server/client separation and a matching `.env.example`.
- Security headers on all routes (see "Known limitations" below for what's deliberately not yet included).
- Tooling: ESLint, Prettier, Vitest + React Testing Library, Playwright.
- GitHub Actions CI running format, lint, typecheck, unit tests, build, and the Playwright smoke test.
- Documentation: this file, `architecture.md`, `product-brief.md`, two decision records, and root `CLAUDE.md`.
- Brand assets moved from `images/` to `assets/brand/`.

### Verification results

All run locally against this shell, in order:

| Check                | Command             | Result                                                |
| -------------------- | ------------------- | ----------------------------------------------------- |
| Format               | `pnpm format:check` | Pass                                                  |
| Lint                 | `pnpm lint`         | Pass                                                  |
| Typecheck            | `pnpm typecheck`    | Pass                                                  |
| Unit/component tests | `pnpm test`         | Pass (4/4)                                            |
| Combined             | `pnpm check`        | Pass                                                  |
| Production build     | `pnpm build`        | Pass (`/` static, `/api/health` dynamic, as expected) |
| E2E smoke test       | `pnpm test:e2e`     | Pass (2/2), against a real production build           |

### Known limitations / open items

- **No Content-Security-Policy yet.** The security-headers set in `next.config.ts` covers
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a conservative
  `Permissions-Policy`, but does not yet include a CSP. A CSP needs real knowledge of what
  external origins later milestones will call (Supabase, AI providers, etc.), so adding one now
  would either be too loose to matter or would need to be redone. Revisit this in the milestone
  that introduces the first external service call.
- **UI primitives are Base UI, not Radix.** The shadcn preset selected for this project
  (`base-vega`) is built on `@base-ui/react` rather than the more commonly-referenced
  `@radix-ui/*` packages. This is standard for this preset, not a deviation, but is worth
  flagging since most shadcn documentation and examples online still assume Radix.
- **Playwright runs in CI**, not just locally. It was reliable in local runs, so it was added
  to the CI workflow rather than left as a local-only check. If it becomes flaky in CI, drop it
  back to a local/manual check and note that here.
- No custom design tokens, Supabase, auth, database, file storage, AI calls, background jobs,
  rate limiting, analytics, or error monitoring — all explicitly out of scope for M0.

### Open decisions

- None blocking for M0. The teaser and design system (below) were the next piece of work.

## Teaser and design system

**Status:** Done on branch `teaser-design-system`, pending approval. Not merged, not deployed
(you connect the domain in Vercel).

### Scope delivered

- **Design system on shadcn/ui.** Keel's tokens are shadcn's variables set to Keel's Figma values
  (`src/styles/tokens.css`, OKLCH with hex comments), primary brand/700. Tailwind v4. Light only.
  Components installed: Button, Badge, Card, Tabs, Input, Label, Textarea, ToggleGroup (+Toggle),
  Separator, Carousel. Approved variants: Badge `planned` and `outline-inverse`, Button
  `outline-inverse`, Card `inverse`. Layout helpers `Container` and `Section`.
- **Enforcement.** `pnpm check:tokens` (in `pnpm check` and CI) blocks raw colors in UI code.
- **Docs.** `DESIGN.md`, decisions 0003 (design system on shadcn, primary color), 0004 (Formspree,
  temporary), 0005 (hero carousel motion).
- **Reference page** `/design-system`: built only with `SHOW_DESIGN_SYSTEM=true`, otherwise 404;
  noindex; not in the sitemap.
- **Static teaser** at `/` in `src/app/(marketing)/`: header, hero with two-slide carousel,
  problem, how it works, tabbed product mockups, both sides, larger idea, founder + waitlist
  form, footer. Prerendered at build (confirmed `○` in the build output). All copy in
  `src/content/teaser.ts`.
- **Waitlist form** posts from the browser to Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`), with
  Zod validation, honeypot, loading, error + retry, and the one-line thank-you state.
- **SEO and AI readability:** title/description/canonical/Open Graph/Twitter, JSON-LD
  (Organization, SoftwareApplication), `sitemap.xml`, `robots.txt`, `llms.txt`, favicon from
  `assets/brand/keel-favicon.svg`.
- Assets in `public/teaser/` (see its README).
- Scoped customer brand theming (showing a customer's colors inside Keel without overriding
  Keel's tokens) is **planned for the product milestones and not built yet.**

### Verification results

| Check                | Command             | Result                                                                                                                          |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Format, lint, types  | `pnpm check`        | Pass                                                                                                                            |
| Token check          | `pnpm check:tokens` | Pass                                                                                                                            |
| Unit/component tests | `pnpm test`         | Pass (38/38)                                                                                                                    |
| Production build     | `pnpm build`        | Pass; `/` static (`○`), `/design-system` 404 without the flag                                                                   |
| End-to-end + axe     | `pnpm test:e2e`     | Pass (26/26): sections, CTAs, tabs, carousel, form states, 320/768/1024/1440px, zero axe violations on `/` and `/design-system` |
| Lighthouse desktop   | production build    | Performance 99, Accessibility 100, Best Practices 100, SEO 100                                                                  |
| Lighthouse mobile    | production build    | Performance **90-92** (target 95 missed), Accessibility 100, Best Practices 100, SEO 100                                        |

### Known limitations / open items

- **Mobile Lighthouse performance is 90-92, not 95+.** The largest element on a phone is the tall
  full-bleed hero photo; tuning (image priority, font preload) did not move it. Options: a smaller
  or lighter mobile hero image, or accept.
- **Carousel has no pause control** (your decision). Auto-scrolling content over 5 seconds should
  be pausable under WCAG 2.2.2; see decision 0005.
- **Share card** is `assets/brand/ShareCard.jpg` (1200 x 627), used for Open Graph and Twitter.
- **"Learn about Raft Design" and the footer link have no destination in Figma.** The code uses
  `https://raftdesign.studio`; confirm it.
- **Dark surfaces, tag height and button size differ from Figma** where stock components differ;
  list in the session summary.
- **No Content-Security-Policy yet.** The teaser's only external call is Formspree from the
  browser; a CSP can now be scoped to it. Still open.
- **Formspree signups live in Formspree** until the product backend exists (decision 0004). Anyone
  can read the endpoint from the page source.
- `pnpm test:e2e` now builds with a fake Formspree address and `SHOW_DESIGN_SYSTEM=true`, and
  honors `PORT` so it never reuses a server that is already running on 3000.
- **Hero water is a parallax layer.** The water photo and video are fixed to the window and
  clipped to the hero, so the text scrolls over still water (`hero-water.tsx`). Checked in desktop
  Chromium only; iPhone Safari with fixed layers still needs a manual look.
