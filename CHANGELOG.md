# Changelog

All notable changes to Lorenzo's Claude Code plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-12

### Added
- `/deploy` command - Generate deployment configurations and CI/CD workflows for Vercel, Netlify, AWS, Docker
- Comprehensive troubleshooting section in README with 6 common issue categories and solutions

### Changed
- Updated all command models from `claude-sonnet-4-5` to `claude-opus-4-5` for improved performance
- Updated license from MIT to GPL-3.0 to ensure derivatives remain open source
- Updated plugin description to reflect 18 commands (was 17)

### Improved
- Enhanced deployment workflow documentation with multiple platform support
- Better error handling guidance in troubleshooting section
- Consistent model usage across all commands for better reliability

## [1.1.0] - 2025-01-12

### Added
- `/test-new` command - Generate test files for Jest, Vitest, or Playwright with comprehensive test patterns
- `/migration-new` command - Create database migration files with support for Prisma, Drizzle, Supabase, Knex
- `/hook-new` command - Create custom React hooks with TypeScript and modern patterns

### Changed
- Generalized tech-stack-researcher agent to be framework-agnostic (removed app-specific references)
- Updated plugin description to reflect 17 commands (was 14)

### Improved
- Better support for multiple testing frameworks and ORMs
- Enhanced TypeScript patterns in generated code
- Comprehensive best practices documentation in new commands

## [1.0.0] - 2025-01-12

### Added
- Initial release of lorenzos-claude-code plugin
- 14 slash commands for development workflows:
  - 7 general development commands (`/new-task`, `/code-explain`, `/code-optimize`, `/code-cleanup`, `/feature-plan`, `/lint`, `/docs-generate`)
  - 3 API commands (`/api-new`, `/api-test`, `/api-protect`)
  - 2 UI commands (`/component-new`, `/page-new`)
  - 2 Supabase commands (`/types-gen`, `/edge-function-new`)
- 11 specialized AI agents:
  - Architecture & Planning: tech-stack-researcher, system-architect, backend-architect, frontend-architect, requirements-analyst
  - Code Quality: refactoring-expert, performance-engineer, security-engineer
  - Documentation: technical-writer, learning-guide, deep-research-agent
- 3 pre-configured MCP servers:
  - Context7 for library documentation
  - Playwright for browser automation
  - Supabase for database operations
- Comprehensive documentation (README.md, CLAUDE.md, PUBLISHING.md, QUICK-START.md)
- MIT License

### Philosophy
- Type Safety: Never uses `any` types
- Best Practices: Follows modern Next.js/React patterns
- Productivity: Reduces repetitive scaffolding
- Research: AI-powered tech decisions with evidence

---

## Future Releases

Changes will be documented here as new versions are released.

### Version Guidelines
- **MAJOR** (X.0.0) - Breaking changes or major restructuring
- **MINOR** (x.Y.0) - New commands, agents, or significant features
- **PATCH** (x.y.Z) - Bug fixes, documentation updates, minor improvements
