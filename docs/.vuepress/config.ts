import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';
import type { Plugin } from 'vite';
import { academySearchTabsPlugin } from './academy-search-tabs';

// Plume's generated client config registers chart and hero components
// eagerly. Those components are needed only when a page actually renders a
// diagram or the homepage effect, so keep their browser bundles out of the
// initial payload without changing the Markdown or home-page APIs.
const academyLazyClientFeatures: Plugin = {
  name: 'academy-lazy-client-features',
  enforce: 'pre',
  transform(code, id) {
    const sourceId = id.replace(/\?.*$/, '');

    if (sourceId.endsWith('/.temp/markdown-chart/config.js')) {
      const lazyImports: string[] = [];
      const transformed = code.replace(
        /import (FlowChart|Mermaid) from (['"])([^'"]+)\2;\n?/g,
        (_match, name: string, _quote: string, source: string) => {
          lazyImports.push(
            `const ${name} = defineAsyncComponent(() => import(${JSON.stringify(source)}))`,
          );
          return '';
        },
      );

      if (lazyImports.length) {
        return {
          code: `import { defineAsyncComponent } from 'vue'\n${lazyImports.join('\n')}\n${transformed}`,
          map: null,
        };
      }
    }

    if (sourceId.endsWith('/.temp/md-power/config.js')) {
      const lazyImports: string[] = [];
      const transformed = code.replace(
        /import (VPDemoBasic|VPDemoNormal) from (['"])([^'"]+)\2\n?/g,
        (_match, name: string, _quote: string, source: string) => {
          lazyImports.push(
            `const ${name} = defineAsyncComponent(() => import(${JSON.stringify(source)}))`,
          );
          return '';
        },
      );

      if (lazyImports.length) {
        return {
          code: `import { defineAsyncComponent } from 'vue'\n${lazyImports.join('\n')}\n${transformed}`,
          map: null,
        };
      }
    }

    if (sourceId.endsWith('/.temp/internal/home-hero-effects.js')) {
      const lazyImports: string[] = [];
      const transformed = code.replace(
        /import (\w+) from (['"])([^'"]+)\2\n?/g,
        (_match, name: string, _quote: string, source: string) => {
          lazyImports.push(
            `const ${name} = defineAsyncComponent(() => import(${JSON.stringify(source)}))`,
          );
          return '';
        },
      );

      if (lazyImports.length) {
        return {
          code: `import { defineAsyncComponent } from 'vue'\n${lazyImports.join('\n')}\n${transformed}`,
          map: null,
        };
      }
    }

    return undefined;
  },
};

const academySearch = {
  provider: 'local',
  miniSearch: {
    // The stock Plume result view stores only headings. Academy results also
    // need the section text so learners can see why a result matched.
    options: {
      storeFields: ['title', 'titles', 'text'],
    },
  },
} as any;

export default defineUserConfig({
  // GitHub Pages project site: https://blockchain-ntu-sg.github.io/academy-handbook/
  base: '/academy-handbook/',
  lang: 'en-US',
  title: 'Blockchain@NTU Academy',
  description: 'A beginner-friendly Web3 learning programme built around an open handbook, structured learning and Proof of Work.',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/academy-handbook/favicon.png' }],
  ],

  locales: {
    '/': {
      title: 'Blockchain@NTU Academy',
      lang: 'en-US',
      description: 'A beginner-friendly Web3 learning programme built around an open handbook, structured learning and Proof of Work.',
    },
  },

  // Canonical learner-facing content lives under getting-started and foundation.
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],

  bundler: viteBundler({
    viteOptions: {
      plugins: [academyLazyClientFeatures],
    },
  }),
  shouldPrefetch: false,
  plugins: [academySearchTabsPlugin()],

  theme: plumeTheme({
    docsRepo: 'https://github.com/Blockchain-NTU-SG/academy-handbook',
    docsDir: 'docs',
    docsBranch: 'main',
    // Keep curriculum frontmatter authored and stable; do not write generated
    // createTime/permalink fields back into Academy Markdown during a build.
    autoFrontmatter: false,
    editLink: true,
    lastUpdated: false,
    changelog: true,
    plugins: {
      git: true,
    },
    article: '/article/',
    cache: 'filesystem',
    llmstxt: true,
    search: academySearch,
    codeHighlighter: {
      // The Academy intentionally keeps code examples on a dark editor
      // surface in both page appearances. Pair the same dark Shiki palette
      // with both modes so token colours stay legible without flattening them.
      themes: {
        light: 'vitesse-dark',
        dark: 'vitesse-dark',
      },
      lineNumbers: false,
    },
    markdown: {
      mark: 'lazy',
      abbr: {
        ABI: 'Application Binary Interface',
        DAO: 'decentralised autonomous organisation',
        DEX: 'decentralised exchange',
        EOA: 'externally owned account',
        EVM: 'Ethereum Virtual Machine',
        IBC: 'Inter-Blockchain Communication',
        L1: 'Layer 1',
        L2: 'Layer 2',
        NFT: 'non-fungible token',
        PoS: 'Proof of Stake',
        PoW: 'Proof of Work',
        RPC: 'remote procedure call',
        RWA: 'real-world asset',
        TVL: 'total value locked',
        ZK: 'zero-knowledge',
      },
      annotation: true,
      pdf: true,
      chat: true,
      icon: {
        provider: 'iconify',
      },
      table: true,
      collapse: true,
      demo: true,
      mermaid: true,
      flowchart: true,
      // Layout containers used by the Academy curriculum pages to break up
      // long-form explanation. ::: steps, ::: card and ::: tabs are always
      // available in Plume; timeline is enabled for the Web1/Web2/Web3
      // orientation, and fileTree is used for the GitHub repository example.
      fileTree: { icon: 'simple' },
      markmap: true,
      timeline: true,
      image: {
        figure: true,
      },
    },
  }),
});
