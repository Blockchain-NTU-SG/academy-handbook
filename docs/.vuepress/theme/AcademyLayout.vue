<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vuepress/client'
import PlumeLayout from '../../../node_modules/vuepress-theme-plume/lib/client/layouts/Layout.vue'

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
  <div :class="{ 'academy-page-layout': isAcademyPart }">
    <PlumeLayout>
      <template #doc-meta-bottom>
        <div v-if="isAcademyPart" class="academy-reading-time" role="status">
          <span class="vpi-clock" aria-hidden="true" />
          <span>{{ canonicalTime }}</span>
        </div>
      </template>
    </PlumeLayout>
  </div>
</template>
