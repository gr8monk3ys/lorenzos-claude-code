# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin repository providing **18 slash commands** and **14 specialized AI agents** for modern web development (Next.js 15, TypeScript, React, Supabase).

## Key Files

- [.claude-plugin/plugin.json](.claude-plugin/plugin.json) - Plugin manifest (version, commands, agents, MCP servers). **All commands and agents must be registered here.**
- `.claude/commands/` - Slash command markdown files organized by category (api/, ui/, supabase/, misc/)
- `.claude/agents/` - Specialized AI agent prompt files

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
category: engineering  # optional
---
```

### MCP Servers
Pre-configured in plugin.json under `mcpServers`:
- **context7** - Library documentation access
- **playwright** - Browser automation
- **supabase** - Database operations (requires credentials)

## Development Commands

```bash
# Test locally
/plugin marketplace add /path/to/lorenzos-claude-code
/plugin install lorenzos-claude-code
/api-new users endpoint  # test a command
/plugin uninstall lorenzos-claude-code

# Publish (requires public GitHub repo)
git push -u origin main
# Users install: /plugin install gr8monk3ys/lorenzos-claude-code
```

### Version Management
Update `version` in [plugin.json](.claude-plugin/plugin.json#L3):
- **x.y.Z** - Bug fixes
- **x.Y.0** - New commands/agents
- **X.0.0** - Breaking changes

## Adding Commands/Agents

### New Command
1. Create `.claude/commands/<category>/<name>.md` with frontmatter
2. Add to `commands` array in plugin.json:
   ```json
   { "name": "cmd-name", "path": ".claude/commands/category/cmd-name.md", "description": "..." }
   ```

### New Agent
1. Create `.claude/agents/<name>.md` with frontmatter
2. Add to `agents` array in plugin.json:
   ```json
   { "name": "agent-name", "path": ".claude/agents/agent-name.md", "description": "..." }
   ```

### New MCP Server
Add to `mcpServers` in plugin.json:
```json
"server-name": { "command": "npx", "args": ["-y", "package-name"], "description": "..." }
```

## Design Philosophy

### Code Generation Standards
- **Type Safety**: No `any` types, TypeScript strict mode
- **Next.js 15**: App Router, Server Components, Server Actions
- **Validation**: Zod for runtime validation, validate before expensive operations
- **Error Format**: `{ data: T, success: true }` or `{ error: string, success: false }`

### Preferred Patterns
- Feature-based component organization
- Zustand for global state, React Context for feature-specific state
- Supabase RLS policies for security
- Edge Runtime compatible code

## Pre-Publish Checklist
- [ ] Valid JSON syntax in plugin.json (no trailing commas)
- [ ] All file paths in plugin.json exist
- [ ] Commands/agents tested locally
- [ ] Version bumped appropriately
