# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin repository providing **51 slash commands**, **24 specialized AI agents**, **8 auto-activating skills**, **3 multi-agent orchestrators**, and **6 MCP servers** for modern web development (Next.js 15, TypeScript, React, Vue, Angular, Svelte, Supabase). Current version: **1.11.1**.

## Key Files

- [.claude-plugin/plugin.json](.claude-plugin/plugin.json) - Plugin manifest (version, commands, agents, skills, orchestrators, MCP servers). **All components must be registered here.**
- `.claude/commands/` - Slash command markdown files organized by category (api/, ui/, supabase/, misc/, frameworks/)
- `.claude/agents/` - Specialized AI agent prompt files
- `.claude/skills/` - Auto-activating skill files organized by category (api/, frontend/, database/, devops/)
- `.claude/orchestrators/` - Multi-agent workflow orchestrators
- `.claude/hooks/` - Pre-configured automation hooks (6 total)
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

### Skill Format (8 skills)
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

**Skill bundles:**
- **API** (`api-creation`, `api-testing`, `api-security`) - Endpoint patterns, testing, security
- **Frontend** (`component-patterns`, `state-management`) - Component and state best practices
- **Database** (`query-optimization`, `migration-safety`) - Query performance, safe migrations
- **DevOps** (`ci-cd-patterns`) - CI/CD best practices

Skills differ from commands: **Commands are explicit** (`/api-new`), **Skills are implicit** (auto-activate based on context).

### Orchestrator Format (3 orchestrators)
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

### MCP Servers (6 configured)
Pre-configured in [plugin.json](.claude-plugin/plugin.json) under `mcpServers`:

- **context7** - Up-to-date library documentation (no config needed)
- **playwright** - Browser automation and E2E testing (no config needed)
- **supabase** - Database operations (**requires credentials**)
- **stripe** - Payment processing (**requires API key**)
- **chrome-devtools** - Browser debugging and performance analysis
- **vercel** - Deployment management (**requires token**)

See README.md for credential configuration.

### Hooks System (6 pre-configured)
Located in `.claude/hooks/`:
- **block-sensitive-files.sh** (PreToolUse) - Prevents editing .env, credentials, keys
- **auto-format.sh** (PostToolUse) - Auto-formats with Prettier/Biome/ESLint
- **typecheck.sh** (PostToolUse) - Runs TypeScript type checking
- **validate-json.sh** (PreToolUse) - Validates JSON syntax before write
- **auto-commit.sh** (Stop) - Auto-commits changes when task completes
- **notify-completion.sh** (Stop) - Desktop notification on completion

See [HOOKS.md](HOOKS.md) for detailed hook configuration.

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
2. Document in [HOOKS.md](HOOKS.md) with example configuration
3. Test with local settings: `.claude/settings.local.json`

### New Skill
1. Create `.claude/skills/<category>/<name>.md` with frontmatter including triggers
2. Add to `skills` array in [plugin.json](.claude-plugin/plugin.json):
   ```json
   { "name": "skill-name", "path": ".claude/skills/category/skill-name.md", "description": "..." }
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

### Commands by Category (51 total, 36 unique + 15 aliases)
- **API** (3): `/api-new`, `/api-test`, `/api-protect`
- **UI** (2): `/component-new`, `/page-new`
- **Frameworks** (3): `/component-vue`, `/component-angular`, `/component-svelte`
- **Supabase** (2): `/types-gen`, `/edge-function-new`
- **Context & Memory** (6): `/memory`, `/context`, `/architect`, `/ask`, `/map`, `/rules`
- **Planning** (5): `/feature-plan`, `/write-plan`, `/execute-plan`, `/create-prd`, `/brainstorm`
- **Code Quality** (5): `/code-explain`, `/code-optimize`, `/code-cleanup`, `/lint`, `/new-task`
- **Testing & TDD** (3): `/test-new`, `/tdd`, `/fix-issue`
- **Generation** (5): `/hook-new`, `/migration-new`, `/deploy`, `/docs-generate`, `/context-prime`
- **Workflow** (2): `/wizard`, `/fix-pr`

### Agents by Domain (24 total)
- **Architecture** (4): system-architect, backend-architect, frontend-architect, api-architect
- **Planning** (3): tech-stack-researcher, requirements-analyst, database-architect
- **Quality** (4): code-reviewer, refactoring-expert, performance-engineer, performance-profiler
- **Security** (2): security-engineer, accessibility-auditor
- **Testing** (2): test-strategist, migration-planner
- **DevOps** (2): devops-engineer, chaos-engineer
- **AI/ML** (2): llm-architect, mcp-developer
- **Documentation** (2): technical-writer, learning-guide
- **Research** (2): deep-research-agent, competitive-analyst
- **Domain** (1): fintech-engineer

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

### Command Categories
- **api/** - API endpoint generation, testing, protection (Next.js route handlers)
- **ui/** - React component and Next.js page generation
- **frameworks/** - Vue, Angular, Svelte component generation
- **supabase/** - Type generation, Edge Functions
- **misc/** - General development utilities (testing, migrations, hooks, docs, optimization)

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
