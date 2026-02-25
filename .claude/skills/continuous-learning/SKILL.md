---
name: continuous-learning
description: Extract patterns from successful sessions and evolve into reusable instincts
---

> **Auto-invoke when**: Pattern extraction after sessions, learning from mistakes, skill evolution requests, `/learn` or `/evolve` commands.
> **Skip when**: Normal development, tasks without reusable patterns, one-off fixes.

# Continuous Learning Skill

## Overview

This skill enables Claude to learn from successful problem-solving sessions and build a library of reusable patterns (instincts) that improve future performance.

## Core Concepts

### Instincts

Instincts are learned patterns extracted from successful sessions:

```json
{
  "id": "instinct_abc123",
  "pattern": "When encountering TypeScript strict mode errors in React components, first check for null/undefined handling",
  "context": "TypeScript + React",
  "confidence": 0.85,
  "source": "session_20250201_143022",
  "applications": 12,
  "successes": 10,
  "created": "2025-02-01T14:30:22Z",
  "lastUsed": "2025-02-01T18:45:00Z"
}
```

### Confidence Scoring

Confidence is calculated based on:
- **Initial extraction**: 0.5 (neutral)
- **Successful application**: +0.1 (max 0.95)
- **Failed application**: -0.15 (min 0.1)
- **User validation**: +0.2

### Pattern Categories

1. **Debugging Patterns**: Steps that solved specific error types
2. **Architecture Patterns**: Design decisions that worked well
3. **Tool Usage Patterns**: Effective tool combinations
4. **Communication Patterns**: Explanations that users understood

## Pattern Extraction Process

### 1. Session Analysis

When `/learn` is invoked or a session ends successfully:

```
Session Analysis Checklist:
□ Identify the main problem solved
□ Extract key decision points
□ Note tools used in sequence
□ Record user satisfaction signals
□ Identify reusable patterns
```

### 2. Pattern Validation

Before storing a pattern:

```
Validation Criteria:
□ Pattern is generalizable (not project-specific)
□ Pattern has clear trigger conditions
□ Pattern has measurable outcome
□ Pattern doesn't conflict with existing instincts
```

### 3. Instinct Storage

Store in `~/.claude/instincts/instincts.json`:

```json
{
  "version": "1.0",
  "lastUpdated": "2025-02-01T19:00:00Z",
  "instincts": [
    {
      "id": "instinct_001",
      "pattern": "...",
      "context": "...",
      "confidence": 0.75
    }
  ]
}
```

## Skill Evolution

### From Instincts to Skills

When multiple related instincts reach high confidence:

1. **Clustering**: Group instincts by context/pattern similarity
2. **Synthesis**: Combine into cohesive skill
3. **Validation**: Test synthesized skill
4. **Promotion**: Create skill file in `~/.claude/skills/learned/`

### Evolution Threshold

Evolve instincts to skill when:
- 5+ related instincts exist
- Average confidence > 0.8
- Combined applications > 20

## Commands

### `/learn`

Extract patterns from current session:

```
Usage: /learn [focus]

Examples:
  /learn              # Extract all patterns from session
  /learn debugging    # Focus on debugging patterns
  /learn architecture # Focus on design decisions
```

### `/evolve`

Analyze instincts and create skills:

```
Usage: /evolve [--dry-run]

Examples:
  /evolve           # Evolve ready instinct clusters
  /evolve --dry-run # Show what would be evolved
```

## Implementation

### Pattern Extraction Algorithm

```javascript
function extractPatterns(session) {
  const patterns = []

  // Find problem-solution pairs
  for (const exchange of session.exchanges) {
    if (exchange.type === 'problem_solved') {
      patterns.push({
        trigger: exchange.problem.description,
        solution: exchange.solution.steps,
        context: exchange.context,
        tools: exchange.tools_used
      })
    }
  }

  // Find repeated successful tool sequences
  const toolSequences = findRepeatedSequences(session.tool_calls)
  for (const seq of toolSequences) {
    if (seq.success_rate > 0.8) {
      patterns.push({
        type: 'tool_sequence',
        sequence: seq.tools,
        context: seq.context
      })
    }
  }

  return patterns
}
```

### Instinct Application

When starting a new task:

```javascript
function findApplicableInstincts(task, instincts) {
  return instincts
    .filter(i => contextMatches(task.context, i.context))
    .filter(i => i.confidence > 0.6)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5)
}
```

## Best Practices

### What Makes a Good Instinct

1. **Specific trigger**: "When X happens" not "Sometimes"
2. **Clear action**: "Do Y" not "Consider options"
3. **Measurable outcome**: "Results in Z" not "Improves things"

### What to Avoid

1. **Project-specific knowledge**: Variable names, file paths
2. **Outdated patterns**: Deprecated APIs, old syntax
3. **Conflicting instincts**: Multiple solutions to same problem

## Integration

### With Session Hooks

The session-start hook loads relevant instincts:

```javascript
// In session-start.js
const instincts = loadInstincts()
const applicable = findApplicableInstincts(currentContext, instincts)
if (applicable.length > 0) {
  console.error(`[Learning] ${applicable.length} instinct(s) may apply:`)
  applicable.forEach(i => console.error(`  - ${i.pattern}`))
}
```

### With Circuit Breaker

When circuit breaker triggers, record the failure pattern:

```javascript
// In circuit-breaker.js
recordFailurePattern({
  pattern: currentApproach,
  context: currentContext,
  reason: 'circuit_breaker_triggered'
})
```

## Storage Structure

```
~/.claude/
├── instincts/
│   ├── instincts.json      # Active instincts
│   ├── pending.json        # Instincts awaiting validation
│   └── archive/            # Deprecated instincts
│       └── instincts_*.json
└── skills/
    └── learned/            # Evolved skills
        └── *.md
```
