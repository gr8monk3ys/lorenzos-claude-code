# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code plugin distribution repository named **lorenzos-claude-code**. It provides 14 slash commands and 11 specialized AI agents for modern web development, optimized for Next.js, TypeScript, React, and Supabase workflows.

## Repository Structure

```
.claude-plugin/
  ├── plugin.json          # Plugin manifest with command/agent definitions
  ├── marketplace.json     # Marketplace metadata
  └── MCP-SERVERS.md      # MCP server documentation

.claude/
  ├── commands/           # Slash command implementations
  │   ├── api/           # API-related commands (/api-new, /api-test, /api-protect)
  │   ├── ui/            # UI commands (/component-new, /page-new)
  │   ├── supabase/      # Supabase commands (/types-gen, /edge-function-new)
  │   ├── misc/          # General dev commands (code-explain, optimize, cleanup, etc.)
  │   └── new-task.md    # Task analysis command
  └── agents/            # Specialized AI agent prompts
      ├── tech-stack-researcher.md
      ├── system-architect.md
      ├── backend-architect.md
      ├── frontend-architect.md
      ├── requirements-analyst.md
      ├── refactoring-expert.md
      ├── performance-engineer.md
      ├── security-engineer.md
      ├── technical-writer.md
      ├── learning-guide.md
      └── deep-research-agent.md
```

## Plugin Architecture

### Command Structure
- Commands are markdown files with YAML frontmatter
- Frontmatter includes: `description`, `model` (e.g., `claude-sonnet-4-5`)
- Command content uses `$ARGUMENTS` placeholder for user input
- Each command provides implementation guidelines, requirements, and code structure templates

### Agent Structure
- Agents are markdown files with YAML frontmatter
- Frontmatter includes: `name`, `description` (activation criteria), `model`, `color`
- Agents activate automatically based on context matching their description
- Agent content defines role, responsibilities, methodology, and output format

### MCP Servers
The plugin includes 3 pre-configured MCP servers:
- **context7** - Up-to-date library documentation access
- **playwright** - Browser automation and testing
- **supabase** - Database operations and management

## Development Commands

### Testing the Plugin Locally

```bash
# Install from local directory
/plugin marketplace add /workspaces/lorenzos-claude-code
/plugin install lorenzos-claude-code

# Test a command
/api-new users endpoint

# Uninstall for testing changes
/plugin uninstall lorenzos-claude-code
```

### Publishing Workflow

```bash
# 1. Create GitHub repository (public visibility required)
# Repository name: lorenzos-claude-code
# GitHub username: gr8monk3ys

# 2. Push to GitHub
git remote add origin https://github.com/gr8monk3ys/lorenzos-claude-code.git
git push -u origin main

# 3. Users install with:
/plugin install gr8monk3ys/lorenzos-claude-code
```

### Version Management

Update version in [.claude-plugin/plugin.json](.claude-plugin/plugin.json#L3):
- **x.y.Z** - Bug fixes and minor tweaks
- **x.Y.0** - New commands or agents added
- **X.0.0** - Major restructuring or breaking changes

After version changes:
```bash
git add .claude-plugin/plugin.json
git commit -m "Bump version to X.Y.Z"
git push
```

## Command and Agent Development

### Adding a New Command

1. Create markdown file in appropriate subdirectory under `.claude/commands/`
2. Add YAML frontmatter with `description` and `model`
3. Write command prompt with guidelines and structure
4. Register in [.claude-plugin/plugin.json](.claude-plugin/plugin.json) under `commands` array
5. Test locally before pushing

Example command entry in plugin.json:
```json
{
  "name": "command-name",
  "path": ".claude/commands/category/command-name.md",
  "description": "Brief description shown in command list"
}
```

### Adding a New Agent

1. Create markdown file in `.claude/agents/`
2. Add YAML frontmatter with `name`, `description`, `model`, `color`
3. Write agent system prompt defining role and methodology
4. Register in [.claude-plugin/plugin.json](.claude-plugin/plugin.json) under `agents` array
5. Ensure description clearly defines activation criteria

Example agent entry in plugin.json:
```json
{
  "name": "agent-name",
  "path": ".claude/agents/agent-name.md",
  "description": "When to activate this agent and what it does"
}
```

### Agent Activation Patterns

Agents use context-based activation described in their frontmatter:
- **Planning/Research**: tech-stack-researcher activates when user mentions planning features or asks about technology choices
- **Architecture**: system-architect, backend-architect, frontend-architect activate on architecture discussions
- **Code Quality**: refactoring-expert, performance-engineer, security-engineer activate on relevant quality concerns
- **Documentation**: technical-writer activates on documentation tasks

## Design Philosophy

### Commands Philosophy
- **Type Safety**: Never use `any` types, enforce TypeScript strict mode
- **Next.js 15 Patterns**: Prefer App Router, Server Components, Server Actions
- **Production Ready**: Generate immediately usable, secure code
- **Validation First**: Use Zod for runtime validation, validate before expensive operations
- **Consistent Errors**: Structured error responses with proper HTTP status codes

### Agent Philosophy
- **Context Awareness**: Agents understand the Next.js/React/TypeScript ecosystem
- **Practical Recommendations**: 2-3 specific options with clear pros/cons
- **Integration Focus**: Consider how choices fit existing stack (Supabase, Edge Runtime, etc.)
- **Evidence-Based**: Back recommendations with benchmarks and real-world examples

### Code Patterns
- Feature-based component organization
- Zustand for global state, Context for feature-specific state
- API middleware patterns for validation and error handling
- Supabase RLS policies for security
- Edge Runtime compatibility considerations

## Key Files

- [plugin.json](.claude-plugin/plugin.json) - Plugin manifest, version, commands, agents, MCP servers
- [README.md](README.md) - User-facing documentation and installation instructions
- [PUBLISHING.md](PUBLISHING.md) - Complete publishing guide for GitHub distribution
- [QUICK-START.md](QUICK-START.md) - 5-minute quick start for publishing

## Common Modifications

### Updating Command Templates
Edit markdown files in `.claude/commands/` to change code generation patterns, validation rules, or implementation guidelines. Changes take effect when users update the plugin.

### Customizing Agent Behavior
Edit markdown files in `.claude/agents/` to adjust research methodology, output format, or technology preferences. Ensure frontmatter description accurately reflects activation criteria.

### Adding MCP Servers
Add to `mcpServers` object in [plugin.json](.claude-plugin/plugin.json#L136):
```json
"server-name": {
  "command": "npx",
  "args": ["-y", "package-name"],
  "description": "What this server provides"
}
```

## Testing Checklist

Before publishing changes:
- [ ] Test command execution with sample arguments
- [ ] Verify agent activation in appropriate contexts
- [ ] Check JSON syntax in plugin.json (no trailing commas)
- [ ] Validate all file paths in plugin.json match actual locations
- [ ] Test installation from local directory
- [ ] Update version number following semantic versioning
- [ ] Commit and push changes to GitHub
- [ ] Test installation from GitHub URL

## Target Audience

This plugin is optimized for developers working with:
- Next.js 15 (App Router)
- React 19 and TypeScript
- Supabase (database, auth, realtime, edge functions)
- Modern web development patterns
- Full-stack JavaScript/TypeScript projects
