#!/usr/bin/env node

/**
 * Project Type Detection Script
 *
 * Analyzes the current project to detect:
 * - Framework (Next.js, Nuxt, Angular, SvelteKit, etc.)
 * - Database/ORM (Supabase, Prisma, Drizzle, etc.)
 * - Testing framework (Jest, Vitest, Playwright)
 * - Styling approach (Tailwind, CSS Modules, etc.)
 * - Package manager (npm, yarn, pnpm, bun)
 *
 * Usage: node scripts/detect-project.js [project-path]
 *
 * Output: JSON object with detected project configuration
 */

const fs = require('fs')
const path = require('path')

const projectPath = process.argv[2] || process.cwd()

// Detection indicators
const INDICATORS = {
  framework: {
    nextjs: {
      files: ['next.config.js', 'next.config.mjs', 'next.config.ts'],
      packages: ['next'],
      confidence: 'high'
    },
    nuxt: {
      files: ['nuxt.config.ts', 'nuxt.config.js'],
      packages: ['nuxt'],
      confidence: 'high'
    },
    angular: {
      files: ['angular.json'],
      packages: ['@angular/core'],
      confidence: 'high'
    },
    sveltekit: {
      files: ['svelte.config.js', 'svelte.config.ts'],
      packages: ['@sveltejs/kit'],
      confidence: 'high'
    },
    remix: {
      files: ['remix.config.js', 'remix.config.ts'],
      packages: ['@remix-run/react'],
      confidence: 'high'
    },
    astro: {
      files: ['astro.config.mjs', 'astro.config.ts'],
      packages: ['astro'],
      confidence: 'high'
    },
    vite: {
      files: ['vite.config.ts', 'vite.config.js'],
      packages: ['vite'],
      confidence: 'medium'
    },
    gatsby: {
      files: ['gatsby-config.js', 'gatsby-config.ts'],
      packages: ['gatsby'],
      confidence: 'high'
    },
    react: {
      packages: ['react', 'react-dom'],
      confidence: 'low'
    },
    vue: {
      packages: ['vue'],
      confidence: 'low'
    },
    svelte: {
      packages: ['svelte'],
      confidence: 'low'
    }
  },

  database: {
    supabase: {
      files: ['supabase/config.toml'],
      directories: ['supabase/'],
      packages: ['@supabase/supabase-js'],
      envVars: ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL'],
      confidence: 'high'
    },
    prisma: {
      files: ['prisma/schema.prisma'],
      packages: ['prisma', '@prisma/client'],
      confidence: 'high'
    },
    drizzle: {
      files: ['drizzle.config.ts', 'drizzle.config.js'],
      packages: ['drizzle-orm', 'drizzle-kit'],
      confidence: 'high'
    },
    mongoose: {
      packages: ['mongoose'],
      envVars: ['MONGODB_URI', 'MONGO_URL'],
      confidence: 'high'
    },
    typeorm: {
      files: ['ormconfig.json', 'ormconfig.ts'],
      packages: ['typeorm'],
      confidence: 'high'
    },
    sequelize: {
      packages: ['sequelize'],
      confidence: 'high'
    },
    kysely: {
      packages: ['kysely'],
      confidence: 'high'
    }
  },

  testing: {
    vitest: {
      files: ['vitest.config.ts', 'vitest.config.js'],
      packages: ['vitest'],
      confidence: 'high'
    },
    jest: {
      files: ['jest.config.js', 'jest.config.ts', 'jest.config.json'],
      packages: ['jest'],
      confidence: 'high'
    },
    playwright: {
      files: ['playwright.config.ts', 'playwright.config.js'],
      packages: ['@playwright/test', 'playwright'],
      confidence: 'high'
    },
    cypress: {
      files: ['cypress.config.ts', 'cypress.config.js'],
      directories: ['cypress/'],
      packages: ['cypress'],
      confidence: 'high'
    },
    mocha: {
      files: ['.mocharc.json', '.mocharc.js'],
      packages: ['mocha'],
      confidence: 'high'
    }
  },

  styling: {
    tailwind: {
      files: ['tailwind.config.js', 'tailwind.config.ts'],
      packages: ['tailwindcss'],
      confidence: 'high'
    },
    'styled-components': {
      packages: ['styled-components'],
      confidence: 'high'
    },
    emotion: {
      packages: ['@emotion/react', '@emotion/styled'],
      confidence: 'high'
    },
    'css-modules': {
      patterns: ['*.module.css', '*.module.scss'],
      confidence: 'medium'
    },
    sass: {
      packages: ['sass', 'node-sass'],
      confidence: 'medium'
    },
    unocss: {
      files: ['uno.config.ts', 'unocss.config.ts'],
      packages: ['unocss'],
      confidence: 'high'
    }
  },

  stateManagement: {
    zustand: {
      packages: ['zustand'],
      confidence: 'high'
    },
    redux: {
      packages: ['@reduxjs/toolkit', 'redux'],
      confidence: 'high'
    },
    jotai: {
      packages: ['jotai'],
      confidence: 'high'
    },
    recoil: {
      packages: ['recoil'],
      confidence: 'high'
    },
    pinia: {
      packages: ['pinia'],
      confidence: 'high'
    },
    mobx: {
      packages: ['mobx', 'mobx-react'],
      confidence: 'high'
    },
    ngrx: {
      packages: ['@ngrx/store'],
      confidence: 'high'
    }
  },

  packageManager: {
    pnpm: {
      files: ['pnpm-lock.yaml'],
      confidence: 'high'
    },
    yarn: {
      files: ['yarn.lock'],
      confidence: 'high'
    },
    bun: {
      files: ['bun.lockb'],
      confidence: 'high'
    },
    npm: {
      files: ['package-lock.json'],
      confidence: 'high'
    }
  },

  language: {
    typescript: {
      files: ['tsconfig.json'],
      packages: ['typescript'],
      confidence: 'high'
    }
  },

  monorepo: {
    turborepo: {
      files: ['turbo.json'],
      packages: ['turbo'],
      confidence: 'high'
    },
    nx: {
      files: ['nx.json'],
      packages: ['nx'],
      confidence: 'high'
    },
    lerna: {
      files: ['lerna.json'],
      packages: ['lerna'],
      confidence: 'high'
    }
  }
}

// Helper functions
function fileExists(filePath) {
  try {
    return fs.existsSync(path.join(projectPath, filePath))
  } catch {
    return false
  }
}

function directoryExists(dirPath) {
  try {
    const fullPath = path.join(projectPath, dirPath)
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
  } catch {
    return false
  }
}

function readPackageJson() {
  try {
    const pkgPath = path.join(projectPath, 'package.json')
    if (fs.existsSync(pkgPath)) {
      return JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    }
  } catch {
    // Ignore errors
  }
  return null
}

function hasPackage(packageJson, packageName) {
  if (!packageJson) return false
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies
  }
  return packageName in deps
}

function checkEnvVars(envVars) {
  const envFiles = ['.env', '.env.local', '.env.development']
  for (const envFile of envFiles) {
    try {
      const envPath = path.join(projectPath, envFile)
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8')
        for (const varName of envVars) {
          if (content.includes(varName)) {
            return true
          }
        }
      }
    } catch {
      // Ignore errors
    }
  }
  return false
}

function detectCategory(category, packageJson) {
  const results = []

  for (const [name, indicator] of Object.entries(category)) {
    let score = 0
    const evidence = []

    // Check files
    if (indicator.files) {
      for (const file of indicator.files) {
        if (fileExists(file)) {
          score += 2
          evidence.push(`file: ${file}`)
        }
      }
    }

    // Check directories
    if (indicator.directories) {
      for (const dir of indicator.directories) {
        if (directoryExists(dir)) {
          score += 2
          evidence.push(`directory: ${dir}`)
        }
      }
    }

    // Check packages
    if (indicator.packages) {
      for (const pkg of indicator.packages) {
        if (hasPackage(packageJson, pkg)) {
          score += 1
          evidence.push(`package: ${pkg}`)
        }
      }
    }

    // Check environment variables
    if (indicator.envVars) {
      if (checkEnvVars(indicator.envVars)) {
        score += 1
        evidence.push(`env: ${indicator.envVars.join(' or ')}`)
      }
    }

    if (score > 0) {
      results.push({
        name,
        score,
        confidence: indicator.confidence,
        evidence
      })
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)
  return results
}

function getBestMatch(results) {
  if (results.length === 0) return null
  return results[0]
}

function detectProject() {
  const packageJson = readPackageJson()

  if (!packageJson) {
    return {
      error: 'No package.json found',
      path: projectPath
    }
  }

  const detection = {
    path: projectPath,
    name: packageJson.name || 'unknown',
    version: packageJson.version || 'unknown',
    detected: {},
    all: {}
  }

  // Detect each category
  for (const [category, indicators] of Object.entries(INDICATORS)) {
    const results = detectCategory(indicators, packageJson)
    detection.all[category] = results

    const best = getBestMatch(results)
    if (best) {
      detection.detected[category] = best.name
    }
  }

  // Add additional context
  detection.context = generateContext(detection)

  return detection
}

function generateContext(detection) {
  const d = detection.detected
  const lines = []

  lines.push('## Project Context (Auto-detected)')
  lines.push('')

  if (d.framework) {
    const frameworkNames = {
      nextjs: 'Next.js',
      nuxt: 'Nuxt 3',
      angular: 'Angular',
      sveltekit: 'SvelteKit',
      remix: 'Remix',
      astro: 'Astro',
      vite: 'Vite',
      gatsby: 'Gatsby',
      react: 'React',
      vue: 'Vue',
      svelte: 'Svelte'
    }
    lines.push(`- **Framework:** ${frameworkNames[d.framework] || d.framework}`)
  }

  if (d.database) {
    const dbNames = {
      supabase: 'Supabase',
      prisma: 'Prisma',
      drizzle: 'Drizzle ORM',
      mongoose: 'MongoDB (Mongoose)',
      typeorm: 'TypeORM',
      sequelize: 'Sequelize',
      kysely: 'Kysely'
    }
    lines.push(`- **Database/ORM:** ${dbNames[d.database] || d.database}`)
  }

  if (d.testing) {
    const testNames = {
      vitest: 'Vitest',
      jest: 'Jest',
      playwright: 'Playwright',
      cypress: 'Cypress',
      mocha: 'Mocha'
    }
    lines.push(`- **Testing:** ${testNames[d.testing] || d.testing}`)
  }

  if (d.styling) {
    const styleNames = {
      tailwind: 'Tailwind CSS',
      'styled-components': 'Styled Components',
      emotion: 'Emotion',
      'css-modules': 'CSS Modules',
      sass: 'Sass/SCSS',
      unocss: 'UnoCSS'
    }
    lines.push(`- **Styling:** ${styleNames[d.styling] || d.styling}`)
  }

  if (d.stateManagement) {
    const stateNames = {
      zustand: 'Zustand',
      redux: 'Redux Toolkit',
      jotai: 'Jotai',
      recoil: 'Recoil',
      pinia: 'Pinia',
      mobx: 'MobX',
      ngrx: 'NgRx'
    }
    lines.push(`- **State Management:** ${stateNames[d.stateManagement] || d.stateManagement}`)
  }

  if (d.language === 'typescript') {
    lines.push('- **Language:** TypeScript')
  }

  if (d.packageManager) {
    lines.push(`- **Package Manager:** ${d.packageManager}`)
  }

  if (d.monorepo) {
    lines.push(`- **Monorepo:** ${d.monorepo}`)
  }

  lines.push('')

  return lines.join('\n')
}

// Main execution
const result = detectProject()

// Output format based on args
if (process.argv.includes('--context')) {
  // Output just the context string for injection into prompts
  console.log(result.context || '')
} else if (process.argv.includes('--simple')) {
  // Output simple key-value pairs
  console.log(JSON.stringify(result.detected, null, 2))
} else {
  // Full output
  console.log(JSON.stringify(result, null, 2))
}
