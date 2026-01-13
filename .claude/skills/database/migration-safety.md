---
name: migration-safety
description: Ensures database migrations are safe, reversible, and follow zero-downtime deployment patterns
category: database
priority: 90
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - keywords: ["migration", "schema change", "alter table", "add column", "drop column"]
  - patterns: ["migrations/", "prisma/migrations/", "drizzle/"]
---

# Migration Safety Skill

Ensures database migrations are safe and won't cause data loss or downtime.

## When to Activate

This skill auto-activates when:
- Creating or modifying migration files
- Schema changes discussed
- Prisma/Drizzle schema modifications
- Database restructuring planned

## Safety Principles

### 1. Always Reversible
Every migration must have a rollback strategy:

```typescript
// Prisma migration with down migration
// migrations/20240115_add_user_status/migration.sql
-- Up
ALTER TABLE "User" ADD COLUMN "status" TEXT DEFAULT 'active';

-- Down (keep in separate file or comments)
ALTER TABLE "User" DROP COLUMN "status";
```

### 2. Zero-Downtime Patterns

#### Adding a Column (Safe)
```sql
-- Safe: Adding nullable column
ALTER TABLE users ADD COLUMN bio TEXT;

-- Safe: Adding column with default
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';
```

#### Adding NOT NULL Column (Multi-Step)
```sql
-- Step 1: Add nullable column
ALTER TABLE users ADD COLUMN status TEXT;

-- Step 2: Backfill existing data (in batches)
UPDATE users SET status = 'active' WHERE status IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE users ALTER COLUMN status SET NOT NULL;
```

#### Renaming a Column (Multi-Step)
```sql
-- DON'T: Direct rename breaks existing code
ALTER TABLE users RENAME COLUMN name TO full_name;

-- DO: Expand-Contract Pattern
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN full_name TEXT;

-- Step 2: Backfill data
UPDATE users SET full_name = name;

-- Step 3: Deploy code that writes to both, reads from new
-- Step 4: Verify all reads use new column

-- Step 5: Drop old column (separate migration)
ALTER TABLE users DROP COLUMN name;
```

#### Dropping a Column (Safe Pattern)
```sql
-- Step 1: Stop writing to column (code change)
-- Step 2: Deploy and verify

-- Step 3: Drop column (separate migration, after code deployed)
ALTER TABLE users DROP COLUMN deprecated_field;
```

## Destructive Operation Warnings

### HIGH RISK Operations (Require Explicit Confirmation)

```typescript
// These operations can cause data loss:

// 1. DROP TABLE
// RISK: All data in table is lost
// MITIGATION: Backup data first, verify no references

// 2. DROP COLUMN
// RISK: Column data is lost
// MITIGATION: Ensure column is unused, backup if needed

// 3. TRUNCATE TABLE
// RISK: All rows deleted
// MITIGATION: Almost never needed in migrations

// 4. ALTER COLUMN TYPE (narrowing)
// RISK: Data truncation
// Example: VARCHAR(255) -> VARCHAR(50)
// MITIGATION: Verify all data fits, backup

// 5. DROP INDEX on production
// RISK: Query performance degradation
// MITIGATION: Analyze query patterns first
```

### Prisma Schema Changes (Risk Assessment)

```prisma
// LOW RISK ✓
model User {
  bio String?  // Adding optional field
}

// MEDIUM RISK ⚠️
model User {
  status String @default("active")  // Adding with default
}

// HIGH RISK ❌ (needs multi-step)
model User {
  email String @unique  // Adding unique constraint
  // Requires: 1) Add column, 2) Backfill unique values, 3) Add constraint
}

// DANGEROUS ❌
model User {
  // Removing a field that might have data
  // @@map("users")  // Renaming table
}
```

## Migration Checklist

### Before Creating Migration

- [ ] Schema change is necessary
- [ ] Backward compatible with current code
- [ ] Rollback strategy documented
- [ ] Data migration planned (if needed)
- [ ] Tested on copy of production data

### Migration Content

- [ ] Single responsibility (one logical change)
- [ ] Idempotent where possible
- [ ] Explicit transaction boundaries
- [ ] Comments explaining why

### Before Deploying

- [ ] Tested locally with production-like data
- [ ] Reviewed by team member
- [ ] Backup verified
- [ ] Monitoring in place
- [ ] Rollback tested

## Safe Migration Templates

### Prisma: Add Optional Field
```prisma
// schema.prisma change
model User {
  id    String @id
  email String
  bio   String?  // New optional field
}

// Run: npx prisma migrate dev --name add_user_bio
```

### Prisma: Add Required Field with Default
```prisma
model User {
  id     String @id
  email  String
  status String @default("active")  // New with default
}
```

### Drizzle: Safe Column Addition
```typescript
// migrations/0001_add_user_status.ts
import { sql } from 'drizzle-orm';

export async function up(db: Database) {
  await db.execute(sql`
    ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';
  `);
}

export async function down(db: Database) {
  await db.execute(sql`
    ALTER TABLE users DROP COLUMN status;
  `);
}
```

### Raw SQL: Index Creation (Non-Blocking)
```sql
-- PostgreSQL: Create index without locking table
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Note: CONCURRENTLY can't be in a transaction
-- Run separately from other migrations
```

## Data Migration Patterns

### Batch Updates (Prevent Locking)
```typescript
// DON'T: Update all at once
await prisma.user.updateMany({
  data: { status: 'active' },
  where: { status: null },
});

// DO: Batch updates
const BATCH_SIZE = 1000;
let processed = 0;

while (true) {
  const updated = await prisma.$executeRaw`
    UPDATE users
    SET status = 'active'
    WHERE id IN (
      SELECT id FROM users
      WHERE status IS NULL
      LIMIT ${BATCH_SIZE}
    )
  `;

  processed += updated;
  console.log(`Processed ${processed} users`);

  if (updated < BATCH_SIZE) break;

  // Prevent overwhelming the database
  await new Promise(r => setTimeout(r, 100));
}
```

### Data Transformation
```typescript
// Safe pattern for data transformation
export async function migrateUserNames(prisma: PrismaClient) {
  const users = await prisma.user.findMany({
    where: { fullName: null },
    select: { id: true, firstName: true, lastName: true },
  });

  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: `${user.firstName} ${user.lastName}`.trim(),
      },
    });
  }
}
```

## Emergency Rollback

```bash
# Prisma: Rollback last migration
npx prisma migrate resolve --rolled-back "migration_name"

# Then apply the down migration manually or:
npx prisma db execute --file ./down.sql

# Drizzle: Run down migration
npm run drizzle:down

# Direct SQL rollback
psql -d mydb -f ./rollback.sql
```

## Red Flags (Stop and Review)

If you see any of these, stop and consult:

- `DROP TABLE` without backup confirmation
- `DROP COLUMN` on column with data
- `ALTER COLUMN` that narrows type
- `TRUNCATE` in any migration
- Missing `DOWN` migration for destructive change
- Multiple unrelated changes in one migration
- Large data migration without batching
- Index changes on large tables without `CONCURRENTLY`
