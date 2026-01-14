# Claude Code Skills Guide

This plugin includes 5 auto-invoked skills that Claude automatically uses based on your task context. Unlike slash commands which you type explicitly, skills are activated by Claude when your request matches their description.

## How Skills Work

1. **At startup**: Claude loads skill names and descriptions (~30-50 tokens each)
2. **When you ask**: Claude matches your request to relevant skills
3. **Auto-invocation**: Claude loads the full skill context when needed
4. **Execution**: The skill's expertise guides Claude's response

## Available Skills

### 1. API Development (`api-development`)

**Auto-activates for:**
- Creating REST API endpoints
- API route implementation
- Endpoint testing
- Authentication/authorization
- Rate limiting
- API documentation

**Includes expertise in:**
- Next.js App Router API routes
- Zod validation
- HTTP methods & status codes
- Authentication patterns
- Rate limiting with Upstash

**Example triggers:**
- "Create a POST endpoint for user registration"
- "Add authentication to my API"
- "Generate tests for the users endpoint"

---

### 2. Frontend Development (`frontend-development`)

**Auto-activates for:**
- React/Vue/Angular/Svelte components
- Next.js pages and layouts
- Styling with Tailwind/CSS
- State management
- Accessibility implementation

**Includes expertise in:**
- Server vs Client components
- React 19 patterns
- Zustand/Context state management
- WCAG accessibility guidelines
- Performance optimization

**Example triggers:**
- "Create a user profile component"
- "Build a dashboard page with sidebar"
- "Make this form accessible"

---

### 3. Database Operations (`database-operations`)

**Auto-activates for:**
- Schema design
- Database migrations
- Type generation
- Query optimization
- Row Level Security (RLS)

**Includes expertise in:**
- Supabase PostgreSQL
- Prisma ORM
- Drizzle ORM
- Index strategies
- Migration safety patterns

**Example triggers:**
- "Design the schema for a blog"
- "Create a migration to add user roles"
- "Optimize this query for performance"

---

### 4. DevOps Automation (`devops-automation`)

**Auto-activates for:**
- Deployment configuration
- CI/CD pipelines
- Docker setup
- Environment management
- Infrastructure as code

**Includes expertise in:**
- Vercel/Netlify/AWS deployment
- GitHub Actions workflows
- Docker & Docker Compose
- Health checks
- Secrets management

**Example triggers:**
- "Set up GitHub Actions for CI/CD"
- "Create a Dockerfile for my Next.js app"
- "Configure environment variables for production"

---

### 5. Code Quality (`code-quality`)

**Auto-activates for:**
- Code review
- Test generation
- Refactoring
- Performance optimization
- Linting fixes

**Includes expertise in:**
- Security review patterns
- Testing strategies (unit/integration/E2E)
- Refactoring techniques
- Bundle size optimization
- React performance patterns

**Example triggers:**
- "Review this code for security issues"
- "Write tests for the auth service"
- "Refactor this function to be more maintainable"

---

## Skills vs Commands vs Agents

| Aspect | Skills | Commands | Agents |
|--------|--------|----------|--------|
| **Invocation** | Auto (Claude decides) | Manual (`/command`) | Auto (context-based) |
| **Scope** | Bundled capabilities | Single task | Specialized role |
| **Context** | Loaded on-demand | Always available | Loaded on-demand |
| **Best for** | Complex workflows | Quick actions | Deep expertise |

### When to Use Each

**Use Skills when:**
- You want Claude to automatically apply relevant expertise
- Your task spans multiple related capabilities
- You're working on a complex feature

**Use Commands when:**
- You need a specific action (e.g., `/api-new`)
- You want predictable, templated output
- You're scaffolding new code

**Use Agents when:**
- You need deep specialized knowledge
- The task requires investigation/research
- You're architecting or planning

## Skill Discovery

Claude automatically discovers skills in `.claude/skills/` directories. Each skill folder contains:

```
.claude/skills/
├── api-development/
│   └── SKILL.md
├── frontend-development/
│   └── SKILL.md
├── database-operations/
│   └── SKILL.md
├── devops-automation/
│   └── SKILL.md
└── code-quality/
    └── SKILL.md
```

## Creating Custom Skills

1. Create a folder in `.claude/skills/your-skill-name/`
2. Add a `SKILL.md` file with:

```markdown
---
name: your-skill-name
description: When to use this skill (helps Claude decide to activate it)
---

# Your Skill Name

Instructions and expertise for Claude to use when this skill is activated.
```

3. The skill will be auto-discovered on next Claude Code startup

## Disabling Auto-Invocation

If you want a skill to only be manually invocable, add to frontmatter:

```yaml
---
name: manual-only-skill
description: Description here
disable-model-invocation: true
---
```

## Resources

- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Anthropic Agent Skills Blog](https://www.anthropic.com/news/skills)
- [Skills Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
