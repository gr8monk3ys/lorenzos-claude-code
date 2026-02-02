---
name: evolve
description: Evolve high-confidence instincts into reusable skills
---

# Instinct Evolution

You are analyzing accumulated instincts and evolving them into cohesive, reusable skills.

## Quick Usage

```bash
/evolve           # Analyze instincts and evolve eligible clusters
/evolve --dry-run # Preview what would be evolved without making changes
```

**When to use**: Periodically (weekly or after accumulating many instincts from `/learn`) to graduate proven patterns into permanent skills.

**Prerequisites**:
- Instincts file at `~/.claude/instincts/instincts.json`
- Instincts accumulated via `/learn` or session hooks

**Output**: New skill files in `~/.claude/skills/learned/` synthesized from related instincts.

**Evolution Criteria**:
- 5+ related instincts in a cluster
- Average confidence > 0.8
- Total applications > 20
- Success rate > 75%

## Process

### Step 1: Load Instincts

Read instincts from `~/.claude/instincts/instincts.json`

### Step 2: Cluster Analysis

Group instincts by:
- **Context similarity**: Same technology stack
- **Pattern similarity**: Related actions or outcomes
- **Trigger similarity**: Similar conditions

### Step 3: Evolution Eligibility

A cluster is ready for evolution when:
- [ ] Contains 5+ related instincts
- [ ] Average confidence > 0.8
- [ ] Total applications > 20
- [ ] Success rate > 75%

### Step 4: Skill Synthesis

For eligible clusters, create a skill file:

```markdown
---
name: [cluster-name]
description: [Synthesized description]
source: evolved
confidence: [Average confidence]
---

# [Skill Name]

## Triggers
[Combined trigger conditions]

## Patterns
[Synthesized patterns from instincts]

## Examples
[Best examples from high-confidence instincts]

## Source Instincts
[List of instinct IDs that were evolved]
```

### Step 5: Save and Archive

1. Save skill to `~/.claude/skills/learned/[name].md`
2. Archive evolved instincts (mark as `evolved: true`)
3. Update instincts.json

## Output Format

```
## Instinct Analysis

### Cluster 1: [Name]
- Instincts: N
- Avg Confidence: X.XX
- Applications: N
- Status: Ready for evolution ✓ / Not ready (reason)

### Cluster 2: [Name]
...

## Evolution Actions

### Evolved: [Skill Name]
- Source instincts: [IDs]
- Saved to: ~/.claude/skills/learned/[name].md

### Pending Evolution
- [Cluster]: Needs N more applications
- [Cluster]: Confidence too low (current: X.XX)

## Summary
- Instincts analyzed: N
- Clusters identified: N
- Skills evolved: N
- Skills pending: N
```

## Dry Run Mode

If `--dry-run` is specified, show what would happen without making changes:

```
## Dry Run Results

Would evolve:
- Cluster "typescript-patterns" → skill "typescript-mastery.md"
- Cluster "react-debugging" → skill "react-troubleshooting.md"

Would not evolve (not ready):
- Cluster "api-design" (only 3 instincts, need 5)
- Cluster "testing" (confidence 0.65, need 0.8)
```

## Example Evolution

**Input Instincts** (cluster: react-state):
```json
[
  {"pattern": "Use useCallback when passing functions to memoized children", "confidence": 0.85},
  {"pattern": "Prefer useState for component-local state", "confidence": 0.90},
  {"pattern": "Use useReducer for complex state with multiple sub-values", "confidence": 0.82},
  {"pattern": "Move shared state to context only when prop drilling exceeds 3 levels", "confidence": 0.88},
  {"pattern": "Use React Query for server state to avoid manual caching", "confidence": 0.91}
]
```

**Output Skill** (`react-state-mastery.md`):
```markdown
---
name: react-state-mastery
description: Patterns for effective React state management
source: evolved
confidence: 0.87
---

# React State Mastery

## When to Use

Apply these patterns when making state management decisions in React applications.

## Patterns

1. **Local vs Shared State**
   - Use `useState` for component-local state
   - Use `useReducer` for complex state with multiple sub-values
   - Lift to context only when prop drilling exceeds 3 levels

2. **Performance Optimization**
   - Use `useCallback` when passing functions to memoized children
   - Memoize expensive computations with `useMemo`

3. **Server State**
   - Use React Query for server state to avoid manual caching
   - Separate server state from UI state
```

Now analyze the instincts and evolve eligible clusters.
