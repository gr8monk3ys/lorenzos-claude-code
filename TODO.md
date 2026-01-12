# TODO - Future Improvements

This file tracks potential improvements and enhancements for lorenzos-claude-code plugin.

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

## Medium Priority

### Agent Enhancements
- [ ] Add "database-architect" agent for complex schema design
- [ ] Add "devops-engineer" agent for CI/CD and infrastructure
- [ ] Add "api-architect" agent focused on REST/GraphQL design
- [x] Review agent model assignments (sonnet vs haiku) for cost optimization

### Developer Experience
- [x] Add `.claude/settings.template.json` with recommended settings
- [ ] Create example project template using the plugin
- [ ] Add command aliases (e.g., `/api` → `/api-new`)
- [ ] Add interactive prompts for commands with multiple options

### MCP Servers
- [ ] Research and add Vercel MCP server when available
- [ ] Research and add Stripe MCP server when available
- [ ] Add Chrome DevTools MCP server when available
- [ ] Document how to configure MCP server environment variables

## Low Priority

### Community & Marketing
- [ ] Submit to Claude Code Plugins Marketplace (https://claudecodemarketplace.com/)
- [ ] Submit to CC Plugins Curated Marketplace (https://github.com/ccplugins/marketplace)
- [ ] Create Twitter/X announcement thread with examples
- [ ] Create blog post explaining the plugin's architecture
- [ ] Add "Showcase" section to README with community examples

### Advanced Features
- [ ] Add plugin settings/preferences file for user customization
- [ ] Support for multiple framework presets (Vue, Angular, Svelte)
- [ ] Add command history and favorites
- [ ] Create interactive command builder/wizard
- [ ] Add telemetry (opt-in) to understand command usage

### Testing & Quality Assurance
- [ ] Set up automated testing for command templates
- [ ] Add linting for markdown files
- [ ] Create test suite for agent prompt validation
- [ ] Add pre-commit hooks for quality checks
- [ ] Set up GitHub Actions for automated testing

### Internationalization
- [ ] Add support for multiple languages in command descriptions
- [ ] Translate README.md to Spanish, French, German, Japanese
- [ ] Consider multi-language agent responses

## Ideas & Research

### Experimental Features
- [ ] Voice command integration for slash commands
- [ ] Integration with GitHub Copilot for enhanced suggestions
- [ ] Plugin marketplace within the plugin (meta!)
- [ ] AI-powered command recommendation based on code context
- [ ] Automatic command chaining (e.g., `/api-new` → `/api-test` → `/api-protect`)

### Alternative Approaches
- [ ] Investigate command composition patterns
- [ ] Research plugin extension system for community commands
- [ ] Consider plugin themes/presets for different tech stacks
- [ ] Explore agent specialization based on project type detection

### Performance Optimizations
- [ ] Benchmark agent response times
- [ ] Optimize MCP server startup times
- [ ] Cache frequently used command templates
- [ ] Lazy-load agent prompts

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
