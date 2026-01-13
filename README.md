# Lorenzo's Claude Code Setup

My personal Claude Code configuration for productive web development. This plugin provides **41 slash commands**, **19 specialized AI agents**, **8 auto-activating skills**, **3 multi-agent orchestrators**, and **15 MCP servers** to supercharge your development workflow.

## Quick Install

```bash
# Step 1: Add the marketplace
/plugin marketplace add gr8monk3ys/lorenzos-claude-code

# Step 2: Install the plugin
/plugin install lorenzos-claude-code
```

## What's Inside

### 📋 Development Commands (17)

- `/new-task` - Analyze code for performance issues
- `/code-explain` (alias: `/explain`) - Generate detailed explanations
- `/code-optimize` (alias: `/optimize`) - Performance optimization
- `/code-cleanup` (alias: `/cleanup`) - Refactoring and cleanup
- `/feature-plan` (alias: `/plan`) - Feature implementation planning
- `/lint` - Linting and fixes
- `/docs-generate` (alias: `/docs`) - Documentation generation
- `/test-new` (alias: `/test`) - Generate test files (Jest, Vitest, Playwright)
- `/migration-new` (alias: `/migration`) - Create database migration files
- `/hook-new` (alias: `/hook`) - Create custom React hooks
- `/deploy` - Generate deployment configurations and CI/CD workflows
- `/wizard` - Interactive wizard to choose commands and build specs

**Context & Memory (NEW)**
- `/memory` - View/update Claude's persistent project memory
- `/context` - Manage conversation context (summarize, load, focus)
- `/architect` - High-level design discussions (no code changes)
- `/ask` - Ask questions about codebase (no code changes)
- `/map` - Generate codebase structure map
- `/rules` - Manage project-specific rules for Claude

### 🔌 API Commands (3)

- `/api-new` (alias: `/api`) - Create new API endpoints
- `/api-test` - Test API endpoints
- `/api-protect` - Add protection & validation

### 🎨 UI Commands (5)

- `/component-new` (alias: `/component`) - Create React components
- `/page-new` (alias: `/page`) - Create Next.js pages
- `/component-vue` - Create Vue 3 components with Composition API
- `/component-angular` - Create Angular standalone components
- `/component-svelte` - Create Svelte 5 components with runes

### 💾 Supabase Commands (2)

- `/types-gen` (alias: `/types`) - Generate TypeScript types
- `/edge-function-new` (alias: `/edge`) - Create Edge Functions

### 🤖 Specialized AI Agents (19)

**Architecture & Planning**
- **tech-stack-researcher** - Technology choice recommendations with trade-offs
- **system-architect** - Scalable system architecture design
- **backend-architect** - Backend systems with data integrity & security
- **frontend-architect** - Performant, accessible UI architecture
- **requirements-analyst** - Transform ideas into concrete specifications
- **database-architect** - Optimal database schemas and data models
- **api-architect** - RESTful and GraphQL API design

**Code Quality & Performance**
- **refactoring-expert** - Systematic refactoring and clean code
- **performance-engineer** - Measurement-driven optimization
- **performance-profiler** - Profile performance and analyze Core Web Vitals
- **security-engineer** - Vulnerability identification and security standards
- **code-reviewer** - Multi-aspect code review for security, performance, quality

**Testing & Quality**
- **test-strategist** - Plan testing strategies and analyze coverage gaps
- **accessibility-auditor** - Audit WCAG compliance and accessibility

**Infrastructure & Operations**
- **devops-engineer** - CI/CD pipelines and deployment strategies
- **migration-planner** - Plan safe database schema migrations

**Documentation & Research**
- **technical-writer** - Clear, comprehensive documentation
- **learning-guide** - Teaching programming concepts progressively
- **deep-research-agent** - Comprehensive research with adaptive strategies

### 🧠 Auto-Activating Skills (8)

Skills automatically enhance your workflow based on context - no commands needed.

**API Development**
- **api-creation** - Auto-applies Next.js 15 patterns, Zod validation, consistent error handling
- **api-testing** - Generates comprehensive tests with edge cases and error scenarios
- **api-security** - Applies authentication, rate limiting, OWASP protections

**Frontend Development**
- **component-patterns** - React/Vue/Angular/Svelte best practices, accessibility, performance
- **state-management** - Guides decisions between local state, context, and global stores

**Database Operations**
- **query-optimization** - N+1 prevention, indexing suggestions, efficient data fetching
- **migration-safety** - Ensures migrations are safe, reversible, follow zero-downtime patterns

**DevOps**
- **ci-cd-patterns** - GitHub Actions best practices, testing pipelines, deployment workflows

### 🔄 Multi-Agent Orchestrators (3)

Orchestrators coordinate multiple agents for complex workflows.

- **fullstack-feature-workflow** - End-to-end feature implementation
  - Planning (requirements-analyst → system-architect)
  - Build (api-architect + frontend-architect in parallel)
  - Verify (test-strategist → code-reviewer → technical-writer)

- **code-review-workflow** - Multi-perspective code review
  - Security review (security-engineer)
  - Performance review (performance-engineer)
  - Quality review (code-reviewer)
  - Accessibility review (accessibility-auditor)
  - Results aggregated with scoring

- **refactoring-workflow** - Safe, systematic refactoring
  - Analyze (code-reviewer + performance-profiler)
  - Plan (refactoring-expert + system-architect)
  - Execute (incremental changes with tests)
  - Verify (test-strategist + code-reviewer)

## Installation

### From GitHub (Recommended)

```bash
# Add marketplace
/plugin marketplace add gr8monk3ys/lorenzos-claude-code

# Install plugin
/plugin install lorenzos-claude-code
```

### From Local Clone (for development)

```bash
git clone https://github.com/gr8monk3ys/lorenzos-claude-code.git
cd lorenzos-claude-code

# Add as local marketplace
/plugin marketplace add /path/to/lorenzos-claude-code

# Install plugin
/plugin install lorenzos-claude-code
```

## Best For

- Next.js developers
- TypeScript projects
- Supabase users
- React, Vue, Angular, Svelte developers
- Full-stack engineers
- Anyone who wants AI-powered development automation

## Usage Examples

### Planning a Feature

```bash
/feature-plan Add user authentication with OAuth
```

**What you get:**
- Technical specifications document
- File structure recommendations
- Implementation steps broken down by complexity
- Security considerations and best practices

### Creating an API Endpoint

```bash
/api-new Create a POST endpoint for user registration
```

**What you get:**
- Complete Next.js API route with TypeScript
- Zod schema validation
- Proper error handling (400, 401, 500)
- Database integration patterns
- Security best practices

### Generating Tests

```bash
/test-new components/UserProfile.tsx
```

**What you get:**
- Comprehensive test file (Jest/Vitest/Playwright)
- Unit tests for all props and states
- Integration tests for user interactions
- Accessibility checks
- Mock data and fixtures

### Creating React Hooks

```bash
/hook-new Create a useAuth hook for managing user authentication
```

**What you get:**
- Custom hook with TypeScript types
- Proper dependency management
- Error handling patterns
- Usage examples
- Best practices for performance

### Database Migrations

```bash
/migration-new Add email verification fields to users table
```

**What you get:**
- Migration files (Prisma/Drizzle/Supabase/Knex)
- Up and down migrations
- Safe schema changes with data integrity
- Indexes and constraints
- Rollback procedures

### Deployment Configuration

```bash
/deploy Setup Vercel deployment with GitHub Actions
```

**What you get:**
- Platform-specific configs (Vercel/Netlify/AWS/Docker)
- CI/CD pipeline (GitHub Actions)
- Environment variable templates
- Health check endpoints
- Rollback scripts

### Research Tech Choices

Just ask Claude questions like:
- "Should I use WebSockets or SSE for real-time updates?"
- "How should I structure this multi-tenant database?"
- "What's the best library for handling payments?"

The **tech-stack-researcher** agent automatically activates and provides:
- Detailed comparisons with pros/cons
- Code examples for each option
- Performance and cost considerations
- Recommendation with rationale

## Philosophy

This setup emphasizes:
- **Type Safety**: Never uses `any` types
- **Best Practices**: Follows modern Next.js/React patterns
- **Productivity**: Reduces repetitive scaffolding
- **Research**: AI-powered tech decisions with evidence

## Requirements

- Claude Code 2.0.13+
- Works with any project (optimized for Next.js + Supabase)

## Automation Hooks

This plugin includes 6 pre-configured hooks to automate common workflows:

1. **block-sensitive-files.sh** - Prevents editing .env, credentials, and secret files
2. **auto-format.sh** - Auto-formats code with Prettier/Biome/ESLint after edits
3. **typecheck.sh** - Runs TypeScript type checking after editing .ts/.tsx files
4. **validate-json.sh** - Validates JSON syntax before writing
5. **auto-commit.sh** - Auto-commits changes when Claude completes a task
6. **notify-completion.sh** - Sends desktop notification on task completion

To enable hooks, add them to your `.claude/settings.local.json`. See [HOOKS.md](HOOKS.md) for detailed configuration.

## Customization

After installation, you can customize any command by editing files in `.claude/commands/` and `.claude/agents/`.

## MCP Server Configuration

This plugin includes **15 pre-configured MCP** (Model Context Protocol) servers that enhance Claude's capabilities:

### Available MCP Servers

**Documentation & Testing**
1. **Context7** - Up-to-date library documentation (no config needed)
2. **Playwright** - Browser automation and E2E testing (no config needed)
3. **Puppeteer** - Browser automation and scraping (no config needed)
4. **Chrome DevTools** - Debugging and performance analysis (no config needed)

**Databases**
5. **Supabase** - Supabase database operations (**requires config**)
6. **PostgreSQL** - PostgreSQL database queries (**requires config**)
7. **SQLite** - SQLite local database (no config needed)
8. **Redis** - Redis caching operations (**requires config**)

**Deployment & DevOps**
9. **Vercel** - Deployment management (**requires config**)
10. **Sentry** - Error tracking and monitoring (**requires config**)

**Integrations**
11. **GitHub** - Repository operations, issues, PRs (**requires config**)
12. **Stripe** - Payment processing API (**requires config**)
13. **Notion** - Workspace management (**requires config**)
14. **Linear** - Issue tracking (**requires config**)
15. **Slack** - Team communication (**requires config**)

### Configuring Supabase MCP Server

To use the Supabase MCP server, you need to provide your Supabase credentials:

**Option 1: Using settings.template.json (Recommended)**

1. Copy `.claude/settings.template.json` to your home directory:
   ```bash
   cp .claude/settings.template.json ~/.claude/settings.json
   ```

2. Edit `~/.claude/settings.json` and update the MCP section:
   ```json
   {
     "mcp": {
       "envVars": {
         "SUPABASE_URL": "https://your-project.supabase.co",
         "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key-here"
       }
     }
   }
   ```

3. Restart Claude Code

**Option 2: Environment Variables**

Set environment variables before launching Claude Code:
```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
claude-code
```

**Finding Your Supabase Credentials:**
- Log in to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Go to Settings → API
- Copy your Project URL and service_role key (⚠️ Keep this secret!)

### Verifying MCP Servers

After configuration, verify MCP servers are running:
```bash
# In Claude Code
/mcp status

# You should see all nine servers listed as "active"
```

### Troubleshooting MCP Servers

If MCP servers aren't working:
- Ensure you have internet connection (servers download on first use)
- Check that npm/npx is installed: `npx --version`
- Restart Claude Code after configuration changes
- Check MCP logs for specific errors
- For Supabase: Verify credentials are correct and service_role key (not anon key)

## Troubleshooting

### Plugin Not Loading

**Issue**: Commands or agents not appearing after installation

**Solutions**:
- Restart Claude Code completely
- Verify installation: `/plugin list`
- Check plugin.json syntax is valid (no trailing commas)
- Ensure all file paths in plugin.json exist
- Try reinstalling: `/plugin uninstall lorenzos-claude-code` then `/plugin install gr8monk3ys/lorenzos-claude-code`

### Commands Not Working

**Issue**: Command executes but produces errors or unexpected results

**Solutions**:
- Check Claude Code version (`2.0.13+` required)
- Verify you're using the command correctly (check command description)
- Ensure project context matches command expectations
- Try with explicit arguments instead of relying on context

### Agents Not Activating

**Issue**: Specialized agents not engaging when expected

**Solutions**:
- Agents activate based on context - be explicit in your requests
- Use keywords that match agent descriptions (e.g., "planning" for tech-stack-researcher)
- Check `.claude/agents/` files are present and have valid frontmatter
- Agents require appropriate context to activate (code files, planning discussions, etc.)

### MCP Servers Not Working

**Issue**: MCP servers unavailable (Context7, Playwright, Supabase, Stripe, Chrome DevTools, Vercel, GitHub, Notion, Linear)

**Solutions**:
- Restart Claude Code after plugin installation
- Check internet connection (MCP servers download on first use)
- Verify npm/npx is installed and accessible
- Check MCP server logs for specific errors
- Try manually: `npx -y @upstash/context7-mcp`
- For servers requiring credentials (Supabase, Stripe, Vercel, GitHub, Notion, Linear): Verify API tokens/keys are correctly configured in settings

### Performance Issues

**Issue**: Commands taking too long or timing out

**Solutions**:
- Use Haiku model for faster responses (edit command frontmatter: `model: claude-haiku-4`)
- Reduce scope of commands (smaller files, more specific requests)
- Check internet connection speed
- Verify no other resource-intensive processes running

### Installation from GitHub Fails

**Issue**: Cannot install from `gr8monk3ys/lorenzos-claude-code`

**Solutions**:
- Verify repository is public
- Check GitHub username spelling: `gr8monk3ys`
- Try full URL: `/plugin install https://github.com/gr8monk3ys/lorenzos-claude-code`
- Clear plugin cache and retry
- Check GitHub API rate limits

### Getting Help

Still having issues?
1. Check [GitHub Issues](https://github.com/gr8monk3ys/lorenzos-claude-code/issues)
2. Review [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
3. Create a new issue with:
   - Claude Code version
   - Operating system
   - Error message
   - Steps to reproduce

## Contributing

Feel free to:
- Fork and customize for your needs
- Submit issues or suggestions
- Share your improvements

## License

GPL-3.0 - Free software that ensures derivatives remain open source

## Author

Created by Lorenzo

---