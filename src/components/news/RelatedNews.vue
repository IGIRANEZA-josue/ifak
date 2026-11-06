<script setup>
import { computed } from 'vue'
import { allNews } from '../../utils/content'
import NewsCard from './NewsCard.vue'

const props = defineProps({
  current: { type: Object, required: true },
  limit: { type: Number, default: 3 }
})

const related = computed(() => {
  const others = allNews().filter((a) => a.slug !== props.current.slug)
  const sameCategory = others.filter((a) => a.category === props.current.category)
  const rest = others.filter((a) => a.category !== props.current.category)
  return [...sameCategory, ...rest].slice(0, props.limit)
})
</script>

<template>
  <section v-if="related.length" class="related" aria-labelledby="related-heading">
    <div class="related-head">
      <h2 id="related-heading">Continue reading</h2>
      <router-link class="link-arrow" to="/news">All news
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </router-link>
    </div>
    <div class="grid-cards">
      <NewsCard v-for="article in related" :key="article.slug" :article="article" />
    </div>
  </section>
</template>

<style scoped>
.related { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--line-strong); }
.related-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
.related-head h2 { font-size: clamp(1.3rem, 2.4vw, 1.7rem); }
</style>
