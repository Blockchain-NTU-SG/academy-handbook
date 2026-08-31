import { readFile } from 'node:fs/promises';

import MiniSearch from 'minisearch';
import type { App, Page, Plugin } from 'vuepress/core';

const SEARCH_INDEX_DIR = 'internal/minisearchIndex';
const HEADING_REGEX = /<h(\d*).*?>(<a.*? href="#.*?".*?>[\s\S]*?<\/a>)<\/h\1>/gi;
const HEADING_CONTENT_REGEX = /<a.*? href="#(.*?)".*?><span>([\s\S]*?)<\/span><\/a>/i;

type SearchOptions = {
  miniSearch?: {
    options?: {
      storeFields?: string[];
    };
  };
};

/**
 * Plume intentionally removes <template> blocks while extracting searchable
 * text. Tabs use those blocks for their learner-facing content, so extend the
 * already-generated local index with the same section text while retaining it
 * as one result per heading. This adapter targets the current Plume local-search
 * structure; after a Plume upgrade, rerun the contextual-search regression suite.
 */
export function academySearchTabsPlugin(): Plugin {
  return {
    name: 'academy-search-tabs',
    onPrepared: async (app: App) => {
      await includeTabContentInSearchIndex(app, {
        miniSearch: {
          options: {
            storeFields: ['title', 'titles', 'text'],
          },
        },
      });
    },
  };
}

async function includeTabContentInSearchIndex(app: App, options: SearchOptions) {
  const locales = new Set(app.pages.map((page) => page.pathLocale));

  for (const locale of locales) {
    const filename = `searchBox-${locale.replace(/^\/+|\/+$/g, '').replace(/\//g, '_') || 'default'}.js`;
    const filepath = app.dir.temp(SEARCH_INDEX_DIR, filename);
    let source: string;

    try {
      source = await readFile(filepath, 'utf8');
    } catch {
      continue;
    }

    const serialized = JSON.parse(source.replace(/^export default\s+/, '').trim());
    const index = MiniSearch.loadJSON(serialized, {
      fields: ['title', 'titles', 'text'],
      storeFields: options.miniSearch?.options?.storeFields ?? ['title', 'titles', 'text'],
    });

    for (const page of app.pages.filter((candidate) => candidate.pathLocale === locale)) {
      if (page.frontmatter.search === false) continue;

      for (const section of sectionsForPage(page)) {
        const id = section.anchor ? `${page.path}#${section.anchor}` : page.path;
        const item = {
          id,
          text: section.text,
          title: section.titles.at(-1),
          titles: section.titles.slice(0, -1),
        };

        if (index.has(id)) index.remove({ id });
        index.add(item);
      }
    }

    await app.writeTemp(
      `${SEARCH_INDEX_DIR}/${filename}`,
      `export default ${JSON.stringify(JSON.stringify(index))}`,
    );
  }
}

function sectionsForPage(page: Page) {
  if (!page.filePath) return [];

  const sections = `<h1><a href="#"><span>${page.frontmatter.title || page.title}</span></a></h1>\n${page.contentRendered}`
    .split(HEADING_REGEX);
  sections.shift();

  const parentTitles: string[] = [];
  const result: Array<{ anchor: string; titles: string[]; text: string }> = [];

  for (let i = 0; i < sections.length; i += 3) {
    const level = Number.parseInt(sections[i], 10) - 1;
    const heading = sections[i + 1];
    const headingResult = HEADING_CONTENT_REGEX.exec(heading);
    const title = stripTags(headingResult?.[2] ?? '').trim();
    const content = sections[i + 2];

    if (!title || !content) continue;
    if (level === 0) parentTitles.length = 0;
    parentTitles[level] = title;

    const titles = parentTitles.slice(0, level + 1).filter(Boolean);
    result.push({
      anchor: headingResult?.[1] ?? '',
      titles,
      text: stripTags(content),
    });
  }

  return result;
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, '');
}
