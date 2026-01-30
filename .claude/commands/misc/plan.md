---
description: Create a comprehensive implementation plan with phases, tasks, and milestones
model: claude-opus-4-5
---

# Implementation Plan

Create a detailed, actionable implementation plan for features, projects, or complex tasks.

## Goal: $ARGUMENTS

## Planning Process

### Step 1: Analyze Requirements

**Core Requirements:**
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

**Technical Requirements:**
- [ ] [Tech requirement 1]
- [ ] [Tech requirement 2]

**Non-Functional Requirements:**
- Performance: [Criteria]
- Security: [Criteria]
- Scalability: [Criteria]

### Step 2: Research Codebase

**Files to examine:**
- [path/to/relevant/file1]
- [path/to/relevant/file2]

**Existing Patterns Found:**
- [Pattern 1]: Used in [file]
- [Pattern 2]: Used in [file]

**Dependencies:**
- [Dependency 1]: [Why needed]

---

## Implementation Plan

### Overview

```
Phase 1: Foundation → Phase 2: Core → Phase 3: Integration → Phase 4: Polish
```

---

### Phase 1: Foundation

**Objective:** Set up the groundwork

#### Task 1.1: [Task Name]
- **Description:** [What to do]
- **Files:** `path/to/file.ts` - [Changes]
- **Acceptance criteria:**
  - [ ] [Criterion 1]
  - [ ] [Criterion 2]

**Phase 1 Checkpoint:**
- [ ] All foundation tasks complete
- [ ] No regressions in existing tests
- [ ] Code compiles without errors

---

### Phase 2: Core Implementation

**Objective:** Build the main functionality

#### Task 2.1: [Task Name]
- **Description:** [What to do]
- **Dependencies:** Task 1.1
- **Files:** `path/to/file.ts` - [Changes]
- **Code outline:**
  ```typescript
  function featureName() {
    // Step 1: ...
    // Step 2: ...
  }
  ```
- **Acceptance criteria:**
  - [ ] [Criterion 1]

**Phase 2 Checkpoint:**
- [ ] Core functionality works
- [ ] Unit tests written and passing

---

### Phase 3: Integration

**Objective:** Connect components

#### Task 3.1: [Integration Task]
- **Description:** [What to integrate]
- **Dependencies:** Phase 2 complete
- **Testing approach:**
  - [ ] Integration test 1

**Phase 3 Checkpoint:**
- [ ] All components integrated
- [ ] Integration tests passing

---

### Phase 4: Polish & Documentation

**Objective:** Final refinements

#### Task 4.1: Error Handling
- [ ] Comprehensive error handling
- [ ] User-friendly error messages
- [ ] Logging for debugging

#### Task 4.2: Testing
- [ ] Edge case tests
- [ ] Error scenario tests
- [ ] Performance tests

**Phase 4 Checkpoint:**
- [ ] All tests passing
- [ ] Ready for review

---

## Technical Design

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │ ──→ │    API      │ ──→ │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Component structure:**
- [Component 1]
- [Component 2]

**API endpoints:**
- `POST /api/feature` - [Description]
- `GET /api/feature/:id` - [Description]

**Database schema:**
- [Table/collection changes]

---

## File Changes

**New Files:**
```
app/api/feature/route.ts
components/FeatureComponent.tsx
lib/feature-utils.ts
```

**Modified Files:**
```
app/page.tsx (add new section)
lib/database.types.ts (add new types)
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | Low/Med/High | Low/Med/High | [Strategy] |

## Dependencies & Blockers

**External Dependencies:**
- [ ] [Dependency 1] - Status: [Ready/Blocked]

**Potential Blockers:**
- [Blocker 1]: [How to resolve]

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No known bugs
- [ ] Performance acceptable

---

## Execution

Ready to start? Use `/execute-plan` to work through this plan step by step.

**Complexity Assessment:**
- **Small** - Single file changes
- **Medium** - Multiple file changes
- **Large** - Cross-cutting concerns
- **Complex** - Architectural changes
