# Claude Code Skills Guide

This plugin includes **19 auto-invoked skills** that Claude automatically uses based on your task context. Unlike slash commands which you type explicitly, skills are activated by Claude when your request matches their description.

## How Skills Work

1. **At startup**: Claude loads skill names and descriptions (~30-50 tokens each)
2. **When you ask**: Claude matches your request to relevant skills
3. **Auto-invocation**: Claude loads the full skill context when needed
4. **Execution**: The skill's expertise guides Claude's response

## Available Skills (19 Total)

### Core Development Skills

#### 1. API Development (`api-development`)

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

---

#### 2. Frontend Development (`frontend-development`)

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

---

#### 3. Database Operations (`database-operations`)

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

---

#### 4. DevOps Automation (`devops-automation`)

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

---

#### 5. Code Quality (`code-quality`)

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

---

### Testing & Validation Skills

#### 6. Webapp Testing (`webapp-testing`)

**Auto-activates for:**
- Browser automation
- E2E testing with Playwright
- Visual regression testing
- Cross-browser testing
- Test infrastructure setup

---

#### 7. Eval Harness (`eval-harness`)

**Auto-activates for:**
- Evaluation-driven development
- Pass@k metrics calculation
- Model-based grading
- Human evaluation workflows
- Quality benchmarking

---

### MCP & Skills Development

#### 8. MCP Builder (`mcp-builder`)

**Auto-activates for:**
- Building Model Context Protocol servers
- Extending Claude with custom tools
- MCP server configuration
- Tool integration patterns

---

#### 9. Skill Creator (`skill-creator`)

**Auto-activates for:**
- Creating new Claude Code skills
- Defining auto-invocation triggers
- Skill testing and refinement
- Documentation patterns

---

### Workflow Enhancement Skills

#### 10. Verification First (`verification-first`)

**Auto-activates for:**
- Finishing tasks and claiming completion
- Before marking work as done
- When asserting code works
- Wrapping up implementations

**Key Features:**
- 5-step verification gate process
- Red flags detection
- Evidence-based completion claims
- Anti-pattern identification

---

#### 11. Micro-Tasking (`micro-tasking`)

**Auto-activates for:**
- Breaking down large tasks
- Estimating task complexity
- Creating verifiable checkpoints
- Maintaining momentum

**Key Features:**
- 2-5 minute task chunks
- Clear completion criteria
- Progress tracking patterns

---

#### 12. Root Cause Analysis (`root-cause-analysis`)

**Auto-activates for:**
- Debugging issues
- Investigating errors
- Troubleshooting "not working" problems
- Stack trace analysis

**Key Features:**
- 4-phase methodology (Observe → Hypothesize → Test → Fix)
- Hypothesis ranking by probability
- Evidence-based conclusions

---

#### 13. Systematic Debugging (`systematic-debugging`) - NEW

**Auto-activates for:**
- Implementing fixes after root cause identified
- Applying debugging methodology
- Verifying bug fixes work

**Key Features:**
- Iron Law of verification (5-step process)
- Rationalization counters
- Red flag detection
- Evidence before claims

---

#### 14. Git Worktree (`git-worktree`)

**Auto-activates for:**
- Parallel development workflows
- Isolated branch work
- Multi-feature development
- Safe experimentation

---

#### 15. Parallel Dispatch (`parallel-dispatch`)

**Auto-activates for:**
- Coordinating multiple agents
- Concurrent task execution
- Multi-agent workflows
- Work distribution

---

#### 16. Spec Compliance (`spec-compliance`)

**Auto-activates for:**
- Verifying implementation matches specs
- Requirements validation
- Acceptance criteria checking
- Contract testing

---

### Session & Context Skills

#### 17. Memory Persistence (`memory-persistence`)

**Auto-activates for:**
- Session start (context restoration)
- Session end (state persistence)
- Cross-session continuity
- Context handoffs

---

#### 18. Strategic Compact (`strategic-compact`)

**Auto-activates for:**
- Context window management
- Natural breakpoint detection
- Edit operation tracking
- Compaction timing suggestions

**Key Features:**
- Tracks edit operations
- Suggests compaction at milestones
- Preserves critical context

---

#### 19. Continuous Learning (`continuous-learning`)

**Auto-activates for:**
- End of productive sessions
- After solving difficult problems
- After user corrections
- After discovering workarounds

**Key Features:**
- Pattern extraction from sessions
- Skill creation from learnings
- Circuit breaker for stuck states
- Quality gates for extracted knowledge

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
├── code-quality/
│   └── SKILL.md
├── webapp-testing/
│   └── SKILL.md
├── eval-harness/
│   └── SKILL.md
├── mcp-builder/
│   └── SKILL.md
├── skill-creator/
│   └── SKILL.md
├── verification-first/
│   └── SKILL.md
├── micro-tasking/
│   └── SKILL.md
├── root-cause-analysis/
│   └── SKILL.md
├── systematic-debugging/
│   └── SKILL.md
├── git-worktree/
│   └── SKILL.md
├── parallel-dispatch/
│   └── SKILL.md
├── spec-compliance/
│   └── SKILL.md
├── memory-persistence/
│   └── SKILL.md
├── strategic-compact/
│   └── SKILL.md
└── continuous-learning/
    └── SKILL.md
```

## Creating Custom Skills

1. Create a folder in `.claude/skills/your-skill-name/`
2. Add a `SKILL.md` file with:

```markdown
---
name: your-skill-name
description: |
  WHEN to auto-invoke: [specific triggering conditions]
  WHEN NOT to invoke: [conditions to skip this skill]
priority: 50  # Higher = checked first (default: 50)
---

# Your Skill Name

Instructions and expertise for Claude to use when this skill is activated.
```

3. The skill will be auto-discovered on next Claude Code startup

## Skill Priority System

Skills have configurable priority (default: 50):

| Priority | Use Case |
|----------|----------|
| 90+ | Critical workflow skills (verification-first) |
| 70-89 | Core development skills |
| 50-69 | Standard skills |
| 30-49 | Supplementary skills |
| <30 | Low-priority enhancements |

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
