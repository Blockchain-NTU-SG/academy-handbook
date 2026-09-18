import { defineThemeConfig, type ThemeDocCollection } from 'vuepress-theme-plume';
import { enNavbar } from './navbar';
import { enNotes } from './notes';

type AcademyNotesConfig = {
  notes: Array<Pick<ThemeDocCollection, 'sidebar'>>;
};

// The deprecated notes compatibility layer drops the title for a root note
// (dir: ''). Declare the equivalent document collection explicitly so Plume
// has a stable title without changing the existing sidebar or URLs.
const academyNotes = enNotes as AcademyNotesConfig;
const academyCollection: ThemeDocCollection = {
  type: 'doc',
  dir: '',
  linkPrefix: '/',
  title: 'Handbook',
  sidebar: academyNotes.notes[0].sidebar,
};

export default defineThemeConfig({
  appearance: true,
  logo: '/favicon.png',
  logoDark: '/favicon.png',
  social: [
    {
      icon: 'github',
      link: 'https://github.com/Blockchain-NTU-SG/academy-handbook',
    },
  ],
  prevPage: true,
  nextPage: true,
  contributors: false,
  footer: {
    message: 'Blockchain@NTU Academy',
  },
  transition: {
    page: false,
    postList: true,
    appearance: 'fade',
  },
  locales: {
    '/': {
      profile: {
        name: 'Blockchain@NTU Academy',
        description: 'Learn → Build → Prove',
      },
      navbar: enNavbar,
      collections: [academyCollection],
    },
  },
});
