import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const weekRoots = [
  { week: 0, directory: path.join(repoRoot, 'docs', 'getting-started') },
  ...[1, 2, 3, 4].map((week) => ({
    week,
    directory: path.join(repoRoot, 'docs', 'foundation', `week-${week}`),
  })),
];

const readText = (filePath) => fs.readFileSync(filePath, 'utf8');

const unquote = (value) => {
  const trimmed = value.trim();
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const frontmatterValue = (source, key) => {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? unquote(match[1]) : null;
};

const partFiles = [];
for (const { week, directory } of weekRoots) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'README.md') continue;
    const filePath = path.join(directory, entry.name);
    const source = readText(filePath);
    const rawWeek = frontmatterValue(source, 'week');
    const rawDay = frontmatterValue(source, 'day');
    const pageWeek = rawWeek === null ? NaN : Number(rawWeek);
    const pageDay = rawDay === null ? NaN : Number(rawDay);
    if (pageWeek !== week || !Number.isInteger(pageDay)) continue;
    partFiles.push({ filePath, name: entry.name, week: pageWeek, day: pageDay });
  }
}

partFiles.sort((a, b) => a.week - b.week || a.day - b.day || a.name.localeCompare(b.name));

const errors = [];
for (const part of partFiles) {
  const source = readText(part.filePath);
  const expected = frontmatterValue(source, 'reading_time');
  const readmePath = path.join(weekRoots.find((root) => root.week === part.week).directory, 'README.md');
  const readme = readText(readmePath);
  const escapedName = part.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const row = readme.match(new RegExp(`^\\|[^\\n]*\\./${escapedName}\\)[^\\n]*$`, 'm'));

  if (!expected) {
    errors.push(`${part.filePath}: missing frontmatter reading_time`);
    continue;
  }
  if (!row) {
    errors.push(`${readmePath}: missing README entry for ./${part.name}`);
    continue;
  }

  const cells = row[0].split('|').slice(1, -1).map((cell) => cell.trim());
  const actual = cells[2] ?? '';
  if (actual !== expected) {
    errors.push(
      `${part.filePath}: frontmatter=${JSON.stringify(expected)}; ${readmePath}: README=${JSON.stringify(actual)}`,
    );
  }
}

if (errors.length > 0) {
  console.error('Reading-time consistency check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Reading-time consistency check passed: ${partFiles.length} Part pages checked.`);
}
