import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const files = execFileSync('git', ['ls-files', 'docs/getting-started/*.md', 'docs/foundation/week-*/part-*.md'], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean)

const errors = []

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n')
  let inFence = false
  let openLine = null

  for (let index = 0; index < lines.length; index++) {
    const lineNumber = index + 1
    const raw = lines[index]
    const trimmed = raw.trim()

    if (/^```/.test(trimmed)) {
      inFence = !inFence
      continue
    }
    if (inFence)
      continue

    const withoutInlineCode = raw.replace(/`[^`]*`/g, '')
    if (trimmed === '==')
      errors.push(`${file}:${lineNumber}: standalone lazy-mark delimiter`)

    if (openLine !== null && trimmed === '')
      errors.push(`${file}:${lineNumber}: lazy mark opened at line ${openLine} crosses a blank line`)
    if (openLine !== null && (/^#{1,6}\s/.test(trimmed) || /^:{3,}/.test(trimmed) || /^\|/.test(trimmed)))
      errors.push(`${file}:${lineNumber}: lazy mark opened at line ${openLine} crosses a structural Markdown line`)

    const delimiters = withoutInlineCode.match(/==/g)?.length ?? 0
    if (delimiters % 2 === 1)
      openLine = openLine === null ? lineNumber : null
  }

  if (openLine !== null)
    errors.push(`${file}:${openLine}: unclosed lazy mark`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Lazy mark syntax OK (${files.length} Markdown files checked)`)
}
