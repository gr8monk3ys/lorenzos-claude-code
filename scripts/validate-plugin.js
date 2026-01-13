#!/usr/bin/env node

/**
 * Plugin Validation Script
 * Validates all commands, agents, and plugin configuration
 *
 * Usage: node scripts/validate-plugin.js
 */

const fs = require('fs');
const path = require('path');

const PLUGIN_PATH = '.claude-plugin/plugin.json';
const COMMANDS_DIR = '.claude/commands';
const AGENTS_DIR = '.claude/agents';

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, symbol, message) {
  console.log(`${color}${symbol}${colors.reset} ${message}`);
}

function success(message) { log(colors.green, '✓', message); }
function error(message) { log(colors.red, '✗', message); }
function warn(message) { log(colors.yellow, '⚠', message); }
function info(message) { log(colors.blue, 'ℹ', message); }

let errors = [];
let warnings = [];

// ============================================
// Plugin.json Validation
// ============================================

function validatePluginJson() {
  console.log('\n' + colors.cyan + '━━━ Validating plugin.json ━━━' + colors.reset + '\n');

  if (!fs.existsSync(PLUGIN_PATH)) {
    error(`plugin.json not found at ${PLUGIN_PATH}`);
    errors.push('Missing plugin.json');
    return null;
  }

  let plugin;
  try {
    const content = fs.readFileSync(PLUGIN_PATH, 'utf8');
    plugin = JSON.parse(content);
    success('Valid JSON syntax');
  } catch (e) {
    error(`Invalid JSON: ${e.message}`);
    errors.push('Invalid JSON in plugin.json');
    return null;
  }

  // Required fields
  const requiredFields = ['name', 'version', 'description', 'commands', 'agents'];
  for (const field of requiredFields) {
    if (!plugin[field]) {
      error(`Missing required field: ${field}`);
      errors.push(`Missing field: ${field}`);
    } else {
      success(`Has required field: ${field}`);
    }
  }

  // Version format
  if (plugin.version && !/^\d+\.\d+\.\d+$/.test(plugin.version)) {
    warn(`Version "${plugin.version}" doesn't follow semver format (x.y.z)`);
    warnings.push('Non-semver version format');
  }

  return plugin;
}

// ============================================
// Command Validation
// ============================================

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }
  return frontmatter;
}

function validateCommands(plugin) {
  console.log('\n' + colors.cyan + '━━━ Validating Commands ━━━' + colors.reset + '\n');

  if (!plugin.commands || !Array.isArray(plugin.commands)) {
    error('No commands array found');
    errors.push('Missing commands array');
    return;
  }

  info(`Found ${plugin.commands.length} commands`);

  for (const cmd of plugin.commands) {
    // Check required command fields
    if (!cmd.name || !cmd.path) {
      error(`Command missing name or path: ${JSON.stringify(cmd)}`);
      errors.push(`Invalid command: ${cmd.name || 'unknown'}`);
      continue;
    }

    // Check file exists
    if (!fs.existsSync(cmd.path)) {
      error(`Command file not found: ${cmd.path}`);
      errors.push(`Missing command file: ${cmd.path}`);
      continue;
    }

    // Check frontmatter
    const content = fs.readFileSync(cmd.path, 'utf8');
    const frontmatter = extractFrontmatter(content);

    if (!frontmatter) {
      error(`No frontmatter in ${cmd.path}`);
      errors.push(`Missing frontmatter: ${cmd.path}`);
      continue;
    }

    if (!frontmatter.description) {
      warn(`No description in frontmatter: ${cmd.path}`);
      warnings.push(`Missing description: ${cmd.path}`);
    }

    // Check for $ARGUMENTS placeholder
    if (!content.includes('$ARGUMENTS')) {
      warn(`No $ARGUMENTS placeholder in ${cmd.path}`);
      warnings.push(`Missing $ARGUMENTS: ${cmd.path}`);
    }

    success(`Command valid: ${cmd.name}`);
  }
}

// ============================================
// Agent Validation
// ============================================

function validateAgents(plugin) {
  console.log('\n' + colors.cyan + '━━━ Validating Agents ━━━' + colors.reset + '\n');

  if (!plugin.agents || !Array.isArray(plugin.agents)) {
    error('No agents array found');
    errors.push('Missing agents array');
    return;
  }

  info(`Found ${plugin.agents.length} agents`);

  for (const agent of plugin.agents) {
    // Check required agent fields
    if (!agent.name || !agent.path) {
      error(`Agent missing name or path: ${JSON.stringify(agent)}`);
      errors.push(`Invalid agent: ${agent.name || 'unknown'}`);
      continue;
    }

    // Check file exists
    if (!fs.existsSync(agent.path)) {
      error(`Agent file not found: ${agent.path}`);
      errors.push(`Missing agent file: ${agent.path}`);
      continue;
    }

    // Check frontmatter
    const content = fs.readFileSync(agent.path, 'utf8');
    const frontmatter = extractFrontmatter(content);

    if (!frontmatter) {
      error(`No frontmatter in ${agent.path}`);
      errors.push(`Missing frontmatter: ${agent.path}`);
      continue;
    }

    if (!frontmatter.name) {
      warn(`No name in frontmatter: ${agent.path}`);
      warnings.push(`Missing name in frontmatter: ${agent.path}`);
    }

    if (!frontmatter.description) {
      warn(`No description in frontmatter: ${agent.path}`);
      warnings.push(`Missing description: ${agent.path}`);
    }

    // Check agent content structure
    const hasSection = (section) => content.includes(`## ${section}`) || content.includes(`# ${section}`);

    if (!hasSection('Triggers') && !hasSection('Focus Areas') && !hasSection('Behavioral Mindset')) {
      warn(`Agent ${agent.name} may be missing standard sections`);
    }

    success(`Agent valid: ${agent.name}`);
  }
}

// ============================================
// MCP Server Validation
// ============================================

function validateMcpServers(plugin) {
  console.log('\n' + colors.cyan + '━━━ Validating MCP Servers ━━━' + colors.reset + '\n');

  if (!plugin.mcpServers || typeof plugin.mcpServers !== 'object') {
    warn('No mcpServers found');
    return;
  }

  const servers = Object.entries(plugin.mcpServers);
  info(`Found ${servers.length} MCP servers`);

  for (const [name, config] of servers) {
    if (!config.command) {
      error(`MCP server "${name}" missing command`);
      errors.push(`Invalid MCP server: ${name}`);
      continue;
    }

    if (!config.args || !Array.isArray(config.args)) {
      warn(`MCP server "${name}" missing args array`);
      warnings.push(`MCP server missing args: ${name}`);
    }

    success(`MCP server valid: ${name}`);
  }
}

// ============================================
// Count Verification
// ============================================

function verifyDescriptionCounts(plugin) {
  console.log('\n' + colors.cyan + '━━━ Verifying Description Counts ━━━' + colors.reset + '\n');

  const commandCount = plugin.commands?.length || 0;
  const agentCount = plugin.agents?.length || 0;
  const mcpCount = Object.keys(plugin.mcpServers || {}).length;

  // Extract counts from description
  const descMatch = plugin.description?.match(/(\d+)\s+productivity\s+commands.*?(\d+)\s+specialized\s+AI\s+agents/i);

  if (descMatch) {
    const descCommands = parseInt(descMatch[1]);
    const descAgents = parseInt(descMatch[2]);

    if (descCommands !== commandCount) {
      error(`Description says ${descCommands} commands, but found ${commandCount}`);
      errors.push('Command count mismatch');
    } else {
      success(`Command count matches: ${commandCount}`);
    }

    if (descAgents !== agentCount) {
      error(`Description says ${descAgents} agents, but found ${agentCount}`);
      errors.push('Agent count mismatch');
    } else {
      success(`Agent count matches: ${agentCount}`);
    }
  } else {
    warn('Could not parse counts from description');
  }

  info(`Total: ${commandCount} commands, ${agentCount} agents, ${mcpCount} MCP servers`);
}

// ============================================
// Orphan File Detection
// ============================================

function findOrphanFiles(plugin) {
  console.log('\n' + colors.cyan + '━━━ Checking for Orphan Files ━━━' + colors.reset + '\n');

  // Get registered paths
  const registeredCommands = new Set(plugin.commands?.map(c => c.path) || []);
  const registeredAgents = new Set(plugin.agents?.map(a => a.path) || []);

  // Find all markdown files in commands directory
  function findMdFiles(dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...findMdFiles(fullPath));
      } else if (item.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  // Check commands
  const commandFiles = findMdFiles(COMMANDS_DIR);
  for (const file of commandFiles) {
    if (!registeredCommands.has(file)) {
      warn(`Orphan command file (not in plugin.json): ${file}`);
      warnings.push(`Orphan file: ${file}`);
    }
  }

  // Check agents
  const agentFiles = findMdFiles(AGENTS_DIR);
  for (const file of agentFiles) {
    if (!registeredAgents.has(file)) {
      warn(`Orphan agent file (not in plugin.json): ${file}`);
      warnings.push(`Orphan file: ${file}`);
    }
  }

  if (commandFiles.length === registeredCommands.size &&
      agentFiles.length === registeredAgents.size) {
    success('No orphan files found');
  }
}

// ============================================
// Main
// ============================================

function main() {
  console.log('\n' + colors.cyan + '╔════════════════════════════════════════╗');
  console.log('║   Lorenzo\'s Claude Code Plugin Validator   ║');
  console.log('╚════════════════════════════════════════╝' + colors.reset);

  const plugin = validatePluginJson();
  if (!plugin) {
    console.log('\n' + colors.red + 'Validation aborted due to critical errors.' + colors.reset);
    process.exit(1);
  }

  validateCommands(plugin);
  validateAgents(plugin);
  validateMcpServers(plugin);
  verifyDescriptionCounts(plugin);
  findOrphanFiles(plugin);

  // Summary
  console.log('\n' + colors.cyan + '━━━ Summary ━━━' + colors.reset + '\n');

  if (errors.length === 0 && warnings.length === 0) {
    console.log(colors.green + '✓ All validations passed!' + colors.reset);
    process.exit(0);
  }

  if (warnings.length > 0) {
    console.log(colors.yellow + `⚠ ${warnings.length} warning(s):` + colors.reset);
    warnings.forEach(w => console.log(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.log(colors.red + `✗ ${errors.length} error(s):` + colors.reset);
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  }

  process.exit(0);
}

main();
