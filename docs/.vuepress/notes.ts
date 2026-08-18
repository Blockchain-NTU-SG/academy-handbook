import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';

const academyNote = defineNoteConfig({
  dir: '',
  link: '/',
  sidebar: [
    { text: 'Blockchain@NTU Academy', link: '/' },
    {
      text: 'Getting started',
      collapsed: false,
      items: [
        { text: 'Programme', link: '/getting-started/programme.html' },
        { text: 'Week 0 overview', link: '/getting-started/' },
        { text: 'Welcome, GitHub and the platform', link: '/getting-started/welcome-and-setup.html' },
        { text: 'Starter glossary', link: '/getting-started/glossary.html' },
        { text: 'Tool map', link: '/getting-started/tools.html' },
        { text: 'Staying safe', link: '/getting-started/safety.html' },
        { text: 'Regulatory awareness', link: '/getting-started/regulatory-awareness.html' },
      ],
    },
    {
      text: 'Foundation',
      collapsed: false,
      items: [
        { text: 'Foundation overview', link: '/foundation/' },
        { text: 'Week 1 · First principles', link: '/foundation/week-1/' },
        { text: 'Week 2 · Architectures', link: '/foundation/week-2/' },
        { text: 'Week 3 · Smart contracts', link: '/foundation/week-3/' },
        { text: 'Week 4 · Ecosystem', link: '/foundation/week-4/' },
      ],
    },
    { text: 'Proof of Work sprint', link: '/foundation/proof-of-work/' },
    { text: 'Tracks', link: '/tracks/' },
    { text: 'Resources', link: '/resources/' },
  ],
});

export const enNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [academyNote],
});
