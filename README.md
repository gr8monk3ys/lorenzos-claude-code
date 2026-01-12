# Lorenzo's Claude Code Setup

My personal Claude Code configuration for productive web development. This plugin provides **18 slash commands** and **11 specialized AI agents** to supercharge your development workflow.

## Quick Install

```bash
# Step 1: Add the marketplace
/plugin marketplace add gr8monk3ys/lorenzos-claude-code

# Step 2: Install the plugin
/plugin install lorenzos-claude-code
```

## What's Inside

### 📋 Development Commands (11)

- `/new-task` - Analyze code for performance issues
- `/code-explain` - Generate detailed explanations
- `/code-optimize` - Performance optimization
- `/code-cleanup` - Refactoring and cleanup
- `/feature-plan` - Feature implementation planning
- `/lint` - Linting and fixes
- `/docs-generate` - Documentation generation
- `/test-new` - Generate test files (Jest, Vitest, Playwright)
- `/migration-new` - Create database migration files
- `/hook-new` - Create custom React hooks
- `/deploy` - Generate deployment configurations and CI/CD workflows

### 🔌 API Commands (3)

- `/api-new` - Create new API endpoints
- `/api-test` - Test API endpoints
- `/api-protect` - Add protection & validation

### 🎨 UI Commands (2)

- `/component-new` - Create React components
- `/page-new` - Create Next.js pages

### 💾 Supabase Commands (2)

- `/types-gen` - Generate TypeScript types
- `/edge-function-new` - Create Edge Functions

### 🤖 Specialized AI Agents (11)

**Architecture & Planning**
- **tech-stack-researcher** - Technology choice recommendations with trade-offs
- **system-architect** - Scalable system architecture design
- **backend-architect** - Backend systems with data integrity & security
- **frontend-architect** - Performant, accessible UI architecture
- **requirements-analyst** - Transform ideas into concrete specifications

**Code Quality & Performance**
- **refactoring-expert** - Systematic refactoring and clean code
- **performance-engineer** - Measurement-driven optimization
- **security-engineer** - Vulnerability identification and security standards

**Documentation & Research**
- **technical-writer** - Clear, comprehensive documentation
- **learning-guide** - Teaching programming concepts progressively
- **deep-research-agent** - Comprehensive research with adaptive strategies

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
- React developers
- Full-stack engineers

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

## Customization

After installation, you can customize any command by editing files in `.claude/commands/` and `.claude/agents/`.

## MCP Server Configuration

This plugin includes 3 pre-configured MCP (Model Context Protocol) servers that enhance Claude's capabilities:

### Available MCP Servers

1. **Context7** - Up-to-date library documentation
   - Provides current docs for any npm package or library
   - No configuration needed - works out of the box

2. **Playwright** - Browser automation and E2E testing
   - Browser automation capabilities
   - Web scraping and testing support
   - No configuration needed

3. **Supabase** - Database operations and management
   - Direct database access and queries
   - Schema inspection and management
   - **Requires configuration** (see below)

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

# You should see all three servers listed as "active"
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

**Issue**: Context7, Playwright, or Supabase MCP servers unavailable

**Solutions**:
- Restart Claude Code after plugin installation
- Check internet connection (MCP servers download on first use)
- Verify npm/npx is installed and accessible
- Check MCP server logs for specific errors
- Try manually: `npx -y @upstash/context7-mcp`

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