---
name: api-security
description: Applies security best practices to APIs including authentication, rate limiting, input sanitization, and OWASP protections
category: api
priority: 90
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - patterns: ["middleware", "auth", "security"]
  - keywords: ["secure", "authentication", "authorization", "rate limit", "protect", "OWASP"]
  - context: ["security review", "harden"]
---

# API Security Skill

Automatically applies security best practices to API endpoints.

## When to Activate

This skill auto-activates when:
- Security-related keywords mentioned
- Authentication/authorization being implemented
- Rate limiting discussed
- Security review requested
- Working with middleware files

## Security Checklist

### 1. Authentication
```typescript
// JWT validation middleware
import { jwtVerify } from 'jose';

export async function validateAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false, error: 'Missing or invalid authorization header' };
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return { valid: true, user: payload };
  } catch {
    return { valid: false, error: 'Invalid or expired token' };
  }
}
```

### 2. Authorization
```typescript
// Role-based access control
type Role = 'user' | 'admin' | 'superadmin';

const permissions: Record<string, Role[]> = {
  'GET /api/users': ['admin', 'superadmin'],
  'DELETE /api/users/:id': ['superadmin'],
  'GET /api/profile': ['user', 'admin', 'superadmin'],
};

export function checkPermission(route: string, userRole: Role): boolean {
  const allowedRoles = permissions[route];
  return allowedRoles?.includes(userRole) ?? false;
}
```

### 3. Rate Limiting
```typescript
// Simple in-memory rate limiter (use Redis in production)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true,
});

export async function rateLimit(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  return {
    success,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  };
}
```

### 4. Input Sanitization
```typescript
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Sanitize HTML content
const sanitizedString = z.string().transform((val) => DOMPurify.sanitize(val));

// Prevent NoSQL injection (for MongoDB)
const safeObjectId = z.string().regex(/^[a-f\d]{24}$/i);

// Prevent SQL injection (parameterized queries)
// NEVER: `SELECT * FROM users WHERE id = '${userId}'`
// ALWAYS: Use prepared statements or ORM

// Validate file uploads
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

function validateUpload(file: File) {
  if (!allowedMimeTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  if (file.size > maxFileSize) {
    throw new Error('File too large');
  }
}
```

### 5. CORS Configuration
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGIN || '' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ];
  },
};
```

### 6. Security Headers
```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  return response;
}
```

### 7. Error Handling (Secure)
```typescript
// Never expose internal errors
export function handleError(error: unknown) {
  // Log full error internally
  console.error('Internal error:', error);

  // Return safe error to client
  if (error instanceof ValidationError) {
    return { error: error.message, success: false };
  }

  if (error instanceof AuthenticationError) {
    return { error: 'Authentication failed', success: false };
  }

  // Generic error for unknown cases
  return { error: 'An unexpected error occurred', success: false };
}

// NEVER return:
// - Stack traces
// - Database error messages
// - File paths
// - Environment variable names
// - Internal IDs or implementation details
```

## OWASP Top 10 Checklist

| Vulnerability | Prevention |
|--------------|------------|
| Injection | Parameterized queries, input validation |
| Broken Auth | Secure session management, MFA |
| Sensitive Data | Encryption, minimal data exposure |
| XXE | Disable XML external entities |
| Broken Access | RBAC, proper authorization checks |
| Misconfig | Security headers, minimal permissions |
| XSS | Output encoding, CSP headers |
| Insecure Deserialize | Validate all serialized data |
| Vulnerable Components | Keep dependencies updated |
| Insufficient Logging | Audit logs, monitoring |

## Security Anti-Patterns

**Never do:**
- Store passwords in plain text
- Use MD5/SHA1 for password hashing (use bcrypt/argon2)
- Include secrets in code or logs
- Trust client-side validation only
- Disable HTTPS in production
- Use `eval()` or `Function()` with user input
- Return detailed error messages to clients
- Store JWTs in localStorage (use httpOnly cookies)

## Secure API Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateAuth } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { sanitize } from '@/lib/sanitize';

const RequestSchema = z.object({
  data: z.string().transform(sanitize),
});

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const rateLimitResult = await rateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests', success: false },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  // 2. Authentication
  const auth = await validateAuth(request);
  if (!auth.valid) {
    return NextResponse.json(
      { error: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  // 3. Authorization
  if (!checkPermission('POST /api/resource', auth.user.role)) {
    return NextResponse.json(
      { error: 'Forbidden', success: false },
      { status: 403 }
    );
  }

  // 4. Input validation & sanitization
  try {
    const body = await request.json();
    const validated = RequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', success: false },
        { status: 400 }
      );
    }

    // 5. Business logic with sanitized data
    const result = await processSecurely(validated.data, auth.user);

    return NextResponse.json(
      { data: result, success: true },
      { status: 201, headers: rateLimitResult.headers }
    );
  } catch (error) {
    // 6. Secure error handling
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
```
