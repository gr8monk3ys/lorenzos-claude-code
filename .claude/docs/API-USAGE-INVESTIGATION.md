# API Usage Investigation: Why You're Hitting Claude Max Limits

**Date:** January 2026
**Issue:** Excessive API/token consumption despite normal usage patterns

## Executive Summary

Your Claude Max plan limit issues are **almost certainly caused by having 29 MCP servers configured**. Research shows that MCP tool definitions consume tokens at session start, regardless of whether they're actually used. With 29 servers, you're likely consuming **87,000-145,000 tokens** before any conversation begins—leaving only 55K-113K tokens for actual work.

**Peter Steinberger's insight applies directly to you:**
> "I removed all MCPs because they 'pollute context.' Almost all MCPs really should be CLIs. I can just refer to a CLI by name... pay zero context tax."

---

## The Problem: MCP Context Overhead

### How MCP Servers Consume Tokens

Every configured MCP server loads its **complete tool schema** into Claude's context window at session initialization:

| Component | Tokens per Tool |
|-----------|-----------------|
| Tool name | ~5-10 tokens |
| Description | ~50-200 tokens |
| Input schema | ~100-500 tokens |
| Required fields | ~20-50 tokens |
| **Simple tool total** | ~200-500 tokens |
| **Complex tool total** | ~500-1,500 tokens |

**Anthropic's benchmark:** "50 tools approximately equals 10-20K tokens"

### Your Configuration: 29 MCP Servers

From your `plugin.json`:

```
context7, playwright, supabase, stripe, chrome-devtools, vercel,
github, sequential-thinking, postgres, redis, mongodb, figma,
notion, linear, slack, memory, terraform, kubernetes, docker,
sentry, datadog, aws, atlassian, firecrawl, semgrep, tavily,
duckdb, gitlab
```

**Estimated token consumption:**

| Server Type | Count | Est. Tokens Each | Total |
|-------------|-------|------------------|-------|
| Simple (context7, memory) | 5 | ~2,000 | 10,000 |
| Medium (github, vercel) | 12 | ~4,000 | 48,000 |
| Complex (stripe, aws, kubernetes) | 12 | ~7,000 | 84,000 |
| **Total baseline overhead** | **29** | - | **~142,000** |

**Result:** ~71% of your 200K context is consumed before you type anything.

### Documented Benchmarks (GitHub Issues)

| Configuration | Startup Tokens | Context Used |
|---------------|----------------|--------------|
| No MCPs | ~0 | 0% |
| 4 MCP servers | ~15,000 | 7.5% |
| 5 MCP servers | ~55,000 | 27.5% |
| Heavy setup | ~108,000 | 54% |
| Your setup (29 servers) | ~142,000 | **71%** |

---

## Solution 1: Enable Tool Search (Deferred Loading)

Tool Search is Claude Code's built-in solution that defers loading tool definitions until needed.

### Configuration

```bash
# Auto mode (activates at 10% threshold) - DEFAULT
ENABLE_TOOL_SEARCH=auto claude

# Always enabled (recommended for your setup)
ENABLE_TOOL_SEARCH=true claude

# Custom threshold (e.g., 5%)
ENABLE_TOOL_SEARCH=auto:5 claude
```

**Expected reduction:** 46-85% (your 142K → ~20-75K tokens)

### Accuracy Improvements with Tool Search

| Model | Without Tool Search | With Tool Search |
|-------|---------------------|------------------|
| Opus 4 | 49% | 74% |
| Opus 4.5 | 79.5% | 88.1% |

---

## Solution 2: Selective MCP Configuration

### Tier Your MCPs by Actual Usage

**Tier 1: Keep Always Active (Daily Use)**
```json
"context7": {},     // Documentation lookup
"github": {},       // PR/issue work
"playwright": {},   // Testing
"memory": {}        // Session persistence
```

**Tier 2: Project-Specific (Use .mcp.json)**
```json
// Create .mcp.json in project roots
{
  "mcpServers": {
    "supabase": {},  // Only for Supabase projects
    "stripe": {}     // Only for payment projects
  }
}
```

**Tier 3: On-Demand via CLI (Replace with CLIs)**

| MCP Server | CLI Replacement |
|------------|-----------------|
| vercel | `vercel` CLI |
| github | `gh` CLI |
| docker | `docker` CLI |
| kubernetes | `kubectl` CLI |
| aws | `aws` CLI |
| terraform | `terraform` CLI |
| postgres | `psql` CLI |
| redis | `redis-cli` |
| mongodb | `mongosh` CLI |
| gitlab | `glab` CLI |

**Tier 4: Remove Entirely (Redundant or Rarely Used)**
```
chrome-devtools   → Use playwright instead
sequential-thinking → Claude does this natively
duckdb           → Use postgres/sqlite CLI
firecrawl        → Use WebFetch tool
tavily           → Use WebSearch tool
semgrep          → Run as CLI in CI/CD
atlassian        → Use linear OR atlassian, not both
```

### Recommended Minimal Config

```json
"mcpServers": {
  "context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp"]
  },
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  },
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  },
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"]
  }
}
```

**Result:** ~4 servers × ~4,000 tokens = ~16,000 tokens (8% vs your current 71%)

---

## Solution 3: CLI-First Development Pattern

Steinberger's approach: Use CLIs instead of MCPs, paying "zero context tax."

### Services with Excellent CLIs

| Service | CLI | Install |
|---------|-----|---------|
| GitHub | `gh` | `brew install gh` |
| Vercel | `vercel` | `npm i -g vercel` |
| Supabase | `supabase` | `brew install supabase/tap/supabase` |
| AWS | `aws` | `brew install awscli` |
| Docker | `docker` | Built-in |
| Kubernetes | `kubectl` | `brew install kubectl` |
| Terraform | `terraform` | `brew install terraform` |
| PostgreSQL | `psql` | `brew install postgresql` |
| MongoDB | `mongosh` | `brew install mongosh` |
| Redis | `redis-cli` | `brew install redis` |
| Linear | `linear` | `npm i -g @linear/cli` |

### How It Works

Instead of MCP tool definitions in context, Claude just calls the CLI:

```bash
# Claude can run this directly - no MCP overhead
gh pr list --state open
vercel deploy --prod
kubectl get pods -n production
aws s3 ls s3://my-bucket
```

---

## Solution 4: Monitor and Audit Context Usage

### Use /context Command

Check your context window impact:

```
/context
```

This shows how much each MCP server contributes to context consumption.

### Use /mcp Command

Toggle servers dynamically during sessions:

```
/mcp disable stripe
/mcp disable aws
/mcp enable supabase
```

### Set MCP Output Limits

In your settings, configure limits:

```json
{
  "mcp": {
    "output_limit": 10000,
    "warning_threshold": 5000
  }
}
```

---

## Modern Workflow Recommendations

### 1. Parallel Agent Pattern with Git Worktrees

Run multiple focused agents instead of one overloaded agent:

```bash
# Create isolated worktrees for each task
git worktree add ../feature-auth -b feature/auth
git worktree add ../feature-api -b feature/api

# Run separate Claude sessions in each
cd ../feature-auth && claude
cd ../feature-api && claude
```

**Tools for this:**
- **Claude Squad**: Manages multiple terminal agents with tmux
- **CCManager**: CLI for multiple coding assistant sessions

### 2. Blast Radius Management

Before assigning any task, evaluate:
- How many files will it touch?
- Is it isolated or does it span the codebase?

| Task Type | Agent Count | Approach |
|-----------|-------------|----------|
| Small bug fix | 1 | Single focused session |
| UI work | 2-4 | Parallel on separate components |
| Large refactor | 1 | Dedicated session, full attention |
| Tests + cleanup | 4+ | Many small parallel tasks |

### 3. Context Preservation

- Write tests **immediately** after implementing (same context)
- Use `/clear` frequently to reset context
- Start new sessions at natural stopping points
- Keep CLAUDE.md concise (100-200 lines max)

### 4. Session Management

Use the existing hooks in your plugin:
- `session-start.sh` - Restores previous context
- `session-end.sh` - Persists session state
- `strategic-compact.sh` - Suggests compaction at breakpoints

---

## Action Items

### Immediate (Today)

1. **Enable Tool Search**
   ```bash
   export ENABLE_TOOL_SEARCH=true
   ```

2. **Audit your active MCPs**
   ```
   /context
   /mcp
   ```

3. **Disable unused MCPs for this session**
   ```
   /mcp disable [server-name]
   ```

### Short-term (This Week)

1. **Create minimal MCP config** for daily use (4-5 servers max)
2. **Install CLIs** for services you access frequently
3. **Create project-specific .mcp.json** files instead of global config

### Long-term (This Month)

1. **Update plugin.json** to recommend minimal MCP config to users
2. **Add documentation** about MCP overhead
3. **Create profiles** for different workload types:
   - `mcp-minimal.json` - 4 servers, daily use
   - `mcp-fullstack.json` - 8 servers, full-stack projects
   - `mcp-enterprise.json` - All servers, enterprise integrations

---

## References

### Anthropic Documentation
- [Tool Search Documentation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
- [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

### GitHub Issues
- [Issue #7336](https://github.com/anthropics/claude-code/issues/7336) - Lazy loading with 95% reduction POC
- [Issue #7172](https://github.com/anthropics/claude-code/issues/7172) - Token management improvements
- [Issue #3406](https://github.com/anthropics/claude-code/issues/3406) - Built-in tools overhead

### Community Resources
- [Peter Steinberger's Blog](https://steipete.me) - AI-native development workflow
- [Simon Willison: Parallel Coding Agents](https://simonwillison.net/2025/Oct/5/parallel-coding-agents/)
- [Medium: 46.9% Token Reduction with Tool Search](https://medium.com/@joe.njenga/claude-code-just-cut-mcp-context-bloat-by-46-9-51k-tokens-down-to-8-5k-with-new-tool-search-ddf9e905f734)

### Tools
- [Claude Squad](https://github.com/smtg-ai/claude-squad) - Multi-agent management
- [agent-rules](https://github.com/steipete/agent-rules) - Reusable configuration rules
- [CCManager](https://github.com/kbwo/ccmanager) - Multiple session management
