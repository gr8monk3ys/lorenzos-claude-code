# Claude Code Hooks Guide

This plugin includes pre-configured hooks to automate common development workflows. Hooks allow you to run custom scripts before or after Claude performs actions.

## Quick Start

To enable hooks, add them to your `.claude/settings.json` or `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-sensitive-files.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/auto-format.sh"
          }
        ]
      }
    ]
  }
}
```

## Available Hooks

### 1. Block Sensitive Files (`block-sensitive-files.sh`)

**Type:** PreToolUse
**Matcher:** `Write|Edit`

Prevents Claude from accidentally modifying sensitive files like `.env`, credentials, and secrets.

**Protected Patterns:**

- `.env`, `.env.local`, `.env.production`
- `secrets.*`, `credentials.*`
- `.pem`, `.key`, `.p12`, `.pfx` files
- SSH keys (`id_rsa`, `id_ed25519`)
- Cloud credentials (AWS, GCP, Firebase)
- Token files (`token.json`)

**Example Configuration:**

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/block-sensitive-files.sh"
        }
      ]
    }
  ]
}
```

---

### 2. Auto-Format (`auto-format.sh`)

**Type:** PostToolUse
**Matcher:** `Write|Edit`

Automatically formats files after Claude edits them, maintaining consistent code style.

**Supported Formatters (in priority order):**

1. Prettier (recommended)
2. Biome
3. ESLint (for JS/TS files)

**Supported File Types:**

- JavaScript/TypeScript (`.js`, `.jsx`, `.ts`, `.tsx`)
- JSON (`.json`)
- CSS/SCSS (`.css`, `.scss`, `.less`)
- Markdown (`.md`, `.mdx`)
- HTML (`.html`)
- YAML (`.yml`, `.yaml`)

**Example Configuration:**

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/auto-format.sh"
        }
      ]
    }
  ]
}
```

---

### 3. TypeScript Type-Check (`typecheck.sh`)

**Type:** PostToolUse
**Matcher:** `Write|Edit`

Runs TypeScript type checking after Claude modifies `.ts` or `.tsx` files.

**Features:**

- Automatically finds `tsconfig.json`
- Shows only errors related to the modified file
- Non-blocking (reports errors but doesn't prevent changes)

**Example Configuration:**

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/typecheck.sh"
        }
      ]
    }
  ]
}
```

---

### 4. Validate JSON (`validate-json.sh`)

**Type:** PreToolUse
**Matcher:** `Write`

Validates JSON syntax before Claude writes to `.json` files, preventing invalid JSON from being saved.

**Example Configuration:**

```json
{
  "PreToolUse": [
    {
      "matcher": "Write",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/validate-json.sh"
        }
      ]
    }
  ]
}
```

---

### 5. Auto-Commit (`auto-commit.sh`)

**Type:** Stop
**Matcher:** N/A (runs when Claude finishes)

Automatically commits changes when Claude completes a task.

**Features:**

- Detects add/update/remove actions
- Generates descriptive commit messages
- Includes "Co-Authored-By: Claude" attribution
- Skips if no changes detected

**Example Configuration:**

```json
{
  "Stop": [
    {
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/auto-commit.sh"
        }
      ]
    }
  ]
}
```

---

### 6. Notify Completion (`notify-completion.sh`)

**Type:** Stop
**Matcher:** N/A (runs when Claude finishes)

Sends a desktop notification when Claude completes a task.

**Supported Platforms:**

- macOS (via osascript)
- Linux (via notify-send)
- Windows (via PowerShell)

**Example Configuration:**

```json
{
  "Stop": [
    {
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/notify-completion.sh"
        }
      ]
    }
  ]
}
```

---

### 7. Circuit Breaker (`circuit-breaker.sh`)

**Type:** PostToolUse
**Matcher:** `.*` (all tools)

Detects and prevents "thrashing" - when Claude gets stuck in loops trying the same failing approaches repeatedly.

**Detection Triggers:**

- Same error appearing 3+ times
- Same file edited 3+ times without progress
- Identical tool calls repeated
- High failure rate (7+ errors in last 10 operations)

**Features:**

- Tracks error patterns using signature matching
- Monitors file edit frequency
- Detects identical tool call sequences
- Provides recovery guidance when triggered
- State persisted in `~/.claude/.circuit-breaker/`

**Example Configuration:**

```json
{
  "PostToolUse": [
    {
      "matcher": ".*",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/hooks/circuit-breaker.sh"
        }
      ]
    }
  ]
}
```

**Reset State:**

```bash
rm -rf ~/.claude/.circuit-breaker
```

---

## Complete Configuration Example

Here's a full configuration using all available hooks:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-sensitive-files.sh"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/validate-json.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/auto-format.sh"
          },
          {
            "type": "command",
            "command": ".claude/hooks/typecheck.sh"
          }
        ]
      },
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/circuit-breaker.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/notify-completion.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Types Reference

| Hook Type           | When It Runs                    | Can Block?        |
| ------------------- | ------------------------------- | ----------------- |
| `PreToolUse`        | Before tool execution           | Yes (exit code 2) |
| `PostToolUse`       | After tool completes            | No                |
| `Stop`              | When Claude finishes            | No                |
| `UserPromptSubmit`  | When user sends message         | Yes               |
| `PermissionRequest` | When Claude requests permission | Yes               |
| `SessionEnd`        | When session terminates         | No                |

## Matchers

Matchers filter which tools trigger a hook:

| Matcher           | Description                     |
| ----------------- | ------------------------------- |
| `Write`           | Matches Write tool only         |
| `Edit`            | Matches Edit tool only          |
| `Write\|Edit`     | Matches either tool             |
| `Bash`            | Matches Bash tool               |
| `Bash(npm test*)` | Matches Bash with specific args |
| `*`               | Matches all tools               |

## Creating Custom Hooks

1. Create a script in `.claude/hooks/`
2. Make it executable: `chmod +x your-hook.sh`
3. Read JSON input from stdin using `jq`
4. Exit with code 0 to allow, code 2 to deny

**Example Custom Hook:**

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Your logic here

exit 0  # Allow
# exit 2  # Deny (with JSON output for reason)
```

## Dependencies

These hooks require:

- `jq` - JSON processor (install via `brew install jq` or `apt install jq`)
- `git` - For auto-commit hook
- `node/npx` - For auto-format and typecheck hooks

## Troubleshooting

**Hook not executing:**

- Ensure script is executable (`chmod +x`)
- Check the matcher matches your tool
- Verify the path is correct in settings

**"Permission denied" errors:**

- Run `chmod +x .claude/hooks/*.sh`

**Formatting not working:**

- Ensure prettier/eslint/biome is installed in your project
- Check that `npx` is available

## Resources

- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Claude Code Hooks Blog Post](https://claude.com/blog/how-to-configure-hooks)
- [Hooks Mastery Repository](https://github.com/disler/claude-code-hooks-mastery)
