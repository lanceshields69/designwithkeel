# Progress

This file tracks milestone status for the Keel build, following the milestone
plan in [product-brief.md](./product-brief.md#suggested-build-milestones).

## Milestone status

| Milestone | Name                                 | Status      |
| --------- | ------------------------------------ | ----------- |
| M0        | Repository and working agreement     | Done        |
| M1        | Clickable application shell          | Not started |
| M2        | Authentication and brand persistence | Not started |
| M3        | Website scanning job                 | Not started |
| M4        | Structured AI generation             | Not started |
| M5        | Owner assistant and proposed changes | Not started |
| M6        | Assets                               | Not started |
| M7        | Publish and public guide             | Not started |
| M8        | Public assistant and beta hardening  | Not started |

## M0: Repository and working agreement

**Status:** Done, pending approval.

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

- None blocking. The queued next piece of work (teaser page + design-system component updates
  from Figma) is scoped separately and has not been started.
