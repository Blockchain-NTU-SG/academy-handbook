import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const publicRoot = path.join(docsRoot, '.vuepress', 'public');
const markdownFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vuepress' || entry.name === 'node_modules') continue;
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filePath);
    else if (entry.isFile() && entry.name.endsWith('.md')) markdownFiles.push(filePath);
  }
}

walk(docsRoot);

function stripCode(source) {
  return source
    .replace(/^\s*(```|~~~)[\s\S]*?^\s*\1[^\n]*$/gm, '')
    .replace(/`+[^`\n]*`+/g, '');
}

function collectLinks(source) {
  const clean = stripCode(source);
  const links = [];
  const markdownPattern = /!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))[^)]*\)/g;
  const htmlPattern = /(?<![\w:-])(?:href|src)\s*=\s*["']([^"']+)["']/g;
  const withBasePattern = /\$withBase\(\s*["']([^"']+)["']\s*\)/g;

  for (const match of clean.matchAll(markdownPattern)) links.push(match[1] ?? match[2]);
  for (const match of clean.matchAll(htmlPattern)) links.push(match[1]);
  for (const match of clean.matchAll(withBasePattern)) links.push(match[1]);
  return [...new Set(links)];
}

function stripSuffix(value) {
  return value.split(/[?#]/, 1)[0];
}

function routeCandidates(sourceFile, href) {
  let decoded;
  try {
    decoded = decodeURIComponent(stripSuffix(href));
  } catch {
    decoded = stripSuffix(href);
  }

  if (!decoded) return [sourceFile];
  const isAbsoluteRoute = decoded.startsWith('/');
  const fileCandidates = [];

  if (isAbsoluteRoute) {
    const route = decoded.replace(/^\/+/, '');
    if (route === '') return [path.join(docsRoot, 'README.md')];
    fileCandidates.push(path.join(docsRoot, route));
    fileCandidates.push(path.join(publicRoot, route));
  } else {
    const resolved = path.resolve(path.dirname(sourceFile), decoded);
    fileCandidates.push(resolved);
  }

  const candidates = [];
  for (const candidate of fileCandidates) {
    candidates.push(candidate);
    if (candidate.endsWith('.html')) candidates.push(`${candidate.slice(0, -5)}.md`);
    else if (candidate.endsWith('.md')) candidates.push(candidate);
    else if (!path.extname(candidate)) {
      candidates.push(path.join(candidate, 'README.md'));
      candidates.push(`${candidate}.md`);
    }
  }
  return [...new Set(candidates)];
}

function headingSlugs(markdown) {
  const clean = stripCode(markdown);
  const slugs = new Set();
  const counts = new Map();
  for (const match of clean.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
    const title = match[1]
      .replace(/\{#[^}]+\}/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[`*_~]/g, '')
      .replace(/\[[^\]]+\]\([^)]*\)/g, '$1')
      .trim()
      .toLowerCase();
    const base = title
      .replace(/[‘’]/g, "'")
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (!base) continue;
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    slugs.add(count === 0 ? base : `${base}-${count}`);
  }
  return slugs;
}

const errors = [];
const checked = new Set();

for (const sourceFile of markdownFiles) {
  const source = fs.readFileSync(sourceFile, 'utf8');
  for (const rawHref of collectLinks(source)) {
    const href = rawHref.trim().replace(/^&amp;/, '&');
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|mailto:|tel:|javascript:)/i.test(href)) continue;

    const fragment = href.includes('#') ? href.slice(href.indexOf('#') + 1).split('?')[0] : '';
    const candidates = routeCandidates(sourceFile, href);
    const target = candidates.find((candidate) => fs.existsSync(candidate));
    const label = `${path.relative(root, sourceFile)} -> ${href}`;

    if (!target) {
      errors.push(`${label}: target does not exist (checked ${candidates.map((item) => path.relative(root, item)).join(', ')})`);
      continue;
    }

    if (fragment && target.endsWith('.md')) {
      let decodedFragment = fragment;
      try { decodedFragment = decodeURIComponent(fragment); } catch {}
      const key = `${target}#${decodedFragment}`;
      if (!checked.has(key)) {
        checked.add(key);
        const slugs = headingSlugs(fs.readFileSync(target, 'utf8'));
        if (!slugs.has(decodedFragment.toLowerCase())) {
          errors.push(`${label}: heading anchor not found in ${path.relative(root, target)}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`Internal link check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Internal link check passed: ${markdownFiles.length} Markdown pages scanned.`);
}
