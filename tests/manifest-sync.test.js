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

test('replaceMarker replaces content between paired markers', () => {
  const input = `Top text.

<!-- AUTOGEN:commands -->
old content here
<!-- /AUTOGEN:commands -->

Bottom text.
`
  const out = manifest.replaceMarker(input, 'commands', '| Command | Description |\n| --- | --- |\n| /foo | Bar |')
  assert.match(out, /Top text\./)
  assert.match(out, /Bottom text\./)
  assert.match(out, /\| \/foo \| Bar \|/)
  assert.doesNotMatch(out, /old content here/)
})

test('replaceMarker is idempotent', () => {
  const input = `<!-- AUTOGEN:x -->\nold\n<!-- /AUTOGEN:x -->`
  const once = manifest.replaceMarker(input, 'x', 'NEW')
  const twice = manifest.replaceMarker(once, 'x', 'NEW')
  assert.equal(once, twice)
})

test('replaceMarker throws when markers missing', () => {
  assert.throws(() => manifest.replaceMarker('no markers here', 'x', 'NEW'), /AUTOGEN:x/)
})

test('replaceMarker leaves other markers untouched', () => {
  const input = `<!-- AUTOGEN:a -->\noldA\n<!-- /AUTOGEN:a -->
<!-- AUTOGEN:b -->\noldB\n<!-- /AUTOGEN:b -->`
  const out = manifest.replaceMarker(input, 'a', 'NEW_A')
  assert.match(out, /oldB/)
  assert.match(out, /NEW_A/)
})
