#!/bin/bash
# Circuit Breaker Hook
# Detects thrashing patterns: repeated errors, file edit loops, identical tool calls
# Event: PostToolUse (to analyze results) and PreToolUse (to check history)
#
# Usage: Configure in .claude/settings.json under hooks.PostToolUse
# Matcher: ".*" (all tools) or specific tools like "Edit|Write|Bash"

set -e

# Configuration
STATE_DIR="${HOME}/.claude/.circuit-breaker"
ERROR_LOG="${STATE_DIR}/errors.log"
EDIT_LOG="${STATE_DIR}/edits.log"
TOOL_LOG="${STATE_DIR}/tools.log"
THRESHOLD_ERRORS=3
THRESHOLD_EDITS=3
THRESHOLD_TOOLS=3

# Ensure state directory exists
mkdir -p "$STATE_DIR"

# Initialize log files if they don't exist
touch "$ERROR_LOG" "$EDIT_LOG" "$TOOL_LOG"

# Read JSON input from stdin
INPUT=$(cat)

# Extract relevant fields
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input // {} | @json')
TOOL_OUTPUT=$(echo "$INPUT" | jq -r '.tool_output // empty')
EXIT_CODE=$(echo "$INPUT" | jq -r '.exit_code // 0')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Get current timestamp
TIMESTAMP=$(date +%s)

# Function to clean old entries (older than 10 minutes)
cleanup_old_entries() {
    local log_file="$1"
    local cutoff=$((TIMESTAMP - 600))
    if [ -f "$log_file" ]; then
        awk -F'|' -v cutoff="$cutoff" '$1 >= cutoff' "$log_file" > "${log_file}.tmp" 2>/dev/null || true
        mv "${log_file}.tmp" "$log_file" 2>/dev/null || true
    fi
}

# Function to count similar entries
count_similar() {
    local log_file="$1"
    local pattern="$2"
    if [ -f "$log_file" ]; then
        grep -c "$pattern" "$log_file" 2>/dev/null || echo "0"
    else
        echo "0"
    fi
}

# Function to get signature (for deduplication)
get_error_signature() {
    local output="$1"
    # Extract key parts of error message (first line, common patterns)
    echo "$output" | grep -iE "(error|failed|exception|cannot|unable)" | head -1 | sed 's/[0-9]/#/g' | cut -c1-100
}

# Clean old entries from all logs
cleanup_old_entries "$ERROR_LOG"
cleanup_old_entries "$EDIT_LOG"
cleanup_old_entries "$TOOL_LOG"

# Track errors
if [ "$EXIT_CODE" != "0" ] || echo "$TOOL_OUTPUT" | grep -qiE "(error|failed|exception)"; then
    ERROR_SIG=$(get_error_signature "$TOOL_OUTPUT")
    if [ -n "$ERROR_SIG" ]; then
        echo "${TIMESTAMP}|${TOOL_NAME}|${ERROR_SIG}" >> "$ERROR_LOG"

        # Count similar errors
        ERROR_COUNT=$(count_similar "$ERROR_LOG" "$ERROR_SIG")

        if [ "$ERROR_COUNT" -ge "$THRESHOLD_ERRORS" ]; then
            echo "" >&2
            echo "============================================================" >&2
            echo "[CIRCUIT BREAKER] Repeated Error Detected ($ERROR_COUNT times)" >&2
            echo "============================================================" >&2
            echo "" >&2
            echo "Error pattern: ${ERROR_SIG:0:80}..." >&2
            echo "" >&2
            echo "STOP: Same error appearing repeatedly indicates a deeper issue." >&2
            echo "" >&2
            echo "Recovery actions:" >&2
            echo "  1. PAUSE - Don't try another variation of the same approach" >&2
            echo "  2. ASSESS - Document what's been tried and why it failed" >&2
            echo "  3. PIVOT - Try a fundamentally different approach" >&2
            echo "  4. ASK - Request user guidance if stuck" >&2
            echo "" >&2
            echo "Consider: Is an assumption wrong? Is the problem elsewhere?" >&2
            echo "Reset: rm -rf ~/.claude/.circuit-breaker" >&2
            echo "============================================================" >&2
            echo "" >&2
        fi
    fi
fi

# Track file edits
if [ "$TOOL_NAME" = "Edit" ] || [ "$TOOL_NAME" = "Write" ]; then
    if [ -n "$FILE_PATH" ]; then
        # Normalize path for matching
        NORMALIZED_PATH=$(echo "$FILE_PATH" | sed 's|.*/||')
        echo "${TIMESTAMP}|${TOOL_NAME}|${NORMALIZED_PATH}" >> "$EDIT_LOG"

        # Count edits to same file
        EDIT_COUNT=$(count_similar "$EDIT_LOG" "$NORMALIZED_PATH")

        if [ "$EDIT_COUNT" -ge "$THRESHOLD_EDITS" ]; then
            echo "" >&2
            echo "============================================================" >&2
            echo "[CIRCUIT BREAKER] File Edit Loop Detected ($EDIT_COUNT edits)" >&2
            echo "============================================================" >&2
            echo "" >&2
            echo "File: $FILE_PATH" >&2
            echo "" >&2
            echo "STOP: Repeated edits to same file without progress." >&2
            echo "" >&2
            echo "Recovery actions:" >&2
            echo "  1. Step back - Understand the file's role in the system" >&2
            echo "  2. Read first - Re-read the file and related files" >&2
            echo "  3. Trace flow - Follow data/control flow through the code" >&2
            echo "  4. Simplify - Remove recent changes and try simpler approach" >&2
            echo "" >&2
            echo "Consider: Is this the right file to change?" >&2
            echo "Reset: rm -rf ~/.claude/.circuit-breaker" >&2
            echo "============================================================" >&2
            echo "" >&2
        fi
    fi
fi

# Track identical tool calls
if [ -n "$TOOL_NAME" ] && [ -n "$TOOL_INPUT" ]; then
    # Create a signature of tool + input (truncated)
    TOOL_SIG=$(echo "${TOOL_NAME}|${TOOL_INPUT}" | md5sum | cut -c1-16)
    echo "${TIMESTAMP}|${TOOL_SIG}" >> "$TOOL_LOG"

    # Count identical tool calls
    TOOL_COUNT=$(count_similar "$TOOL_LOG" "$TOOL_SIG")

    if [ "$TOOL_COUNT" -ge "$THRESHOLD_TOOLS" ]; then
        echo "" >&2
        echo "============================================================" >&2
        echo "[CIRCUIT BREAKER] Identical Tool Calls Detected ($TOOL_COUNT times)" >&2
        echo "============================================================" >&2
        echo "" >&2
        echo "Tool: $TOOL_NAME" >&2
        echo "" >&2
        echo "STOP: Same tool call with same parameters repeated." >&2
        echo "" >&2
        echo "Recovery actions:" >&2
        echo "  1. Same input = Same output - Change the input" >&2
        echo "  2. Check expectations - Why expect different result?" >&2
        echo "  3. Try different tool - Is there another approach?" >&2
        echo "  4. Verify state - Has something changed externally?" >&2
        echo "" >&2
        echo "Consider: What needs to change to get a different result?" >&2
        echo "Reset: rm -rf ~/.claude/.circuit-breaker" >&2
        echo "============================================================" >&2
        echo "" >&2
    fi
fi

# Check for declining success rate
RECENT_ERRORS=$(tail -10 "$ERROR_LOG" 2>/dev/null | wc -l)
TOTAL_TOOLS=$(tail -10 "$TOOL_LOG" 2>/dev/null | wc -l)

if [ "$TOTAL_TOOLS" -ge 10 ] && [ "$RECENT_ERRORS" -ge 7 ]; then
    echo "" >&2
    echo "============================================================" >&2
    echo "[CIRCUIT BREAKER] High Failure Rate Detected" >&2
    echo "============================================================" >&2
    echo "" >&2
    echo "Recent operations: $RECENT_ERRORS errors in last $TOTAL_TOOLS operations" >&2
    echo "" >&2
    echo "STOP: Success rate is very low - approach may be fundamentally flawed." >&2
    echo "" >&2
    echo "Recovery actions:" >&2
    echo "  1. Full stop - Take a step back from current approach" >&2
    echo "  2. Root cause - Use root-cause-analysis skill" >&2
    echo "  3. User input - Ask for guidance or clarification" >&2
    echo "  4. Fresh start - Consider reverting recent changes" >&2
    echo "" >&2
    echo "Reset: rm -rf ~/.claude/.circuit-breaker" >&2
    echo "============================================================" >&2
    echo "" >&2
fi

exit 0
