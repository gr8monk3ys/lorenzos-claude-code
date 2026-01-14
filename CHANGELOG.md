# Changelog

All notable changes to Lorenzo's Claude Code plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.11.0] - 2026-01-13

### Added
- **Fintech Specialist** - New agent for financial technology
  - `fintech-engineer` - Payment systems, compliance (PCI-DSS, KYC/AML), fraud detection

- **New Skills (2)**
  - `webapp-testing` - Playwright/E2E testing patterns, visual regression, accessibility automation
  - `skill-creator` - Create custom Claude Code skills with proper structure and frontmatter

- **obra/superpowers-Inspired Commands (3)**
  - `/brainstorm` - Collaborative brainstorming with divergent/convergent thinking
  - `/write-plan` - Create detailed implementation plans with phases and checkpoints
  - `/execute-plan` - Step-by-step execution with verification at each stage

### Changed
- Plugin now includes 45 commands (was 42)
- Plugin now includes 24 agents (was 23)
- Plugin now includes 8 skills (was 6)

## [1.10.0] - 2026-01-13

### Added
- **Community-Inspired Features** - Based on awesome-claude ecosystem research

**New Specialized Agents (4):**
- `chaos-engineer` - System resilience testing, failure injection, gameday planning
- `mcp-developer` - Build MCP servers to extend Claude with custom tools
- `llm-architect` - Design LLM applications, RAG systems, agent workflows
- `competitive-analyst` - Market research, competitor analysis, strategic insights

**New Workflow Commands (7):**
- `/context-prime` (+ `/prime` alias) - Load comprehensive project context
- `/tdd` - Test-Driven Development workflow (Red-Green-Refactor)
- `/fix-issue` - Analyze GitHub issue and implement complete fix
- `/fix-pr` - Address PR reviewer feedback and resolve changes
- `/create-prd` (+ `/prd` alias) - Generate Product Requirements Document

**New Skills:**
- `mcp-builder` - Create MCP servers for API integration

### Changed
- Plugin now includes 42 commands (was 35)
- Plugin now includes 23 agents (was 19)
- Plugin now includes 6 skills (was 5)

### Sources
- [awesome-claude](https://github.com/tonysurfly/awesome-claude)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)

## [1.8.0] - 2026-01-13

### Added
- **Agent Skills System** - 5 auto-invoked skills that Claude uses based on context
  - `api-development` - REST API creation, testing, authentication, rate limiting
  - `frontend-development` - React/Vue/Angular/Svelte components, pages, accessibility
  - `database-operations` - Schema design, migrations, Supabase/Prisma/Drizzle
  - `devops-automation` - CI/CD, Docker, deployment, infrastructure
  - `code-quality` - Code review, testing, refactoring, optimization
- **SKILLS.md** - Documentation for skills vs commands vs agents
- **Skills Directory** - `.claude/skills/` with 5 skill bundles

### Changed
- Removed unsupported "tags" field from plugin.json (schema compliance)
- Plugin description updated to highlight skills feature

### Documentation
- Complete skills guide with usage examples
- Comparison table: Skills vs Commands vs Agents
- Custom skill creation guide

## [1.9.0] - 2026-01-13

### Added
- **Context Management System** - Persistent memory and context optimization
  - `/memory` command - View, update, or manage Claude's persistent project memory
  - `/context` command - Summarize, compact, or load files just-in-time
  - `.claude/memory/MEMORY.md` - Structured memory file with semantic, episodic, and procedural sections

- **Aider-Inspired Features** - High-level design and exploration modes
  - `/architect` command - Architecture discussions without code changes
  - `/ask` command - Ask questions about codebase without modifications
  - `/map` command - Generate codebase structure and dependency maps

- **Cursor-Inspired Features** - Project rules and customization
  - `/rules` command - View, edit, or create project-specific rules
  - `.claude/rules/PROJECT-RULES.md` - Comprehensive rules template (like .cursorrules)

- **6 New MCP Servers** (15 total)
  - **Slack** (`@anthropic/mcp-server-slack`) - Team communication
  - **PostgreSQL** (`@modelcontextprotocol/server-postgres`) - Database queries
  - **SQLite** (`@modelcontextprotocol/server-sqlite`) - Local database
  - **Redis** (`@anthropic/mcp-server-redis`) - Caching operations
  - **Sentry** (`@sentry/mcp-server`) - Error tracking
  - **Puppeteer** (`@anthropic/mcp-server-puppeteer`) - Browser automation

### Changed
- Updated plugin to **41 commands** (was 35)
- Updated plugin to **15 MCP servers** (was 9)
- Updated all documentation to reflect new features

### Architecture
- New `.claude/memory/` directory for persistent memory
- New `.claude/rules/` directory for project rules
- 6 new command files in `.claude/commands/misc/`

## [1.8.0] - 2026-01-13

### Added
- **Agent Skills System** - 8 auto-activating context-aware skills
  - **API Bundle (3 skills)**:
    - `api-creation` - Auto-applies Next.js 15 patterns, Zod validation, consistent error handling
    - `api-testing` - Generates comprehensive tests with edge cases, error scenarios, integration patterns
    - `api-security` - Applies authentication, rate limiting, input sanitization, OWASP protections
  - **Frontend Bundle (2 skills)**:
    - `component-patterns` - React/Vue/Angular/Svelte best practices, accessibility, performance
    - `state-management` - Guides state decisions between local, context, and global stores
  - **Database Bundle (2 skills)**:
    - `query-optimization` - N+1 prevention, indexing suggestions, efficient data fetching
    - `migration-safety` - Safe, reversible migrations with zero-downtime patterns
  - **DevOps Bundle (1 skill)**:
    - `ci-cd-patterns` - GitHub Actions best practices, testing pipelines, deployment workflows

- **Multi-Agent Orchestrators** - 3 workflow orchestrators for complex tasks
  - `fullstack-feature-workflow` - End-to-end feature implementation
    - Planning stage (requirements-analyst → system-architect)
    - Build stage (api-architect + frontend-architect in parallel)
    - Verify stage (test-strategist → code-reviewer → technical-writer)
  - `code-review-workflow` - Multi-perspective code review
    - Parallel execution: security-engineer, performance-engineer, code-reviewer, accessibility-auditor
    - Aggregated scoring system (A-F grades, weighted by category)
    - Unified report with action items
  - `refactoring-workflow` - Safe, systematic refactoring
    - Analysis stage (code-reviewer + performance-profiler)
    - Planning stage (refactoring-expert + system-architect)
    - Execution stage (incremental changes with test verification)
    - Verification stage (test-strategist + code-reviewer)

- **Research Documentation** - `.claude/docs/AGENT-SKILLS-RESEARCH.md`
  - Comprehensive comparison of Skills vs Commands vs Agents
  - SKILL.md format specification
  - Progressive disclosure patterns
  - Agent scoring algorithms
  - Implementation roadmap

### Changed
- Updated plugin version to 1.8.0
- Updated plugin description to include skills and orchestrators
- Added `skills`, `orchestrators`, `multi-agent` tags to plugin.json
- Updated [CLAUDE.md](CLAUDE.md) with Skills and Orchestrators documentation
- Updated [README.md](README.md) with new features section

### Architecture
- New `.claude/skills/` directory structure (api/, frontend/, database/, devops/)
- New `.claude/orchestrators/` directory for workflow definitions
- New `.claude/docs/` directory for research and design documents
- Skills use priority-based activation (higher priority checked first)
- Orchestrators define multi-stage workflows with agent handoff protocols

## [1.7.2] - 2026-01-13

### Added
- **GitHub MCP Server** (`@modelcontextprotocol/server-github`) - Repository operations, issues, PRs, and search functionality
- **Notion MCP Server** (`@notionhq/notion-mcp-server`) - Workspace management and data source operations
- **Linear MCP Server** (`@larryhudson/linear-mcp-server`) - Issue tracking and project management integration
- **Command Template Test Suite** (`scripts/test-commands.js`) - Comprehensive automated testing for command markdown files
  - Validates frontmatter structure and required fields
  - Checks for $ARGUMENTS placeholders
  - Tests content structure and quality
  - Validates model assignments
  - Quality checks for TODO markers, broken links, and formatting

### Changed
- Updated plugin to **9 MCP servers** total (was 6)
- Updated all documentation to reflect 9 MCP servers
- Fixed missing `description` field in [code-explain.md](.claude/commands/misc/code-explain.md)

### Documentation
- Updated [CLAUDE.md](CLAUDE.md) with all 9 MCP servers
- Updated [README.md](README.md) with detailed descriptions of new MCP servers
- Updated troubleshooting section to cover all 9 servers
- Added configuration requirements for GitHub, Notion, and Linear servers

### Testing
- Added automated command template validation
- 102 test assertions passing across 22 command files
- Validates command structure, frontmatter, placeholders, and quality

## [1.7.1] - 2026-01-13

### Documentation
- Comprehensive documentation overhaul
- Updated README.md to accurately reflect 35 commands and 19 agents
- Updated CLAUDE.md to include hooks system and MCP servers
- Documented all command aliases throughout documentation
- Added Automation Hooks section to README.md
- Updated MCP server counts and descriptions

## [1.7.0] - 2026-01-12

### Added
- **Hooks & Automation System** - 6 pre-configured hook scripts for workflow automation
  - `block-sensitive-files.sh` - PreToolUse hook to prevent edits to .env, credentials, secrets
  - `auto-format.sh` - PostToolUse hook for auto-formatting with prettier/eslint/biome
  - `typecheck.sh` - PostToolUse hook for TypeScript type-checking after edits
  - `validate-json.sh` - PreToolUse hook to validate JSON syntax before writing
  - `auto-commit.sh` - Stop hook for automatic git commits with descriptive messages
  - `notify-completion.sh` - Stop hook for desktop notifications (macOS/Linux/Windows)
- **HOOKS.md** - Comprehensive documentation for hooks configuration and usage
- **Updated settings.template.json** - Now includes full hooks configuration

### Changed
- Plugin description now highlights hooks as a key feature
- Added "hooks" and "automation" tags to plugin.json

### Documentation
- Complete hooks reference with configuration examples
- Custom hook creation guide
- Troubleshooting section for common hook issues

## [1.6.0] - 2026-01-12

### Added
- **code-reviewer** agent - Multi-aspect code review covering security, performance, quality, and maintainability with severity scoring
- **test-strategist** agent - Plan comprehensive testing strategies, analyze coverage gaps, and design test architectures
- **migration-planner** agent - Plan safe database schema migrations with zero-downtime strategies and rollback procedures
- **accessibility-auditor** agent - Audit web applications for WCAG 2.1 compliance with detailed remediation guidance
- **performance-profiler** agent - Profile application performance, analyze Core Web Vitals, and identify optimization opportunities

### Changed
- Updated plugin to 19 agents total (was 14)
- Added STEROIDS roadmap to TODO.md with 50+ research-based improvements

### Research
- Hooks & Automation patterns from Claude Code Hooks Guide
- Agent Skills System from official documentation
- MCP Server expansion research (Notion, Linear, GitHub, MongoDB, AWS, etc.)
- Multi-agent orchestration patterns
- Context management techniques from Anthropic engineering blog
- Aider and Cursor feature analysis

## [1.5.1] - 2026-01-12

### Added
- **Wizard command** (`/wizard`) - Interactive guide to choose commands and build specifications
- **Interactive options tables** - Added to `/component-new`, `/test-new`, `/migration-new` to prompt for preferences

### Changed
- Updated plugin to 35 commands (22 unique + 13 aliases)
- Commands now prompt for clarification when options are unclear

## [1.5.0] - 2026-01-12

### Added
- **Vue 3 component command** (`/component-vue`) - Create Vue 3 components with Composition API and TypeScript
- **Angular component command** (`/component-angular`) - Create Angular 17+ standalone components with signals
- **Svelte 5 component command** (`/component-svelte`) - Create Svelte 5 components with runes
- **Plugin settings system** (`plugin-settings.json`) - User preferences for framework, styling, testing, deployment
- **13 command aliases** for shorter command invocation (e.g., `/api` → `/api-new`)

### Changed
- Updated plugin to 34 commands total (21 unique + 13 aliases)
- Plugin now supports Vue, Angular, and Svelte in addition to React/Next.js
- API commands now include "Next Steps" suggestions for command chaining

### Research & Documentation
- **Alternative approaches research** ([RESEARCH-alternative-approaches.md](.claude/docs/RESEARCH-alternative-approaches.md)) exploring:
  - Command composition patterns (workflow commands, suggestions, compound arguments)
  - Plugin extension system for community commands
  - Stack presets for Vue/Nuxt, Angular, SvelteKit, Remix
  - Agent specialization based on project type detection
- **Project detection script** (`scripts/detect-project.js`) - Detects framework, database, testing, styling, and state management

## [1.4.0] - 2026-01-12

### Added
- **Stripe MCP server** (`@stripe/mcp`) - Payment processing and Stripe API operations
- **Chrome DevTools MCP server** (`chrome-devtools-mcp`) - Browser debugging and performance analysis
- **Vercel MCP server** (`@vercel/mcp`) - Deployment management and project operations
- GitHub Actions CI workflow for automated validation (JSON syntax, path verification, frontmatter checks)
- Pre-commit hooks configuration (`.pre-commit-config.yaml`) for local quality checks
- Markdownlint configuration (`.markdownlint.json`) for consistent markdown formatting
- Example project template (`examples/nextjs-starter/`) with workflow demonstrations
- Plugin validation script (`scripts/validate-plugin.js`) for comprehensive checks
- Agent quality test suite (`scripts/test-agents.js`) for prompt validation

### Changed
- Updated plugin to 6 MCP servers total (was 3)
- Enhanced MCP-SERVERS.md with comprehensive documentation for all 6 servers
- CI workflow now includes test script execution

## [1.3.0] - 2026-01-12

### Added
- **database-architect** agent - Design optimal database schemas with focus on scalability, performance, and data integrity
- **devops-engineer** agent - Design CI/CD pipelines, infrastructure as code, and deployment strategies
- **api-architect** agent - Design RESTful and GraphQL APIs with focus on consistency and developer experience
- MCP server environment variable configuration documentation in MCP-SERVERS.md

### Changed
- Updated plugin to 14 agents total (was 11)
- Improved CLAUDE.md with concise development guidance

### Fixed
- Registered previously unregistered database-architect agent in plugin.json

## [1.2.0] - 2025-01-12

### Added
- `/deploy` command - Generate deployment configurations and CI/CD workflows for Vercel, Netlify, AWS, Docker
- Comprehensive troubleshooting section in README with 6 common issue categories and solutions

### Changed
- Updated all command models from `claude-sonnet-4-5` to `claude-opus-4-5` for improved performance
- Updated license from MIT to GPL-3.0 to ensure derivatives remain open source
- Updated plugin description to reflect 18 commands (was 17)

### Improved
- Enhanced deployment workflow documentation with multiple platform support
- Better error handling guidance in troubleshooting section
- Consistent model usage across all commands for better reliability

## [1.1.0] - 2025-01-12

### Added
- `/test-new` command - Generate test files for Jest, Vitest, or Playwright with comprehensive test patterns
- `/migration-new` command - Create database migration files with support for Prisma, Drizzle, Supabase, Knex
- `/hook-new` command - Create custom React hooks with TypeScript and modern patterns

### Changed
- Generalized tech-stack-researcher agent to be framework-agnostic (removed app-specific references)
- Updated plugin description to reflect 17 commands (was 14)

### Improved
- Better support for multiple testing frameworks and ORMs
- Enhanced TypeScript patterns in generated code
- Comprehensive best practices documentation in new commands

## [1.0.0] - 2025-01-12

### Added
- Initial release of lorenzos-claude-code plugin
- 14 slash commands for development workflows:
  - 7 general development commands (`/new-task`, `/code-explain`, `/code-optimize`, `/code-cleanup`, `/feature-plan`, `/lint`, `/docs-generate`)
  - 3 API commands (`/api-new`, `/api-test`, `/api-protect`)
  - 2 UI commands (`/component-new`, `/page-new`)
  - 2 Supabase commands (`/types-gen`, `/edge-function-new`)
- 11 specialized AI agents:
  - Architecture & Planning: tech-stack-researcher, system-architect, backend-architect, frontend-architect, requirements-analyst
  - Code Quality: refactoring-expert, performance-engineer, security-engineer
  - Documentation: technical-writer, learning-guide, deep-research-agent
- 3 pre-configured MCP servers:
  - Context7 for library documentation
  - Playwright for browser automation
  - Supabase for database operations
- Comprehensive documentation (README.md, CLAUDE.md, PUBLISHING.md, QUICK-START.md)
- MIT License

### Philosophy
- Type Safety: Never uses `any` types
- Best Practices: Follows modern Next.js/React patterns
- Productivity: Reduces repetitive scaffolding
- Research: AI-powered tech decisions with evidence

---

## Future Releases

Changes will be documented here as new versions are released.

### Version Guidelines
- **MAJOR** (X.0.0) - Breaking changes or major restructuring
- **MINOR** (x.Y.0) - New commands, agents, or significant features
- **PATCH** (x.y.Z) - Bug fixes, documentation updates, minor improvements
