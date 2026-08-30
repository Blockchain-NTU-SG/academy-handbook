<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import {
  computedAsync,
  debouncedWatch,
  onKeyStroke,
  useEventListener,
  useScrollLock,
  useSessionStorage,
} from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import MiniSearch from 'minisearch'
import { useSearchIndex } from '@vuepress-plume/plugin-search/client'
import {
  computed,
  markRaw,
  nextTick,
  onBeforeUnmount,
  ref,
  shallowRef,
  withDefaults,
  watch,
} from 'vue'
import { useRouteLocale, withBase } from 'vuepress/client'

interface SearchOptions {
  disableQueryPersistence?: boolean
  miniSearch?: {
    options?: Record<string, unknown>
    searchOptions?: Record<string, unknown>
  }
}

interface AcademySearchResult extends SearchResult {
  title: string
  titles: string[]
  text?: string
}

const props = withDefaults(defineProps<{
  locales: Record<string, Record<string, any>>
  options: SearchOptions
}>(), {
  locales: () => ({
    '/': {
      placeholder: 'Search',
      resetButtonTitle: 'Reset search',
      backButtonTitle: 'Close search',
      noResultsText: 'No results for',
    },
  }),
  options: () => ({
    miniSearch: {
      options: {
        storeFields: ['title', 'titles', 'text'],
      },
    },
  }),
})

const routeLocale = useRouteLocale()
const searchIndexData = useSearchIndex()
const locale = computed(() => props.locales[routeLocale.value] ?? props.locales['/'] ?? {
  placeholder: 'Search',
  resetButtonTitle: 'Reset search',
  backButtonTitle: 'Close search',
  noResultsText: 'No results for',
})

const el = shallowRef<HTMLElement>()
const searchInput = ref<HTMLInputElement>()
const resultsEl = shallowRef<HTMLElement>()
const showSearch = ref(false)
const { activate } = useFocusTrap(el, { immediate: false })

const searchIndex = computedAsync(async () => {
  const loader = searchIndexData.value[routeLocale.value]
  const serialized = loader ? (await loader())?.default : undefined

  if (!serialized)
    return null

  return markRaw(
    MiniSearch.loadJSON<AcademySearchResult>(serialized, {
      fields: ['title', 'titles', 'text'],
      storeFields: ['title', 'titles', 'text'],
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        combineWith: 'AND',
        boost: { title: 4, text: 2, titles: 1 },
      },
      ...props.options?.miniSearch?.searchOptions,
      ...props.options?.miniSearch?.options,
    }),
  )
}, null)

const disableQueryPersistence = computed(() => props.options?.disableQueryPersistence === true)
const filterText = disableQueryPersistence.value
  ? ref('')
  : useSessionStorage('vuepress-plume:mini-search-filter', '')
const results = shallowRef<AcademySearchResult[]>([])
const enableNoResults = ref(false)

watch(filterText, () => {
  enableNoResults.value = false
})

debouncedWatch(
  () => [searchIndex.value, filterText.value] as const,
  async ([index, value], _old, onCleanup) => {
    let canceled = false
    onCleanup(() => {
      canceled = true
    })

    if (!index || !value.trim()) {
      results.value = []
      enableNoResults.value = false
      return
    }

    results.value = index.search(value.trim()) as AcademySearchResult[]
    enableNoResults.value = true
    await nextTick()

    if (canceled)
      return

    scrollToSelectedResult()
  },
  { debounce: 200, immediate: true },
)

const selectedIndex = ref(-1)
const disableMouseOver = ref(false)

watch(results, (value) => {
  selectedIndex.value = value.length ? 0 : -1
  scrollToSelectedResult()
})

function scrollToSelectedResult() {
  nextTick(() => {
    document.querySelector<HTMLElement>('.academy-search-result.selected')?.scrollIntoView({
      block: 'nearest',
    })
  })
}

function openSearch() {
  showSearch.value = true
}

onKeyStroke('k', (event) => {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault()
    openSearch()
  }
})

onKeyStroke('/', (event) => {
  if (!isEditingContent(event)) {
    event.preventDefault()
    openSearch()
  }
})

function isEditingContent(event: KeyboardEvent) {
  const element = event.target as HTMLElement
  return element.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
}

onKeyStroke('ArrowUp', (event) => {
  event.preventDefault()
  selectedIndex.value = selectedIndex.value <= 0 ? results.value.length - 1 : selectedIndex.value - 1
  disableMouseOver.value = true
  scrollToSelectedResult()
})

onKeyStroke('ArrowDown', (event) => {
  event.preventDefault()
  selectedIndex.value = selectedIndex.value >= results.value.length - 1 ? 0 : selectedIndex.value + 1
  disableMouseOver.value = true
  scrollToSelectedResult()
})

onKeyStroke('Enter', (event) => {
  if (event.isComposing || (event.target instanceof HTMLButtonElement && event.target.type !== 'submit'))
    return

  const selected = results.value[selectedIndex.value]
  if (event.target instanceof HTMLInputElement && !selected) {
    event.preventDefault()
    return
  }

  if (selected) {
    event.preventDefault()
    window.location.assign(withBase(selected.id))
    closeSearch()
  }
})

onKeyStroke('Escape', () => {
  if (showSearch.value)
    closeSearch()
})

const isLocked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

watch(showSearch, (open) => {
  isLocked.value = open
  if (open) {
    window.history.pushState(null, '', null)
    nextTick().then(() => {
      searchInput.value?.focus()
      searchInput.value?.select()
      activate()
    })
  }
})

useEventListener('popstate', (event) => {
  if (showSearch.value) {
    event.preventDefault()
    closeSearch()
  }
})

onBeforeUnmount(() => {
  isLocked.value = false
})

function resetSearch() {
  filterText.value = ''
  nextTick(() => searchInput.value?.focus())
}

function closeSearch() {
  showSearch.value = false
}

function selectedClick(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return

  // Keep the rendered href as the source of truth. Native local navigation
  // preserves the exact section hash instead of letting the Plume TOC
  // scroll-spy replace it with a nearby heading after an SPA transition.
  closeSearch()
}

function decodeHtml(value: string) {
  const node = document.createElement('div')
  node.innerHTML = value
  return node.textContent ?? ''
}

function plainText(value: string) {
  return decodeHtml(value).replace(/\s+/g, ' ').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeRegExp(value: string) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
}

function termPattern(term: string) {
  const trimmed = term.trim()
  if (/^[\p{L}\p{N}]+$/u.test(trimmed))
    return [...trimmed].map(escapeRegExp).join('[^\\p{L}\\p{N}]*')
  return escapeRegExp(trimmed)
}

function resultTerms(query: string) {
  const queryTerms = query.match(/[\p{L}\p{N}]+(?:[._:-][\p{L}\p{N}]+)*/gu) ?? []
  // MiniSearch may report fuzzy neighbours.
  // Highlight the learner's actual query terms so the emphasis never suggests
  // that an unrelated fuzzy neighbour was the remembered phrase.
  return [...new Set(queryTerms)]
    .filter(term => term.length > 1)
    .sort((a, b) => b.length - a.length)
}

function highlightHtml(value: string, terms: string[]) {
  const source = plainText(value)
  if (!source || !terms.length)
    return escapeHtml(source)

  const pattern = terms.map(termPattern).filter(Boolean).join('|')
  if (!pattern)
    return escapeHtml(source)

  const matches = [...source.matchAll(new RegExp(pattern, 'giu'))]
  if (!matches.length)
    return escapeHtml(source)

  let output = ''
  let cursor = 0
  for (const match of matches) {
    const start = match.index ?? cursor
    output += escapeHtml(source.slice(cursor, start))
    output += `<mark>${escapeHtml(match[0])}</mark>`
    cursor = start + match[0].length
  }
  return output + escapeHtml(source.slice(cursor))
}

function snippetText(result: AcademySearchResult) {
  const source = plainText(result.text || result.title)
  const query = plainText(filterText.value)
  const terms = resultTerms(query)
  const lower = source.toLocaleLowerCase()
  const exact = query ? lower.indexOf(query.toLocaleLowerCase()) : -1
  let matchIndex = exact

  if (matchIndex < 0) {
    matchIndex = terms
      .map(term => {
        const direct = lower.indexOf(term.toLocaleLowerCase())
        if (direct >= 0)
          return direct
        const match = source.match(new RegExp(termPattern(term), 'iu'))
        return match?.index ?? -1
      })
      .filter(index => index >= 0)
      .sort((a, b) => a - b)[0] ?? -1
  }

  if (source.length <= 190)
    return source

  const center = matchIndex >= 0 ? matchIndex : 0
  let start = Math.max(0, center - 70)
  let end = Math.min(source.length, start + 190)

  if (start > 0) {
    const nextSpace = source.indexOf(' ', start)
    if (nextSpace >= 0 && nextSpace < center)
      start = nextSpace + 1
  }
  if (end < source.length) {
    const lastSpace = source.lastIndexOf(' ', end)
    if (lastSpace > center)
      end = lastSpace
  }

  return `${start > 0 ? '…' : ''}${source.slice(start, end).trim()}${end < source.length ? '…' : ''}`
}

function titleHtml(value: string, result: AcademySearchResult) {
  return highlightHtml(value, resultTerms(filterText.value))
}

function snippetHtml(result: AcademySearchResult) {
  return highlightHtml(snippetText(result), resultTerms(filterText.value))
}

function resultAriaLabel(result: AcademySearchResult) {
  return `${[...result.titles, result.title].join(' > ')}. ${snippetText(result)}`
}
</script>

<template>
  <div class="academy-search-wrapper">
    <button type="button" class="academy-search-trigger" :aria-label="locale.placeholder" @click="openSearch">
      <svg class="academy-search-trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <span class="academy-search-trigger-label">{{ locale.placeholder }}</span>
      <span class="academy-search-trigger-keys" aria-hidden="true"><kbd>⌘</kbd><kbd>K</kbd></span>
    </button>

    <Teleport v-if="showSearch" to="body">
      <div
        ref="el"
        class="academy-local-search"
        role="dialog"
        aria-modal="true"
        aria-labelledby="academy-search-label"
        aria-expanded="true"
      >
        <div class="academy-search-backdrop" @click="closeSearch" />

        <div class="academy-search-shell">
          <form class="academy-search-bar" @submit.prevent="">
            <label id="academy-search-label" for="academy-search-input" class="academy-search-label">
              <svg class="academy-search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span class="sr-only">{{ locale.placeholder }}</span>
            </label>
            <button
              type="button"
              class="academy-search-back"
              :title="locale.backButtonTitle"
              @click="closeSearch"
            >
              ←
            </button>
            <input
              id="academy-search-input"
              ref="searchInput"
              v-model="filterText"
              :placeholder="locale.placeholder"
              aria-labelledby="academy-search-label"
              class="academy-search-input"
            >
            <button
              type="reset"
              class="academy-search-clear"
              :disabled="!filterText"
              :title="locale.resetButtonTitle"
              @click="resetSearch"
            >
              ×
            </button>
          </form>

          <ul
            :id="results.length ? 'academy-search-results' : undefined"
            ref="resultsEl"
            :role="results.length ? 'listbox' : undefined"
            class="academy-search-results"
            @mousemove="disableMouseOver = false"
          >
            <li
              v-for="(result, index) in results"
              :key="result.id"
              role="option"
              :aria-selected="selectedIndex === index ? 'true' : 'false'"
            >
              <a
                :href="withBase(result.id)"
                class="academy-search-result"
                :class="{ selected: selectedIndex === index }"
                :aria-label="resultAriaLabel(result)"
                @mouseenter="!disableMouseOver && (selectedIndex = index)"
                @focusin="selectedIndex = index"
                @click="selectedClick($event, result)"
              >
                <div class="academy-search-result-body">
                  <div class="academy-search-context">
                    <span class="academy-search-context-mark" aria-hidden="true">›</span>
                    <span
                      v-for="(title, titleIndex) in result.titles"
                      :key="titleIndex"
                      class="academy-search-title"
                    >
                      <span v-html="titleHtml(title, result)" />
                      <span class="academy-search-chevron" aria-hidden="true">›</span>
                    </span>
                    <span class="academy-search-title main" v-html="titleHtml(result.title, result)" />
                  </div>
                  <div class="academy-search-snippet" v-html="snippetHtml(result)" />
                </div>
              </a>
            </li>
            <li v-if="filterText && !results.length && enableNoResults" class="academy-search-no-results">
              {{ locale.noResultsText }} “<strong>{{ filterText }}</strong>”
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.academy-search-wrapper {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
}

.academy-search-trigger {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  padding: 0 10px 0 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 8px;
}

.academy-search-trigger:hover,
.academy-search-trigger:focus-visible {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand-1);
}

.academy-search-trigger-icon {
  flex: none;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.academy-search-trigger-label {
  padding-right: 16px;
  font-size: 13px;
  font-weight: 500;
}

.academy-search-trigger-keys {
  display: flex;
  align-items: center;
  margin-left: auto;
  direction: ltr;
}

.academy-search-trigger-keys kbd {
  min-width: 20px;
  height: 22px;
  padding: 0 5px;
  color: var(--vp-c-text-3);
  font: 12px/20px var(--vp-font-family-base);
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.academy-search-trigger-keys kbd:first-child {
  border-right: 0;
  border-radius: 4px 0 0 4px;
}

.academy-search-trigger-keys kbd:last-child {
  border-radius: 0 4px 4px 0;
}

.academy-local-search {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
}

.academy-search-backdrop {
  position: absolute;
  inset: 0;
  background: var(--vp-backdrop-bg-color);
}

.academy-search-shell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(calc(100vw - 60px), 900px);
  max-height: min(calc(100vh - 128px), 900px);
  padding: 12px;
  margin: 64px auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: var(--vp-shadow-3);
}

.academy-search-bar {
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.academy-search-bar:focus-within {
  border-color: var(--vp-c-brand-1);
}

.academy-search-label {
  display: flex;
  align-items: center;
  flex: none;
}

.academy-search-icon {
  flex: none;
  width: 16px;
  height: 16px;
  margin: 8px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.academy-search-back {
  display: none;
  padding: 7px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 0;
}

.academy-search-input {
  width: 100%;
  padding: 9px 8px;
  color: var(--vp-c-text-1);
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
}

.academy-search-input::placeholder {
  color: var(--vp-c-text-3);
}

.academy-search-clear {
  padding: 6px 8px;
  color: var(--vp-c-text-2);
  font-size: 20px;
  line-height: 1;
  background: transparent;
  border: 0;
}

.academy-search-clear:disabled {
  opacity: 0.35;
}

.academy-search-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  overflow: hidden auto;
  list-style: none;
}

.academy-search-result {
  display: block;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
}

.academy-search-result:hover,
.academy-search-result:focus-visible,
.academy-search-result.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.academy-search-result-body {
  min-width: 0;
  padding: 12px 14px;
}

.academy-search-context {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 5px;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 0.83rem;
  line-height: 1.4;
}

.academy-search-context-mark,
.academy-search-chevron {
  color: var(--vp-c-brand-1);
}

.academy-search-title {
  display: inline-flex;
  gap: 5px;
  align-items: center;
}

.academy-search-title.main {
  color: var(--vp-c-text-1);
  font-weight: 650;
}

.academy-search-snippet {
  margin-top: 7px;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
}

.academy-search-snippet :deep(mark),
.academy-search-title :deep(mark) {
  padding: 0 2px;
  color: var(--vp-c-neutral-inverse);
  background: var(--vp-c-brand-1);
  border-radius: 3px;
}

.academy-search-no-results {
  padding: 16px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 767px) {
  .academy-search-trigger {
    justify-content: center;
    width: 48px;
    padding: 0;
    background: transparent;
    border: 0;
  }

  .academy-search-trigger-label,
  .academy-search-trigger-keys {
    display: none;
  }

  .academy-search-trigger-icon {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .academy-search-shell {
    width: 100vw;
    max-height: none;
    margin: 0;
    border: 0;
    border-radius: 0;
  }

  .academy-search-label {
    display: none;
  }

  .academy-search-back {
    display: block;
  }

  .academy-search-result-body {
    padding: 10px;
  }

  .academy-search-snippet {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
