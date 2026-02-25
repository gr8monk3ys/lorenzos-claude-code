---
name: research
description: Deep exploration workflow for researching topics, libraries, and solutions
---

> **Auto-invoke when**: Research requests, technology evaluation, best practices exploration, `/research` command, comparing libraries or frameworks.
> **Skip when**: Implementation tasks, bug fixes, code review, deployment work.

# Research Skill

## Overview

This skill provides a structured approach to researching topics, evaluating technologies, and exploring best practices through systematic multi-hop exploration.

## Research Process

### 1. Define Scope

Before researching, clearly define:

```
Research Scope:
- Topic: [What are we researching?]
- Goal: [What decision or understanding do we need?]
- Constraints: [Time, technology stack, requirements]
- Depth: [Surface overview | Moderate | Deep dive]
```

### 2. Multi-Hop Exploration

Use iterative exploration to build understanding:

```
Hop 1: Initial Discovery
├── WebSearch for overview
├── Identify key sources
└── Note terminology

Hop 2: Deep Dive
├── Read primary sources
├── Compare alternatives
└── Identify trade-offs

Hop 3: Validation
├── Find real-world examples
├── Check for gotchas
└── Verify currency of info

Hop 4: Synthesis
├── Summarize findings
├── Make recommendations
└── Document sources
```

### 3. Source Quality Assessment

Evaluate sources before trusting them:

```javascript
function assessSource(source) {
  return {
    authority: isOfficialDocs(source) || isKnownExpert(source),
    currency: getPublishDate(source) < 1_YEAR_AGO,
    relevance: matchesOurStack(source),
    depth: hasCodeExamples(source) && hasExplanations(source)
  }
}
```

**High-Quality Sources:**
- Official documentation
- GitHub READMEs with stars > 1000
- Known expert blogs (with dates)
- Conference talks from major events

**Low-Quality Sources:**
- Undated articles
- AI-generated content farms
- Outdated Stack Overflow answers
- Marketing content

### 4. Research Output Format

```markdown
# Research: [Topic]

## Summary
[2-3 sentence executive summary]

## Key Findings

### Finding 1: [Title]
- **What**: [Description]
- **Why it matters**: [Relevance]
- **Confidence**: High/Medium/Low
- **Source**: [Link]

### Finding 2: [Title]
...

## Alternatives Considered

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| A | ... | ... | Best for X |
| B | ... | ... | Best for Y |

## Risks & Gotchas
- [Known issue 1]
- [Known issue 2]

## Recommendation
[Clear actionable recommendation with reasoning]

## Sources
1. [Source 1](url) - [Why trusted]
2. [Source 2](url) - [Why trusted]
```

## Research Patterns

### Technology Evaluation

```
1. Understand the problem space
   └── What problem does this solve?

2. Survey options
   └── What alternatives exist?

3. Evaluate each option
   ├── Popularity/community size
   ├── Maintenance status
   ├── Learning curve
   ├── Performance characteristics
   └── Integration complexity

4. Deep dive on top candidates
   ├── Read getting started guides
   ├── Find real usage examples
   └── Check GitHub issues for red flags

5. Make recommendation
   └── Clear reasoning + trade-offs
```

### Best Practices Research

```
1. Start with official docs
   └── What do maintainers recommend?

2. Check community consensus
   └── What do experienced users prefer?

3. Find production examples
   └── How do successful projects do it?

4. Validate against our context
   └── Does this apply to our situation?

5. Document the pattern
   └── Why, when, and how to apply it
```

### Debugging Research

```
1. Reproduce the error
   └── Exact error message + context

2. Search for error message
   └── GitHub issues, Stack Overflow

3. Check recent changes
   └── Version updates, dependencies

4. Find similar problems
   └── Different symptoms, same cause?

5. Identify root cause
   └── Why does this happen?
```

## Tools Integration

### Using WebSearch

```
Good queries:
- "[library name] best practices 2025"
- "[error message]" site:github.com
- "[topic] vs [alternative] comparison"
- "[framework] production examples"

Bad queries:
- "how to do [vague thing]"
- "[library name]" (too broad)
- "best [category]" (subjective)
```

### Using Context7

```
Good uses:
- Getting up-to-date API documentation
- Finding code examples for specific patterns
- Checking current version syntax

Remember:
- Resolve library ID first
- Be specific in queries
- Cross-reference with official docs
```

### Using WebFetch

```
Good uses:
- Reading specific documentation pages
- Extracting code from GitHub files
- Checking package.json for versions

Remember:
- Verify the page is current
- Don't fetch login-required pages
- Summarize key points
```

## Research Depth Levels

### Surface Overview (5-10 min)

Goal: Understand what something is and if it's relevant.

- Read Wikipedia/overview article
- Check GitHub README
- Note key features and use cases

### Moderate Research (15-30 min)

Goal: Understand enough to make a decision.

- Read getting started guide
- Compare 2-3 alternatives
- Check for major issues/limitations

### Deep Dive (1+ hour)

Goal: Become proficient and make confident recommendations.

- Read multiple documentation sections
- Study example projects
- Understand internals/architecture
- Test locally if possible

## Common Pitfalls

1. **Confirmation bias**: Researching to prove a point, not find truth
2. **Outdated info**: Not checking when sources were written
3. **Echo chambers**: Only finding one perspective
4. **Overthinking**: Researching when action would be faster
5. **Underthinking**: Acting without basic research

## When to Stop Researching

- You can explain the topic to someone else
- You've found the same info from 3+ sources
- You have clear trade-offs documented
- You've addressed the original question
- Diminishing returns on new searches
