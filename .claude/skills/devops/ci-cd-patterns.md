---
name: ci-cd-patterns
description: Applies CI/CD best practices for GitHub Actions, testing pipelines, deployment workflows, and automation
category: devops
priority: 55
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - keywords: ["CI/CD", "GitHub Actions", "pipeline", "deploy", "workflow", "automation"]
  - patterns: [".github/workflows/", "Dockerfile", "docker-compose"]
---

# CI/CD Patterns Skill

Applies CI/CD best practices for reliable software delivery.

## When to Activate

This skill auto-activates when:
- Working with GitHub Actions workflows
- Discussion of CI/CD, deployment, pipelines
- Creating automation or workflow files
- Docker and containerization work

## GitHub Actions Best Practices

### Workflow Structure
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# Prevent concurrent runs on same branch
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]  # Only build after lint and test pass
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next/
          retention-days: 7

  deploy-preview:
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: build
          path: .next/
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: build
          path: .next/
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Caching Strategies

```yaml
# Node.js with pnpm (recommended)
- uses: pnpm/action-setup@v2
  with:
    version: 8
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'pnpm'  # Built-in caching

# Custom caching
- uses: actions/cache@v4
  with:
    path: |
      ~/.pnpm-store
      node_modules
      .next/cache
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-

# Docker layer caching
- uses: docker/build-push-action@v5
  with:
    context: .
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### Matrix Builds

```yaml
test:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      node-version: [18, 20, 22]
      os: [ubuntu-latest, macos-latest]
    fail-fast: false  # Continue other jobs if one fails
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm test
```

### Secrets Management

```yaml
# Use GitHub secrets for sensitive data
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}

# Use environments for deployment secrets
deploy:
  environment: production  # Uses secrets from 'production' environment
  steps:
    - run: echo "Deploying to ${{ vars.DEPLOY_URL }}"
```

## Docker Best Practices

### Multi-Stage Dockerfile
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose for Development
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      target: deps  # Use deps stage for development
    volumes:
      - .:/app
      - /app/node_modules  # Preserve node_modules
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Deployment Patterns

### Blue-Green Deployment
```yaml
deploy:
  steps:
    - name: Deploy to Blue
      run: |
        kubectl apply -f k8s/blue-deployment.yaml
        kubectl wait --for=condition=available deployment/app-blue

    - name: Run smoke tests
      run: |
        curl -f https://blue.example.com/health

    - name: Switch traffic
      run: |
        kubectl patch service app-service -p '{"spec":{"selector":{"version":"blue"}}}'

    - name: Cleanup Green
      run: |
        kubectl delete deployment app-green --ignore-not-found
```

### Canary Deployment
```yaml
deploy-canary:
  steps:
    - name: Deploy canary (10% traffic)
      run: |
        kubectl apply -f k8s/canary-deployment.yaml
        kubectl patch ingress app-ingress --type=json \
          -p='[{"op":"replace","path":"/spec/rules/0/http/paths/0/backend/service/weight","value":10}]'

    - name: Monitor for 10 minutes
      run: |
        sleep 600
        # Check error rates, latency

    - name: Promote or rollback
      run: |
        if [ "$CANARY_SUCCESS" = "true" ]; then
          kubectl apply -f k8s/full-deployment.yaml
        else
          kubectl delete deployment app-canary
        fi
```

### Vercel Deployment
```yaml
deploy-vercel:
  steps:
    - uses: amondnet/vercel-action@v25
      id: deploy
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: ${{ github.ref == 'refs/heads/main' && '--prod' || '' }}

    - name: Comment PR with preview URL
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: '🚀 Preview deployed to: ${{ steps.deploy.outputs.preview-url }}'
          })
```

## Pipeline Anti-Patterns

```yaml
# DON'T: Run everything sequentially when parallel is possible
jobs:
  all-checks:
    steps:
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
      - run: pnpm e2e

# DO: Parallelize independent jobs
jobs:
  lint:
    steps: [pnpm lint]
  test:
    steps: [pnpm test]
  build:
    needs: [lint, test]  # Only wait for actual dependencies

# DON'T: Install dependencies in every job
# DO: Use caching or artifacts

# DON'T: Use latest tags for actions
uses: actions/checkout@latest  # Bad
uses: actions/checkout@v4     # Good

# DON'T: Hardcode versions everywhere
# DO: Use env variables or matrix
```

## CI/CD Checklist

Before deploying pipeline:
- [ ] Jobs are parallelized where possible
- [ ] Dependencies are cached
- [ ] Secrets are in GitHub Secrets, not code
- [ ] Actions use pinned versions
- [ ] Fail-fast is configured appropriately
- [ ] Preview deployments for PRs
- [ ] Production requires manual approval or protection
- [ ] Build artifacts are uploaded
- [ ] Tests run before deployment
- [ ] Rollback strategy documented
