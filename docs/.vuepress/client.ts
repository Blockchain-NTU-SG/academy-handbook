import { defineClientConfig } from 'vuepress/client'
import './styles/index.scss'
import AcademyLayout from './theme/AcademyLayout.vue'

export default defineClientConfig({
  layouts: {
    Layout: AcademyLayout,
  },
  enhance({ router }) {
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

  },
})
