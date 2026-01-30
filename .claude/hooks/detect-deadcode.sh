#!/bin/bash
# PostToolUse Hook: Detect dead code and unused exports
# Uses knip to warn about unused exports in modified files
#
# Usage: Configure in .claude/settings.json under hooks.PostToolUse
# Matcher: "Write|Edit"

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract the file path from the tool input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Get file extension
EXT="${FILE_PATH##*.}"

# Only check JavaScript/TypeScript files (knip's primary use case)
case "$EXT" in
  js|jsx|ts|tsx|mjs|cjs)
    ;;
  *)
    exit 0
    ;;
esac

# Check if npx is available
if ! command -v npx &> /dev/null; then
  exit 0
fi

# Check if knip is available (don't auto-install)
if ! npx knip --version &> /dev/null 2>&1; then
  # knip not installed, skip silently
  exit 0
fi

# Check if project has a knip config or package.json (knip needs context)
PROJECT_ROOT=""
SEARCH_DIR=$(dirname "$FILE_PATH")
while [ "$SEARCH_DIR" != "/" ]; do
  if [ -f "$SEARCH_DIR/package.json" ]; then
    PROJECT_ROOT="$SEARCH_DIR"
    break
  fi
  SEARCH_DIR=$(dirname "$SEARCH_DIR")
done

if [ -z "$PROJECT_ROOT" ]; then
  # No package.json found, skip
  exit 0
fi

# Run knip in the project root
# Use --no-progress for cleaner output
OUTPUT=$(cd "$PROJECT_ROOT" && npx knip --no-progress 2>/dev/null) || true

# Check if unused exports were found
if [ -n "$OUTPUT" ]; then
  # Check if our file is mentioned in the output
  FILE_BASENAME=$(basename "$FILE_PATH")
  FILE_RELATIVE=$(realpath --relative-to="$PROJECT_ROOT" "$FILE_PATH" 2>/dev/null || echo "$FILE_PATH")

  if echo "$OUTPUT" | grep -q "$FILE_BASENAME\|$FILE_RELATIVE"; then
    echo ""
    echo "⚠️  Potential dead code detected in $FILE_PATH:"
    echo "$OUTPUT" | grep -B1 -A2 "$FILE_BASENAME\|$FILE_RELATIVE" | head -30
    echo ""
    echo "Consider removing unused exports or updating dependencies."
  fi
fi

exit 0
