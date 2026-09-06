import { defineClientConfig, resolveRoute } from 'vuepress/client'
import './styles/index.scss'
import AcademyLayout from './theme/AcademyLayout.vue'
import AcademySearchBox from './theme/AcademySearchBox.vue'

let homeRevealObserver: IntersectionObserver | null = null
const prefetchedRoutes = new Set<string>()
let adjacentPrefetchTimer: number | undefined

function canPrefetch() {
  const connection = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean }
  }).connection

  return !connection?.saveData && !['slow-2g', '2g'].includes(connection?.effectiveType ?? '')
}

function routePathFromLink(href: string) {
  const url = new URL(href, window.location.href)
  const base = '/academy-handbook/'

  if (url.origin !== window.location.origin || !url.pathname.startsWith(base))
    return null

  const path = `/${url.pathname.slice(base.length)}`
  return path === '/' ? '/' : path.replace(/\/$/u, '/')
}

function prefetchRoute(href: string) {
  if (!canPrefetch())
    return

  const path = routePathFromLink(href)
  if (!path || prefetchedRoutes.has(path))
    return

  const route = resolveRoute(path)
  if (route.notFound)
    return

  prefetchedRoutes.add(path)
  void route.loader().catch(() => prefetchedRoutes.delete(path))
}

function scheduleAdjacentPrefetch() {
  if (typeof window === 'undefined' || !canPrefetch())
    return

  window.clearTimeout(adjacentPrefetchTimer)
  adjacentPrefetchTimer = window.setTimeout(() => {
    document
      .querySelectorAll<HTMLAnchorElement>('.prev-next .pager-link.prev, .prev-next .pager-link.next')
      .forEach((link) => prefetchRoute(link.href))
  }, 800)
}

function setupIntentPrefetch() {
  if (typeof window === 'undefined' || typeof document === 'undefined')
    return

  const prefetchFromIntent = (event: Event) => {
    const target = event.target
    if (!(target instanceof Element))
      return

    const link = target.closest<HTMLAnchorElement>('a[href]')
    if (!link || link.target === '_blank' || link.hasAttribute('download'))
      return

    prefetchRoute(link.href)
  }

  document.addEventListener('pointerover', prefetchFromIntent, { passive: true })
  document.addEventListener('focusin', prefetchFromIntent, { passive: true })
}

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

    router.afterEach(() => {
      scheduleHomeReveal()
      scheduleAdjacentPrefetch()
    })
    setupIntentPrefetch()
    scheduleHomeReveal()
    scheduleAdjacentPrefetch()
  },
})
