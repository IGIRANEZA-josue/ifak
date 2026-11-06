<script setup>
import { asset, formatDate, pillStyle } from '../../utils/content'

defineProps({
  article: { type: Object, required: true }
})
</script>

<template>
  <article class="featured" :aria-label="`Featured article: ${article.title}`">
    <img
      class="featured-bg"
      :src="asset(article.image)"
      :alt="article.imageAlt || article.title"
      width="1600" height="900"
      fetchpriority="high"
    />
    <div class="featured-overlay" aria-hidden="true"></div>

    <span class="featured-flag">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 5.6 6.1.6-4.6 4 1.3 6-5.4-3.1L6.6 18.2l1.3-6-4.6-4 6.1-.6L12 2z"/></svg>
      Featured
    </span>

    <div class="featured-content">
      <div class="featured-meta">
        <span class="pill pill-dark" :style="pillStyle(article.category)">{{ article.category }}</span>
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      </div>
      <h2 class="featured-title">
        <router-link :to="`/news/${article.slug}`">{{ article.title }}</router-link>
      </h2>
      <p class="featured-desc">{{ article.description }}</p>
      <div class="featured-foot">
        <span class="featured-author">By {{ article.author }}</span>
        <router-link class="btn btn-gold btn-sm" :to="`/news/${article.slug}`">
          Read full story
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<style scoped>
.featured {
  position: relative; border-radius: var(--radius-lg); overflow: hidden;
  min-height: clamp(380px, 52vh, 520px);
  display: flex; align-items: flex-end;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255,255,255,0.08);
  background: var(--navy-900);
}
.featured-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.featured-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(11,29,46,0.05) 0%, rgba(11,29,46,0.35) 45%, rgba(11,29,46,0.92) 100%);
}
.featured-flag {
  position: absolute; top: 1.1rem; right: 1.1rem; z-index: 2;
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--navy-950); background: var(--gold);
  border-radius: 999px; padding: 0.4rem 0.85rem;
  box-shadow: var(--shadow-md);
}
.featured-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 0.8rem;
  padding: clamp(1.4rem, 4vw, 2.4rem);
  max-width: 880px;
}
.featured-meta { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; color: rgba(244,241,232,0.85); font-size: 0.85rem; }
.pill-dark { backdrop-filter: blur(4px); }
.featured-title { font-size: clamp(1.5rem, 3.4vw, 2.5rem); line-height: 1.15; color: #fdfaf0; }
.featured-title a { color: inherit; text-decoration: none; }
.featured-title a:hover { text-decoration: underline; text-underline-offset: 6px; text-decoration-color: var(--gold); }
.featured-desc { color: rgba(244,241,232,0.88); font-size: 1.02rem; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.featured-foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: 0.25rem; }
.featured-author { color: rgba(244,241,232,0.75); font-size: 0.88rem; }
@media (max-width: 560px) {
  .featured { min-height: 460px; }
  .featured-desc { -webkit-line-clamp: 3; }
}
</style>
