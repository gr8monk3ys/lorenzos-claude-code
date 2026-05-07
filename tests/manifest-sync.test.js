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
