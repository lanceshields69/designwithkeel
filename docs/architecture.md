# Architecture

**Status: Proposed**

This is a draft direction, not a set of decisions locked in yet. It will be
revised as later milestones are built and as real constraints (cost,
reliability, what Supabase/Vercel actually make easy or hard) become clear.
Individual consequential choices get their own record in `docs/decisions/`.

- **Product:** Keel creates and maintains a company's brand guide and design
  system in one connected system. The first release focuses on the brand
  guide. The design system follows.

- **Web app:** Next.js with TypeScript on Vercel. One codebase for the splash
  page, private workspace, public guide and API routes.
- **Data, auth, files:** Supabase Postgres, Supabase Auth and Supabase
  Storage. Row Level Security isolates each account's data.
- **Design system:** Keel's UI is built on shadcn/ui, themed through
  shadcn's CSS variables with values from Figma Variables. Details in
  `DESIGN.md` (created in the next milestone).
- **Brand record:** one structured record per brand, validated by a single
  Zod schema that is shared by the database layer, the AI generation step,
  the editor and the public guide.
- **Publishing:** publishing creates an immutable snapshot of approved
  sections. The public guide and public assistant read only from snapshots,
  never from drafts. Public assets are copied into a separate public storage
  location at publish time.
- **Background jobs:** scanning and generation run in a durable job service
  with retries and step-level progress, not in a single web request. Service
  choice pending (see decisions).
- **Website extraction:** a hosted extraction service renders pages and
  returns content and brand signals. We do not operate our own crawler or
  headless browser.
- **AI:** Anthropic models behind a thin provider layer. Generation returns
  schema-validated structured output. The owner assistant can only propose
  changes. The server applies an approved proposal after checking it against
  the current record version.
- **Cost and abuse controls:** per-IP and global limits on anonymous scans
  and public assistant use, a usage table recording every model call, and an
  environment kill switch for expensive features.
- **Observability:** error monitoring and product analytics added in a later
  milestone. Model usage is tracked in our own database from the first AI
  milestone.
