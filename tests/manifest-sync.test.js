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

const path = require('node:path')

test('scanCategory walks subdirectories and parses each .md', () => {
  const fixtures = path.join(__dirname, 'fixtures/manifest/commands')
  const entries = manifest.scanCategory(fixtures)
  assert.equal(entries.length, 2)
  const names = entries.map(e => e.name).sort()
  assert.deepEqual(names, ['api-new', 'component-new'])
  const apiNew = entries.find(e => e.name === 'api-new')
  assert.equal(apiNew.description, 'Create a new Next.js API route with validation')
  assert.match(apiNew.path.replace(/\\/g, '/'), /commands\/api\/api-new\.md$/)
})

test('scanCategory results are stable-sorted by name', () => {
  const fixtures = path.join(__dirname, 'fixtures/manifest/commands')
  const a = manifest.scanCategory(fixtures).map(e => e.name)
  const b = manifest.scanCategory(fixtures).map(e => e.name)
  assert.deepEqual(a, b)
  assert.deepEqual(a, [...a].sort())
})

test('scanHooks lists .js hook scripts but skips .json config', () => {
  const fixtures = path.join(__dirname, 'fixtures/manifest/hooks')
  const hooks = manifest.scanHooks(fixtures)
  assert.equal(hooks.length, 1)
  assert.equal(hooks[0].name, 'auto-format')
  assert.match(hooks[0].path.replace(/\\/g, '/'), /hooks\/auto-format\.js$/)
})
