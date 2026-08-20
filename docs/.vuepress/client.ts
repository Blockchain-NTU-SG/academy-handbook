import { defineClientConfig } from 'vuepress/client'
import './styles/index.scss'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app, router }) {
    const baseScrollBehavior = router.options.scrollBehavior
    const getAnchorOffset = () => {
      const navbar = document.querySelector<HTMLElement>('.vp-navbar')
      return (navbar?.getBoundingClientRect().bottom ?? 64) + 24
    }

    router.options.scrollBehavior = async (to, from, savedPosition) => {
      const position = await baseScrollBehavior?.(to, from, savedPosition)

      if (
        to.hash
        && position
        && typeof position === 'object'
        && 'el' in position
      ) {
        return { ...position, top: getAnchorOffset() }
      }

      return position
    }

    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
})
