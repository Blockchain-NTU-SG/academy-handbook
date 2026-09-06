import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join, relative, resolve } from 'node:path'

const dist = resolve('docs/.vuepress/dist')
const pages = [
  { path: 'index.html', budgeted: true },
  { path: 'getting-started/programme.html', budgeted: true },
  { path: 'foundation/week-1/part-1-why-blockchain-exists.html', budgeted: true },
  { path: 'foundation/week-1/part-8-the-user-journey.html', budgeted: true },
  { path: 'foundation/week-2/part-4-transactions-and-gas.html', budgeted: true },
  { path: 'foundation/week-2/part-5-l1-l2-and-bridges.html', budgeted: true },
  { path: 'foundation/week-3/part-3-remix-lab.html', budgeted: true },
  // W4P1's page-scoped Markmap runtime is intentionally heavier than ordinary routes.
  { path: 'foundation/week-4/part-1-industry-map.html', budgeted: false },
  // W4P3 currently receives Plume's shared Mermaid/d3 chunk even though its
  // content uses tables, Tabs and Steps rather than Markmap. Keep an explicit
  // route budget until that upstream shared-chunk behaviour changes.
  {
    path: 'foundation/week-4/part-3-research-tool-map.html',
    budget: { raw: 1900 * 1024, gzip: 500 * 1024 },
  },
  { path: 'foundation/week-4/part-4-github-in-practice.html', budgeted: true },
  { path: 'foundation/week-4/part-5-ai-native-building.html', budgeted: true },
]

// Generous headroom catches a return to multi-MiB route graphs without making
// normal content growth a failure. W4P1 is reported separately because its
// page-scoped Markmap runtime is intentionally larger; W4P3 has an explicit
// route budget documented in the page list above.
const budget = { raw: 650 * 1024, gzip: 225 * 1024 }

function getInitialAssets(html) {
  const refs = []
  for (const match of html.matchAll(/<script\b[^>]*type="module"[^>]*src="([^"]+)"/g))
    refs.push(match[1])
  for (const match of html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g))
    refs.push(match[1])
  return [...new Set(refs)]
}

function getLocalAssetPath(ref) {
  const pathname = decodeURIComponent(new URL(ref, 'https://academy.invalid').pathname)
  const base = '/academy-handbook/'
  if (!pathname.startsWith(base))
    return null
  return join(dist, pathname.slice(base.length))
}

function measure(page) {
  const html = readFileSync(join(dist, page), 'utf8')
  const assets = getInitialAssets(html)
    .map(getLocalAssetPath)
    .filter(Boolean)
    .map((file) => {
      const content = readFileSync(file)
      return {
        name: relative(dist, file),
        raw: content.length,
        gzip: gzipSync(content, { level: 9 }).length,
      }
    })

  return {
    assets,
    raw: assets.reduce((total, asset) => total + asset.raw, 0),
    gzip: assets.reduce((total, asset) => total + asset.gzip, 0),
  }
}

let budgetFailed = false

for (const page of pages) {
  const { path, budgeted = true, budget: pageBudget = budget } = page
  const result = measure(path)
  console.log(`${path}: ${(result.raw / 1024).toFixed(1)} KiB raw, ${(result.gzip / 1024).toFixed(1)} KiB gzip`)
  if (budgeted) {
    const exceeded = []
    if (result.raw > pageBudget.raw)
      exceeded.push(`raw > ${(pageBudget.raw / 1024).toFixed(0)} KiB`)
    if (result.gzip > pageBudget.gzip)
      exceeded.push(`gzip > ${(pageBudget.gzip / 1024).toFixed(0)} KiB`)
    if (exceeded.length) {
      console.error(`  BUDGET EXCEEDED: ${exceeded.join(', ')}`)
      budgetFailed = true
    }
  } else {
    console.log('  budget: informational Markmap-specific route (page-scoped runtime)')
  }
  for (const asset of result.assets.sort((a, b) => b.raw - a.raw).slice(0, 6))
    console.log(`  ${(asset.raw / 1024).toFixed(1)} KiB raw ${(asset.gzip / 1024).toFixed(1)} KiB gzip ${asset.name}`)
}

const generatedJs = readdirSync(join(dist, 'assets'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => {
    const content = readFileSync(join(dist, 'assets', file))
    return { name: file, raw: content.length, gzip: gzipSync(content, { level: 9 }).length }
  })
  .sort((a, b) => b.raw - a.raw)

console.log('largest generated JavaScript assets:')
for (const asset of generatedJs.slice(0, 8))
  console.log(`  ${(asset.raw / 1024).toFixed(1)} KiB raw ${(asset.gzip / 1024).toFixed(1)} KiB gzip ${asset.name}`)

if (budgetFailed)
  process.exitCode = 1
