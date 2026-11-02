import { defineNavbarConfig } from 'vuepress-theme-plume';

export const enNavbar = defineNavbarConfig([
  { text: 'Start Learning', link: '/getting-started/', icon: 'material-symbols:school-outline' },
  { text: 'Foundation', link: '/foundation/', icon: 'material-symbols:menu-book-outline' },
  { text: 'Deep Dive', link: '/tracks/', icon: 'material-symbols:explore-outline' },
]);
