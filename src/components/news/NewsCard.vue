<script setup>
import { formatDate } from '../../utils/content'
import SmartImage from '../SmartImage.vue'

defineProps({
  article: { type: Object, required: true }
})
</script>

<template>
  <article class="card card-hover news-card">
    <router-link class="card-media" :to="`/news/${article.slug}`" :aria-label="`Read: ${article.title}`" tabindex="-1">
      <SmartImage :src="article.image" :fallback="article.imageFallback" :alt="article.imageAlt || article.title" width="640" height="400" />
    </router-link>
    <div class="card-body">
      <div class="card-topline">
        <span class="pill">{{ article.category }}</span>
        <time class="card-date" :datetime="article.date">{{ formatDate(article.date) }}</time>
      </div>
      <h3 class="card-title">
        <router-link :to="`/news/${article.slug}`">{{ article.title }}</router-link>
      </h3>
      <p class="card-desc">{{ article.description }}</p>
      <router-link class="read-more" :to="`/news/${article.slug}`">
        Read more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.news-card { display: flex; flex-direction: column; }
.card-media { aspect-ratio: 16 / 10; }
.card-topline { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.card-date { font-size: 0.8rem; color: var(--muted); }
</style>
