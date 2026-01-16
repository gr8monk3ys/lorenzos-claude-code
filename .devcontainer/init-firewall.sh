#!/bin/bash
# Firewall initialization script for Claude Code DevContainer
# Based on official anthropics/claude-code firewall configuration
# https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh
#
# This script restricts network access to only approved destinations:
# - GitHub (for git operations, gh CLI)
# - Anthropic API (for Claude)
# - npm registry (for package management)
# - Statsig (for feature flags)
# - Sentry (for error tracking)
# - Supabase (for database operations)
# - Vercel (for deployments)

set -e

# Check if running as root (required for iptables)
if [ "$EUID" -ne 0 ]; then
    echo "Firewall setup requires root privileges. Skipping..."
    echo "To enable network restrictions, run: sudo bash .devcontainer/init-firewall.sh"
    exit 0
fi

echo "Initializing firewall rules..."

# Flush existing rules
iptables -F OUTPUT 2>/dev/null || true
iptables -F INPUT 2>/dev/null || true

# Default policies - allow all for now, we'll add specific blocks if needed
# (Less restrictive than official, suitable for plugin development)
iptables -P OUTPUT ACCEPT
iptables -P INPUT ACCEPT
iptables -P FORWARD DROP

# Allow loopback (localhost)
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Log blocked connections (for debugging)
# Uncomment the following lines to enable strict mode with logging:
#
# # Allow DNS
# iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
# iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT
#
# # Allow HTTPS (443) to approved domains only
# # GitHub
# iptables -A OUTPUT -p tcp --dport 443 -d github.com -j ACCEPT
# iptables -A OUTPUT -p tcp --dport 443 -d api.github.com -j ACCEPT
# iptables -A OUTPUT -p tcp --dport 443 -d raw.githubusercontent.com -j ACCEPT
#
# # Anthropic
# iptables -A OUTPUT -p tcp --dport 443 -d api.anthropic.com -j ACCEPT
#
# # npm
# iptables -A OUTPUT -p tcp --dport 443 -d registry.npmjs.org -j ACCEPT
#
# # Supabase
# iptables -A OUTPUT -p tcp --dport 443 -d supabase.co -j ACCEPT
# iptables -A OUTPUT -p tcp --dport 443 -d supabase.com -j ACCEPT
#
# # Vercel
# iptables -A OUTPUT -p tcp --dport 443 -d vercel.com -j ACCEPT
# iptables -A OUTPUT -p tcp --dport 443 -d api.vercel.com -j ACCEPT
#
# # Block everything else
# iptables -A OUTPUT -p tcp --dport 443 -j LOG --log-prefix "BLOCKED HTTPS: "
# iptables -A OUTPUT -p tcp --dport 443 -j DROP

echo "Firewall rules initialized (permissive mode)."
echo ""
echo "To enable strict mode (whitelist-only), edit this script and uncomment the rules."
echo "Approved destinations in strict mode:"
echo "  - github.com, api.github.com, raw.githubusercontent.com"
echo "  - api.anthropic.com"
echo "  - registry.npmjs.org"
echo "  - supabase.co, supabase.com"
echo "  - vercel.com, api.vercel.com"
