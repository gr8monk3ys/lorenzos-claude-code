#!/usr/bin/env node
/**
 * Circuit Breaker Hook
 * Detects thrashing patterns: repeated errors, file edit loops, identical tool calls
 * Event: PostToolUse
 *
 * Cross-platform Node.js implementation
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

// Configuration - supports CLAUDE_HOME env var
const CLAUDE_DIR = process.env.CLAUDE_HOME || path.join(os.homedir(), ".claude");
const STATE_DIR = path.join(CLAUDE_DIR, ".circuit-breaker");
const ERROR_LOG = path.join(STATE_DIR, "errors.log");
const EDIT_LOG = path.join(STATE_DIR, "edits.log");
const TOOL_LOG = path.join(STATE_DIR, "tools.log");
const THRESHOLD_ERRORS = 3;
const THRESHOLD_EDITS = 3;
const THRESHOLD_TOOLS = 3;
const MAX_AGE_SECONDS = 600; // 10 minutes

// Error logging utility
function logError(context, err) {
  console.error(`[Hook Error] circuit-breaker: ${context} - ${err.message}`);
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read log file as entries
function readLog(logFile) {
  if (!fs.existsSync(logFile)) return [];
  try {
    return fs
      .readFileSync(logFile, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|");
        return {
          timestamp: parseInt(parts[0]),
          data: parts.slice(1).join("|"),
        };
      });
  } catch (err) {
    logError(`readLog(${path.basename(logFile)})`, err);
    return [];
  }
}

// Write log file
function writeLog(logFile, entries) {
  const content = entries.map((e) => `${e.timestamp}|${e.data}`).join("\n");
  fs.writeFileSync(logFile, content + (entries.length ? "\n" : ""));
}

// Clean old entries
function cleanOldEntries(entries) {
  const cutoff = Math.floor(Date.now() / 1000) - MAX_AGE_SECONDS;
  return entries.filter((e) => e.timestamp >= cutoff);
}

// Count similar entries
function countSimilar(entries, pattern) {
  return entries.filter((e) => e.data.includes(pattern)).length;
}

// Get error signature
function getErrorSignature(output) {
  if (!output) return null;
  const match = output.match(/(?:error|failed|exception|cannot|unable)[^\n]*/i);
  if (!match) return null;
  return match[0].replace(/\d+/g, "#").slice(0, 100);
}

// Print circuit breaker warning
function printWarning(title, count, message, file, actions) {
  console.error("");
  console.error("============================================================");
  console.error(`[CIRCUIT BREAKER] ${title} (${count} times)`);
  console.error("============================================================");
  console.error("");
  if (file) console.error(`File: ${file}`);
  console.error("");
  console.error(`STOP: ${message}`);
  console.error("");
  console.error("Recovery actions:");
  actions.forEach((action, i) => console.error(`  ${i + 1}. ${action}`));
  console.error("");
  console.error("Reset: rm -rf ~/.claude/.circuit-breaker");
  console.error("============================================================");
  console.error("");
}

// Read stdin
async function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", () => {
      let chunk;
      while ((chunk = process.stdin.read())) {
        data += chunk;
      }
    });
    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        logError("stdin parse", err);
        resolve({});
      }
    });
    process.stdin.on("error", (err) => {
      logError("stdin read", err);
      resolve({});
    });
    setTimeout(() => resolve({}), 500);
  });
}

// Main execution
async function main() {
  ensureDir(STATE_DIR);

  const input = await readStdin();
  const timestamp = Math.floor(Date.now() / 1000);

  const toolName = input.tool_name || "";
  const toolInput = input.tool_input || {};
  const toolOutput = input.tool_output || "";
  const exitCode = input.exit_code || 0;
  const filePath = toolInput.file_path || "";

  // Load and clean logs
  let errorLog = cleanOldEntries(readLog(ERROR_LOG));
  let editLog = cleanOldEntries(readLog(EDIT_LOG));
  let toolLog = cleanOldEntries(readLog(TOOL_LOG));

  // Track errors
  if (exitCode !== 0 || /error|failed|exception/i.test(toolOutput)) {
    const errorSig = getErrorSignature(toolOutput);
    if (errorSig) {
      errorLog.push({ timestamp, data: `${toolName}|${errorSig}` });
      const errorCount = countSimilar(errorLog, errorSig);

      if (errorCount >= THRESHOLD_ERRORS) {
        printWarning(
          "Repeated Error Detected",
          errorCount,
          "Same error appearing repeatedly indicates a deeper issue.",
          null,
          [
            "PAUSE - Don't try another variation of the same approach",
            "ASSESS - Document what's been tried and why it failed",
            "PIVOT - Try a fundamentally different approach",
            "ASK - Request user guidance if stuck",
          ],
        );
      }
    }
  }

  // Track file edits
  if (toolName === "Edit" || toolName === "Write") {
    if (filePath) {
      const normalizedPath = path.basename(filePath);
      editLog.push({ timestamp, data: `${toolName}|${normalizedPath}` });
      const editCount = countSimilar(editLog, normalizedPath);

      if (editCount >= THRESHOLD_EDITS) {
        printWarning(
          "File Edit Loop Detected",
          editCount,
          "Repeated edits to same file without progress.",
          filePath,
          [
            "Step back - Understand the file's role in the system",
            "Read first - Re-read the file and related files",
            "Trace flow - Follow data/control flow through the code",
            "Simplify - Remove recent changes and try simpler approach",
          ],
        );
      }
    }
  }

  // Track identical tool calls
  if (toolName) {
    const toolSig = crypto
      .createHash("md5")
      .update(`${toolName}|${JSON.stringify(toolInput)}`)
      .digest("hex")
      .slice(0, 16);

    toolLog.push({ timestamp, data: toolSig });
    const toolCount = countSimilar(toolLog, toolSig);

    if (toolCount >= THRESHOLD_TOOLS) {
      printWarning(
        "Identical Tool Calls Detected",
        toolCount,
        "Same tool call with same parameters repeated.",
        null,
        [
          "Same input = Same output - Change the input",
          "Check expectations - Why expect different result?",
          "Try different tool - Is there another approach?",
          "Verify state - Has something changed externally?",
        ],
      );
    }
  }

  // Check for high failure rate
  const recentErrors = errorLog.slice(-10).length;
  const totalTools = toolLog.slice(-10).length;

  if (totalTools >= 10 && recentErrors >= 7) {
    console.error("");
    console.error(
      "============================================================",
    );
    console.error("[CIRCUIT BREAKER] High Failure Rate Detected");
    console.error(
      "============================================================",
    );
    console.error("");
    console.error(
      `Recent operations: ${recentErrors} errors in last ${totalTools} operations`,
    );
    console.error("");
    console.error(
      "STOP: Success rate is very low - approach may be fundamentally flawed.",
    );
    console.error("");
    console.error("Recovery actions:");
    console.error("  1. Full stop - Take a step back from current approach");
    console.error("  2. Root cause - Use root-cause-analysis skill");
    console.error("  3. User input - Ask for guidance or clarification");
    console.error("  4. Fresh start - Consider reverting recent changes");
    console.error("");
    console.error("Reset: rm -rf ~/.claude/.circuit-breaker");
    console.error(
      "============================================================",
    );
    console.error("");
  }

  // Save logs
  writeLog(ERROR_LOG, errorLog);
  writeLog(EDIT_LOG, editLog);
  writeLog(TOOL_LOG, toolLog);

  process.exit(0);
}

main();
