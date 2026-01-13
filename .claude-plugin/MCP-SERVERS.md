# MCP Servers Included

This plugin includes 6 pre-configured MCP servers that enhance Claude Code's capabilities.

## Included Servers

### 1. **Context7** (`@upstash/context7-mcp`)
**Purpose**: Access up-to-date, version-specific documentation for any library

**Usage**: Just mention "use context7" in your prompt when you need current library documentation

**Benefits**:
- Always up-to-date docs
- Version-specific information
- Works with thousands of libraries
- No manual searching required

### 2. **Playwright** (`@playwright/mcp`)
**Purpose**: Browser automation and web testing

**Capabilities**:
- Navigate websites
- Take screenshots
- Interact with web elements
- Generate test code
- Access accessibility trees

**Use Cases**:
- E2E testing
- Web scraping
- Browser automation
- Visual testing

### 3. **Supabase** (`@supabase/mcp-server-supabase`)
**Purpose**: Supabase database operations

**Capabilities**:
- Query databases
- Manage tables
- Execute SQL
- Handle authentication
- Work with storage

**Use Cases**:
- Database management
- Schema exploration
- Data queries
- Admin operations

**Configuration Required**: Supabase MCP server requires credentials to connect to your project.

**Option 1: Environment Variables**
```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**Option 2: Claude Code Settings**
Add to `~/.claude/settings.json`:
```json
{
  "mcp": {
    "envVars": {
      "SUPABASE_URL": "https://your-project.supabase.co",
      "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
    }
  }
}
```

**Finding Your Credentials**:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project → Settings → API
3. Copy **Project URL** and **service_role** key (not anon key)

### 4. **Stripe** (`@stripe/mcp`)
**Purpose**: Stripe payment processing and API operations

**Capabilities**:
- Manage customers and subscriptions
- Create and manage products/prices
- Process payments and refunds
- Search Stripe documentation
- Handle invoices and billing

**Use Cases**:
- Payment integration
- Subscription management
- Financial operations
- Billing automation

**Configuration Required**: Stripe MCP server requires your API key.

**Option 1: Environment Variables**
```bash
export STRIPE_SECRET_KEY="sk_live_your-secret-key"
```

**Option 2: Command Arguments**
The server can be run with: `npx -y @stripe/mcp --tools=all --api-key=YOUR_KEY`

**Finding Your Credentials**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret key** (starts with `sk_live_` or `sk_test_`)

### 5. **Chrome DevTools** (`chrome-devtools-mcp`)
**Purpose**: Browser debugging and performance analysis

**Capabilities**:
- Control live Chrome browser
- Inspect DOM and network requests
- Record performance traces
- Analyze console logs
- Debug web applications

**Use Cases**:
- Performance debugging
- Network analysis
- DOM inspection
- Console log analysis
- CORS issue debugging

**Requirements**: Node.js 22+ and Chrome browser installed.

**Installation**: `claude mcp add chrome-devtools npx chrome-devtools-mcp@latest`

### 6. **Vercel** (`@vercel/mcp`)
**Purpose**: Vercel deployment and project management

**Capabilities**:
- Search Vercel documentation
- Manage deployments
- Configure projects
- Handle team operations
- Monitor build status

**Use Cases**:
- Deployment management
- Project configuration
- Documentation search
- Build monitoring

**Configuration**: Vercel MCP uses OAuth for authentication. Connect via Vercel's remote server at `https://mcp.vercel.com`.

## Using MCP Servers

After installing this plugin:

1. **Automatic Activation**: MCP servers start automatically when you use the plugin
2. **Restart Required**: Restart Claude Code after plugin installation
3. **Tool Access**: MCP tools appear in Claude's available tools list

## Adding More MCP Servers

You can add custom MCP servers to your local `.claude/.mcp.json`:

```json
{
  "server-name": {
    "command": "npx",
    "args": ["-y", "package-name"],
    "env": {
      "API_KEY": "your-key"
    }
  }
}
```

## Troubleshooting

**MCP servers not loading?**
1. Restart Claude Code
2. Check that npm/npx is installed
3. Verify network connection (MCP servers download on first use)

**Performance issues?**
- MCP servers run on-demand
- First use may be slower (package download)
- Subsequent uses are fast

## Learn More

- Official MCP Documentation: https://modelcontextprotocol.io
- Claude Code MCP Guide: https://docs.claude.com/en/docs/claude-code/mcp
- MCP Server Directory: https://mcpcat.io
