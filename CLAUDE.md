# CLAUDE.md

Project memory for Claude when working in this repository.

## What this is

A Claude Code plugin that scaffolds Next.js + React + Supabase code, distributed via npm (`@gr8monk3ys/claude-code-plugin`) and the Claude Code plugin marketplace. Designed to compose with the [superpowers](https://github.com/obra/superpowers) plugin — superpowers handles process, this plugin handles stack-specific scaffolding.

<!-- AUTOGEN:counts -->
**14 commands** · **6 agents** · **3 skills** · **14 hooks**
<!-- /AUTOGEN:counts -->

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

## Code standards

- TypeScript strict mode, no `any`
- Zod for runtime validation at boundaries
- Error format: `{ data, success: true }` or `{ error, success: false }`
- 2-space indent, single quotes, no semicolons
- Comments only for non-obvious WHY; no commented-out code

## Directory map

```
.claude-plugin/plugin.json     # Generated — DO NOT hand-edit
.claude/commands/              # Slash commands (.md with frontmatter)
.claude/agents/                # Subagent personas (.md with frontmatter)
.claude/skills/                # Auto-activated skills (.md with frontmatter)
.claude/hooks/                 # Lifecycle hooks (.js scripts + hooks.json + skill-rules.json)
.claude/scripts/               # Plugin-internal helpers
scripts/sync-manifest.js       # Regenerates plugin.json + AUTOGEN blocks
scripts/lib/manifest.js        # Pure helpers used by sync-manifest
tests/manifest-sync.test.js    # node:test unit tests for sync logic
tests/run-all.js               # Integration smoke tests
bin/cli.js                     # `lorenzo-claude` / `lcc` CLI installer
```

## Workflow

- Edit commands/agents/skills as `.md` files; the manifest regenerates automatically (`npm run sync`).
- `npm run sync:check` is wired into pre-commit and CI — drift fails the build.
- See [ROADMAP.md](ROADMAP.md) for upcoming work.
