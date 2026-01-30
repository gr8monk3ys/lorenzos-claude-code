---
name: auto-test-prompt
description: |
  WHEN to auto-invoke: After feature completion, bug fixes, new component creation, when user says "done", "completed", "implemented", "finished", "works now", uses checkmarks (✅), or marks tasks complete.
  WHEN NOT to invoke: During exploration, when tests already written for the change, trivial changes (typos, comments), documentation-only work, planning discussions.
category: quality
priority: 75
triggers:
  - patterns:
      ["✅", "done", "completed", "implemented", "finished", "fixed", "works"]
  - keywords: ["feature complete", "bug fixed", "ready for review", "PR ready"]
---

# Auto Test Prompt Skill

**Steinberger's Principle:** "Ask the model to write tests after each feature/fix is done. Use the same context."

## Core Principle

When a feature or fix is completed, the context is maximally rich with implementation details. This is the optimal moment to write tests because:

1. **Fresh context** - All implementation details are in working memory
2. **Edge case awareness** - You just handled them in the implementation
3. **Error understanding** - You know what can go wrong
4. **Integration knowledge** - You understand how components interact

## When to Prompt for Tests

Detect completion signals and suggest test writing:

### Completion Indicators

- Explicit: "done", "completed", "implemented", "finished", "works now"
- Symbols: ✅, ☑️, [x], (done)
- Phrases: "feature complete", "bug fixed", "ready for review"
- Actions: About to commit, creating PR, marking task complete

### Response Template

When detecting completion, suggest:

```
I notice you've completed [FEATURE/FIX]. While the implementation details are fresh, would you like me to write tests for this?

**Suggested test coverage:**
- [ ] Unit tests for [specific functions/logic]
- [ ] Integration tests for [component interactions]
- [ ] Edge cases: [specific scenarios identified during implementation]

This leverages Steinberger's principle: tests are most effective when written immediately after implementation while context is maximally rich.
```

## Test Type Suggestions

Match test types to what was implemented:

### For New Features

| Implementation     | Suggested Tests                                   |
| ------------------ | ------------------------------------------------- |
| API endpoint       | Request/response validation, error handling, auth |
| React component    | Render tests, user interactions, accessibility    |
| Utility function   | Unit tests with edge cases, type checking         |
| Database operation | CRUD operations, constraints, transactions        |
| Authentication     | Login flows, token handling, permission checks    |

### For Bug Fixes

| Fix Type          | Suggested Tests                                |
| ----------------- | ---------------------------------------------- |
| Logic error       | Regression test that would have caught the bug |
| Edge case         | Test specifically for that edge case           |
| Integration issue | End-to-end test covering the interaction       |
| Performance fix   | Benchmark test to prevent regression           |

### For Refactoring

| Change Type        | Suggested Tests                     |
| ------------------ | ----------------------------------- |
| Extract function   | Unit test for new function          |
| Rename/move        | Verify imports, no breaking changes |
| Optimize algorithm | Same output, benchmark comparison   |
| Change signature   | All callers still work              |

## Test Priorities

Suggest tests in order of value:

1. **Regression tests** - Prevent the bug from returning
2. **Happy path tests** - Core functionality works
3. **Error handling tests** - Failures are handled gracefully
4. **Edge case tests** - Boundaries and unusual inputs
5. **Integration tests** - Components work together
6. **Performance tests** - No unexpected slowdowns

## Context Preservation

When writing tests, leverage the implementation context:

```typescript
// Implementation context available:
// - Function signatures and types
// - Validation rules applied
// - Error conditions handled
// - Edge cases considered
// - Dependencies and mocks needed

// Example: After implementing a user registration endpoint
describe("POST /api/users/register", () => {
  // We know these validation rules from implementation
  it("should reject password under 8 characters", async () => {
    // Test case directly from validation logic we just wrote
  });

  // We know this edge case was handled
  it("should handle duplicate email gracefully", async () => {
    // Test case from error handling we just implemented
  });
});
```

## Anti-Patterns to Avoid

### Don't

- ❌ Wait until "later" to write tests (context loss)
- ❌ Write tests only for happy paths
- ❌ Skip tests for "simple" changes
- ❌ Treat tests as separate from implementation

### Do

- ✅ Write tests immediately after implementation
- ✅ Cover edge cases you just handled
- ✅ Test error conditions you just wrote
- ✅ Use same mental model while it's fresh

## Integration with TDD Workflow

This skill complements TDD:

```
TDD Flow:
  Write test → Implement → Verify
                    ↓
Auto-Test-Prompt Flow:
  Implement → [This skill prompts] → Write additional tests
```

Even with TDD, post-implementation is good for:

- Tests you didn't anticipate
- Edge cases discovered during implementation
- Integration tests that emerged from the work
- Regression tests for bugs found and fixed

## Checklist After Completion

When a feature/fix is marked complete, verify:

```markdown
## Test Coverage Checklist

- [ ] Unit tests for new/modified functions
- [ ] Integration tests for component interactions
- [ ] Regression test for bug fixes
- [ ] Edge case tests identified during implementation
- [ ] Error handling tests for failure scenarios
- [ ] Tests pass: `npm test`
- [ ] Coverage maintained: `npm run test:coverage`
```

## Remember

- **Context decays rapidly** - Test now, not later
- **Implementation knowledge is perishable** - Use it or lose it
- **Tests written fresh are better tests** - They capture nuance
- **The best time for tests is immediately after implementation**
