# CLI-First Development: Zero Context Tax Alternatives

**Philosophy:** "Almost all MCPs really should be CLIs. I can just refer to a CLI by name... pay zero context tax." — Peter Steinberger

This guide provides CLI alternatives to MCP servers, allowing you to maintain full functionality while dramatically reducing context overhead.

---

## Quick Reference: MCP → CLI Replacement

| MCP Server | CLI Alternative | Install Command | Context Savings |
|------------|-----------------|-----------------|-----------------|
| github | `gh` | `brew install gh` | ~4,000 tokens |
| vercel | `vercel` | `npm i -g vercel` | ~4,000 tokens |
| docker | `docker` | Built-in | ~5,000 tokens |
| kubernetes | `kubectl` | `brew install kubectl` | ~7,000 tokens |
| aws | `aws` | `brew install awscli` | ~8,000 tokens |
| terraform | `terraform` | `brew install terraform` | ~5,000 tokens |
| postgres | `psql` | `brew install postgresql` | ~3,000 tokens |
| redis | `redis-cli` | `brew install redis` | ~2,000 tokens |
| mongodb | `mongosh` | `brew install mongosh` | ~3,000 tokens |
| gitlab | `glab` | `brew install glab` | ~4,000 tokens |
| linear | `linear` | `npm i -g @linear/cli` | ~3,000 tokens |

**Total potential savings: ~48,000 tokens** (24% of context)

---

## Version Control & Git

### GitHub CLI (`gh`)
Replaces: `github` MCP server

```bash
# Install
brew install gh
gh auth login

# Common operations
gh pr list                           # List pull requests
gh pr create --title "feat: ..."     # Create PR
gh pr view 123                       # View PR details
gh pr checkout 123                   # Checkout PR branch
gh pr merge 123                      # Merge PR

gh issue list                        # List issues
gh issue create                      # Create issue
gh issue view 456                    # View issue

gh repo clone owner/repo             # Clone repository
gh repo view                         # View repo info
gh run list                          # View CI/CD runs
gh run view 789                      # View specific run
```

### GitLab CLI (`glab`)
Replaces: `gitlab` MCP server

```bash
# Install
brew install glab
glab auth login

# Common operations
glab mr list                         # List merge requests
glab mr create                       # Create MR
glab mr view 123                     # View MR
glab mr merge 123                    # Merge MR

glab issue list                      # List issues
glab pipeline list                   # List pipelines
glab ci status                       # Current pipeline status
```

---

## Cloud & Infrastructure

### AWS CLI (`aws`)
Replaces: `aws` MCP server

```bash
# Install
brew install awscli
aws configure

# S3 operations
aws s3 ls                            # List buckets
aws s3 ls s3://bucket-name           # List bucket contents
aws s3 cp file.txt s3://bucket/      # Upload file
aws s3 sync ./dir s3://bucket/dir    # Sync directory

# Lambda
aws lambda list-functions            # List functions
aws lambda invoke --function-name fn output.json
aws logs tail /aws/lambda/fn --follow

# DynamoDB
aws dynamodb list-tables             # List tables
aws dynamodb scan --table-name tbl   # Scan table

# CloudWatch
aws logs describe-log-groups         # List log groups
aws cloudwatch get-metric-statistics # Get metrics
```

### Terraform CLI (`terraform`)
Replaces: `terraform` MCP server

```bash
# Install
brew install terraform

# Common operations
terraform init                       # Initialize working directory
terraform plan                       # Preview changes
terraform apply                      # Apply changes
terraform destroy                    # Destroy infrastructure
terraform state list                 # List resources in state
terraform output                     # Show outputs
```

### Kubernetes CLI (`kubectl`)
Replaces: `kubernetes` MCP server

```bash
# Install
brew install kubectl

# Common operations
kubectl get pods                     # List pods
kubectl get pods -n namespace        # List pods in namespace
kubectl get deployments              # List deployments
kubectl get services                 # List services

kubectl describe pod pod-name        # Pod details
kubectl logs pod-name                # View logs
kubectl logs -f pod-name             # Follow logs

kubectl apply -f manifest.yaml       # Apply manifest
kubectl delete -f manifest.yaml      # Delete resources

kubectl exec -it pod-name -- bash    # Shell into pod
kubectl port-forward pod-name 8080:80 # Port forward
```

**Enhanced alternative: `k9s`**
```bash
brew install k9s
k9s                                  # Interactive TUI for Kubernetes
```

### Docker CLI (`docker`)
Replaces: `docker` MCP server

```bash
# Built-in with Docker Desktop

# Container operations
docker ps                            # List running containers
docker ps -a                         # List all containers
docker logs container-name           # View logs
docker logs -f container-name        # Follow logs

docker run -d -p 8080:80 image       # Run container
docker stop container-name           # Stop container
docker rm container-name             # Remove container

docker exec -it container bash       # Shell into container

# Image operations
docker images                        # List images
docker build -t name:tag .           # Build image
docker push name:tag                 # Push to registry

# Compose
docker compose up -d                 # Start services
docker compose down                  # Stop services
docker compose logs -f               # Follow all logs
```

**Enhanced alternative: `lazydocker`**
```bash
brew install lazydocker
lazydocker                           # Interactive TUI for Docker
```

---

## Databases

### PostgreSQL (`psql`)
Replaces: `postgres` MCP server

```bash
# Install
brew install postgresql

# Connect
psql postgresql://user:pass@host:5432/dbname

# Common operations
\l                                   # List databases
\dt                                  # List tables
\d table_name                        # Describe table
\di                                  # List indexes

SELECT * FROM users LIMIT 10;        # Query data
\x                                   # Toggle expanded display
\timing                              # Show query timing
\q                                   # Quit
```

**Enhanced alternative: `pgcli`**
```bash
brew install pgcli
pgcli postgresql://...               # Postgres with autocomplete
```

### MongoDB (`mongosh`)
Replaces: `mongodb` MCP server

```bash
# Install
brew install mongosh

# Connect
mongosh "mongodb://localhost:27017/dbname"

# Common operations
show dbs                             # List databases
use dbname                           # Switch database
show collections                     # List collections

db.users.find()                      # Find all documents
db.users.find({ age: { $gt: 21 } })  # Query with filter
db.users.insertOne({ name: "John" }) # Insert document
db.users.updateOne(                  # Update document
  { _id: ObjectId("...") },
  { $set: { name: "Jane" } }
)
```

### Redis (`redis-cli`)
Replaces: `redis` MCP server

```bash
# Install
brew install redis

# Connect
redis-cli -h localhost -p 6379

# Common operations
KEYS *                               # List all keys (careful in prod)
GET key                              # Get value
SET key value                        # Set value
DEL key                              # Delete key
EXPIRE key 3600                      # Set TTL

HGETALL hash                         # Get hash
LPUSH list value                     # Push to list
SMEMBERS set                         # Get set members

INFO                                 # Server info
MONITOR                              # Real-time commands
```

**Enhanced alternative: `iredis`**
```bash
pip install iredis
iredis                               # Redis with autocomplete
```

---

## Deployment & Hosting

### Vercel CLI (`vercel`)
Replaces: `vercel` MCP server

```bash
# Install
npm i -g vercel
vercel login

# Common operations
vercel                               # Deploy (interactive)
vercel --prod                        # Deploy to production
vercel dev                           # Local development

vercel ls                            # List deployments
vercel inspect deployment-url        # Inspect deployment
vercel logs deployment-url           # View logs

vercel env pull                      # Pull env vars to .env
vercel env add VAR_NAME              # Add env var
vercel domains ls                    # List domains
```

### Supabase CLI (`supabase`)
Replaces: `supabase` MCP server (partially)

```bash
# Install
brew install supabase/tap/supabase
supabase login

# Local development
supabase init                        # Initialize project
supabase start                       # Start local Supabase
supabase stop                        # Stop local Supabase
supabase status                      # Show status

# Database
supabase db diff                     # Show schema diff
supabase db push                     # Push migrations
supabase db reset                    # Reset local database

# Functions
supabase functions new fn-name       # Create function
supabase functions serve             # Serve locally
supabase functions deploy fn-name    # Deploy function

# Types
supabase gen types typescript --local > types/supabase.ts
```

---

## Productivity & Project Management

### Linear CLI (`linear`)
Replaces: `linear` MCP server

```bash
# Install
npm i -g @linear/cli
linear auth

# Common operations
linear issue list                    # List issues
linear issue create                  # Create issue
linear issue view ISSUE-123          # View issue
```

### Task Management (`taskwarrior`)
Alternative for issue tracking

```bash
# Install
brew install task

# Common operations
task add "Implement feature X"       # Add task
task list                            # List tasks
task 1 done                          # Complete task
task 1 modify priority:H             # Modify task
task project:web list                # Filter by project
```

---

## HTTP & API Testing

### HTTPie (`http`)
Better than curl for API testing

```bash
# Install
brew install httpie

# Common operations
http GET https://api.example.com/users
http POST https://api.example.com/users name=John age:=25
http PUT https://api.example.com/users/1 name=Jane
http DELETE https://api.example.com/users/1

# With authentication
http -A bearer -a TOKEN https://api.example.com/protected

# Download file
http --download https://example.com/file.zip
```

### cURL (built-in)
```bash
# GET request
curl https://api.example.com/users

# POST with JSON
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 25}'

# With auth header
curl -H "Authorization: Bearer TOKEN" https://api.example.com/protected
```

---

## File Search & Management

### ripgrep (`rg`)
Fast code search (Claude uses this internally)

```bash
# Install
brew install ripgrep

# Common operations
rg "pattern"                         # Search recursively
rg -i "pattern"                      # Case insensitive
rg -t ts "pattern"                   # Search TypeScript files
rg -g "*.tsx" "pattern"              # Glob pattern
rg -l "pattern"                      # Files only
rg -C 3 "pattern"                    # With context
```

### fd
Modern `find` alternative

```bash
# Install
brew install fd

# Common operations
fd "pattern"                         # Find by name
fd -e ts                             # Find by extension
fd -t f                              # Files only
fd -t d                              # Directories only
fd -H "pattern"                      # Include hidden
```

### fzf
Fuzzy finder for everything

```bash
# Install
brew install fzf

# Common operations
fzf                                  # Interactive file finder
cat file | fzf                       # Filter any list
git branch | fzf                     # Select branch
```

---

## Monitoring & Observability

### Sentry CLI (`sentry-cli`)
Replaces: `sentry` MCP server

```bash
# Install
brew install getsentry/tools/sentry-cli
sentry-cli login

# Common operations
sentry-cli releases list             # List releases
sentry-cli releases new VERSION      # Create release
sentry-cli releases files VERSION upload-sourcemaps ./dist
sentry-cli releases finalize VERSION
```

---

## Usage Patterns

### Pattern 1: Direct CLI in Prompts
```
"Run `gh pr list --state open` and show me the results"
"Execute `kubectl get pods -n production` to check pod status"
"Use `psql` to query the users table"
```

### Pattern 2: Wrapper Scripts
Create simple scripts for common operations:

```bash
#!/bin/bash
# .claude/scripts/deploy.sh
vercel --prod && gh pr comment --body "Deployed to production"
```

### Pattern 3: Aliases
Add to your `.bashrc` or `.zshrc`:

```bash
alias gpr='gh pr'
alias k='kubectl'
alias dc='docker compose'
alias tf='terraform'
```

---

## Migration Checklist

### From Full MCP to CLI-First

1. [ ] Install required CLIs (see commands above)
2. [ ] Authenticate each CLI (`gh auth`, `aws configure`, etc.)
3. [ ] Test each CLI manually to confirm access
4. [ ] Update your MCP profile to minimal (see `mcp-minimal.json`)
5. [ ] Set `ENABLE_TOOL_SEARCH=true` for remaining MCPs
6. [ ] Monitor context usage with `/context`

### Recommended Minimal Setup

**Keep as MCP:**
- `context7` - Documentation (no good CLI alternative)
- `memory` - Session persistence (no CLI equivalent)
- `playwright` - Browser automation (CLI exists but MCP is better)

**Use CLI instead:**
- Everything else

---

## Performance Comparison

| Approach | Startup Tokens | Context Available | Best For |
|----------|----------------|-------------------|----------|
| All 29 MCPs | ~142,000 | 29% | Never recommended |
| Fullstack (10 MCPs) | ~40,000 | 80% | Active full-stack projects |
| Minimal (4 MCPs) | ~16,000 | 92% | Daily development |
| CLI-first | ~0 | 100% | Maximum context efficiency |

---

## References

- [awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps) - Comprehensive CLI tools list
- [Peter Steinberger's Blog](https://steipete.me) - CLI-first workflow philosophy
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
