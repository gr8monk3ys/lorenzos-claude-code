# Repository Refactoring Proposal

## Executive Summary

This proposal consolidates documentation and reorganizes commands from a catch-all `misc/` folder into logical categories, following patterns from popular repos like `steipete/agent-rules` and Anthropic's official conventions.

---

## Current State Issues

### Issue 1: Root-Level Documentation Sprawl

**Current (9 files):**
```
/
├── CHANGELOG.md      # Keep - standard
├── CLAUDE.md         # Keep - Claude Code convention
├── HOOKS.md          # Move → docs/
├── PUBLISHING.md     # Move → docs/
├── QUICK-START.md    # Merge into README
├── README.md         # Keep - standard
├── SECURITY.md       # Keep - GitHub standard
├── SKILLS.md         # Move → docs/
└── TODO.md           # Move → .claude/ (internal)
```

**Proposed (4 files at root):**
```
/
├── CHANGELOG.md
├── CLAUDE.md
├── README.md         # Includes quick-start section
└── SECURITY.md
```

### Issue 2: commands/misc Dumping Ground (55 files)

**Current:**
```
.claude/commands/
├── api/           (3 files)
├── frameworks/    (3 files)
├── misc/          (55 files) ← PROBLEM
├── supabase/      (2 files)
└── ui/            (2 files)
```

**Proposed reorganization:**
```
.claude/commands/
├── api/           (3) - api-new, api-test, api-protect
├── context/       (6) - context, context-prime, context-budget, context-mode, memory, memory-init
├── devops/        (5) - deploy, ci-review, worktree, parallel-spawn, mcp-init
├── frameworks/    (3) - component-vue, component-angular, component-svelte
├── generation/    (5) - hook-new, migration-new, scaffold, docs-generate, docs-codemap
├── planning/      (7) - plan, execute-plan, riper, brainstorm, innovate, create-prd, research
├── quality/       (6) - lint, code-cleanup, code-optimize, code-explain, review, new-task
├── supabase/      (2) - types-gen, edge-function-new
├── testing/       (4) - tdd, test-new, verify, fix-issue
├── ui/            (2) - component-new, page-new
├── utility/       (6) - rules, suggest, summarize, github-setup, think, ask
└── workflow/      (13) - wizard, chain, harness, handoff, resume, checkpoint,
                         ledger, fix-pr, architect, map, plan-init, wiggum, eval, learn
```

### Issue 3: Over-Granular Skill Folders

**Current (19 folders, each with 1 file):**
```
.claude/skills/
├── api-development/
│   └── api-development.md
├── code-quality/
│   └── code-quality.md
├── memory-persistence/
│   └── memory-persistence.md
... (16 more)
```

**Proposed (flat structure):**
```
.claude/skills/
├── api-development.md
├── code-quality.md
├── continuous-learning.md
├── database-operations.md
├── devops-automation.md
├── eval-harness.md
├── frontend-development.md
├── git-worktree.md
├── mcp-builder.md
├── memory-persistence.md
├── micro-tasking.md
├── parallel-dispatch.md
├── root-cause-analysis.md
├── skill-creator.md
├── spec-compliance.md
├── strategic-compact.md
├── systematic-debugging.md
├── verification-first.md
└── webapp-testing.md
```

### Issue 4: Scattered Documentation

**Current:**
```
/HOOKS.md
/PUBLISHING.md
/SKILLS.md
/TODO.md
/.claude-plugin/MCP-SERVERS.md
/.claude/docs/API-USAGE-INVESTIGATION.md
/.claude/docs/CLI-ALTERNATIVES.md
```

**Proposed (consolidated in docs/):**
```
/docs/
├── HOOKS.md
├── MCP-SERVERS.md
├── PUBLISHING.md
├── SKILLS.md
└── research/
    ├── API-USAGE-INVESTIGATION.md
    └── CLI-ALTERNATIVES.md
```

Or alternatively, keep `.claude/docs/` for Claude-specific docs:
```
/.claude/docs/
├── CLI-ALTERNATIVES.md
├── HOOKS.md
├── MCP-SERVERS.md
├── PUBLISHING.md
├── SKILLS.md
└── research/
    └── API-USAGE-INVESTIGATION.md
```

---

## Comparison with Similar Repos

### steipete/agent-rules (5.1k stars)
```
/
├── docs/           # All documentation
├── global-rules/   # Universal rules
├── project-rules/  # Project-specific
├── README.md
└── LICENSE
```
**Takeaway:** Simple 3-folder structure, all docs in one place.

### Anthropic Official Conventions
```
.claude/
├── commands/       # Custom commands
├── settings.json   # Local settings
└── CLAUDE.md       # Project instructions (can be at root)
```
**Takeaway:** Minimal, flat structure preferred.

### cursor-boost (popular Cursor config)
```
/
├── .cursorrules    # Main rules file
├── rules/          # Additional rule files
└── README.md
```
**Takeaway:** Single entry point, rules in dedicated folder.

---

## Recommended Changes (Priority Order)

### Priority 1: Reorganize commands/misc (High Impact)

Move 55 files from `misc/` into logical categories:

| Category | Commands | Count |
|----------|----------|-------|
| `context/` | context, context-prime, context-budget, context-mode, memory, memory-init | 6 |
| `planning/` | plan, execute-plan, riper, brainstorm, innovate, create-prd, research | 7 |
| `quality/` | lint, code-cleanup, code-optimize, code-explain, review, new-task | 6 |
| `testing/` | tdd, test-new, verify, fix-issue | 4 |
| `workflow/` | wizard, chain, harness, handoff, resume, checkpoint, ledger, fix-pr, architect, map, plan-init, wiggum, eval, learn | 14 |
| `devops/` | deploy, ci-review, worktree, parallel-spawn, mcp-init | 5 |
| `generation/` | hook-new, migration-new, scaffold, docs-generate, docs-codemap | 5 |
| `utility/` | rules, suggest, summarize, github-setup, think, ask | 6 |

### Priority 2: Consolidate Documentation (Medium Impact)

1. Move HOOKS.md, PUBLISHING.md, SKILLS.md to `.claude/docs/`
2. Merge QUICK-START.md into README.md
3. Move TODO.md to `.claude/TODO.md` (internal)
4. Move `.claude-plugin/MCP-SERVERS.md` to `.claude/docs/`

### Priority 3: Flatten Skills Structure (Low Impact)

Remove unnecessary nesting - each skill folder contains only one file.

### Priority 4: Add Standard Files (Nice to Have)

- Add `.cursorrules` symlink to CLAUDE.md for Cursor users
- Add `CONTRIBUTING.md` for open-source best practices

---

## Migration Script

```bash
#!/bin/bash
# Run from repo root

# 1. Create new command directories
mkdir -p .claude/commands/{context,planning,quality,testing,workflow,devops,generation,utility}

# 2. Move commands to appropriate directories
# Context
mv .claude/commands/misc/{context,context-prime,context-budget,context-mode,memory,memory-init}.md .claude/commands/context/

# Planning
mv .claude/commands/misc/{plan,execute-plan,riper,brainstorm,innovate,create-prd,research}.md .claude/commands/planning/

# Quality
mv .claude/commands/misc/{lint,code-cleanup,code-optimize,code-explain,review,new-task}.md .claude/commands/quality/

# Testing
mv .claude/commands/misc/{tdd,test-new,verify,fix-issue}.md .claude/commands/testing/

# Workflow
mv .claude/commands/misc/{wizard,chain,harness,handoff,resume,checkpoint,ledger,fix-pr,architect,map,plan-init,wiggum,eval,learn}.md .claude/commands/workflow/

# DevOps
mv .claude/commands/misc/{deploy,ci-review,worktree,parallel-spawn,mcp-init}.md .claude/commands/devops/

# Generation
mv .claude/commands/misc/{hook-new,migration-new,scaffold,docs-generate,docs-codemap}.md .claude/commands/generation/

# Utility
mv .claude/commands/misc/{rules,suggest,summarize,github-setup,think,ask}.md .claude/commands/utility/

# 3. Remove empty misc folder
rmdir .claude/commands/misc/

# 4. Consolidate documentation
mv HOOKS.md PUBLISHING.md SKILLS.md .claude/docs/
mv .claude-plugin/MCP-SERVERS.md .claude/docs/
cat QUICK-START.md >> README.md && rm QUICK-START.md
mv TODO.md .claude/

# 5. Flatten skills (optional)
for dir in .claude/skills/*/; do
  skill=$(basename "$dir")
  mv "$dir$skill.md" ".claude/skills/"
  rmdir "$dir"
done

echo "Refactoring complete!"
```

---

## Post-Migration Checklist

- [ ] Update plugin.json paths if commands moved
- [ ] Update CLAUDE.md with new structure
- [ ] Update README.md with new organization
- [ ] Test all commands still work
- [ ] Update any cross-references in documentation

---

## Expected Outcome

| Metric | Before | After |
|--------|--------|-------|
| Root MD files | 9 | 4 |
| commands/misc files | 55 | 0 |
| Command categories | 5 | 12 |
| Skill folders | 19 | 1 (flat) |
| Discoverability | Poor | Good |
