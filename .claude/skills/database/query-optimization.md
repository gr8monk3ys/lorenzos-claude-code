---
name: query-optimization
description: Optimizes database queries with indexing suggestions, N+1 prevention, efficient data fetching, and performance patterns
category: database
priority: 65
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - keywords: ["query", "database", "SQL", "N+1", "index", "slow query", "performance"]
  - patterns: ["prisma/", "drizzle/", ".sql", "queries/"]
---

# Query Optimization Skill

Automatically optimizes database queries for performance.

## When to Activate

This skill auto-activates when:
- Database queries being written or modified
- Performance discussions involving database
- Files with Prisma, Drizzle, or raw SQL
- N+1 or slow query issues mentioned

## N+1 Query Prevention

### The Problem
```typescript
// BAD: N+1 queries (1 query + N queries for each post)
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
  // This runs N additional queries!
}
```

### The Solution

#### Prisma
```typescript
// GOOD: Single query with include
const users = await prisma.user.findMany({
  include: {
    posts: true,
    profile: true,
  },
});

// GOOD: Selective includes (only what you need)
const users = await prisma.user.findMany({
  include: {
    posts: {
      select: { id: true, title: true },
      where: { published: true },
      take: 5,
    },
  },
});
```

#### Drizzle
```typescript
// GOOD: Join query
const usersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(posts.authorId, users.id));

// GOOD: With relations
const result = await db.query.users.findMany({
  with: {
    posts: true,
  },
});
```

#### Raw SQL
```sql
-- GOOD: JOIN instead of multiple queries
SELECT u.*, p.*
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.active = true;

-- GOOD: Subquery for aggregates
SELECT u.*,
  (SELECT COUNT(*) FROM posts WHERE author_id = u.id) as post_count
FROM users u;
```

## Indexing Strategies

### When to Add Indexes
```sql
-- Index columns used in:
-- 1. WHERE clauses
CREATE INDEX idx_users_email ON users(email);

-- 2. JOIN conditions
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- 3. ORDER BY clauses
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- 4. Frequent combinations (composite index)
CREATE INDEX idx_posts_author_status ON posts(author_id, status);
```

### Prisma Schema Indexes
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())

  author    User     @relation(fields: [authorId], references: [id])

  // Indexes
  @@index([authorId])
  @@index([createdAt(sort: Desc)])
  @@index([authorId, published])  // Composite
  @@index([title], type: BTree)   // Full-text search prep
}
```

### Index Anti-Patterns
```sql
-- DON'T: Index everything
-- Each index slows down writes and uses storage

-- DON'T: Index low-cardinality columns alone
CREATE INDEX idx_users_active ON users(active);  -- Only true/false

-- DO: Combine with high-cardinality
CREATE INDEX idx_users_active_created ON users(active, created_at);

-- DON'T: Redundant indexes
CREATE INDEX idx_a ON posts(author_id);
CREATE INDEX idx_ab ON posts(author_id, status);  -- This covers idx_a!
```

## Query Efficiency Patterns

### Select Only What You Need
```typescript
// BAD: Select all columns
const users = await prisma.user.findMany();

// GOOD: Select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// Drizzle
const users = await db
  .select({ id: users.id, name: users.name })
  .from(users);
```

### Pagination
```typescript
// Offset pagination (simple but slow for large offsets)
const page = 5;
const pageSize = 20;
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' },
});

// Cursor pagination (efficient for large datasets)
const users = await prisma.user.findMany({
  take: 20,
  cursor: { id: lastSeenId },
  skip: 1,  // Skip the cursor itself
  orderBy: { id: 'asc' },
});

// Keyset pagination (most efficient)
const users = await db
  .select()
  .from(users)
  .where(gt(users.createdAt, lastCreatedAt))
  .orderBy(users.createdAt)
  .limit(20);
```

### Batch Operations
```typescript
// BAD: Individual inserts
for (const user of newUsers) {
  await prisma.user.create({ data: user });
}

// GOOD: Batch insert
await prisma.user.createMany({
  data: newUsers,
  skipDuplicates: true,
});

// GOOD: Transaction for related operations
await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.profile.create({ data: profileData }),
  prisma.settings.create({ data: settingsData }),
]);

// Drizzle batch
await db.insert(users).values(newUsers);
```

### Efficient Counting
```typescript
// For existence check, don't count all
// BAD
const count = await prisma.user.count({ where: { email } });
const exists = count > 0;

// GOOD
const exists = await prisma.user.findFirst({
  where: { email },
  select: { id: true },
});

// For actual counts, use aggregation
const stats = await prisma.post.groupBy({
  by: ['status'],
  _count: { _all: true },
});
```

## Query Analysis

### Prisma Query Logging
```typescript
const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Duration:', e.duration, 'ms');
});
```

### PostgreSQL EXPLAIN
```sql
EXPLAIN ANALYZE
SELECT u.*, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id;

-- Look for:
-- - Seq Scan (might need index)
-- - High cost numbers
-- - Nested Loop (might indicate N+1)
```

## Caching Strategies

```typescript
// Application-level caching
import { Redis } from 'ioredis';

const redis = new Redis();
const CACHE_TTL = 300; // 5 minutes

async function getUser(id: string) {
  const cacheKey = `user:${id}`;

  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Query database
  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });

  // Cache result
  if (user) {
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(user));
  }

  return user;
}

// Invalidate on update
async function updateUser(id: string, data: UpdateUserDTO) {
  const user = await prisma.user.update({
    where: { id },
    data,
  });

  await redis.del(`user:${id}`);

  return user;
}
```

## Performance Checklist

Before completing database code:
- [ ] No N+1 queries (use includes/joins)
- [ ] Appropriate indexes exist for WHERE/JOIN/ORDER BY
- [ ] Only selecting needed columns
- [ ] Pagination implemented for lists
- [ ] Batch operations for multiple writes
- [ ] Existence checks use findFirst, not count
- [ ] Complex queries analyzed with EXPLAIN
- [ ] Caching considered for frequent reads
- [ ] Transactions used for related operations
