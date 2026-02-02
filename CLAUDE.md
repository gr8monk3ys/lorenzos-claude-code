# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Repository Overview

Minimal Claude Code plugin: **18 commands**, **6 agents**, **10 skills**, **9 hooks**, **4 MCP servers**. Focused on Next.js + React + Supabase development.

## Commands (18)

| Command              | Description             |
| -------------------- | ----------------------- |
| `/component-new`     | Create React component  |
| `/page-new`          | Create Next.js page     |
| `/hook-new`          | Create React hook       |
| `/api-new`           | Create API endpoint     |
| `/api-test`          | Test API endpoints      |
| `/test-new`          | Generate tests          |
| `/verify`            | Quality gates before PR |
| `/plan`              | Feature planning        |
| `/lint`              | Code quality            |
| `/review`            | PR review               |
| `/deploy`            | Deployment config       |
| `/types-gen`         | Supabase types          |
| `/edge-function-new` | Edge functions          |
| `/handoff`           | Session handoff         |
| `/memory`            | Persistent memory       |
| `/learn`             | Extract session patterns|
| `/evolve`            | Evolve instincts→skills |
| `/research`          | Deep topic exploration  |

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

## Hooks (9)

| Hook                       | Event            | Purpose              |
| -------------------------- | ---------------- | -------------------- |
| `session-start.js`         | SessionStart     | Context + instincts  |
| `session-end.js`           | Stop             | Session persistence  |
| `block-sensitive-files.js` | PreToolUse       | Security             |
| `validate-json.js`         | PreToolUse       | Prevent corruption   |
| `auto-format.js`           | PostToolUse      | Code formatting      |
| `circuit-breaker.js`       | PostToolUse      | Loop prevention      |
| `pre-compact.js`           | PreCompact       | Context preservation |
| `notify-completion.js`     | Stop             | Notifications        |
| `skill-activator.js`       | UserPromptSubmit | 5D skill evaluation  |

## MCP Servers (4)

| Server       | Purpose               |
| ------------ | --------------------- |
| `context7`   | Library docs          |
| `memory`     | Cross-session context |
| `playwright` | Browser automation    |
| `github`     | PRs, issues           |

## Code Standards

- TypeScript strict mode, no `any`
- Zod for validation
- Error format: `{ data, success: true }` or `{ error, success: false }`
- 2-space indent, single quotes, no semicolons

## Key Directories

```
.claude/commands/   # 18 commands (api/, context/, devops/, generation/, planning/, quality/, supabase/, testing/, ui/, workflow/)
.claude/agents/     # 6 agents
.claude/skills/     # 10 skills
.claude/hooks/      # 9 hooks (Node.js, cross-platform)
.claude/instincts/  # Learned patterns
.claude/memory/     # Project memory
```
