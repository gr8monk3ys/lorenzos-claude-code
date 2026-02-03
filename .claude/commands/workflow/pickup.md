---
description: Rehydrate context when starting work on a project
model: claude-sonnet-4-5
---

# Context Pickup

Rehydrate context and resume work by gathering all relevant project state.

## Command: $ARGUMENTS

## What This Command Does

Gathers comprehensive context to help you resume work quickly:
- Git repository state and recent commits
- Open pull requests on current branch
- Most recent handoff document
- CI/CD build status
- Project memory
- Active tmux sessions

## Context Gathering Steps

### Step 1: Git Status & Recent Commits

Run these commands to understand current repository state:

```bash
# Current branch and status
git branch --show-current
git status --short

# Recent commits (last 10)
git log --oneline -10

# Any uncommitted changes
git diff --stat
```

Report:
- Current branch name
- Working directory state (clean/dirty)
- Recent commit summary
- Pending changes

### Step 2: Open Pull Requests

Check for PRs on the current branch:

```bash
# List PRs for current branch
gh pr list --head $(git branch --show-current) --state open

# Get PR details if one exists
gh pr view --json title,body,state,reviewDecision,statusCheckRollup
```

Report:
- PR status (open/draft/none)
- Review status (approved/changes requested/pending)
- CI check status

### Step 3: Load Most Recent Handoff

Find and read the most recent handoff file:

```bash
# Find most recent handoff
ls -t .claude/handoffs/HANDOFF-*.yaml 2>/dev/null | head -1
```

If a handoff exists, extract:
- Summary of previous session
- Current task state and progress
- Pending tasks and blockers
- Continuation prompt
- Context files to load

### Step 4: CI/Build Status

Check recent CI runs:

```bash
# Recent workflow runs
gh run list --limit 5

# Latest run status
gh run list --limit 1 --json status,conclusion,name,headBranch
```

Report:
- Latest build status (success/failure/in_progress)
- Any failing checks
- Recent workflow history

### Step 5: Project Memory

Read project memory from `.claude/memory/MEMORY.md`:
- Project info and architecture
- Recent changes
- Active conventions
- Session notes

### Step 6: Active Sessions (Optional)

Check for tmux sessions if available:

```bash
# List tmux sessions (if tmux is installed)
tmux list-sessions 2>/dev/null || echo "No tmux sessions"
```

Report any running dev servers or background tasks.

## Output Format

Generate a context summary:

```markdown
## Context Pickup Summary

### Repository State
- **Branch**: feature/my-feature
- **Status**: Clean / 3 uncommitted changes
- **Last Commit**: abc1234 - Add user authentication

### Pull Request
- **PR #42**: Add user authentication
- **Status**: Open, awaiting review
- **Checks**: 3/4 passing (lint failing)

### Previous Session
- **Date**: 2025-02-01
- **Task**: Implementing login form
- **Progress**: 75% complete
- **Blocker**: Need API endpoint for password reset

### CI Status
- **Latest Run**: Success (2 hours ago)
- **Failing Checks**: None

### Project Context
- **Type**: Next.js + React + Supabase
- **Recent Focus**: Auth implementation

### Suggested Next Actions
1. [ ] Fix failing lint check
2. [ ] Complete login form validation
3. [ ] Request PR review
```

## Usage Patterns

### Start of Day
```
/pickup
```
Full context rehydration for starting a new session.

### Quick Status
```
/pickup status
```
Abbreviated status check without full handoff loading.

### Focus on Specific Area
```
/pickup pr
/pickup ci
/pickup handoff
```
Load only specific context sections.

## Integration with Other Commands

| After Pickup | Use |
|--------------|-----|
| Continue coding | Start working on suggested actions |
| Review needed | `/review` to check code quality |
| Tests failing | `/verify` to run full verification |
| Need to handoff | `/handoff` at end of session |

## Handoff Continuity

The pickup command completes the handoff cycle:

```
Session 1: Work -> /handoff (save context)
           ↓
Session 2: /pickup (restore context) -> Work -> /handoff
           ↓
Session 3: /pickup -> Continue...
```

## Troubleshooting

### No Handoff Found
If no handoff file exists:
- Check `.claude/handoffs/archive/` for archived handoffs
- Review git log for context
- Check PR description for task context

### PR Not Found
If `gh pr view` fails:
- Verify you're on the correct branch
- Check if branch has been pushed: `git push -u origin HEAD`
- Create PR if needed: `/review` then submit

### CI Access Issues
If `gh run list` fails:
- Verify GitHub CLI authentication: `gh auth status`
- Check repository permissions
- Manually check CI status in GitHub UI

## Best Practices

1. **Run at session start**: Always run `/pickup` when starting work
2. **Review before coding**: Read the summary before diving into code
3. **Note blockers**: If handoff mentions blockers, address them first
4. **Update memory**: If context has changed, run `/memory` to update
