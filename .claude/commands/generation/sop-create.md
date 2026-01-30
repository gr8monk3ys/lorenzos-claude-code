---
description: Create Standard Operating Procedures (runbooks, playbooks, operational docs)
model: claude-sonnet-4-5
---

# SOP Creator

Create a comprehensive Standard Operating Procedure (SOP) document for: **$ARGUMENTS**

## Analysis Phase

First, analyze the topic to understand:
1. **Scope**: What processes/procedures need documentation?
2. **Audience**: Who will execute these procedures? (DevOps, developers, on-call engineers)
3. **Criticality**: What happens if procedures are followed incorrectly?
4. **Prerequisites**: What knowledge/access is assumed?

## SOP Structure

Generate the SOP using this structure:

### 1. Document Header
```markdown
# [SOP Title]

| Metadata | Value |
|----------|-------|
| Version | 1.0 |
| Last Updated | [Date] |
| Owner | [Team/Person] |
| Review Frequency | [Quarterly/Monthly] |
| Classification | [Internal/Public] |
```

### 2. Purpose & Scope
- Clear statement of what this SOP covers
- What it does NOT cover (out of scope)
- When to use this procedure

### 3. Prerequisites
- Required access/permissions
- Required tools/CLIs
- Required knowledge
- Environment setup

### 4. Procedure Steps
For each major procedure, use this format:

```markdown
## Procedure: [Name]

**Estimated Time**: X minutes
**Risk Level**: Low/Medium/High
**Rollback Available**: Yes/No

### Steps

1. **[Action Name]**
   ```bash
   # Command to execute
   command --with-flags
   ```

   **Expected Output**:
   ```
   Success message or expected response
   ```

   **If this fails**: [Troubleshooting step]

2. **[Next Action]**
   ...
```

### 5. Verification Checklist
```markdown
## Verification

- [ ] Step 1 completed successfully
- [ ] Expected state achieved
- [ ] No error messages in logs
- [ ] Monitoring shows healthy metrics
```

### 6. Rollback Procedure
```markdown
## Rollback

**When to rollback**: [Conditions]

1. [Rollback step 1]
2. [Rollback step 2]
...
```

### 7. Troubleshooting
Common issues and their solutions in table format:

| Symptom | Cause | Solution |
|---------|-------|----------|
| Error X | Reason | Fix steps |

### 8. Related Documents
Links to related SOPs, runbooks, or documentation.

## Output Guidelines

1. **Be Specific**: Include actual commands, not placeholders
2. **Be Safe**: Always include rollback procedures for risky operations
3. **Be Complete**: Don't assume knowledge - link to prerequisites
4. **Be Testable**: Include verification steps for each action
5. **Be Maintainable**: Use variables for environment-specific values

## SOP Types

Based on the request, determine the appropriate type:

- **Runbook**: Step-by-step operational procedures (deployments, incident response)
- **Playbook**: Decision trees with multiple paths (troubleshooting, triage)
- **Checklist**: Verification/audit procedures
- **Guide**: Educational with explanations (onboarding, setup)

Now create the SOP document for the specified topic, following all guidelines above.
