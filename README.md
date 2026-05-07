# Lorenzo's Claude Code Plugin

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)

**Stack-focused Claude Code plugin for Next.js + React + Supabase.**

Scaffolds components, API routes, hooks, Supabase types, and Edge Functions. Composes with [superpowers](https://github.com/obra/superpowers) — install both for the full toolkit.

<!-- AUTOGEN:counts -->
**14 commands** · **6 agents** · **3 skills** · **14 hooks**
<!-- /AUTOGEN:counts -->

---

## Pairs with superpowers

This plugin focuses on **stack-specific scaffolding**. Process discipline (TDD, debugging, planning, code review workflows) lives in [superpowers](https://github.com/obra/superpowers). The two compose:

- **superpowers** handles *how* to work — brainstorming, writing plans, executing them, debugging, verifying.
- **lorenzos-claude-code** handles *what* to build — concrete Next.js / React / Supabase scaffolds.
- The `skill-activator` hook (in this plugin) scores incoming prompts across keywords, patterns, file paths, directories, and intents, then routes to the right skill — whether that skill lives in this plugin or in superpowers.

---

## Install

```bash
npm install -g @gr8monk3ys/claude-code-plugin
lcc install
lcc doctor
```

Or, from inside Claude Code:

```text
/plugin marketplace add https://github.com/gr8monk3ys/lorenzos-claude-code
/plugin install lorenzos-claude-code
```

---

## Commands

<!-- AUTOGEN:commands -->
| Name | Description |
| --- | --- |
| `/api-new` | Create a new Next.js API route with validation, error handling, and TypeScript |
| `/api-test` | Test API endpoints with automated test generation |
| `/automerge` | PR automation - validate, merge, cleanup, and sync |
| `/component-new` | Create a new React component with TypeScript and modern best practices |
| `/deploy` | Generate deployment configurations and workflows |
| `/edge-function-new` | Create a new Supabase Edge Function with Deno |
| `/fixissue` | End-to-end issue resolution - fetch, branch, fix, test, commit, PR, close |
| `/hook-new` | Create custom React hooks with TypeScript and best practices |
| `/lint` | Run linting and fix code quality issues |
| `/page-new` | Create a new Next.js page with App Router best practices |
| `/review` | RIPER Review Phase - Quality gates before considering work complete |
| `/test-new` | Generate test files for Jest, Vitest, or Playwright |
| `/types-gen` | Generate TypeScript types from Supabase database schema |
| `/verify` | Run comprehensive 6-phase verification loop (build, types, lint, tests, security, diff) |
<!-- /AUTOGEN:commands -->

## Agents

<!-- AUTOGEN:agents -->
| Name | Description |
| --- | --- |
| `backend-architect` | Design reliable backend systems with focus on data integrity, security, and fault tolerance |
| `build-error-resolver` | Use when fixing TypeScript errors, build failures, compilation issues, type mismatches, or "tsc --noEmit" errors. Activates on build failures, type errors, or compilation problems requiring quick minimal fixes. |
| `code-reviewer` | Use this agent when reviewing code for quality, performing PR reviews, or analyzing code for security vulnerabilities, performance issues, or style problems. Activates on code review requests or quality assessments. |
| `devops-engineer` | Design CI/CD pipelines, infrastructure as code, and deployment strategies for reliable software delivery |
| `frontend-architect` | Create accessible, performant user interfaces with focus on user experience and modern frameworks |
| `test-strategist` | Use this agent when planning test strategies, analyzing test coverage, or designing comprehensive testing approaches. Activates on test planning, coverage analysis, or when asking about what to test. |
<!-- /AUTOGEN:agents -->

## Skills

<!-- AUTOGEN:skills -->
| Name | Description |
| --- | --- |
| `api-development` | WHEN to auto-invoke: Creating API routes, building endpoints, adding route.ts files, implementing REST/GraphQL APIs, adding authentication to APIs, rate limiting, API validation with Zod, handling HTTP methods (GET/POST/PUT/DELETE). |
| `database-operations` | WHEN to auto-invoke: Database schema design, creating migrations, writing SQL queries, query optimization, Supabase operations, Prisma/Drizzle schema changes, PostgreSQL tasks, RLS policies, indexes. |
| `frontend-development` | WHEN to auto-invoke: Creating UI components, building React/Vue/Svelte components, Next.js pages, styling with Tailwind/CSS, state management setup, form handling, accessibility improvements, client-side interactivity. |
<!-- /AUTOGEN:skills -->

## Hooks

<!-- AUTOGEN:hooks -->
| Name | Description |
| --- | --- |
| `auto-format` |  |
| `block-sensitive-files` |  |
| `notify-completion` |  |
| `permission-request` |  |
| `post-tool-failure` |  |
| `pre-compact` |  |
| `session-end` |  |
| `session-start` |  |
| `setup` |  |
| `skill-activator` |  |
| `status-line` |  |
| `subagent-start` |  |
| `subagent-stop` |  |
| `validate-json` |  |
<!-- /AUTOGEN:hooks -->

## MCP Servers

| Server | Purpose |
| --- | --- |
| `context7` | Library documentation lookup |
| `memory` | Cross-session memory |
| `playwright` | Browser automation |
| `github` | PRs, issues, repository operations |

---

## Skill auto-routing

The `skill-activator` hook scores prompts across five dimensions with weighted confidence:

| Dimension | Weight |
| --- | --- |
| Keywords | 2 |
| Patterns | 3 |
| File paths | 4 |
| Directories | 5 |
| Intents | 4 |

At ≥8 points the matching skill is auto-activated; at ≥5 points it is suggested. Rules live in `.claude/hooks/skill-rules.json`. The activator surfaces both this plugin's stack skills and any superpowers skills that match — one routing layer for the whole toolkit.

---

## Requirements

- Claude Code 2.0.13+
- Node.js 18+

## License

GPL-3.0 — see [LICENSE](LICENSE).

## Contributing

See [ROADMAP.md](ROADMAP.md) for upcoming work.
