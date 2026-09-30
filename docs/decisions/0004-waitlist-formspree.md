# 0004: Waitlist signups go to Formspree (temporary)

**Status:** Accepted (temporary)

## Context

The teaser at designwithkeel.com is a fully static page: no server actions, no
API routes for the page, no database, no authentication. It still needs to
collect early-access signups (work email, company, role, website, which side
the visitor needs most, and where their brand lives today).

## Decision

The waitlist form posts directly from the visitor's browser to a Formspree
form, using `fetch`. The address is `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. It is
public by design (it is visible in the page's JavaScript) and holds no secret.
If it is not set, the form shows "Signups open soon" instead of failing.
Formspree's `_gotcha` honeypot field is included. Submissions are validated in
the browser with a Zod schema (`src/schemas/waitlist.ts`); the website field
accepts `example.com` and is normalized to `https://example.com`.

**This is a temporary choice for the static teaser.** When the product backend
exists (Supabase, per the architecture notes), signups move into the product
database and this form is retired or repointed.

## Alternatives considered

- **A Next.js server action or API route writing to a database.** Breaks the
  "fully static, no backend" rule for the teaser and pulls the database and
  rate limiting forward before the product needs them.
- **Emailing via a service key from a serverless function.** Needs a secret and
  server code; more to secure for a page that just collects a list.
- **A hosted embed (Typeform and similar).** Harder to match the Figma design
  and to keep accessible.

## Consequences

The teaser stays static and cheap. Signup data lives in Formspree until it is
migrated, so export it before that switch. Anyone can read the endpoint from
the page source and post to it, so Formspree's own spam protection and the
honeypot are the only guards until signups move in-house. Formspree's free
plan has submission limits, so watch them if the page gets real traffic.
