# 0001: Record consequential decisions

**Status:** Accepted

## Context

Lance is a solo, non-engineer founder directing this build across many
sessions with an AI coding assistant. Decisions made in one session (why
Supabase over something else, why a particular data shape) need to survive
into every future session without Lance having to remember or re-explain the
reasoning, and without a new session silently reversing something that was
already decided for a reason.

## Decision

Every consequential technical decision gets a short Markdown file in
`docs/decisions/`, numbered sequentially (`0001-`, `0002-`, ...), using this
template:

```md
# NNNN: Title

**Status:** Proposed | Accepted | Superseded by NNNN

## Context

What situation made a decision necessary. What constraints applied.

## Decision

What was decided, stated plainly.

## Alternatives considered

What else was on the table, and why it wasn't chosen.

## Consequences

What this makes easier, what it makes harder, and what it forecloses.
```

"Consequential" means: anything that would be expensive or awkward to
reverse later (a service choice, a data shape, a security boundary), or
anything Lance explicitly asked to have recorded. Routine implementation
choices (which lodash-equivalent helper to use, variable names) don't need
one.

## Alternatives considered

- **Just rely on `docs/progress.md`.** Progress notes are a log of what
  happened; they're not a good place to look up _why_ a specific choice was
  made without reading through unrelated history.
- **No formal record, just explain in each session's summary.** That
  information doesn't outlive the session it was given in.

## Consequences

Every future session (per `CLAUDE.md`) reads `docs/progress.md`, which
points into this folder — so a decision made in Milestone 0 stays visible
and binding in Milestone 6 without Lance having to repeat it.
