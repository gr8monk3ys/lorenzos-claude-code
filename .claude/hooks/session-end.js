#!/usr/bin/env node
/**
 * Session End Hook - Lightweight cleanup
 * Session memory is now handled natively by Claude Code's /memory and CLAUDE.md.
 * This hook performs minimal cleanup tasks on session end.
 * Event: Stop
 *
 * Cross-platform Node.js implementation
 */

const fs = require('fs')
const path = require('path')
const os = require('os')

// Configuration - supports CLAUDE_HOME env var
const CLAUDE_DIR = process.env.CLAUDE_HOME || path.join(os.homedir(), '.claude')
const CIRCUIT_BREAKER_DIR = path.join(CLAUDE_DIR, '.circuit-breaker')

// Error logging utility
function logError(context, err) {
  console.error(`[Hook Error] session-end: ${context} - ${err.message}`)
}

// Main execution
function main() {
  // Clean up circuit breaker state from this session
  if (fs.existsSync(CIRCUIT_BREAKER_DIR)) {
    try {
      const files = fs.readdirSync(CIRCUIT_BREAKER_DIR)
      for (const file of files) {
        fs.unlinkSync(path.join(CIRCUIT_BREAKER_DIR, file))
      }
      console.error('[Cleanup] Circuit breaker state cleared')
    } catch (err) {
      logError('cleanup circuit-breaker', err)
    }
  }

  console.error('[Session] Session ended')
  process.exit(0)
}

main()
