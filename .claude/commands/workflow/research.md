---
description: Deep exploration workflow for researching topics with structured output
model: claude-sonnet-4-5
---

# Research Workflow

You are conducting structured research to help the user understand a topic, evaluate options, or solve a problem.

## Process

### Step 1: Clarify Scope

If the topic is unclear, ask:
- What specific question are you trying to answer?
- What's the context (tech stack, constraints)?
- How deep should we go (overview, moderate, deep dive)?

### Step 2: Initial Discovery

Use WebSearch to gather initial information:
- Search for "[topic] overview" or "[topic] explained"
- Identify official documentation
- Note key terminology and concepts

### Step 3: Deep Exploration

Based on initial findings:
- Use Context7 for library documentation
- Use WebFetch for specific pages
- Compare alternatives if evaluating options

### Step 4: Validate & Verify

Cross-reference findings:
- Check source dates (prefer recent)
- Look for consensus across sources
- Identify conflicting information

### Step 5: Synthesize

Create structured output following this format:

```markdown
# Research: [Topic]

## Executive Summary
[2-3 sentences capturing the key takeaway]

## Background
[Brief context on why this topic matters]

## Key Findings

### Finding 1: [Title]
[Description with evidence and source citations]

### Finding 2: [Title]
[Description with evidence and source citations]

## Alternatives Comparison
[If evaluating options, include comparison table]

## Recommendations
[Clear, actionable recommendations with reasoning]

## Open Questions
[What remains uncertain or needs further research]

## Sources
[Numbered list of all sources with links]
```

## Research Depth Guide

**Quick Overview** (~5 min):
- 1-2 searches
- Read one authoritative source
- Provide basic summary

**Standard Research** (~15-30 min):
- 3-5 searches
- Read multiple sources
- Compare alternatives
- Detailed synthesis

**Deep Dive** (~1+ hour):
- Comprehensive search
- Read documentation thoroughly
- Check GitHub issues and discussions
- Provide expert-level analysis

## Quality Checklist

Before finalizing research:

- [ ] All findings have cited sources
- [ ] Sources are recent (within 2 years ideally)
- [ ] Official documentation checked
- [ ] Conflicting viewpoints addressed
- [ ] Clear recommendation provided
- [ ] Open questions acknowledged

## Example Usage

User: "Research the best way to handle forms in Next.js 15"

Research Output:
```markdown
# Research: Form Handling in Next.js 15

## Executive Summary
Next.js 15 introduces Server Actions as the recommended approach for form handling. This eliminates the need for API routes in most cases and provides progressive enhancement out of the box.

## Key Findings

### Server Actions are the primary recommendation
Next.js 15 makes Server Actions stable and the preferred pattern...
[Source: Next.js Documentation]

### React Hook Form remains valuable for complex validation
While Server Actions handle submission, React Hook Form + Zod provides excellent client-side validation...
[Source: React Hook Form docs, community consensus]

## Comparison

| Approach | Best For | Limitations |
|----------|----------|-------------|
| Server Actions | Simple forms, progressive enhancement | Limited client-side validation |
| Server Actions + RHF | Complex forms, real-time validation | More setup required |
| API Routes | Third-party integrations | More boilerplate |

## Recommendation
For most forms in Next.js 15, use Server Actions with progressive enhancement. Add React Hook Form only when you need complex real-time validation.

## Sources
1. [Next.js 15 Forms Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
2. [React Hook Form with Next.js](https://react-hook-form.com/get-started)
```

Now begin researching the provided topic.
