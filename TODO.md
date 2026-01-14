# TODO - Future Improvements

This file tracks potential improvements and enhancements for lorenzos-claude-code plugin.

**Current Version**: v1.13.0 | **59 commands** | **24 agents** | **14 skills** | **15 MCP servers**

---

## SUPERPOWERS ROADMAP

Based on research from [obra/superpowers](https://github.com/obra/superpowers), [Continuous-Claude](https://github.com/parcadei/Continuous-Claude-v3), and the Claude Code ecosystem.

### Autonomous Development Patterns (High Impact)

**Ralph Wiggum Pattern** - Autonomous iterative loops ✅ COMPLETED (v1.13.0)
*Source: [Official Anthropic Plugin](https://github.com/muratcankoylan/ralph-wiggum-marketer)*

- [x] Implement stateless resampling loop (reset context each iteration)
- [x] Add filesystem/git-based state persistence between iterations
- [x] Create "Principal Skinner" harness for safety governance
- [x] Add completion condition detection to exit loops gracefully
- [ ] Document YOLO mode requirements and risks (future)

**RIPER Workflow** - Structured development phases ✅ COMPLETED (v1.12.0)
- [x] Implement Research phase (gather requirements, analyze codebase)
- [x] Implement Innovate phase (explore solutions, prototype)
- [x] Implement Plan phase (via existing `/write-plan` command)
- [x] Implement Execute phase (via existing `/execute-plan` command)
- [x] Implement Review phase (quality gates, merge decisions)

### Advanced Context Management (High Impact)
*Source: [Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3)*

**Session Continuity:** (Partially Complete)
- [x] Implement ledger system for session progress tracking (`/ledger`)
- [x] Create YAML handoff documents for session transfers (`/handoff`, `/resume`)
- [ ] Add "compound, don't compact" context preservation
- [ ] Build cross-session memory with structured storage

**Token Efficiency:**
- [ ] Implement TLDR code analysis (AST → CallGraph → CFG → DFG → Slicing)
- [ ] Add intelligent file summarization to reduce token usage
- [ ] Create context budget monitoring and optimization
- [ ] Add lazy-loading for large codebases

### obra/superpowers Integration (High Impact) - Partially Complete
*Source: [obra/superpowers](https://github.com/obra/superpowers)*

**Git Worktree Workflow:** (Skill Added v1.13.0)
- [x] Add `git-worktree` skill for isolated development branches
- [ ] Add `/worktree` command (future CLI integration)
- [ ] Create verified test baseline before feature work
- [ ] Implement automatic branch cleanup after merge

**Enhanced Planning:** (Skills Added v1.13.0)
- [x] Add `micro-tasking` skill - Break work into 2-5 minute micro-tasks
- [x] Add `verification-first` skill - Add verification steps to each task
- [x] Add `spec-compliance` skill - Two-stage review (spec compliance)

**Parallel Agent Dispatching:** (Skill Added v1.13.0)
- [x] Add `parallel-dispatch` skill for concurrent work coordination
- [ ] CLI integration for subagent dispatch (future)
- [ ] Work aggregation from parallel agents (future)

---

## MCP Server Expansion

*Sources: [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers), [Best MCP Servers 2026](https://www.builder.io/blog/best-mcp-servers-2026)*

### Priority 1 - Essential Integrations ✅ COMPLETED (v1.12.0)

**Developer Productivity:**
- [x] Add GitHub MCP server (`@modelcontextprotocol/server-github`) - PRs, issues, CI/CD
- [x] Add Sequential Thinking MCP server - structured problem-solving
- [ ] Add Filesystem MCP server - enhanced file operations with permissions

**Databases:**
- [x] Add PostgreSQL MCP server (`@modelcontextprotocol/server-postgres`)
- [x] Add Redis MCP server - caching operations
- [x] Add MongoDB MCP server - document database

### Priority 2 - Enhanced Capabilities ✅ COMPLETED (v1.13.0)

**Design & Frontend:**
- [x] Add Figma MCP server (official Dev Mode) - design-to-code workflows
- [ ] Add Memory Bank MCP server - cross-session context retention (future)

**Project Management:**
- [x] Add Notion MCP server (`@anthropic/mcp-server-notion`)
- [x] Add Linear MCP server (`@linear/mcp-server`)
- [x] Add Slack MCP server - team communication

### Priority 3 - Infrastructure

**Cloud & DevOps:**
- [ ] Add Terraform MCP server - infrastructure as code
- [ ] Add Kubernetes MCP server - cluster management
- [ ] Add Docker MCP server - container operations
- [ ] Add AWS MCP suite (S3, DynamoDB, Lambda)

**Monitoring:**
- [ ] Add Sentry MCP server - error tracking
- [ ] Add Datadog MCP server - observability

---

## New Commands & Skills

### Workflow Commands

**Autonomous Development:** ✅ COMPLETED (v1.13.0)
- [x] Add `/wiggum` command - Start autonomous development loop
- [ ] Add `/harness` command - Configure safety guardrails (future)
- [ ] Add `/worktree` command - Git worktree management (future)

**Session Management:** ✅ COMPLETED (v1.12.0)
- [x] Add `/handoff` command - Create session transfer document
- [x] Add `/resume` command - Load previous session context
- [x] Add `/ledger` command - View/update session progress

### New Skills ✅ COMPLETED (v1.13.0)

**Development Patterns:**
- [x] Add `git-worktree` skill - Isolated branch workflows
- [x] Add `micro-tasking` skill - Break work into 2-5 min chunks
- [x] Add `parallel-dispatch` skill - Coordinate concurrent agents

**Quality Assurance:**
- [x] Add `verification-first` skill - Verify before claiming completion
- [x] Add `root-cause-analysis` skill - 4-phase debugging methodology
- [x] Add `spec-compliance` skill - Check work against requirements

---

## Documentation & Quality

### High Priority
- [ ] Add screenshots/GIFs demonstrating command outputs
- [ ] Create video tutorial for getting started
- [ ] Add unit tests for command prompt templates
- [ ] Document Claude Code 2.1.0 features (teleportation, hot-reload)

### Community
- [ ] Submit to [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [ ] Submit to [ccplugins marketplace](https://github.com/ccplugins/marketplace)
- [ ] Create Twitter/X announcement thread

---

## Experimental Ideas

### Claude Code 2.1.0 Features
- [ ] Explore session teleportation (`/teleport`, `/remote-env`)
- [ ] Implement real-time thinking block display
- [ ] Add hot-reloading for skills during development
- [ ] Explore wildcard permissioning patterns

### Advanced Patterns
- [ ] Voice command integration
- [ ] AI-powered command recommendation based on context
- [ ] Automatic command chaining (e.g., `/api-new` → `/api-test` → `/api-protect`)
- [ ] Plugin marketplace within the plugin

### CI/CD Integration
- [ ] Create read-only mode for code analysis in CI
- [ ] Add PR comment integration for automated reviews
- [ ] Document headless operation best practices

---

## Research Sources

Key resources informing this roadmap:

**Superpowers & Workflows:**
- [obra/superpowers](https://github.com/obra/superpowers) - Core skills library
- [Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3) - Context management
- [Ralph Wiggum Pattern](https://securetrajectories.substack.com/p/ralph-wiggum-principal-skinner-agent-reliability) - Autonomous loops

**Plugins & Extensions:**
- [awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins)
- [Claude Code Plugins Blog](https://claude.com/blog/claude-code-plugins)

**MCP Servers:**
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)
- [Best MCP Servers 2026](https://www.builder.io/blog/best-mcp-servers-2026)
- [MCPcat Guide](https://mcpcat.io/guides/best-mcp-servers-for-claude-code/)

**Official Docs:**
- [Claude Code Memory](https://code.claude.com/docs/en/memory)
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins)

---

## Contributing

Have an idea? Add it to this TODO.md!

1. Create a branch for the feature
2. Update CHANGELOG.md when complete
3. Bump version in plugin.json appropriately
