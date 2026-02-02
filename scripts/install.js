#!/usr/bin/env node

/**
 * Post-install script for npm
 * Displays installation instructions after npm install
 */

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

console.log("");
console.log(`${colors.bright}Lorenzo's Claude Code Plugin${colors.reset}`);
console.log(`${colors.dim}Successfully installed!${colors.reset}`);
console.log("");
console.log(`${colors.cyan}To complete setup, run:${colors.reset}`);
console.log("");
console.log(
  `  ${colors.green}npx @gr8monk3ys/claude-code-plugin install${colors.reset}`,
);
console.log("");
console.log(`${colors.dim}Or use the short alias:${colors.reset}`);
console.log("");
console.log(`  ${colors.green}lorenzo-claude install${colors.reset}`);
console.log("");
