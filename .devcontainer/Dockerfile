# Lorenzo's Claude Code Development Container
# Based on official anthropics/claude-code DevContainer configuration
# https://github.com/anthropics/claude-code/tree/main/.devcontainer

ARG CLAUDE_CODE_VERSION=latest

# Use Node.js 20 LTS as base (same as official)
FROM node:20-bookworm

# Set build arguments
ARG CLAUDE_CODE_VERSION

# Install system dependencies
RUN apt-get update && apt-get install -y \
    # Network tools for firewall
    iptables \
    ipset \
    dnsutils \
    curl \
    wget \
    # Development tools
    git \
    vim \
    jq \
    ripgrep \
    fd-find \
    # Python for some MCP servers
    python3 \
    python3-pip \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code globally
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}

# Install common development tools
RUN npm install -g \
    typescript \
    tsx \
    prettier \
    eslint \
    @playwright/test

# Create claude config directory with proper permissions
RUN mkdir -p /home/node/.claude && \
    chown -R node:node /home/node/.claude

# Set working directory
WORKDIR /workspaces

# Switch to non-root user (security best practice)
USER node

# Set environment variables
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CLAUDE_CONFIG_DIR="/home/node/.claude"

# Default command
CMD ["bash"]
