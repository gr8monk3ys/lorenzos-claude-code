---
description: Assess scope and parallelization potential before task execution
model: claude-sonnet-4-5
---

# Blast Radius Analysis

Analyze the scope, coupling, and parallelization potential of a task before execution.

## Task: $ARGUMENTS

## Analysis Protocol

Before implementing, I will assess the blast radius across five dimensions to determine the optimal execution strategy.

### 1. File Change Scope

Analyze which files will be affected:

```
Files to Create:  [count]
Files to Modify:  [count]
Files to Delete:  [count]
─────────────────────────
Total Impact:     [count]
```

**Scope Rating:**

- **Low** (1-5 files): Single component, isolated change
- **Medium** (6-15 files): Feature touching multiple modules
- **High** (16+ files): Cross-cutting concern, architectural change

### 2. Module Coupling Assessment

Analyze dependencies between affected areas:

```
┌─────────────┐     ┌─────────────┐
│  Module A   │────▶│  Module B   │
└─────────────┘     └─────────────┘
      │
      ▼
┌─────────────┐
│  Module C   │
└─────────────┘
```

**Coupling Rating:**

- **Independent**: Changes don't share state or imports
- **Shared State**: Changes touch common stores/context/database
- **Tightly Coupled**: Changes have direct import dependencies

### 3. Test Impact Assessment

Determine testing requirements:

| Test Type   | Affected | Estimated Runtime |
| ----------- | -------- | ----------------- |
| Unit        | [files]  | [time]            |
| Integration | [suites] | [time]            |
| E2E         | [flows]  | [time]            |

**Test Impact Rating:**

- **Unit Only**: Changes are pure functions, isolated components
- **Integration**: API boundaries, database queries, external services
- **E2E Required**: User flows, critical paths, multi-step processes

### 4. Risk Assessment

```yaml
breaking_changes:
  api: [none/minor/major]
  database: [none/migration/breaking]
  types: [compatible/incompatible]

rollback_complexity:
  difficulty: [easy/moderate/hard]
  data_migration: [none/required]
```

### 5. Blast Radius Summary

```
┌────────────────────────────────────────────────────────┐
│                 BLAST RADIUS ASSESSMENT                │
├────────────────────────────────────────────────────────┤
│  Task: [task name]                                     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  File Scope:      ████████░░  [LOW/MEDIUM/HIGH]       │
│  Module Coupling: ██████░░░░  [INDEP/SHARED/TIGHT]    │
│  Test Impact:     ████░░░░░░  [UNIT/INTEG/E2E]        │
│  Risk Level:      ██░░░░░░░░  [LOW/MEDIUM/HIGH]       │
│                                                        │
├────────────────────────────────────────────────────────┤
│  EXECUTION RECOMMENDATION: [SERIAL/PARALLEL/WORKTREE] │
└────────────────────────────────────────────────────────┘
```

## Execution Recommendations

### Serial Execution (Single Agent)

**When to use:**

- Tightly coupled modules (changes depend on each other)
- Shared state that requires sequential updates
- Database migrations with order dependencies
- High-risk changes requiring careful review

**Command:** Proceed with standard implementation

### Parallel Execution (Multiple Tool Calls)

**When to use:**

- Independent file changes (no shared state)
- Multiple isolated components
- Separate test suites
- Low coupling between modules

**Command:**

```
/chain "Step 1" -> "Step 2 (parallel with 3)" | "Step 3" -> "Step 4"
```

### Worktree Execution (Isolated Branches)

**When to use:**

- Large feature spanning multiple areas
- Experimental changes needing isolation
- Risk of merge conflicts with main
- Long-running implementation (multiple sessions)

**Command:**

```bash
git worktree add ../project-feature -b feature/name
```

## Parallelization Opportunities

Based on the analysis, identify:

### Can Run in Parallel

```yaml
wave_1:
  - task: [independent task A]
    files: [files]
  - task: [independent task B]
    files: [files]

wave_2: # depends on wave_1
  - task: [dependent task C]
    depends_on: [A, B]
```

### Must Run Sequentially

```yaml
sequential:
  - reason: [why sequential]
    order: [A -> B -> C]
```

## Pre-Implementation Checklist

Based on blast radius:

- [ ] **LOW scope**: Proceed directly
- [ ] **MEDIUM scope**: Create implementation plan first
- [ ] **HIGH scope**: Use `/plan` command, consider worktree

- [ ] **Independent coupling**: Enable parallel execution
- [ ] **Shared state**: Identify synchronization points
- [ ] **Tight coupling**: Execute sequentially

- [ ] **Unit tests only**: Fast iteration possible
- [ ] **Integration tests**: Allow extra time for verification
- [ ] **E2E required**: Plan for full test suite run

## Examples

### Example 1: Adding a new utility function

```
/blast-radius add formatCurrency utility function
```

Expected: LOW scope, Independent, Unit only -> **Serial**

### Example 2: Implementing user authentication

```
/blast-radius implement OAuth2 authentication with Google and GitHub
```

Expected: HIGH scope, Shared state (auth context), E2E -> **Worktree**

### Example 3: Adding loading states to multiple components

```
/blast-radius add loading skeletons to Dashboard, Profile, and Settings pages
```

Expected: MEDIUM scope, Independent (each page separate), Unit only -> **Parallel**

### Example 4: Database schema migration

```
/blast-radius add user preferences table with foreign keys
```

Expected: MEDIUM scope, Tightly coupled (migrations), Integration -> **Serial**

### Example 5: Multi-service feature

```
/blast-radius add real-time notifications across web, mobile, and email
```

Expected: HIGH scope, Shared state, E2E required -> **Worktree + Parallel dispatch**

## Integration

After analysis, proceed with:

- `/plan` - For detailed implementation planning
- `/architect` - For architectural discussion
- `/chain` - For sequential task execution
- `git worktree add` - For isolated development
