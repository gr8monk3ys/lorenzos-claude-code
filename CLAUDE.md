# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin repository providing **63 slash commands**, **25 specialized AI agents**, **19 auto-activating skills**, **4 multi-agent orchestrators**, **4 MCP servers** (minimal profile, CLI-first approach), **15 hooks**, and **3 context modes** for modern web development (Next.js 15, TypeScript, React, Vue, Angular, Svelte, Supabase). Current version: **2.1.0**.

### Context Efficiency Philosophy

This plugin follows a **CLI-first approach** to minimize context overhead:
- **Minimal profile (default):** 4 MCP servers (~16K tokens, 8% of context)
- **Fullstack profile:** 10 MCP servers (~40K tokens, 20% of context)
- **Enterprise profile:** 22 MCP servers (~142K tokens, 71% of context - requires Tool Search)

Most services (Vercel, AWS, Docker, databases) are accessed via CLI instead of MCP to preserve context for actual work. See `.claude/docs/CLI-ALTERNATIVES.md` for the full guide.

## Key Files

- [.claude-plugin/plugin.json](.claude-plugin/plugin.json) - Plugin manifest (version, commands, agents, skills, orchestrators, MCP servers). **All components must be registered here.**
- `.claude/commands/` - Slash command markdown files organized by category (api/, context/, planning/, quality/, testing/, workflow/, devops/, generation/, utility/, frameworks/, supabase/, ui/)
- `.claude/agents/` - Specialized AI agent prompt files
- `.claude/skills/` - Auto-activating skill files (flat structure, 19 skills)
- `.claude/orchestrators/` - Multi-agent workflow orchestrators
- `.claude/hooks/` - Pre-configured automation hooks (15 total)
- `.claude/profiles/` - MCP server profiles (minimal, fullstack, enterprise)
- `.claude/contexts/` - Dynamic system prompts for different work modes (dev, review, research)
- `.claude/docs/` - Research and design documentation
- `.claude/plugin-settings.json` - User preference schema for framework, styling, testing, database, API style, deployment platform

## Plugin Architecture

### Command Format
Commands are markdown files with YAML frontmatter:
```yaml
---
description: Brief description
model: claude-opus-4-5  # or claude-sonnet-4-5
---
```
Use `$ARGUMENTS` placeholder in command content for user input.

### Agent Format
Agents are markdown files with YAML frontmatter:
```yaml
---
name: agent-name
description: Activation criteria (when to use this agent)
model: sonnet  # optional, defaults to opus
color: green   # optional
---
```

**Agent activation descriptions** are critical - they determine when agents automatically engage. Write clear, specific activation criteria with examples.

### Skill Format (19 skills)
Skills are auto-activating context-aware enhancements in `.claude/skills/`:
```yaml
---
name: skill-name
description: When this skill auto-activates (critical for matching)
category: api|frontend|database|devops
priority: 80  # higher = checked first (default: 50)
allowed-tools:  # optional tool restrictions
  - Read
  - Edit
triggers:  # optional activation hints
  - patterns: ["app/api/", "route.ts"]
  - keywords: ["API", "endpoint"]
---
```

**Skills by category (19 total):**
- **Development**: `api-development`, `frontend-development`, `database-operations`, `devops-automation`
- **Quality**: `code-quality`, `verification-first`, `spec-compliance`, `eval-harness`
- **Workflow**: `micro-tasking`, `root-cause-analysis`, `git-worktree`, `parallel-dispatch`
- **Session**: `memory-persistence`, `strategic-compact`, `continuous-learning`
- **Tooling**: `mcp-builder`, `skill-creator`, `webapp-testing`

Skills differ from commands: **Commands are explicit** (`/api-new`), **Skills are implicit** (auto-activate based on context).

### Context Modes (3 modes)
Dynamic system prompts that optimize Claude's behavior for different work types in `.claude/contexts/`:

- **dev.md** - Development mode: code-first, rapid iteration, pragmatic solutions
- **review.md** - Review mode: quality-focused, thorough analysis, standards enforcement
- **research.md** - Research mode: exploration, investigation, understanding

Switch modes with `/context-mode dev|review|research`.

### Orchestrator Format (4 orchestrators)
Orchestrators coordinate multi-agent workflows in `.claude/orchestrators/`:
```yaml
---
name: workflow-name
type: orchestrator
description: What this workflow accomplishes
triggers:
  - "trigger phrase 1"
  - "trigger phrase 2"
---
```

**Available orchestrators:**
- **fullstack-feature-workflow** - End-to-end feature implementation (requirements → API → frontend → tests → docs)
- **code-review-workflow** - Multi-perspective review (security, performance, quality in parallel)
- **refactoring-workflow** - Safe refactoring (analyze → plan → execute → verify)
- **parallel-build-workflow** - Concurrent development using git worktrees with multiple Claude agents

### MCP Servers (Minimal Profile - 4 servers)

Default configuration optimized for context efficiency:

| Server | Purpose | CLI Alternative |
|--------|---------|-----------------|
| **context7** | Library documentation | None (MCP required) |
| **memory** | Cross-session context | None (MCP required) |
| **playwright** | Browser automation | MCP preferred |
| **github** | PRs, issues, repos | `gh` CLI |

### MCP Profiles

Three profiles available in `.claude/profiles/`:

| Profile | Servers | Context Used | Best For |
|---------|---------|--------------|----------|
| **minimal** | 4 | 8% (~16K) | Daily development |
| **fullstack** | 10 | 20% (~40K) | Full-stack projects |
| **enterprise** | 22 | 71% (~142K) | Multi-project work |

### CLI Alternatives (Zero Context Tax)

Instead of MCP servers, use CLIs for these services:

| Service | CLI | Install |
|---------|-----|---------|
| Vercel | `vercel` | `npm i -g vercel` |
| AWS | `aws` | `brew install awscli` |
| Docker | `docker` | Built-in |
| Kubernetes | `kubectl` | `brew install kubectl` |
| PostgreSQL | `psql` | `brew install postgresql` |
| MongoDB | `mongosh` | `brew install mongosh` |
| Redis | `redis-cli` | `brew install redis` |
| Supabase | `supabase` | `brew install supabase/tap/supabase` |
| Stripe | `stripe` | `brew install stripe/stripe-cli/stripe` |
| Terraform | `terraform` | `brew install terraform` |
| GitLab | `glab` | `brew install glab` |
| Linear | `linear` | `npm i -g @linear/cli` |

See `.claude/docs/CLI-ALTERNATIVES.md` for complete documentation.

### Hooks System (12 pre-configured)
Located in `.claude/hooks/`:

**Session Management:**
- **session-start.sh** (SessionStart) - Restores previous context when sessions begin
- **session-end.sh** (Stop) - Persists session state when sessions complete
- **continuous-learning.sh** (Stop) - Analyzes sessions for learnable patterns

**Context Management:**
- **strategic-compact.sh** (PreToolUse) - Suggests compaction at natural workflow breakpoints

**Code Quality:**
- **block-sensitive-files.sh** (PreToolUse) - Prevents editing .env, credentials, keys
- **validate-json.sh** (PreToolUse) - Validates JSON syntax before write
- **auto-format.sh** (PostToolUse) - Auto-formats with Prettier/Biome/ESLint
- **typecheck.sh** (PostToolUse) - Runs TypeScript type checking
- **test-gate.sh** (PreToolUse) - Blocks git commits until tests pass

**Workflow:**
- **auto-commit.sh** (Stop) - Auto-commits changes when task completes
- **notify-completion.sh** (Stop) - Desktop notification on completion
- **skill-activator.sh** (UserPromptSubmit) - Injects skill activation hints

See [HOOKS.md](.claude/docs/HOOKS.md) for detailed hook configuration.

## Development Workflow

### Testing Locally
```bash
# Add as local marketplace and install
/plugin marketplace add /path/to/lorenzos-claude-code
/plugin install lorenzos-claude-code

# Test a command
/api-new users endpoint

# Uninstall when done
/plugin uninstall lorenzos-claude-code
```

### Validation Scripts
```bash
# Validate plugin.json syntax and paths
node scripts/validate-plugin.js

# Test command markdown files (frontmatter, placeholders)
node scripts/test-commands.js

# Test agent prompt quality
node scripts/test-agents.js

# Detect project type (framework, database, testing)
node scripts/detect-project.js
```

### Publishing
```bash
git push -u origin main
# Users install: /plugin install gr8monk3ys/lorenzos-claude-code
```

### Version Management
Update `version` in [plugin.json](.claude-plugin/plugin.json#L3):
- **x.y.Z** - Bug fixes, hook improvements, doc updates
- **x.Y.0** - New commands/agents, new MCP servers
- **X.0.0** - Breaking changes to command/agent interfaces

## Adding Commands/Agents

### New Command
1. Create `.claude/commands/<category>/<name>.md` with frontmatter and `$ARGUMENTS` placeholder
2. Add to `commands` array in [plugin.json](.claude-plugin/plugin.json):
   ```json
   { "name": "cmd-name", "path": ".claude/commands/category/cmd-name.md", "description": "..." }
   ```
3. Optionally add an alias command pointing to the same file

### New Agent
1. Create `.claude/agents/<name>.md` with frontmatter including clear activation criteria
2. Add to `agents` array in [plugin.json](.claude-plugin/plugin.json):
   ```json
   { "name": "agent-name", "path": ".claude/agents/agent-name.md", "description": "..." }
   ```
3. Test activation by using phrases that match the description

### New MCP Server
Add to `mcpServers` in [plugin.json](.claude-plugin/plugin.json):
```json
"server-name": { "command": "npx", "args": ["-y", "package-name"], "description": "..." }
```

### New Hook
1. Create executable script in `.claude/hooks/` (use existing hooks as templates)
2. Document in [HOOKS.md](.claude/docs/HOOKS.md) with example configuration
3. Test with local settings: `.claude/settings.local.json`

### New Skill
1. Create `.claude/skills/<name>.md` with frontmatter including triggers
2. Add to `skills` array in [plugin.json](.claude-plugin/plugin.json):
   ```json
   { "name": "skill-name", "path": ".claude/skills/skill-name.md", "description": "..." }
   ```
3. Test activation by working in contexts that match the triggers

### New Orchestrator
1. Create `.claude/orchestrators/<name>.md` with workflow stages
2. Add to `orchestrators` array in [plugin.json](.claude-plugin/plugin.json):
   ```json
   { "name": "workflow-name", "path": ".claude/orchestrators/workflow-name.md", "description": "..." }
   ```
3. Document agent handoff protocols and stage outputs

## Command & Agent Inventory

### Commands by Category (63 total, 12 categories)
- **api/** (3): `/api-new`, `/api-test`, `/api-protect`
- **context/** (6): `/context`, `/context-prime`, `/context-budget`, `/context-mode`, `/memory`, `/memory-init`
- **planning/** (7): `/plan`, `/execute-plan`, `/create-prd`, `/brainstorm`, `/riper`, `/research`, `/innovate`
- **quality/** (6): `/code-explain`, `/code-optimize`, `/code-cleanup`, `/lint`, `/new-task`, `/review`
- **testing/** (4): `/test-new`, `/tdd`, `/fix-issue`, `/verify`
- **workflow/** (14): `/wizard`, `/fix-pr`, `/handoff`, `/resume`, `/ledger`, `/chain`, `/harness`, `/wiggum`, `/architect`, `/map`, `/plan-init`, `/checkpoint`, `/eval`, `/learn`
- **devops/** (5): `/deploy`, `/ci-review`, `/worktree`, `/parallel-spawn`, `/mcp-init`
- **generation/** (5): `/hook-new`, `/migration-new`, `/scaffold`, `/docs-generate`, `/docs-codemap`
- **utility/** (6): `/rules`, `/suggest`, `/summarize`, `/github-setup`, `/think`, `/ask`
- **frameworks/** (3): `/component-vue`, `/component-angular`, `/component-svelte`
- **supabase/** (2): `/types-gen`, `/edge-function-new`
- **ui/** (2): `/component-new`, `/page-new`

**Note:** `/feature-plan` and `/write-plan` consolidated into `/plan` in v2.0.0. Commands reorganized from misc/ into logical categories in v2.1.0.

### Agents by Domain (25 total)
- **Architecture** (4): system-architect, backend-architect, frontend-architect, api-architect
- **Planning** (3): tech-stack-researcher, requirements-analyst, database-architect
- **Quality** (3): code-reviewer, refactoring-expert, performance-engineer
- **Security** (2): security-engineer, accessibility-auditor
- **Testing** (3): test-strategist, migration-planner, e2e-runner
- **DevOps** (2): devops-engineer, chaos-engineer
- **AI/ML** (2): llm-architect, mcp-developer
- **Documentation** (2): technical-writer, learning-guide
- **Research** (2): deep-research-agent, competitive-analyst
- **Domain** (1): fintech-engineer
- **Build** (1): build-error-resolver

**Note:** `performance-profiler` merged into `performance-engineer` in v2.0.0.

## Design Philosophy

### Code Generation Standards
- **Type Safety**: No `any` types, TypeScript strict mode
- **Next.js 15**: App Router, Server Components, Server Actions
- **Validation**: Zod for runtime validation, validate before expensive operations
- **Error Format**: `{ data: T, success: true }` or `{ error: string, success: false }`
- **Framework Agnostic**: Commands support Next.js, React, Vue, Angular, Svelte

### Preferred Patterns
- Feature-based component organization
- Zustand for global state, React Context for feature-specific state
- Supabase RLS policies for security
- Edge Runtime compatible code
- User-configurable preferences via [plugin-settings.json](.claude/plugin-settings.json)

### Command Categories (12 total)
- **api/** - API endpoint generation, testing, protection
- **context/** - Memory and context management
- **planning/** - Implementation planning, RIPER workflow, research
- **quality/** - Code quality, linting, optimization, review
- **testing/** - TDD, test generation, verification
- **workflow/** - Session management, chaining, handoffs
- **devops/** - Deployment, CI/CD, worktrees
- **generation/** - Scaffolding, hooks, migrations, documentation
- **utility/** - Rules, suggestions, general utilities
- **frameworks/** - Vue, Angular, Svelte components
- **supabase/** - Type generation, Edge Functions
- **ui/** - React components and Next.js pages

## Pre-Publish Checklist
- [ ] Valid JSON syntax in [plugin.json](.claude-plugin/plugin.json) (no trailing commas)
- [ ] All file paths in plugin.json exist and are accessible
- [ ] Commands tested locally with `$ARGUMENTS` placeholder
- [ ] Agents tested with activation phrases from description
- [ ] Version bumped appropriately in plugin.json
- [ ] CHANGELOG.md updated with version changes
- [ ] No sensitive data (API keys, tokens) in any files
- [ ] Hooks are executable (`chmod +x .claude/hooks/*.sh`)

## Plugin Settings Schema

User preferences are defined in [.claude/plugin-settings.json](.claude/plugin-settings.json) with schema in [plugin-settings.schema.json](.claude/plugin-settings.schema.json). Users can customize:
- Framework preference (nextjs, react, vue, angular, svelte)
- TypeScript strictness
- Styling approach (tailwind, css-modules, styled-components, emotion, vanilla)
- Testing framework (jest, vitest, playwright)
- Database/ORM (supabase, prisma, drizzle, mongodb)
- API style (rest, graphql, trpc)
- Deployment platform (vercel, netlify, aws, docker, railway)
- Code style preferences (quotes, semicolons, tab width)
- Custom paths for generated files

Commands should respect these preferences when generating code.
