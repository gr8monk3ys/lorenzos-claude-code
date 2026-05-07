'use strict'

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
function scanCategory(_dir) { throw new Error('not implemented') }
function scanHooks(_dir) { throw new Error('not implemented') }
function buildPluginJson(_inputs) { throw new Error('not implemented') }
function replaceMarker(_content, _name, _replacement) { throw new Error('not implemented') }
function renderTable(_rows) { throw new Error('not implemented') }

module.exports = { parseFrontmatter, scanCategory, scanHooks, buildPluginJson, replaceMarker, renderTable }
