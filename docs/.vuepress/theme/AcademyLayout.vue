<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vuepress/client'
import { Layout as PlumeLayout } from 'vuepress-theme-plume/client'

const { frontmatter } = useData()

const canonicalTime = computed(() => {
  const value = frontmatter.value.reading_time

  if (typeof value !== 'string' || !value)
    return ''

  if (/^reference\s*[—-]/i.test(value))
    return `Reference · ${value.replace(/^reference\s*[—-]\s*/i, '')}`

  return `Estimated time · ${value}`
})

const isAcademyPart = computed(() =>
  Boolean(canonicalTime.value)
  && Number.isInteger(Number(frontmatter.value.week))
  && frontmatter.value.day !== undefined,
)
</script>

<template>
  <PlumeLayout v-if="isAcademyPart" class="academy-page-layout">
    <template #doc-meta-bottom>
      <div class="academy-reading-time" role="status">
        <span class="vpi-clock" aria-hidden="true" />
        <span>{{ canonicalTime }}</span>
      </div>
    </template>
  </PlumeLayout>
  <PlumeLayout v-else />
</template>

<style>
/* Academy Part pages provide their own editorial estimate from frontmatter. */
body:has(.academy-reading-time) .vp-doc-meta .reading-time {
  display: none;
}
</style>
