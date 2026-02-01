# Lorenzo's Claude Code Setup

Minimal Claude Code plugin for Next.js + React + Supabase development.

**15 commands** | **6 agents** | **8 skills** | **9 hooks** | **4 MCP servers**

## Install

```bash
/plugin marketplace add https://github.com/gr8monk3ys/lorenzos-claude-code
/plugin install lorenzos-claude-code
```

## Commands

### UI & Components

- `/component-new` - Create React component with TypeScript
- `/page-new` - Create Next.js page with App Router
- `/hook-new` - Create custom React hook

### API & Backend

- `/api-new` - Create API endpoint with Zod validation
- `/api-test` - Generate API tests

### Testing & Quality

- `/test-new` - Generate test files
- `/verify` - Run quality gates before PR
- `/lint` - Run linting
- `/review` - PR review checklist

### Supabase

- `/types-gen` - Generate TypeScript types from database
- `/edge-function-new` - Create Supabase Edge Function

### Workflow

- `/plan` - Create implementation plan
- `/deploy` - Generate deployment config
- `/handoff` - Create session handoff document
- `/memory` - View/update persistent memory

## Agents

| Agent                  | Use Case                              |
| ---------------------- | ------------------------------------- |
| `code-reviewer`        | PR reviews, security, quality         |
| `backend-architect`    | API design, database architecture     |
| `frontend-architect`   | React/Next.js patterns, accessibility |
| `build-error-resolver` | Fix TypeScript and build errors       |
| `test-strategist`      | Test planning and coverage            |
| `devops-engineer`      | CI/CD, deployment                     |

## Skills

Auto-activate based on context:

- **api-development** - Next.js API patterns
- **frontend-development** - React best practices
- **database-operations** - Supabase patterns
- **verification-first** - Quality gates before completion
- **memory-persistence** - Session context preservation
- **code-quality** - Code review patterns
- **circuit-breaker** - Prevent infinite loops
- **micro-tasking** - Break work into small tasks

## Hooks

| Hook                       | Purpose                     |
| -------------------------- | --------------------------- |
| `session-start.sh`         | Restore previous context    |
| `session-end.sh`           | Save session state          |
| `block-sensitive-files.sh` | Prevent editing secrets     |
| `validate-json.sh`         | Validate JSON before write  |
| `auto-format.sh`           | Format code after edits     |
| `circuit-breaker.sh`       | Detect stuck loops          |
| `pre-compact.sh`           | Save context before compact |
| `notify-completion.sh`     | Desktop notification        |
| `skill-activator.sh`       | Trigger skill hints         |

## MCP Servers

Only 4 essential servers (CLI-first approach):

| Server       | Purpose               |
| ------------ | --------------------- |
| `context7`   | Library documentation |
| `memory`     | Cross-session memory  |
| `playwright` | Browser automation    |
| `github`     | PRs and issues        |

## Requirements

- Claude Code 2.0.13+
- Node.js 18+

## License

GPL-3.0
