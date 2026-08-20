import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';

export default defineUserConfig({
  // GitHub Pages project site: https://blockchain-ntu-sg.github.io/academy-handbook/
  base: '/academy-handbook/',
  lang: 'en-US',
  title: 'Blockchain@NTU Academy',
  description: 'A beginner-friendly Web3 learning programme built around an open handbook, structured learning and Proof of Work.',

  locales: {
    '/': {
      title: 'Blockchain@NTU Academy',
      lang: 'en-US',
      description: 'A beginner-friendly Web3 learning programme built around an open handbook, structured learning and Proof of Work.',
    },
  },

  bundler: viteBundler(),
  shouldPrefetch: false,

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
    blog: false,
    article: '/article/',
    cache: 'filesystem',
    search: { provider: 'local' },
    codeHighlighter: {
      lineNumbers: false,
    },
    markdown: {
      annotation: true,
      pdf: true,
      chat: true,
      icon: {
        provider: 'iconify',
      },
      collapse: true,
      mermaid: true,
      flowchart: true,
      image: {
        figure: true,
      },
    },
  }),
});
