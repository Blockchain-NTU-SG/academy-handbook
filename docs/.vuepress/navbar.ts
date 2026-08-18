import { defineNavbarConfig } from 'vuepress-theme-plume';

export const enNavbar = defineNavbarConfig([
  { text: 'Start Learning', link: '/getting-started/' },
  { text: 'Foundation', link: '/foundation/' },
  { text: 'Tracks', link: '/tracks/' },
  {
    text: 'Contribute',
    link: 'https://github.com/Blockchain-NTU-SG/academy-handbook/blob/main/CONTRIBUTING.md',
  },
]);
