'use strict'

const fs = require('node:fs')
const path = require('node:path')

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    throw new Error('Missing YAML frontmatter (expected --- ... --- block at top of file)')
  }
  const block = match[1]
  const out = {}
  const lines = block.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    let value = kv[2]
    if (value === '|' || value === '>') {
      for (let j = i + 1; j < lines.length; j++) {
        const cont = lines[j]
        if (!/^\s/.test(cont)) break
        const stripped = cont.trim()
        if (stripped) { value = stripped; break }
      }
    }
    out[key] = value.trim()
  }
  return out
}
function scanCategory(dir) {
  const out = []
  function walk(current) {
    if (!fs.existsSync(current)) return
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(full, 'utf8')
        const fm = parseFrontmatter(content)
        const name = fm.name || path.basename(entry.name, '.md')
        out.push({ name, description: fm.description || '', path: full })
      }
    }
  }
  walk(dir)
  out.sort((a, b) => a.name.localeCompare(b.name))
  return out
}
function scanHooks(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.js')) continue
    const name = path.basename(entry.name, '.js')
    out.push({ name, path: path.join(dir, entry.name) })
  }
  out.sort((a, b) => a.name.localeCompare(b.name))
  return out
}
function buildPluginJson(_inputs) { throw new Error('not implemented') }
function replaceMarker(_content, _name, _replacement) { throw new Error('not implemented') }
function renderTable(_rows) { throw new Error('not implemented') }

module.exports = { parseFrontmatter, scanCategory, scanHooks, buildPluginJson, replaceMarker, renderTable }
