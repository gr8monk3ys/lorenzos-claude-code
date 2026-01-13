# TODO - Future Improvements

This file tracks potential improvements and enhancements for lorenzos-claude-code plugin.

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

### Agent Skills System (High Impact)
*Source: [Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)*

- [ ] Convert commands to Skills format for auto-invocation by context
- [ ] Create skill bundles: API Development, Frontend, Database, DevOps
- [ ] Add skill discovery based on conversation context
- [ ] Create composite skills that combine multiple capabilities
- [ ] Document skills vs commands vs subagents usage patterns

### MCP Server Expansion (High Impact)
*Sources: [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers), [mcpservers.org](https://mcpservers.org/)*

**Productivity & Project Management:**
- [ ] Add Notion MCP server (`@makenotion/notion-mcp-server`) - workspace management
- [ ] Add Linear MCP server - issue tracking integration
- [ ] Add GitHub MCP server (`@github/mcp`) - issues, PRs, discussions
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

### Multi-Agent Orchestration (Medium-High Impact)
*Source: [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)*

- [ ] Create workflow orchestrators for common patterns:
  - [ ] Full-stack feature workflow (plan → API → tests → frontend → docs)
  - [ ] Code review workflow (security → performance → style → summary)
  - [ ] Refactoring workflow (analyze → plan → execute → verify)
- [ ] Add confidence-based agent scoring (like official PR review plugin)
- [ ] Create agent handoff protocols for complex tasks
- [ ] Implement parallel agent execution for independent tasks

### Context Management (Medium Impact)
*Source: [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)*

- [ ] Implement structured note-taking for persistent memory
- [ ] Create just-in-time context loading with file references
- [ ] Add auto-compact summarization for long sessions
- [ ] Create memory types: semantic (facts), episodic (actions), procedural (rules)
- [ ] Add context budget management and optimization

### Aider-Inspired Features (Medium Impact)
*Source: [Aider](https://aider.chat/)*

- [ ] Add multi-file coordinated editing patterns
- [ ] Create codebase mapping/indexing command
- [ ] Add `/architect` mode for high-level design discussions
- [ ] Add `/ask` mode for questions without code changes
- [ ] Implement prompt caching for cost savings
- [ ] Add voice input support documentation

### Cursor-Inspired Features (Medium Impact)
*Source: [Cursor Features](https://cursor.com/features)*

- [ ] Create autonomy levels documentation (Tab → Cmd+K → Full Agent)
- [ ] Add `.cursorrules`-like project rules support
- [ ] Create codebase understanding/embedding patterns
- [ ] Add real-time error detection patterns
- [ ] Document multi-model selection strategies

---

## High Priority

### Documentation Enhancements
- [ ] Add screenshots/GIFs demonstrating command outputs in README.md
- [ ] Create visual demo of each agent's capabilities
- [ ] Add "Getting Started" video or tutorial
- [x] Include example use cases for each command with before/after code samples
- [x] Add troubleshooting section to README.md

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
