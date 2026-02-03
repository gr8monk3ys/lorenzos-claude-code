---
description: Extract reusable patterns from the current session
model: claude-sonnet-4-5
---

# Pattern Learning

You are extracting reusable patterns from this session to improve future performance.

## Quick Usage

```bash
/learn              # Extract all patterns from this session
/learn debugging    # Focus on debugging patterns only
/learn architecture # Focus on design decisions
```

**When to use**: After solving a tricky problem, making a key decision, or finding an effective approach that could help in future sessions.

**Output**: New instincts saved to `~/.claude/instincts/instincts.json` with `confidence: 0.5` (new patterns start low and increase with successful applications).

**Connection to /evolve**: Once instincts accumulate enough applications (>20) and high confidence (>0.8), use `/evolve` to synthesize them into reusable skills.

## Process

### Step 1: Session Analysis

Review the current session and identify:

1. **Problems Solved**: What issues were addressed?
2. **Key Decisions**: What architectural or design choices were made?
3. **Tool Sequences**: What tool combinations worked well?
4. **User Feedback**: What did the user like or dislike?

### Step 2: Pattern Extraction

For each significant insight, create an instinct:

```json
{
  "pattern": "[Clear description of when and what to do]",
  "context": "[Technology stack or situation]",
  "confidence": 0.5,
  "source": "[Current session ID]"
}
```

### Step 3: Validation

Before saving, verify:
- [ ] Pattern is generalizable (not project-specific)
- [ ] Pattern has clear trigger conditions
- [ ] Pattern doesn't duplicate existing instincts
- [ ] Pattern aligns with best practices

### Step 4: Storage

Save new instincts to `~/.claude/instincts/instincts.json`

## Output Format

After extraction, report:

```
## Patterns Extracted

### Pattern 1: [Title]
- **When**: [Trigger condition]
- **Do**: [Action to take]
- **Why**: [Expected outcome]
- **Confidence**: 0.5 (new)

### Pattern 2: [Title]
...

## Summary
- Patterns extracted: N
- Categories: [debugging, architecture, etc.]
- Saved to: ~/.claude/instincts/instincts.json
```

## Focus Areas

If a focus is provided (e.g., `/learn debugging`), prioritize patterns in that category:

- **debugging**: Error resolution, investigation techniques
- **architecture**: Design decisions, structural patterns
- **performance**: Optimization techniques, efficiency patterns
- **testing**: Test strategies, coverage patterns
- **communication**: Explanation techniques, documentation patterns

## Example Extraction

**Session Context**: Fixed TypeScript errors in React component

**Extracted Pattern**:
```json
{
  "id": "instinct_20250201_001",
  "pattern": "When encountering 'Object is possibly undefined' in TypeScript React, add optional chaining (?.) before accessing nested properties instead of adding null checks",
  "context": "TypeScript + React",
  "confidence": 0.5,
  "source": "session_20250201_143022",
  "applications": 0,
  "successes": 0,
  "created": "2025-02-01T14:30:22Z"
}
```

Now analyze this session and extract reusable patterns.
