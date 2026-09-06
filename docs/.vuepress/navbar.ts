import { defineNavbarConfig } from 'vuepress-theme-plume';

export const enNavbar = defineNavbarConfig([
  { text: 'Start Learning', link: '/getting-started/programme.html', icon: 'material-symbols:school-outline' },
  { text: 'Foundation', link: '/foundation/', icon: 'material-symbols:menu-book-outline' },
  { text: 'Tracks', link: '/tracks/', icon: 'material-symbols:explore-outline' },
  {
    text: 'Contribute',
    link: 'https://github.com/Blockchain-NTU-SG/academy-handbook/blob/main/CONTRIBUTING.md',
    icon: 'material-symbols:edit-outline',
  },
]);
