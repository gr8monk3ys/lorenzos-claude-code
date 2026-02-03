# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Repository Overview

Minimal Claude Code plugin: **21 commands**, **6 agents**, **10 skills**, **15 hooks**, **4 MCP servers**, **2 scripts**. Focused on Next.js + React + Supabase development.

## Commands (21)

| Command              | Description              |
| -------------------- | ------------------------ |
| `/component-new`     | Create React component   |
| `/page-new`          | Create Next.js page      |
| `/hook-new`          | Create React hook        |
| `/api-new`           | Create API endpoint      |
| `/api-test`          | Test API endpoints       |
| `/test-new`          | Generate tests           |
| `/verify`            | Quality gates before PR  |
| `/plan`              | Feature planning         |
| `/lint`              | Code quality             |
| `/review`            | PR review                |
| `/deploy`            | Deployment config        |
| `/types-gen`         | Supabase types           |
| `/edge-function-new` | Edge functions           |
| `/handoff`           | Session handoff          |
| `/pickup`            | Context rehydration      |
| `/fixissue`          | End-to-end issue fix     |
| `/automerge`         | PR automation + merge    |
| `/memory`            | Persistent memory        |
| `/learn`             | Extract session patterns |
| `/evolve`            | Evolve instincts→skills  |
| `/research`          | Deep topic exploration   |

## Agents (6)

| Agent                  | Use Case                       |
| ---------------------- | ------------------------------ |
| `code-reviewer`        | PR reviews, security, quality  |
| `backend-architect`    | API design, database, security |
| `frontend-architect`   | React/Next.js patterns         |
| `build-error-resolver` | Fix TypeScript errors          |
| `test-strategist`      | Test planning                  |
| `devops-engineer`      | CI/CD, deployment              |

## Skills (10)

Auto-activating context enhancements:

- `api-development` - Next.js API patterns
- `frontend-development` - React best practices
- `database-operations` - Supabase patterns
- `verification-first` - Quality gates
- `memory-persistence` - Session continuity
- `code-quality` - Review patterns
- `circuit-breaker` - Prevent loops
- `micro-tasking` - Task breakdown
- `continuous-learning` - Pattern extraction & evolution
- `research` - Structured exploration workflow

## Hooks (15)

| Hook                       | Event              | Purpose               |
| -------------------------- | ------------------ | --------------------- |
| `setup.js`                 | Setup              | One-time init         |
| `session-start.js`         | SessionStart       | Context + instincts   |
| `session-end.js`           | Stop               | Session persistence   |
| `block-sensitive-files.js` | PreToolUse         | Security              |
| `validate-json.js`         | PreToolUse         | Prevent corruption    |
| `auto-format.js`           | PostToolUse        | Code formatting       |
| `circuit-breaker.js`       | PostToolUse        | Loop prevention       |
| `post-tool-failure.js`     | PostToolUseFailure | Error tracking        |
| `pre-compact.js`           | PreCompact         | Context preservation  |
| `notify-completion.js`     | Stop               | Notifications         |
| `skill-activator.js`       | UserPromptSubmit   | 5D skill evaluation   |
| `subagent-start.js`        | SubagentStart      | Track subagent spawn  |
| `subagent-stop.js`         | SubagentStop       | Track subagent done   |
| `permission-request.js`    | PermissionRequest  | Audit + auto-allow    |
| `status-line.js`           | Notification       | Token/context display |

## MCP Servers (4)

| Server       | Purpose               |
| ------------ | --------------------- |
| `context7`   | Library docs          |
| `memory`     | Cross-session context |
| `playwright` | Browser automation    |
| `github`     | PRs, issues           |

## Scripts (2)

| Script            | Purpose                        |
| ----------------- | ------------------------------ |
| `trash.js`        | Safe deletion (move to trash)  |
| `audit-logger.js` | JSON logging with rotation     |

## Code Standards

- TypeScript strict mode, no `any`
- Zod for validation
- Error format: `{ data, success: true }` or `{ error, success: false }`
- 2-space indent, single quotes, no semicolons

## Key Directories

```
.claude/commands/   # 21 commands (api/, context/, devops/, generation/, planning/, quality/, supabase/, testing/, ui/, workflow/)
.claude/agents/     # 6 agents
.claude/skills/     # 10 skills
.claude/hooks/      # 15 hooks (Node.js, cross-platform)
.claude/scripts/    # 2 utility scripts
.claude/logs/       # JSON audit logs
.claude/instincts/  # Learned patterns
.claude/memory/     # Project memory
```
