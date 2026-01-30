---
name: progressive-disclosure
description: Auto-activates for context-efficient information retrieval, large codebases, and when managing token limits
category: workflow
priority: 75
triggers:
  - patterns: ["large codebase", "context limit", "token", "summarize"]
  - keywords: ["overview first", "deep dive", "explore", "understand"]
---

# Progressive Disclosure Skill

Optimize context usage by loading information hierarchically: metadata first, details on-demand.

## Core Principle

**Never load full content upfront. Start with structure, expand as needed.**

```
Level 0: Index/Overview (always visible)
Level 1: Section summaries (load on interest)
Level 2: Full content (load only when needed)
```

## Activation Triggers

This skill activates when:
- Exploring unfamiliar codebases
- Working near context limits
- User asks for "overview" or "understanding"
- Multiple files need analysis
- Documentation review requested

## Progressive Loading Strategy

### For Codebases

```
1. First: Project structure (tree, package.json, entry points)
2. Then: File headers/exports (first 50 lines, export statements)
3. Finally: Full implementation (only files being modified)
```

### For Documentation

```
1. First: Table of contents / section headers
2. Then: Section summaries (first paragraph of each)
3. Finally: Full sections (only those relevant to task)
```

### For APIs

```
1. First: Endpoint list with methods
2. Then: Request/response schemas
3. Finally: Full implementation details
```

## Implementation Patterns

### Pattern 1: Index-First File Reading

Instead of reading entire files:
```
# Bad: Full file read
Read(src/components/Dashboard.tsx)  # 500 lines

# Good: Progressive disclosure
1. Glob(src/components/**/*.tsx)    # Get structure
2. Read first 30 lines of matches   # Get exports/interfaces
3. Read full file only if modifying # Full content when needed
```

### Pattern 2: Summarize Before Dive

When exploring:
```
1. Generate mental map of structure
2. Identify 2-3 most relevant areas
3. Deep dive only into those areas
4. Reference others by name only
```

### Pattern 3: Lazy Context Loading

```
# Maintain index in working memory
index = {
  "auth/": "Authentication - JWT, sessions",
  "api/": "REST endpoints - users, products, orders",
  "db/": "Database - Prisma models, migrations"
}

# Load details only when task requires
if task.involves("authentication"):
  load("auth/")  # Now read full content
```

## Context Budget Management

### Token Estimation
- 1 line code ≈ 10-15 tokens
- 100 lines ≈ 1K-1.5K tokens
- Average file (300 lines) ≈ 3K-4.5K tokens

### Budget Allocation
```
Total Context: 200K tokens
├── System prompt: ~10K (5%)
├── Tool definitions: ~20K (10%)
├── Conversation history: ~50K (25%)
└── Working space: ~120K (60%) ← Protect this!
```

### Progressive Budget

| Phase | Budget | Load |
|-------|--------|------|
| Discovery | 5K | Structure only |
| Planning | 10K | + Key interfaces |
| Implementation | 30K | + Files being modified |
| Review | 15K | + Related test files |

## Anti-Patterns to Avoid

1. **Full Repository Scan**: Don't read every file to "understand"
2. **Premature Deep Dive**: Don't read implementation before structure
3. **Context Hoarding**: Don't keep old file contents "just in case"
4. **Redundant Reads**: Don't re-read files already in context

## Commands That Embody This Skill

- `/context-budget` - Monitor and manage context usage
- `/map` - Generate codebase overview without full reads
- `/summarize` - Create summaries for context efficiency

## Integration with CLI-First Approach

Progressive disclosure complements CLI-first by:
1. Using CLI tools for quick metadata (ls, tree, head)
2. Deferring MCP tool loads until necessary
3. Preferring small, targeted file reads
4. Building mental models before full exploration

## Skill Output

When this skill activates, Claude will:
1. State the progressive loading strategy being used
2. Start with high-level overview
3. Ask before loading detailed content
4. Track approximate token usage
5. Suggest compaction at natural breakpoints
