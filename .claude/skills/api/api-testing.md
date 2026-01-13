---
name: api-testing
description: Auto-generates comprehensive API tests with edge cases, error scenarios, and integration patterns
category: api
priority: 70
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - patterns: ["__tests__/api/", "*.test.ts", "*.spec.ts"]
  - keywords: ["test API", "API test", "endpoint test", "integration test"]
  - context: ["after api-creation"]
---

# API Testing Skill

Automatically generates comprehensive test suites for API endpoints.

## When to Activate

This skill auto-activates when:
- User mentions "test" in context of APIs
- Creating files in `__tests__/api/` or test files
- After `api-creation` skill completes
- User asks for endpoint testing

## Test Categories

### 1. Happy Path Tests
```typescript
describe('POST /api/users', () => {
  it('creates user with valid data', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    });

    expect(response.status).toBe(201);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.email).toBe('test@example.com');
  });
});
```

### 2. Validation Error Tests
```typescript
describe('Validation Errors', () => {
  it('returns 400 for missing required fields', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Validation');
  });

  it('returns 400 for invalid email format', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid', name: 'Test' }),
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 for exceeding max length', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'x'.repeat(101)
      }),
    });

    expect(response.status).toBe(400);
  });
});
```

### 3. Authentication Tests
```typescript
describe('Authentication', () => {
  it('returns 401 without auth header', async () => {
    const response = await fetch('/api/protected');
    expect(response.status).toBe(401);
  });

  it('returns 401 with invalid token', async () => {
    const response = await fetch('/api/protected', {
      headers: { Authorization: 'Bearer invalid' },
    });
    expect(response.status).toBe(401);
  });

  it('returns 403 for unauthorized access', async () => {
    const response = await fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${userToken}` }, // non-admin
    });
    expect(response.status).toBe(403);
  });
});
```

### 4. Edge Case Tests
```typescript
describe('Edge Cases', () => {
  it('handles empty arrays gracefully', async () => {
    const response = await fetch('/api/users?filter=nonexistent');
    const json = await response.json();
    expect(json.data).toEqual([]);
    expect(json.success).toBe(true);
  });

  it('handles null values in optional fields', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test',
        bio: null,
      }),
    });
    expect(response.status).toBe(201);
  });

  it('handles unicode characters', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: '测试用户 🎉',
      }),
    });
    expect(response.status).toBe(201);
  });

  it('handles concurrent requests', async () => {
    const promises = Array(10).fill(null).map(() =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: `test${Math.random()}@example.com`,
          name: 'Concurrent Test',
        }),
      })
    );
    const responses = await Promise.all(promises);
    responses.forEach(r => expect(r.status).toBe(201));
  });
});
```

### 5. Error Handling Tests
```typescript
describe('Error Handling', () => {
  it('returns 404 for non-existent resource', async () => {
    const response = await fetch('/api/users/nonexistent-id');
    expect(response.status).toBe(404);
  });

  it('returns 409 for duplicate resource', async () => {
    // Create first
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'duplicate@example.com', name: 'Test' }),
    });

    // Try duplicate
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'duplicate@example.com', name: 'Test 2' }),
    });
    expect(response.status).toBe(409);
  });

  it('handles malformed JSON gracefully', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status).toBe(400);
  });
});
```

## Test File Template

```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
// or: import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';

// Test utilities
const API_BASE = process.env.TEST_API_URL || 'http://localhost:3000';

async function apiRequest(path: string, options?: RequestInit) {
  return fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
}

describe('API /api/[resource]', () => {
  // Setup
  beforeAll(async () => {
    // Database setup, auth tokens, etc.
  });

  afterAll(async () => {
    // Cleanup
  });

  beforeEach(async () => {
    // Reset state between tests
  });

  // Tests organized by category
  describe('GET /', () => { /* list tests */ });
  describe('POST /', () => { /* create tests */ });
  describe('GET /:id', () => { /* read tests */ });
  describe('PATCH /:id', () => { /* update tests */ });
  describe('DELETE /:id', () => { /* delete tests */ });
  describe('Validation', () => { /* validation tests */ });
  describe('Authentication', () => { /* auth tests */ });
  describe('Edge Cases', () => { /* edge case tests */ });
});
```

## Coverage Requirements

Ensure tests cover:
- [ ] All HTTP methods the endpoint supports
- [ ] All success scenarios
- [ ] All validation error scenarios
- [ ] Authentication/authorization (if applicable)
- [ ] Pagination (if applicable)
- [ ] Filtering/sorting (if applicable)
- [ ] Rate limiting behavior (if applicable)
- [ ] At least 5 edge cases

## Test Quality Checks

Before completing test generation:
- [ ] Tests are isolated (no shared state issues)
- [ ] Tests can run in any order
- [ ] Cleanup happens in afterAll/afterEach
- [ ] Error messages are descriptive
- [ ] No hardcoded IDs or timestamps
- [ ] Environment variables used for config
