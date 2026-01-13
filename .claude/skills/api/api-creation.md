---
name: api-creation
description: Auto-enhances API endpoint creation with Next.js 15 patterns, Zod validation, and consistent error handling
category: api
priority: 80
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - patterns: ["app/api/", "route.ts", "route.js"]
  - keywords: ["API", "endpoint", "route handler", "NextRequest", "NextResponse"]
  - file-types: [".ts", ".tsx"]
---

# API Creation Skill

Automatically enhances API endpoint creation with production-ready patterns.

## When to Activate

This skill auto-activates when:
- Creating or editing files in `app/api/` directory
- Conversation mentions "API", "endpoint", "route handler"
- Files being edited contain `NextRequest` or `NextResponse` imports
- User requests API-related functionality

## Enhancement Checklist

When this skill is active, ensure every API route includes:

### 1. File Structure
```
app/api/[resource]/
├── route.ts           # Main handler
├── [id]/
│   └── route.ts       # Single resource operations
└── schema.ts          # Shared Zod schemas (optional)
```

### 2. Required Imports
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
```

### 3. Validation Schema
```typescript
// Define before handler
const RequestSchema = z.object({
  // All expected fields with proper types
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

// For params
const ParamsSchema = z.object({
  id: z.string().uuid(),
});
```

### 4. Handler Pattern
```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate input
    const body = await request.json();
    const validated = RequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validated.error.flatten(),
          success: false
        },
        { status: 400 }
      );
    }

    // 2. Business logic (keep minimal, use services)
    const result = await createResource(validated.data);

    // 3. Success response
    return NextResponse.json(
      { data: result, success: true },
      { status: 201 }
    );
  } catch (error) {
    // 4. Error handling
    console.error('[API] POST /api/resource error:', error);

    if (error instanceof KnownError) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
```

### 5. Response Format (Always)
```typescript
// Success responses
{ data: T, success: true }
{ data: T[], meta: { total, page, perPage }, success: true }

// Error responses
{ error: string, success: false }
{ error: string, details: object, success: false }
```

### 6. HTTP Status Codes
| Code | When to Use |
|------|-------------|
| 200 | GET success, PUT/PATCH success |
| 201 | POST created new resource |
| 204 | DELETE success (no body) |
| 400 | Validation error, malformed request |
| 401 | Missing/invalid authentication |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate, state conflict) |
| 422 | Semantic validation failed |
| 429 | Rate limit exceeded |
| 500 | Unexpected server error |

## Anti-Patterns to Prevent

**Never do:**
- Return 200 for errors
- Expose stack traces in production
- Skip input validation
- Use `any` types
- Put business logic directly in handlers
- Return inconsistent response formats
- Forget error handling

## Quality Checks

Before completing API creation, verify:
- [ ] Zod schema defined for all inputs
- [ ] Validation happens before DB/external calls
- [ ] Consistent response format used
- [ ] Proper status codes returned
- [ ] Error messages are helpful but safe
- [ ] TypeScript types are strict
- [ ] Handler is wrapped in try/catch

## Integration Points

After API creation, suggest:
- `/api-test` - Generate comprehensive tests
- `/api-protect` - Add authentication and rate limiting
- `/docs-generate` - Create API documentation
