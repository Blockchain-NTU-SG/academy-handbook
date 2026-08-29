import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar } from './navbar';
import { enNotes } from './notes';

export default defineThemeConfig({
  appearance: true,
  logo: '/brand/blockchain-ntu-logo-dark.png',
  logoDark: '/brand/blockchain-ntu-logo-dark.png',
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
    page: true,
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
      notes: enNotes,
    },
  },
});
