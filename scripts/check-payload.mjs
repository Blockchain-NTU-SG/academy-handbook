import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join, relative, resolve } from 'node:path'

const dist = resolve('docs/.vuepress/dist')
const pages = [
  'index.html',
  'getting-started/programme.html',
  'foundation/week-1/part-1-why-blockchain-exists.html',
  'foundation/week-4/part-4-github-in-practice.html',
]

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

for (const page of pages) {
  const result = measure(page)
  console.log(`${page}: ${(result.raw / 1024).toFixed(1)} KiB raw, ${(result.gzip / 1024).toFixed(1)} KiB gzip`)
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
