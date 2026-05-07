# lorenzos-claude-code v4.0.0 — Rescope to Stack Scaffolding

**Date:** 2026-05-07
**Author:** Lorenzo (with Claude)
**Status:** Approved for implementation planning

## Goal

Reposition the plugin from a general-purpose "beat-the-competition" toolkit into a focused **Next.js + React + Supabase scaffolding plugin** that composes with [superpowers](https://github.com/obra/superpowers). Fix the documentation/manifest drift that has accumulated since v3.0.0 and prevent it from recurring. Actually publish to npm so the README's install instructions become true.

## Why

Three problems compound:

1. **Inflated and dated pitch.** The README's headline "innovations" — `circuit-breaker`, `verification-first`, `micro-tasking` — now have direct counterparts in the official superpowers skill system (`systematic-debugging`, `verification-before-completion`, `executing-plans`). The "vs. competition" framing no longer holds.
2. **Five sources of truth, all disagreeing.** `package.json` says v3.2.0 / 18 commands, `plugin.json` says v3.0.0 / 15 commands, `CLAUDE.md` says 21 commands / 15 hooks, `README.md` says 18 commands / 9 hooks, `TODO.md` is stuck at v1.17.0. Disk has 21 commands, 6 agents, 10 skills, 15 hooks. Nothing prevents this drift.
3. **A published-package promise that isn't real.** `@gr8monk3ys/claude-code-plugin` returns 404 on npm. The README, badges, and CLI all assume it exists.

## Non-goals

- Adding new functionality. This release is purely subtractive + cleanup.
- Migrating users away from this plugin (we want to keep it useful, not deprecate it).
- Replacing or competing with superpowers — we explicitly compose with it.

## Target end state

| Component | v3 today (on disk) | v4 target | Delta |
|---|---|---|---|
| Commands | 21 | 14 | −7 |
| Agents | 6 | 6 | 0 |
| Skills | 10 | 3 | −7 |
| Hooks | 15 | 14 | −1 |
| MCP servers | 4 | 4 | 0 |
| Manifest sources of truth | 5 (drifted) | 1 (filesystem, generated) | −4 |
| npm package | promised but unpublished | published `4.0.0` | published |

## Scope

### Keep — the new core

**Commands (14):**

| Category | Commands |
|---|---|
| UI scaffolders | `/component-new`, `/page-new`, `/hook-new` |
| API scaffolders | `/api-new`, `/api-test`, `/test-new` |
| Supabase | `/types-gen`, `/edge-function-new` |
| Quality gates | `/verify`, `/lint`, `/review`, `/deploy` |
| Stack-flavored workflow | `/automerge`, `/fixissue` |

**Agents (6):** `code-reviewer`, `backend-architect`, `frontend-architect`, `build-error-resolver`, `test-strategist`, `devops-engineer` — all unchanged.

**Skills (3):** `api-development`, `frontend-development`, `database-operations` — the genuinely stack-tuned ones.

**Hooks (14):** all current hooks except `circuit-breaker.js`. The `skill-activator.js` hook (5-dimensional scoring) is featured as the unique routing layer between this plugin and superpowers — the one piece of "superpower" tooling that survives because it's genuinely novel.

**MCP servers (4):** `context7`, `memory`, `playwright`, `github` — unchanged.

### Drop — overlaps with superpowers / built-ins

| Type | Items | Replaced by |
|---|---|---|
| Skills | `circuit-breaker`, `verification-first`, `micro-tasking`, `memory-persistence`, `code-quality`, `continuous-learning`, `research` | superpowers `systematic-debugging`, `verification-before-completion`, `executing-plans`, `requesting-code-review`, plus Claude Code's auto-memory |
| Commands | `/plan`, `/research`, `/learn`, `/evolve`, `/pickup`, `/handoff`, `/memory` | superpowers `brainstorming`, `writing-plans`, `learn`, `evolve` skills + built-in memory |
| Hook | `circuit-breaker.js` | superpowers `systematic-debugging` |
| File | `.claude/TODO.md` | New `ROADMAP.md` |

### Defer

- New stack-specific commands (e.g., RLS policy scaffolding, server-action scaffolding). Track in `ROADMAP.md`, ship after v4.0.0 lands.
- Removing the `tests/` directory in favor of one driven by `scripts/sync-manifest.js`. Likely natural follow-up but not blocking.

## Design

### Architecture: filesystem is truth, manifest is generated

The root cause of the drift is that `plugin.json`, `README.md`, `CLAUDE.md`, and `package.json` are all hand-edited copies of the same information. The fix is to make the filesystem authoritative and generate everything else.

```
.claude/{commands,agents,skills,hooks}/*.md  ← source of truth (frontmatter + file presence)
            │
            ▼
    scripts/sync-manifest.js
            │
            ├──► plugin.json            (declared arrays)
            ├──► README.md              (between AUTOGEN markers)
            ├──► CLAUDE.md              (between AUTOGEN markers)
            └──► package.json           (description count strings)
```

**Frontmatter contract.** Each `.md` under `.claude/` already has YAML frontmatter with `description`. The script reads `name` (or filename) and `description` from frontmatter — no per-file maintenance in `plugin.json`.

**Marker comments** in `README.md` / `CLAUDE.md` look like:

```markdown
<!-- AUTOGEN:commands -->
| Command | Description |
| --- | --- |
| ... rendered table ... |
<!-- /AUTOGEN:commands -->
```

The script regenerates the content between markers. Anything outside markers is hand-written prose.

**Drift prevention.** The script has a `--check` mode that exits non-zero if files would change. Wired into:

- `package.json` `prepublishOnly` (already a hook for `npm publish`)
- `.pre-commit-config.yaml` (block local commits)
- A new step in `.github/workflows/ci.yml` (block PRs)

### Versioning: single source of truth

`package.json` is canonical. `plugin.json` either reads `version` from `package.json` at runtime, or `sync-manifest.js` writes it. v4.0.0 is the rescope release.

### Publishing: make the README true

Either publish to npm or remove the npm install instructions. We chose to publish.

- Verify `@gr8monk3ys` scope ownership: `npm whoami && npm access list packages`. If unowned, choose between (a) registering the scope, (b) renaming to a free scope, or (c) unscoped name.
- First publish: `npm publish --access public` from a clean tag. Subsequent publishes go through `org-release-please.yml`.
- Smoke test: in a fresh shell, `npm install -g @gr8monk3ys/claude-code-plugin && lcc install && lcc doctor`. All must pass.

### Documentation rewrite

**README.md** — full rewrite of the pitch:

- New tagline: "Stack-focused Claude Code plugin for Next.js + React + Supabase. Composes with superpowers."
- Drop the "Why This Plugin?" comparison table — it's a competitor takedown that no longer reflects reality.
- Drop the "Innovative Features" section — those innovations now live in superpowers.
- Add a "Pairs with superpowers" section explaining the composition: this plugin scaffolds, superpowers handles process discipline (TDD, debugging, planning).
- Keep the autogenerated command/agent/skill/hook tables.
- Keep the CLI section, but only after we've actually published.

**CLAUDE.md** — slim it. Currently duplicates README. Reduce to: one paragraph on what the codebase is, the autogenerated tables, the code standards block, the directory map. Drop everything that is user-facing pitch.

**TODO.md** — delete. Replace with a short `ROADMAP.md` (3-5 concrete next items, no historical revision tracking).

**CHANGELOG.md** — add v4.0.0 entry following the existing v3.0.0 template (Before/After table, Removed sections, Why section).

### Skill-activator becomes the headline

The README's new differentiation paragraph is single-purpose: when both this plugin and superpowers are installed, the `skill-activator` hook (existing, untouched) scores incoming prompts across keywords/patterns/file paths/directories/intents and surfaces the right skill — whether it lives in this plugin or in superpowers. That's the genuine "this plugin adds something" pitch, and it's true today.

## Implementation phases

Each phase ships independently green.

### Phase 1 — Manifest sync infra (foundation)

- Build `scripts/sync-manifest.js` (read frontmatter, write plugin.json + README/CLAUDE between markers, support `--check`)
- Wire `--check` into `prepublishOnly`, `.pre-commit-config.yaml`, and `.github/workflows/ci.yml`
- Add `tests/manifest-sync.test.js` covering: round-trip, frontmatter parsing, marker boundaries, missing-file detection
- After this phase, `plugin.json` reflects today's 21/6/10/15 reality. No content change yet — just plumbing.

### Phase 2 — The rescope cut (breaking change)

- Delete:
  - `.claude/skills/{circuit-breaker,verification-first,micro-tasking,memory-persistence,code-quality,continuous-learning,research}.md`
  - `.claude/commands/planning/plan.md`, `workflow/{research,learn,evolve,pickup,handoff}.md`, `context/memory.md`
  - `.claude/hooks/circuit-breaker.js`
- Edit `.claude/hooks/skill-rules.json` to remove rules pointing at deleted skills
- Edit `.claude/hooks/hooks.json` to drop the circuit-breaker hook entry
- Edit `.claude/settings.json` if it references deleted items
- Run `node scripts/sync-manifest.js` — `plugin.json` auto-trims to 14/6/3/14

### Phase 3 — Docs rewrite

- Rewrite `README.md` per the design above
- Slim `CLAUDE.md`
- Delete `.claude/TODO.md`, add `ROADMAP.md`
- Add `CHANGELOG.md` v4.0.0 entry
- Update `package.json` description string (or let sync script do it)

### Phase 4 — Publishing

- Bump `package.json` version to `4.0.0`; let sync script propagate
- Confirm npm scope ownership; resolve naming if needed
- `npm publish --access public` from a clean release commit
- Wire `org-release-please.yml` to publish on tag for future releases
- Smoke test: fresh global install, `lcc install`, `lcc doctor`

### Phase 5 — Marketplace verification

- `/plugin marketplace add` from a fresh Claude Code session
- Confirm `skill-activator` correctly routes prompts to both this plugin's skills and superpowers' skills when both are installed
- Confirm all 14 commands appear in `/plugin` listing
- Note any post-install fixes in `CHANGELOG.md` as 4.0.1

## Risks

- **npm scope unavailable.** `@gr8monk3ys` might not be owned. Mitigation: confirm in Phase 4 step 1; pivot to alternative name if needed (`@gr8monk3ys-dev`, unscoped `lorenzos-claude-code`).
- **plugin.json schema strictness.** Claude Code's plugin loader might require specific fields the sync script doesn't currently emit. Mitigation: validate against the loader schema in `scripts/sync-manifest.js`; add a smoke-test step that loads the plugin in CI.
- **Marker comments stripped by markdown linters.** `.markdownlint.json` exists in this repo. Mitigation: configure the linter to preserve HTML comments; verify in Phase 1 tests.
- **Existing users on v3.x.** No external users today (0 stars, 0 issues), but if any internal use exists, the breaking-change v4.0.0 needs migration notes. Mitigation: CHANGELOG documents which deleted items have superpowers replacements; README has an upgrade section.
- **Skill-activator references deleted skills.** `skill-rules.json` currently maps prompts to the to-be-deleted skills. If we forget to update it, the activator surfaces ghosts. Mitigation: explicit grep + test in Phase 2; sync-manifest could optionally check that all rule targets exist.

## Success criteria

- `node scripts/sync-manifest.js --check` exits 0 with no diff against committed manifest, README, and CLAUDE.md
- `npm view @gr8monk3ys/claude-code-plugin version` returns `4.0.0`
- Fresh `npm install -g @gr8monk3ys/claude-code-plugin && lcc install && lcc doctor` succeeds end-to-end
- Fresh Claude Code `/plugin install` from GitHub URL surfaces all 14 commands and 3 skills
- README contains no claims that contradict files on disk (count integrity)
- README does not claim functionality that is more correctly provided by superpowers
- `TODO.md` is gone; `ROADMAP.md` exists with 3-5 concrete items

## Open questions

None blocking. To resolve during implementation:

- Exact wording of the "Pairs with superpowers" README section — settle in Phase 3
- Whether `ROADMAP.md` lives at repo root or in `docs/` — settle in Phase 3
- Whether to keep `.claude/instincts/` and `.claude/ledger/` directories (referenced by deleted skills) — audit during Phase 2
