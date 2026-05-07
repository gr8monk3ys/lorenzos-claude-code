const { test } = require('node:test')
const assert = require('node:assert/strict')
const manifest = require('../scripts/lib/manifest')

test('manifest module exports required helpers', () => {
  assert.equal(typeof manifest.parseFrontmatter, 'function')
  assert.equal(typeof manifest.scanCategory, 'function')
  assert.equal(typeof manifest.scanHooks, 'function')
  assert.equal(typeof manifest.buildPluginJson, 'function')
  assert.equal(typeof manifest.replaceMarker, 'function')
  assert.equal(typeof manifest.renderTable, 'function')
})

test('parseFrontmatter extracts name and single-line description', () => {
  const content = `---
name: api-new
description: Create a new Next.js API route with validation
model: claude-opus-4-5
---

Body content.
`
  const fm = manifest.parseFrontmatter(content)
  assert.equal(fm.name, 'api-new')
  assert.equal(fm.description, 'Create a new Next.js API route with validation')
})

test('parseFrontmatter handles multi-line description (block scalar) by taking first non-empty line', () => {
  const content = `---
name: api-development
description: |
  WHEN to auto-invoke: Creating API routes, building endpoints.
  WHEN NOT to invoke: Pure frontend work.
---
Body.`
  const fm = manifest.parseFrontmatter(content)
  assert.equal(fm.name, 'api-development')
  assert.equal(fm.description, 'WHEN to auto-invoke: Creating API routes, building endpoints.')
})

test('parseFrontmatter throws when frontmatter block is missing', () => {
  assert.throws(() => manifest.parseFrontmatter('no frontmatter here\n'), /frontmatter/i)
})
