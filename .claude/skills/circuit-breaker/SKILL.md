---
name: circuit-breaker
description: Detect and prevent thrashing loops with automatic strategy pivots
---

> **Auto-invoke when**: Same error appearing multiple times, repeated file edits without progress, identical tool calls in sequence, declining success rate, getting stuck in loops, "this should work but doesn't" situations, repeated test failures.
> **Skip when**: Normal iterative development, intentional retry attempts, expected failure patterns during testing, debugging with deliberate approach changes.

# Circuit Breaker Skill

Detects and prevents "thrashing" - when Claude gets stuck in loops trying the same failing approaches repeatedly.

## Core Principle

**Stop digging when you're in a hole.** Recognize failure patterns early and change strategy rather than repeating the same failed approach.

## Detection Triggers

### Trigger 1: Repeated Errors (3+ occurrences)

**Pattern**: Same error message appearing 3 or more times

```markdown
## Error Repetition Detected

**Error signature**: [error message or pattern]
**Occurrences**: X times
**Attempts made**: [list of attempted fixes]

CIRCUIT BREAKER: Stop trying variations of the same fix.
```

### Trigger 2: File Edit Loops

**Pattern**: Same file edited 3+ times without measurable progress

```markdown
## Edit Loop Detected

**File**: [path/to/file.ts]
**Edit count**: X times this session
**Changes reverted**: Y times

CIRCUIT BREAKER: Step back and understand the file's role first.
```

### Trigger 3: Identical Tool Calls

**Pattern**: Same tool with same/similar parameters called repeatedly

```markdown
## Tool Call Loop Detected

**Tool**: [tool name]
**Similar calls**: X times
**Expected different result?**: No

CIRCUIT BREAKER: Same input = same output. Change the input.
```

### Trigger 4: Declining Success Rate

**Pattern**: Recent operations have lower success rate than earlier ones

```markdown
## Success Rate Declining

**Last 5 operations**: X failures
**Previous 5 operations**: Y failures
**Trend**: Deteriorating

CIRCUIT BREAKER: Approach is diverging from solution.
```

## The Circuit Breaker Protocol

When any trigger fires, follow this 4-step protocol:

### Step 1: STOP

**Immediately halt the current approach.**

Do NOT:

- Try "one more variation"
- Make "just a small tweak"
- Add another workaround
- Hope it works this time

### Step 2: ASSESS

**Document what's been tried.**

```markdown
## Thrashing Assessment

### What I've tried:

1. [Approach 1] - Result: [failed because...]
2. [Approach 2] - Result: [failed because...]
3. [Approach 3] - Result: [failed because...]

### Pattern observed:

[What do these failures have in common?]

### What I'm assuming:

- [Assumption 1]
- [Assumption 2]

### Which assumption might be wrong?

[Candidate assumption to challenge]
```

### Step 3: PIVOT

**Choose a fundamentally different approach.**

Options:

1. **Challenge assumptions** - What if my basic premise is wrong?
2. **Escalate to root-cause-analysis** - Use the systematic 4-phase protocol
3. **Request user input** - "I've tried X, Y, Z. Should I try A or B?"
4. **Step back further** - Understand the broader context
5. **Simplify** - Can we solve a simpler version first?

### Step 4: DOCUMENT

**Record the pattern for future reference.**

```markdown
## Lesson Learned

**Situation**: [what triggered the thrashing]
**Incorrect assumption**: [what I thought was true]
**Actual cause**: [what was really happening]
**Better approach**: [what would have worked faster]
```

## Thrashing Patterns to Recognize

### Pattern: "Just One More Try"

- **Symptom**: "This should work... let me try again"
- **Reality**: If it didn't work 3 times, a 4th attempt won't help
- **Recovery**: Stop and analyze why it's failing

### Pattern: "Shotgun Debugging"

- **Symptom**: Changing random things hoping something works
- **Reality**: Without understanding, you're making things worse
- **Recovery**: Use root-cause-analysis skill

### Pattern: "Assumption Lock"

- **Symptom**: Can't see alternative explanations
- **Reality**: Your mental model is blocking you
- **Recovery**: Explicitly list and challenge assumptions

### Pattern: "Tunnel Vision"

- **Symptom**: Focused on one file/function when problem is elsewhere
- **Reality**: Bug is in a different location
- **Recovery**: Step back and trace data flow

### Pattern: "Complexity Spiral"

- **Symptom**: Adding workarounds to workarounds
- **Reality**: Each layer adds more failure modes
- **Recovery**: Simplify - remove workarounds, fix root cause

## Recovery Strategies

### Strategy 1: Root Cause Escalation

When thrashing on a bug, invoke root-cause-analysis:

```markdown
PIVOT: Escalating to root-cause-analysis skill

## Observation Log

[Start Phase 1 of root-cause-analysis]
```

### Strategy 2: User Intervention Request

When uncertain about direction:

```markdown
## Requesting Guidance

I've attempted these approaches:

1. [Approach 1] - [why it failed]
2. [Approach 2] - [why it failed]
3. [Approach 3] - [why it failed]

I'm stuck because: [explanation]

Options I see:

- A: [option A description]
- B: [option B description]

Which direction should I pursue, or is there context I'm missing?
```

### Strategy 3: Simplification

When complexity is the enemy:

```markdown
## Simplification Attempt

### Original problem:

[Complex version]

### Simplified version:

[Simpler version to solve first]

### If simplified works:

[How to extend to full solution]
```

### Strategy 4: Fresh Perspective

When mentally blocked:

```markdown
## Fresh Perspective Attempt

### Explain like I'm new:

[Describe the problem as if explaining to someone unfamiliar]

### What would a junior developer try?

[Sometimes the "naive" approach works]

### What would a senior developer notice?

[What am I overlooking?]
```

## Integration with Other Skills

### With root-cause-analysis

- Circuit-breaker detects thrashing
- Escalates to root-cause-analysis for systematic investigation
- Root-cause-analysis provides structured debugging

### With verification-first

- Before claiming a fix works, verify
- Prevents "I think it's fixed" thrashing

### With strategic-compact

- After resolving thrashing, compact to preserve learnings
- Document what was learned before context loss

## Anti-Patterns

### Don't

- Continue after 3 failed attempts of same approach
- Add complexity to fix complexity
- Assume the error message is misleading
- Ignore the circuit-breaker trigger

### Do

- Stop at 3 failures and assess
- Simplify before adding
- Trust error messages as clues
- Follow the circuit-breaker protocol

## Metrics

Track these to measure thrashing:

| Metric               | Healthy | Warning  | Critical |
| -------------------- | ------- | -------- | -------- |
| Same error count     | 1-2     | 3        | 4+       |
| File re-edits        | 1-2     | 3        | 4+       |
| Tool retries         | 1-2     | 3-4      | 5+       |
| Time on single issue | <10min  | 10-20min | >20min   |

## Output Template

When circuit breaker triggers:

```markdown
## Circuit Breaker Triggered

**Trigger**: [which detection pattern]
**Evidence**: [specific observations]

### Thrashing Assessment

[Step 2 assessment]

### Pivot Decision

[Chosen recovery strategy]

### Next Action

[Specific next step using different approach]
```

## Remember

- **3 strikes and you're out** - Stop after 3 failed attempts
- **Different approach, not different variation** - Pivot means fundamentally change
- **The hole is deep enough** - Stop digging
- **Ask for help** - User input is a valid strategy
- **Document the lesson** - Don't repeat this pattern
