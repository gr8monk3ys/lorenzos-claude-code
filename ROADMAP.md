# Roadmap

Concrete, near-term work for `lorenzos-claude-code`. Items here are scoped, not aspirational.

## v4.x

- **Augment skill-rules with negative patterns** — add `excludePatterns` so e.g. `circuit` in a Supabase function name doesn't trigger debugging skills.
- **Surface monitors in `plugin.json`** — once the plugin manifest schema documents a `monitors` field, emit it from `buildPluginJson` (today monitors are sync-counted and tabled in the README only).

## Maybe later

- Replace the hand-rolled YAML parser in `scripts/lib/manifest.js` with a real dependency once we hit a frontmatter case it can't handle.
- Drop `tests/run-all.js` once `tests/manifest-sync.test.js` covers the same surface.
- Add `marketplace.json` to the sync-manifest pipeline so its counts stay in sync automatically.

## Done

See [CHANGELOG.md](CHANGELOG.md).
