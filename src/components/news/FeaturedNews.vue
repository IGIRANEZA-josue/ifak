<script setup>
import { formatDate } from '../../utils/content'
import SmartImage from '../SmartImage.vue'

defineProps({
  article: { type: Object, required: true }
})
</script>

<template>
  <article class="featured card" :aria-label="`Featured article: ${article.title}`">
    <router-link class="featured-media" :to="`/news/${article.slug}`" tabindex="-1" :aria-hidden="true">
      <SmartImage
        :src="article.image"
        :fallback="article.imageFallback"
        :alt="article.imageAlt || article.title"
        width="1200" height="800"
        loading="eager"
        fetchpriority="high"
      />
    </router-link>

    <div class="featured-body">
      <div class="featured-meta">
        <span class="featured-label">Featured story</span>
        <span class="featured-dot" aria-hidden="true">·</span>
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      </div>
      <span class="pill">{{ article.category }}</span>
      <h2 class="featured-title">
        <router-link :to="`/news/${article.slug}`">{{ article.title }}</router-link>
      </h2>
      <p class="featured-desc">{{ article.description }}</p>
      <div class="featured-foot">
        <span class="featured-author">By {{ article.author }}</span>
        <router-link class="btn btn-primary btn-sm" :to="`/news/${article.slug}`">Read the full story</router-link>
      </div>
    </div>
  </article>
</template>

<style scoped>
.featured {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 320px;
}
.featured-media { display: block; overflow: hidden; background: var(--surface-2); min-height: 260px; }
.featured-media img { width: 100%; height: 100%; object-fit: cover; }
.featured-body {
  padding: clamp(1.4rem, 3vw, 2.1rem);
  display: flex; flex-direction: column; gap: 0.65rem; align-items: flex-start;
}
.featured-meta {
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
  font-size: 0.8rem; color: var(--muted);
}
.featured-label {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--navy);
}
.featured-title { font-size: clamp(1.35rem, 2.2vw, 1.7rem); line-height: 1.28; font-weight: 650; }
.featured-title a { color: var(--navy-ink); text-decoration: none; }
.featured-title a:hover { color: var(--navy); text-decoration: underline; text-underline-offset: 4px; }
.featured-desc { color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
.featured-foot {
  margin-top: auto; padding-top: 1rem;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; width: 100%;
  border-top: 1px solid var(--line);
}
.featured-author { color: var(--muted); font-size: 0.85rem; }
@media (max-width: 880px) {
  .featured { grid-template-columns: 1fr; }
  .featured-media { aspect-ratio: 16 / 10; min-height: 0; }
}
</style>
