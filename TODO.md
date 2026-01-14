# TODO - Future Improvements

This file tracks potential improvements and enhancements for lorenzos-claude-code plugin.

**Latest Update (v1.9.0)**: Added Context Management, Aider/Cursor-inspired features, and expanded MCP servers to 15 total.

---

## STEROIDS ROADMAP (Research-Based Improvements)

Based on extensive research of Claude Code ecosystem, Cursor, Aider, and MCP servers.

### Hooks & Automation (High Impact) ✅ COMPLETED
*Source: [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)*

- [x] Add `.claude/hooks/` directory with pre-configured hook scripts
- [x] Create PreToolUse hook to block sensitive file modifications (.env, secrets)
- [x] Create PostToolUse hook for auto-formatting after edits (prettier, eslint)
- [x] Create PostToolUse hook for TypeScript type-checking after .ts edits
- [x] Add hook for automatic git commits after Claude edits (with descriptive messages)
- [x] Create hook templates for common automation patterns
- [x] Document hook best practices in HOOKS.md

### Agent Skills System (High Impact) ✅ COMPLETED (v1.8.0)
*Source: [Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)*

- [x] Convert commands to Skills format for auto-invocation by context
- [x] Create skill bundles: API Development, Frontend, Database, DevOps
- [x] Add skill discovery based on conversation context
- [x] Create composite skills that combine multiple capabilities
- [x] Document skills vs commands vs subagents usage patterns

### MCP Server Expansion (High Impact)
*Sources: [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers), [mcpservers.org](https://mcpservers.org/)*

**Productivity & Project Management:**
- [x] Add Notion MCP server (`@notionhq/notion-mcp-server`) - workspace management (v1.7.2)
- [x] Add Linear MCP server (`@larryhudson/linear-mcp-server`) - issue tracking integration (v1.7.2)
- [x] Add GitHub MCP server (`@modelcontextprotocol/server-github`) - issues, PRs, discussions (v1.7.2)
- [ ] Add Slack MCP server - team communication

**Database & Backend:**
- [ ] Add MongoDB MCP server - document database operations
- [ ] Add MySQL MCP server - relational database operations
- [ ] Add Prisma MCP server - ORM operations and migrations
- [ ] Add Redis MCP server - caching operations

**Cloud & Infrastructure:**
- [ ] Add AWS MCP suite (DynamoDB, Aurora, Neptune, S3)
- [ ] Add Terraform MCP server - infrastructure as code
- [ ] Add Kubernetes MCP server - cluster management
- [ ] Add Docker MCP server - container operations

**Development Tools:**
- [ ] Add Sentry MCP server - error tracking
- [ ] Add Datadog MCP server - monitoring and observability
- [ ] Add Figma MCP server - design-to-code workflows
- [ ] Add XcodeBuildMCP server - iOS/macOS development

### Multi-Agent Orchestration (Medium-High Impact) ✅ COMPLETED (v1.8.0)
*Source: [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)*

- [x] Create workflow orchestrators for common patterns:
  - [x] Full-stack feature workflow (plan → API → tests → frontend → docs)
  - [x] Code review workflow (security → performance → style → summary)
  - [x] Refactoring workflow (analyze → plan → execute → verify)
- [x] Add confidence-based agent scoring (like official PR review plugin)
- [x] Create agent handoff protocols for complex tasks
- [x] Implement parallel agent execution for independent tasks

### Context Management (Medium Impact) ✅ COMPLETED (v1.9.0)
*Source: [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)*

- [x] Implement structured note-taking for persistent memory (`/memory` command)
- [x] Create just-in-time context loading with file references (`/context load`)
- [x] Add auto-compact summarization for long sessions (`/context summarize`)
- [x] Create memory types: semantic (facts), episodic (actions), procedural (rules)
- [x] Add context budget management and optimization (`/context budget`)

### Aider-Inspired Features (Medium Impact) ✅ COMPLETED (v1.9.0)
*Source: [Aider](https://aider.chat/)*

- [x] Add multi-file coordinated editing patterns (via orchestrators)
- [x] Create codebase mapping/indexing command (`/map`)
- [x] Add `/architect` mode for high-level design discussions
- [x] Add `/ask` mode for questions without code changes
- [ ] Implement prompt caching for cost savings
- [ ] Add voice input support documentation

### Cursor-Inspired Features (Medium Impact) ✅ PARTIALLY COMPLETE (v1.9.0)
*Source: [Cursor Features](https://cursor.com/features)*

- [ ] Create autonomy levels documentation (Tab → Cmd+K → Full Agent)
- [x] Add `.cursorrules`-like project rules support (`/rules`, PROJECT-RULES.md)
- [ ] Create codebase understanding/embedding patterns
- [ ] Add real-time error detection patterns
- [ ] Document multi-model selection strategies

### Community-Inspired Features (High Impact) ✅ PARTIALLY COMPLETE (v1.10.0)
*Sources: [awesome-claude](https://github.com/tonysurfly/awesome-claude), [VoltAgent](https://github.com/VoltAgent/awesome-claude-code-subagents), [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code), [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)*

**New Specialized Agents:**
- [x] Add `chaos-engineer` agent - System resilience and failure testing (v1.10.0)
- [x] Add `mcp-developer` agent - MCP server creation specialist (v1.10.0)
- [x] Add `llm-architect` agent - LLM/AI system design (v1.10.0)
- [x] Add `competitive-analyst` agent - Market/competitor research (v1.10.0)
- [ ] Add `fintech-engineer` agent - Financial technology specialist

**New Commands (Workflow):**
- [x] Add `/context-prime` command - Load comprehensive project context (v1.10.0)
- [x] Add `/tdd` command - Test-Driven Development workflow (Red-Green-Refactor) (v1.10.0)
- [x] Add `/fix-issue` command - GitHub issue analysis and implementation (v1.10.0)
- [x] Add `/fix-pr` command - Address PR reviewer feedback (v1.10.0)
- [x] Add `/create-prd` command - Generate product requirement documents (v1.10.0)

**New Skills:**
- [x] Add `mcp-builder` skill - Create MCP servers for API integration (v1.10.0)
- [ ] Add `webapp-testing` skill - Playwright browser automation patterns
- [ ] Add `skill-creator` skill - Interactive Q&A to build custom skills

**Advanced Workflow Patterns:**
- [ ] Implement Ralph Wiggum Pattern - Autonomous iterative loops with safety guardrails
- [ ] Implement RIPER Workflow - Research→Innovate→Plan→Execute→Review phases
- [ ] Add `/brainstorm`, `/write-plan`, `/execute-plan` command trio (obra/superpowers)

---

## High Priority

### Documentation Enhancements
- [ ] Add screenshots/GIFs demonstrating command outputs in README.md
- [ ] Create visual demo of each agent's capabilities
- [ ] Add "Getting Started" video or tutorial
- [x] Include example use cases for each command with before/after code samples
- [x] Add troubleshooting section to README.md
- [x] Update README.md to reflect 35 commands and 19 agents
- [x] Update CLAUDE.md to include hooks system and all 6 MCP servers
- [x] Document all command aliases in README.md
- [x] Add Automation Hooks section to README.md

### Plugin Quality
- [x] Review and generalize tech-stack-researcher.md agent (remove app-specific references to YouTube/credit system)
- [x] Ensure all agent descriptions accurately reflect activation triggers
- [ ] Add unit tests for command prompt templates
- [x] Validate all commands work with Claude Code 2.0.13+

### Command Improvements
- [x] Add `/test-new` command for generating test files (Jest, Vitest, Playwright)
- [x] Add `/migration-new` command for database migrations
- [x] Add `/hook-new` command for custom React hooks
- [x] Consider `/deploy` command for deployment workflows

---

## Medium Priority

### Agent Enhancements
- [x] Add "database-architect" agent for complex schema design
- [x] Add "devops-engineer" agent for CI/CD and infrastructure
- [x] Add "api-architect" agent focused on REST/GraphQL design
- [x] Review agent model assignments (sonnet vs haiku) for cost optimization

### New Agents (Research-Based)
- [x] Add "code-reviewer" agent with multi-aspect review (security, perf, style)
- [x] Add "test-strategist" agent for test planning and coverage analysis
- [x] Add "migration-planner" agent for database schema evolution
- [x] Add "accessibility-auditor" agent for a11y compliance
- [x] Add "performance-profiler" agent for bottleneck detection

### Developer Experience
- [x] Add `.claude/settings.template.json` with recommended settings
- [x] Create example project template using the plugin
- [x] Add command aliases (e.g., `/api` → `/api-new`)
- [x] Add interactive prompts for commands with multiple options

### MCP Servers (Completed)
- [x] Research and add Vercel MCP server when available
- [x] Research and add Stripe MCP server when available
- [x] Add Chrome DevTools MCP server when available
- [x] Document how to configure MCP server environment variables

---

## Low Priority

### Community & Marketing
- [ ] Submit to CC Plugins Marketplace via PR (https://github.com/ccplugins/marketplace)
- [ ] Create Twitter/X announcement thread with examples
- [ ] Create blog post explaining the plugin's architecture
- [ ] Add "Showcase" section to README with community examples
- [ ] Submit to [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

### Advanced Features
- [x] Add plugin settings/preferences file for user customization
- [x] Support for multiple framework presets (Vue, Angular, Svelte)
- [ ] Add command history and favorites
- [x] Create interactive command builder/wizard
- [ ] Add telemetry (opt-in) to understand command usage

### Testing & Quality Assurance
- [x] Set up automated testing for command templates
- [x] Add linting for markdown files
- [x] Create test suite for agent prompt validation
- [x] Add pre-commit hooks for quality checks
- [x] Set up GitHub Actions for automated testing

### Internationalization
- [ ] Add support for multiple languages in command descriptions
- [ ] Translate README.md to Spanish, French, German, Japanese
- [ ] Consider multi-language agent responses

---

## Ideas & Research

### Experimental Features
- [ ] Voice command integration for slash commands
- [ ] Integration with GitHub Copilot for enhanced suggestions
- [ ] Plugin marketplace within the plugin (meta!)
- [ ] AI-powered command recommendation based on code context
- [ ] Automatic command chaining (e.g., `/api-new` → `/api-test` → `/api-protect`)

### Alternative Approaches
- [x] Investigate command composition patterns
- [x] Research plugin extension system for community commands
- [x] Consider plugin themes/presets for different tech stacks
- [x] Explore agent specialization based on project type detection

### Performance Optimizations
- [ ] Benchmark agent response times
- [ ] Optimize MCP server startup times
- [ ] Cache frequently used command templates
- [ ] Lazy-load agent prompts

### Headless/CI Integration
*Source: [Claude Code Best Practices](https://skywork.ai/blog/claude-code-plugin-best-practices-large-codebases-2025/)*

- [ ] Create read-only mode for code analysis in CI
- [ ] Add PR comment integration for automated reviews
- [ ] Create artifact generation for CI pipelines
- [ ] Document headless operation best practices

---

## Completed ✅

- [x] Replace LICENSE with MIT (was GPL-3.0)
- [x] Fix PUBLISHING.md outdated reference to `edmund-io`
- [x] Remove time estimates from feature-plan.md
- [x] Add CHANGELOG.md for version tracking
- [x] Add .gitattributes for consistent line endings
- [x] Create comprehensive CLAUDE.md for repository guidance
- [x] Update all references from Edmund to Lorenzo
- [x] Update all GitHub URLs to gr8monk3ys/lorenzos-claude-code
- [x] Generalized tech-stack-researcher agent (v1.1.0)
- [x] Added /test-new command for test generation (v1.1.0)
- [x] Added /migration-new command for database migrations (v1.1.0)
- [x] Added /hook-new command for React hooks (v1.1.0)
- [x] Updated all documentation for 17 commands (v1.1.0)
- [x] Added /deploy command for deployment workflows (v1.2.0)
- [x] Updated all command models to claude-opus-4-5 (v1.2.0)
- [x] Changed license from MIT to GPL-3.0 (v1.2.0)
- [x] Added comprehensive troubleshooting section to README (v1.2.0)
- [x] Updated all documentation for 18 commands (v1.2.0)
- [x] Added detailed example use cases to README with "What you get" sections (v1.2.0)
- [x] Validated all 18 commands have correct frontmatter and paths (v1.2.0)
- [x] Reviewed agent model assignments for cost optimization (v1.2.0)
- [x] Enhanced .claude/settings.template.json with comprehensive recommended settings (v1.2.0)
- [x] Added database-architect agent (v1.3.0)
- [x] Added devops-engineer agent for CI/CD and infrastructure (v1.3.0)
- [x] Added api-architect agent for REST/GraphQL design (v1.3.0)
- [x] Documented MCP server environment variables in MCP-SERVERS.md (v1.3.0)
- [x] Updated plugin to 14 agents total (v1.3.0)
- [x] Added Vercel MCP server (`@vercel/mcp`) (v1.4.0)
- [x] Added Stripe MCP server (`@stripe/mcp`) (v1.4.0)
- [x] Added Chrome DevTools MCP server (`chrome-devtools-mcp`) (v1.4.0)
- [x] Set up GitHub Actions CI workflow for validation (v1.4.0)
- [x] Added pre-commit hooks configuration (v1.4.0)
- [x] Added markdownlint configuration (v1.4.0)
- [x] Updated plugin to 6 MCP servers total (v1.4.0)
- [x] Created example project template in `examples/nextjs-starter/` (v1.4.0)
- [x] Created `scripts/validate-plugin.js` for plugin validation (v1.4.0)
- [x] Created `scripts/test-agents.js` for agent quality testing (v1.4.0)
- [x] Added test scripts to GitHub Actions CI workflow (v1.4.0)
- [x] Added command aliases for shorter invocation (v1.5.0)
- [x] Added plugin settings/preferences file with JSON schema (v1.5.0)
- [x] Added Vue 3 component command `/component-vue` (v1.5.0)
- [x] Added Angular component command `/component-angular` (v1.5.0)
- [x] Added Svelte 5 component command `/component-svelte` (v1.5.0)
- [x] Updated plugin to 34 commands (21 unique + 13 aliases) (v1.5.0)
- [x] Created research doc for alternative approaches (v1.5.0)
- [x] Created project type detection script `scripts/detect-project.js` (v1.5.0)
- [x] Added "Next Steps" suggestions to API commands (v1.5.0)
- [x] Added `/wizard` command for interactive command selection (v1.5.1)
- [x] Added interactive options tables to commands (v1.5.1)
- [x] Comprehensive ecosystem research for STEROIDS roadmap (v1.5.1)
- [x] Added code-reviewer agent with multi-aspect review (v1.6.0)
- [x] Added test-strategist agent for test planning (v1.6.0)
- [x] Added migration-planner agent for schema evolution (v1.6.0)
- [x] Added accessibility-auditor agent for a11y compliance (v1.6.0)
- [x] Added performance-profiler agent for bottleneck detection (v1.6.0)
- [x] Updated plugin to 19 agents total (v1.6.0)
- [x] Added `.claude/hooks/` directory with 6 hook scripts (v1.7.0)
- [x] Created PreToolUse hook for sensitive file protection (v1.7.0)
- [x] Created PostToolUse hooks for auto-formatting and type-checking (v1.7.0)
- [x] Created Stop hooks for auto-commit and notifications (v1.7.0)
- [x] Created HOOKS.md documentation (v1.7.0)
- [x] Updated settings.template.json with hooks configuration (v1.7.0)
- [x] Updated README.md to reflect 35 commands and 19 agents (v1.7.1)
- [x] Updated CLAUDE.md to include hooks system and all 6 MCP servers (v1.7.1)
- [x] Documented all command aliases in README.md (v1.7.1)
- [x] Added Automation Hooks section to README.md (v1.7.1)
- [x] Updated MCP server counts and descriptions throughout docs (v1.7.1)
- [x] Fixed code-explain.md frontmatter description (v1.7.2)
- [x] Added GitHub MCP server (`@modelcontextprotocol/server-github`) (v1.7.2)
- [x] Added Notion MCP server (`@notionhq/notion-mcp-server`) (v1.7.2)
- [x] Added Linear MCP server (`@larryhudson/linear-mcp-server`) (v1.7.2)
- [x] Updated plugin to 9 MCP servers total (v1.7.2)
- [x] Updated all documentation to reflect 9 MCP servers (v1.7.2)
- [x] Implemented Agent Skills System with 8 skills (v1.8.0)
- [x] Created skill bundles: API (3), Frontend (2), Database (2), DevOps (1) (v1.8.0)
- [x] Documented skills vs commands vs agents patterns (v1.8.0)
- [x] Implemented 3 multi-agent orchestrators (v1.8.0)
- [x] Created fullstack-feature-workflow orchestrator (v1.8.0)
- [x] Created code-review-workflow orchestrator with parallel agents (v1.8.0)
- [x] Created refactoring-workflow orchestrator (v1.8.0)
- [x] Added confidence-based agent scoring system (v1.8.0)
- [x] Documented agent handoff protocols (v1.8.0)
- [x] Created comprehensive AGENT-SKILLS-RESEARCH.md (v1.8.0)
- [x] Added `/memory` command for persistent project memory (v1.9.0)
- [x] Added `/context` command for context management (v1.9.0)
- [x] Added `/architect` mode for design discussions (v1.9.0)
- [x] Added `/ask` mode for read-only questions (v1.9.0)
- [x] Added `/map` command for codebase mapping (v1.9.0)
- [x] Added `/rules` command with PROJECT-RULES.md template (v1.9.0)
- [x] Created `.claude/memory/MEMORY.md` for persistent memory (v1.9.0)
- [x] Added 6 new MCP servers (Slack, Postgres, SQLite, Redis, Sentry, Puppeteer) (v1.9.0)
- [x] Updated plugin to 15 MCP servers total (v1.9.0)
- [x] Updated plugin to 41 commands total (v1.9.0)

---

## Research Sources

Key resources that informed the STEROIDS roadmap:

- [Claude Code Plugins Documentation](https://code.claude.com/docs/en/plugins)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [Aider - AI Pair Programming](https://aider.chat/)
- [Cursor IDE Features](https://cursor.com/features)
- [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [VoltAgent Subagents Collection](https://github.com/VoltAgent/awesome-claude-code-subagents)

---

## Contributing

Have an idea? Add it to this TODO.md! When implementing items:
1. Move item from TODO to "In Progress" section
2. Create a branch for the feature
3. Update CHANGELOG.md when complete
4. Move item to "Completed" section
5. Bump version in plugin.json appropriately

## Notes

- Keep this file updated as priorities change
- Link related GitHub issues to TODO items
- Review quarterly and archive/remove outdated items
- Celebrate completed items! 🎉
