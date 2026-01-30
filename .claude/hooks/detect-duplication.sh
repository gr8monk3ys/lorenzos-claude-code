#!/bin/bash
# PostToolUse Hook: Detect code duplication
# Uses jscpd to warn about duplicated code in modified files
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

# Only check code files
case "$EXT" in
  js|jsx|ts|tsx|mjs|cjs|vue|svelte|py|rb|go|java|c|cpp|cs|php)
    ;;
  *)
    exit 0
    ;;
esac

# Check if npx is available
if ! command -v npx &> /dev/null; then
  exit 0
fi

# Check if jscpd is available (don't auto-install)
if ! npx jscpd --version &> /dev/null 2>&1; then
  # jscpd not installed, skip silently
  exit 0
fi

# Get the directory of the modified file
FILE_DIR=$(dirname "$FILE_PATH")

# Run jscpd on the directory containing the file
# Use minimal threshold and format for readability
OUTPUT=$(npx jscpd "$FILE_DIR" \
  --min-lines 5 \
  --min-tokens 50 \
  --reporters console \
  --silent \
  --blame \
  2>/dev/null) || true

# Check if duplications were found
if echo "$OUTPUT" | grep -q "Clone found"; then
  # Check if the duplication involves our file
  FILE_BASENAME=$(basename "$FILE_PATH")
  if echo "$OUTPUT" | grep -q "$FILE_BASENAME"; then
    echo ""
    echo "⚠️  Code duplication detected involving $FILE_PATH:"
    echo "$OUTPUT" | grep -A5 "$FILE_BASENAME" | head -20
    echo ""
    echo "Consider extracting duplicated code into a shared utility or component."
  fi
fi

exit 0
