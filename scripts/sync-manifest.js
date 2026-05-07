#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const m = require('./lib/manifest')

const REPO_ROOT = path.resolve(__dirname, '..')
const PLUGIN_JSON = path.join(REPO_ROOT, '.claude-plugin', 'plugin.json')
const PACKAGE_JSON = path.join(REPO_ROOT, 'package.json')
const README = path.join(REPO_ROOT, 'README.md')
const CLAUDE_MD = path.join(REPO_ROOT, 'CLAUDE.md')

const CHECK = process.argv.includes('--check')

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')) }
function diffOrWrite(file, nextContent) {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  if (cur === nextContent) return { changed: false, file }
  if (CHECK) return { changed: true, file, drift: true }
  fs.writeFileSync(file, nextContent)
  return { changed: true, file, wrote: true }
}

function main() {
  const pkg = readJson(PACKAGE_JSON)
  const basePlugin = readJson(PLUGIN_JSON)

  const commands = m.scanCategory(path.join(REPO_ROOT, '.claude/commands'))
  const agents = m.scanCategory(path.join(REPO_ROOT, '.claude/agents'))
  const skills = m.scanCategory(path.join(REPO_ROOT, '.claude/skills'))
  const hooks = m.scanHooks(path.join(REPO_ROOT, '.claude/hooks'))

  const next = m.buildPluginJson({
    base: {
      name: basePlugin.name,
      description: pkg.description,
      author: basePlugin.author,
      license: basePlugin.license,
      repository: basePlugin.repository,
      homepage: basePlugin.homepage,
      npm: basePlugin.npm,
      keywords: basePlugin.keywords,
      profiles: basePlugin.profiles,
      mcpServers: basePlugin.mcpServers,
    },
    version: pkg.version,
    commands,
    agents,
    skills,
    repoRoot: REPO_ROOT,
  })

  const nextJson = JSON.stringify(next, null, 2) + '\n'
  const results = []
  results.push(diffOrWrite(PLUGIN_JSON, nextJson))

  for (const target of [README, CLAUDE_MD]) {
    if (!fs.existsSync(target)) continue
    let content = fs.readFileSync(target, 'utf8')
    let touched = false
    const blocks = [
      ['commands', toCommandRows(commands)],
      ['agents', toRows(agents)],
      ['skills', toRows(skills)],
      ['hooks', toHookRows(hooks)],
      ['counts', renderCounts(commands, agents, skills, hooks)],
    ]
    for (const [name, rendered] of blocks) {
      if (!content.includes(`<!-- AUTOGEN:${name} -->`)) continue
      const before = content
      content = m.replaceMarker(content, name, rendered)
      if (content !== before) touched = true
    }
    if (touched) results.push(diffOrWrite(target, content))
  }

  const drifted = results.filter(r => r.drift)
  if (CHECK && drifted.length) {
    console.error('Manifest drift detected. Run `node scripts/sync-manifest.js` to update:')
    for (const d of drifted) console.error('  -', path.relative(REPO_ROOT, d.file))
    process.exit(1)
  }
  for (const r of results) {
    if (r.wrote) console.log('updated', path.relative(REPO_ROOT, r.file))
  }
}

function toCommandRows(items) {
  return m.renderTable(items.map(c => ({ name: '/' + c.name, description: c.description })))
}
function toRows(items) {
  return m.renderTable(items.map(c => ({ name: c.name, description: c.description })))
}
function toHookRows(items) {
  return m.renderTable(items.map(c => ({ name: c.name, description: '' })))
}
function renderCounts(commands, agents, skills, hooks) {
  return `**${commands.length} commands** · **${agents.length} agents** · **${skills.length} skills** · **${hooks.length} hooks**`
}

main()
