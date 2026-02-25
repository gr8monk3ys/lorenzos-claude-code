#!/usr/bin/env node
/**
 * Session Start Hook - Instinct Loading
 * Loads learned instincts when Claude sessions begin.
 * Session memory is now handled natively by Claude Code's /memory and CLAUDE.md.
 * Event: SessionStart
 *
 * Cross-platform Node.js implementation
 */

const fs = require('fs')
const path = require('path')
const os = require('os')

// Configuration - supports CLAUDE_HOME env var
const CLAUDE_DIR = process.env.CLAUDE_HOME || path.join(os.homedir(), '.claude')
const INSTINCTS_DIR = path.join(CLAUDE_DIR, 'instincts')
const INSTINCTS_FILE = path.join(INSTINCTS_DIR, 'instincts.json')
const LEARNED_SKILLS_DIR = path.join(CLAUDE_DIR, 'skills', 'learned')
const MIN_INSTINCT_CONFIDENCE = 0.6

// Error logging utility
function logError(context, err) {
  console.error(`[Hook Error] session-start: ${context} - ${err.message}`)
}

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read JSON file safely
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    logError(`readJson(${path.basename(filePath)})`, err)
    return null
  }
}

// Find files matching criteria
function findFiles(dir, extension) {
  if (!fs.existsSync(dir)) return []

  try {
    return fs.readdirSync(dir)
      .filter(file => file.endsWith(extension))
      .map(file => path.basename(file, extension))
  } catch (err) {
    logError(`findFiles(${dir})`, err)
    return []
  }
}

// Main execution
function main() {
  ensureDir(INSTINCTS_DIR)
  ensureDir(LEARNED_SKILLS_DIR)

  // Find learned skills
  const learnedSkills = findFiles(LEARNED_SKILLS_DIR, '.md')

  if (learnedSkills.length > 0) {
    console.error(
      `[Learning] ${learnedSkills.length} learned skill(s) available from previous sessions`
    )
    for (const skill of learnedSkills) {
      console.error(`[Learning] - ${skill}`)
    }
  }

  // Load and display relevant instincts
  const instinctsData = readJson(INSTINCTS_FILE)

  if (instinctsData && instinctsData.instincts) {
    const highConfidence = instinctsData.instincts.filter(
      (i) => i.confidence >= MIN_INSTINCT_CONFIDENCE
    )

    if (highConfidence.length > 0) {
      console.error(
        `[Learning] ${highConfidence.length} high-confidence instinct(s) available:`
      )
      // Show top 3 by confidence
      highConfidence
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3)
        .forEach((i) => {
          console.error(
            `  - [${(i.confidence * 100).toFixed(0)}%] ${i.pattern.slice(0, 60)}...`
          )
        })
    }
  }

  // Check for project-specific memory
  if (fs.existsSync('.claude/memory.json')) {
    console.error('[Learning] Project-specific memory file found')
  }

  process.exit(0)
}

main()
