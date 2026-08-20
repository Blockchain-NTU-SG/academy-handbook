import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar } from './navbar';
import { enNotes } from './notes';

export default defineThemeConfig({
  appearance: false,
  logo: '/brand/blockchain-ntu-logo-dark.png',
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
    message: 'Blockchain@NTU Academy Handbook',
  },
  transition: {
    page: true,
    postList: true,
    appearance: 'fade',
  },
  locales: {
    '/': {
      profile: {
        name: 'Blockchain@NTU Academy Handbook',
        description: 'Learn → Build → Prove',
      },
      navbar: enNavbar,
      notes: enNotes,
    },
  },
});
