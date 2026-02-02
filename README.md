# Lorenzo's Claude Code Plugin

[![npm version](https://img.shields.io/npm/v/@gr8monk3ys/claude-code-plugin.svg)](https://www.npmjs.com/package/@gr8monk3ys/claude-code-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@gr8monk3ys/claude-code-plugin.svg)](https://www.npmjs.com/package/@gr8monk3ys/claude-code-plugin)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)

**Minimal Claude Code plugin for Next.js + React + Supabase development.**

**18 commands** | **6 agents** | **10 skills** | **9 hooks** | **4 MCP servers**

---

## Why This Plugin?

Most Claude Code plugins are bloated. This one is focused:

| Feature                | This Plugin                | Others                 |
| ---------------------- | -------------------------- | ---------------------- |
| **Commands**           | 18 (focused)               | 30-66 (bloated)        |
| **MCP Servers**        | 4 (minimal context)        | 8-20+ (context hog)    |
| **Circuit Breaker**    | Detects thrashing loops    | Usually missing        |
| **Verification Gates** | Evidence-based completion  | Trust-based            |
| **Micro-Tasking**      | 2-5 min task enforcement   | No enforcement         |
| **Target Stack**       | Next.js + React + Supabase | Everything (unfocused) |

### Innovative Features

**Circuit Breaker** - Detects when Claude is stuck in a loop:

- Same error 3+ times? Stops and suggests pivot
- Same file edited 3+ times? Flags scope creep
- Extracts error signatures to avoid false negatives

**Verification First** - No "it should work" claims:

- 5-step gate: IDENTIFY → RUN → READ → VERIFY → CLAIM
- Requires actual command output, not mental simulation
- Blocks hedging language ("probably", "seems to")

**Micro-Tasking** - Prevents scope creep:

- Tasks must be 2-5 minutes
- Decomposition templates for features, bugs, refactors
- If it takes >10 min, it wasn't properly decomposed

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

### Option 3: Plugin Marketplace

```bash
# In Claude Code
/plugin marketplace add https://github.com/gr8monk3ys/lorenzos-claude-code
/plugin install lorenzos-claude-code
```

### Option 4: Manual

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

| Command     | Description                     |
| ----------- | ------------------------------- |
| `/plan`     | Create implementation plan      |
| `/deploy`   | Generate deployment config      |
| `/handoff`  | Create session handoff document |
| `/memory`   | View/update persistent memory   |
| `/learn`    | Extract patterns from session   |
| `/evolve`   | Evolve instincts into skills    |
| `/research` | Deep topic exploration          |

---

## Agents

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

Auto-activate based on context:

| Skill                  | Purpose                         | Priority |
| ---------------------- | ------------------------------- | -------- |
| `circuit-breaker`      | Prevent infinite loops          | 95       |
| `verification-first`   | Quality gates before completion | 90       |
| `micro-tasking`        | Break work into small tasks     | -        |
| `api-development`      | Next.js API patterns            | -        |
| `frontend-development` | React best practices            | -        |
| `database-operations`  | Supabase patterns               | -        |
| `memory-persistence`   | Session context preservation    | -        |
| `code-quality`         | Code review patterns            | -        |
| `continuous-learning`  | Pattern extraction & evolution  | -        |
| `research`             | Structured exploration workflow | -        |

---

## Hooks

| Hook                    | Event            | Purpose                     |
| ----------------------- | ---------------- | --------------------------- |
| `session-start`         | SessionStart     | Restore previous context    |
| `session-end`           | Stop             | Save session state          |
| `block-sensitive-files` | PreToolUse       | Prevent editing secrets     |
| `validate-json`         | PreToolUse       | Validate JSON before write  |
| `auto-format`           | PostToolUse      | Format code after edits     |
| `circuit-breaker`       | PostToolUse      | Detect stuck loops          |
| `pre-compact`           | PreCompact       | Save context before compact |
| `notify-completion`     | Stop             | Desktop notification        |
| `skill-activator`       | UserPromptSubmit | Auto-evaluate & suggest skills |

---

## Skill Auto-Evaluation (NEW)

Unlike other plugins that use simple keyword matching, this plugin analyzes prompts across **5 dimensions** with weighted confidence scoring:

| Dimension | Weight | Example |
|-----------|--------|---------|
| Keywords | 2pts | "api", "component", "test" |
| Patterns | 3pts | `route.ts`, `use[A-Z].*()` |
| File paths | 4pts | `app/api/users/route.ts` |
| Directories | 5pts | `prisma/`, `components/` |
| Intents | 4pts | "create.*api", "fix.*bug" |

**Thresholds:**
- **≥8 points**: Skill auto-activated
- **≥5 points**: Skill suggested
- **<5 points**: No recommendation

**Example output:**
```
Prompt: "Fix the bug in app/api/users/route.ts - keeps failing"

<skill-evaluation>
  <skill name="circuit-breaker" confidence="24" status="activate">
    <matches>
      keyword:failing (+2pts)
      keyword:keeps (+2pts)
      pattern:same\s+error (+3pts)
      ...
    </matches>
  </skill>
  <skill name="api-development" confidence="24" status="activate">
    <matches>
      filepath:app/api/users/route.ts (+4pts)
      directory:app/api (+5pts)
      ...
    </matches>
  </skill>
</skill-evaluation>
```

Configure rules in `.claude/hooks/skill-rules.json`.

---

## MCP Servers

Only 4 essential servers (CLI-first approach):

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

## Comparison to Alternatives

| Feature            | This Plugin            | everything-claude-code | SuperClaude     |
| ------------------ | ---------------------- | ---------------------- | --------------- |
| Focus              | Next.js/React/Supabase | General purpose        | General purpose |
| Commands           | 18                     | 20+                    | 30              |
| Agents             | 6                      | 15+                    | 16              |
| MCP Servers        | 4                      | 8+                     | 8               |
| Circuit Breaker    | Yes (innovative)       | Basic                  | No              |
| Verification Gates | Yes (5-step)           | Basic                  | No              |
| Micro-Tasking      | Yes (2-5 min)          | No                     | No              |
| Install Method     | npm, plugin, manual    | Plugin, manual         | pip, npm        |
| Context Overhead   | Low                    | Medium                 | High            |

**Choose this plugin if:**

- You work primarily with Next.js + React + Supabase
- You want guardrails against AI failure modes
- You prefer minimal context overhead

**Choose alternatives if:**

- You need multi-language support (Go, Rust, Python)
- You want deep research workflows
- You prefer maximum features over focus

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
