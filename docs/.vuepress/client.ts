import { defineClientConfig } from 'vuepress/client'
import './styles/index.scss'
import AcademyLayout from './theme/AcademyLayout.vue'
import AcademySearchBox from './theme/AcademySearchBox.vue'

let homeRevealObserver: IntersectionObserver | null = null

function setupHomeReveal() {
  homeRevealObserver?.disconnect()
  homeRevealObserver = null

  if (!document.querySelector('.vp-home'))
    return

  const targets = Array.from(document.querySelectorAll<HTMLElement>(
    '.vp-home-text-image, .vp-home-features, .vp-home-feature, .vp-home-custom h2, .vp-home-custom > p, .vp-home-custom .academy-social-links',
  ))

  if (!targets.length)
    return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((element) => {
      element.classList.add('academy-home-reveal', 'is-visible')
    })
    return
  }

  homeRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting)
        return

      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  })

  targets.forEach((element, index) => {
    element.classList.add('academy-home-reveal')
    element.style.setProperty('--academy-reveal-delay', `${Math.min(index * 45, 240)}ms`)
    homeRevealObserver?.observe(element)
  })
}

function scheduleHomeReveal() {
  if (typeof window === 'undefined')
    return

  window.requestAnimationFrame(() => setupHomeReveal())
}

export default defineClientConfig({
  layouts: {
    Layout: AcademyLayout,
  },
  enhance({ app, router }) {
    // Plume's local index already searches body text. This local result view
    // exposes the matched section text instead of showing headings only.
    app.component('SearchBox', AcademySearchBox)

    const baseScrollBehavior = router.options.scrollBehavior
    const getAnchorOffset = () => {
      const navbar = document.querySelector<HTMLElement>('.vp-navbar')
      return (navbar?.getBoundingClientRect().bottom ?? 64) + 12
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

    router.afterEach(() => scheduleHomeReveal())
    scheduleHomeReveal()
  },
})
