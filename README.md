# Lorenzo's Claude Code Plugin

[![npm version](https://img.shields.io/npm/v/@gr8monk3ys/claude-code-plugin.svg)](https://www.npmjs.com/package/@gr8monk3ys/claude-code-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@gr8monk3ys/claude-code-plugin.svg)](https://www.npmjs.com/package/@gr8monk3ys/claude-code-plugin)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)

**Claude Code plugin for Next.js + React + Supabase development.**

**21 commands** | **6 agents** | **8 skills** | **14 hooks** | **4 MCP servers**

Extends Claude Code's built-in capabilities with opinionated workflow commands, circuit-breaker loop prevention, and verification-first quality gates.

---

## Why This Plugin?

This plugin adds focused value on top of Claude Code's native features:

| Feature                | This Plugin                | Native Claude Code         |
| ---------------------- | -------------------------- | -------------------------- |
| **Workflow Commands**  | 21 (fixissue, verify, etc) | Basic slash commands       |
| **Circuit Breaker**    | Detects thrashing loops    | Improved but no guardrails |
| **Verification Gates** | Evidence-based completion  | Trust-based                |
| **5D Skill Activation**| Weighted confidence scoring| Keyword matching           |
| **Agent Enhancements** | Detailed review rubrics    | Basic agent prompts        |
| **MCP Servers**        | 4 (minimal context)       | Configurable               |

### Key Features

**Circuit Breaker** - Detects when Claude is stuck in a loop:

- Same error 3+ times? Stops and suggests pivot
- Same file edited 3+ times? Flags scope creep
- Extracts error signatures to avoid false negatives

**Verification First** - No "it should work" claims:

- 5-step gate: IDENTIFY -> RUN -> READ -> VERIFY -> CLAIM
- Requires actual command output, not mental simulation
- Blocks hedging language ("probably", "seems to")

**Skill Auto-Activation** - 5-dimensional prompt analysis:

- Keywords (2pts), Patterns (3pts), File paths (4pts), Directories (5pts), Intents (4pts)
- Auto-activates skills at 8+ points, suggests at 5+

---

## Quick Start

### Option 1: npm (Recommended)

```bash
# Install globally
npm install -g @gr8monk3ys/claude-code-plugin

# Run installer
lorenzo-claude install

# Verify installation
lorenzo-claude doctor
```

### Option 2: npx (No Install)

```bash
npx @gr8monk3ys/claude-code-plugin install
```

### Option 3: Manual

```bash
git clone https://github.com/gr8monk3ys/lorenzos-claude-code.git
cp -r lorenzos-claude-code/.claude/* ~/.claude/
```

---

## Commands

### UI & Components

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `/component-new` | Create React component with TypeScript |
| `/page-new`      | Create Next.js page with App Router    |
| `/hook-new`      | Create custom React hook               |

### API & Backend

| Command     | Description                             |
| ----------- | --------------------------------------- |
| `/api-new`  | Create API endpoint with Zod validation |
| `/api-test` | Generate API tests                      |

### Testing & Quality

| Command     | Description                         |
| ----------- | ----------------------------------- |
| `/test-new` | Generate test files                 |
| `/verify`   | Run 6-phase quality gates before PR |
| `/lint`     | Run linting                         |
| `/review`   | PR review checklist                 |

### Supabase

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `/types-gen`         | Generate TypeScript types from database |
| `/edge-function-new` | Create Supabase Edge Function           |

### Workflow

| Command      | Description                     |
| ------------ | ------------------------------- |
| `/plan`      | Create implementation plan      |
| `/deploy`    | Generate deployment config      |
| `/fixissue`  | End-to-end issue resolution     |
| `/automerge` | PR automation + merge           |
| `/handoff`   | Create session handoff document |
| `/pickup`    | Context rehydration             |
| `/memory`    | View/update persistent memory   |
| `/learn`     | Extract patterns from session   |
| `/evolve`    | Evolve instincts into skills    |
| `/research`  | Deep topic exploration          |

---

## Agents

These enhance Claude Code's built-in agent types with detailed review methodologies and scoring rubrics.

| Agent                  | Use Case                                   |
| ---------------------- | ------------------------------------------ |
| `code-reviewer`        | PR reviews, security, quality              |
| `backend-architect`    | API design, database architecture          |
| `frontend-architect`   | React/Next.js patterns, accessibility      |
| `build-error-resolver` | Fix TypeScript and build errors (<5% diff) |
| `test-strategist`      | Test planning and coverage                 |
| `devops-engineer`      | CI/CD, deployment                          |

---

## Skills

Auto-activate based on context (SKILL.md directory format):

| Skill                  | Purpose                         | Priority |
| ---------------------- | ------------------------------- | -------- |
| `circuit-breaker`      | Prevent infinite loops          | 95       |
| `verification-first`   | Quality gates before completion | 90       |
| `api-development`      | Next.js API patterns            | -        |
| `frontend-development` | React best practices            | -        |
| `database-operations`  | Supabase patterns               | -        |
| `code-quality`         | Code review patterns            | -        |
| `continuous-learning`  | Pattern extraction & evolution  | -        |
| `research`             | Structured exploration workflow | -        |

---

## Hooks

All hooks are cross-platform Node.js. Registered in `settings.json` with proper event matchers.

| Hook                    | Event              | Purpose                     |
| ----------------------- | ------------------ | --------------------------- |
| `session-start`         | SessionStart       | Load learned instincts      |
| `session-end`           | Stop               | Session cleanup             |
| `block-sensitive-files` | PreToolUse         | Prevent editing secrets     |
| `validate-json`         | PreToolUse         | Validate JSON before write  |
| `auto-format`           | PostToolUse        | Format code after edits     |
| `circuit-breaker`       | PostToolUse        | Detect stuck loops          |
| `post-tool-failure`     | PostToolUseFailure | Track failure patterns      |
| `pre-compact`           | PreCompact         | Save context before compact |
| `notify-completion`     | Stop               | Desktop notification        |
| `skill-activator`       | UserPromptSubmit   | 5D skill auto-evaluation    |
| `subagent-start`        | SubagentStart      | Track subagent spawn        |
| `subagent-stop`         | SubagentStop       | Track subagent completion   |
| `permission-request`    | PermissionRequest  | Audit + auto-allow          |
| `setup`                 | Setup              | One-time initialization     |

---

## Skill Auto-Evaluation

Prompts are analyzed across **5 dimensions** with weighted confidence scoring:

| Dimension   | Weight | Example                      |
|-------------|--------|------------------------------|
| Keywords    | 2pts   | "api", "component", "test"   |
| Patterns    | 3pts   | `route.ts`, `use[A-Z].*()` |
| File paths  | 4pts   | `app/api/users/route.ts`     |
| Directories | 5pts   | `prisma/`, `components/`     |
| Intents     | 4pts   | "create.*api", "fix.*bug"    |

**Thresholds:**
- **>=8 points**: Skill auto-activated
- **>=5 points**: Skill suggested
- **<5 points**: No recommendation

Configure rules in `.claude/hooks/skill-rules.json`.

---

## MCP Servers

Only 4 essential servers (minimal context overhead):

| Server       | Purpose               |
| ------------ | --------------------- |
| `context7`   | Library documentation |
| `memory`     | Cross-session memory  |
| `playwright` | Browser automation    |
| `github`     | PRs and issues        |

---

## CLI Commands

```bash
# Install plugin to ~/.claude/
lorenzo-claude install

# Update existing installation
lorenzo-claude update

# Verify installation health
lorenzo-claude doctor

# Remove plugin
lorenzo-claude uninstall

# Show version
lorenzo-claude version

# Show help
lorenzo-claude help
```

Short alias: `lcc` (e.g., `lcc install`)

---

## Requirements

- Claude Code 2.0.13+
- Node.js 18+

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

GPL-3.0

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=gr8monk3ys/lorenzos-claude-code&type=Date)](https://star-history.com/#gr8monk3ys/lorenzos-claude-code&Date)
