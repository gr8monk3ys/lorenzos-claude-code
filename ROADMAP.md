# Roadmap

Concrete, near-term work for `lorenzos-claude-code`. Items here are scoped, not aspirational.

## v4.x

- **Supabase RLS policy scaffolder** (`/rls-new`) — generate Row Level Security policies from a description, with tests.
- **Server Action scaffolder** (`/action-new`) — Next.js 15 server actions with Zod input validation.
- **Augment skill-rules with negative patterns** — add `excludePatterns` so e.g. `circuit` in a Supabase function name doesn't trigger debugging skills.

## Maybe later

- Replace the hand-rolled YAML parser in `scripts/lib/manifest.js` with a real dependency once we hit a frontmatter case it can't handle.
- Drop `tests/run-all.js` once `tests/manifest-sync.test.js` covers the same surface.
- Add `marketplace.json` to the sync-manifest pipeline so its counts stay in sync automatically.

## Done

See [CHANGELOG.md](CHANGELOG.md).
