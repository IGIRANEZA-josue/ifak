<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { asset, formatDate, pillStyle, readingTime, splitParagraphs, findNewsBySlug, buildShareLinks } from '../utils/content'
import RelatedNews from '../components/news/RelatedNews.vue'

const route = useRoute()
const article = computed(() => findNewsBySlug(String(route.params.slug)))

const paragraphs = computed(() => splitParagraphs(article.value?.content || ''))
const minutes = computed(() => readingTime(article.value?.content || ''))

const shareLinks = computed(() => {
  if (!article.value) return {}
  const url = typeof window !== 'undefined' ? window.location.href : `https://ifakdonbosco.ac.rw/news/${article.value.slug}`
  return buildShareLinks({ title: article.value.title, url })
})

const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Clipboard unavailable (e.g. insecure context) — fall back to prompt-less no-op with feedback
    copied.value = false
  }
}

watch(article, (a) => {
  if (typeof document !== 'undefined') {
    document.title = a ? `${a.title} | IFAK News` : 'Article not found | IFAK News'
  }
}, { immediate: true })
</script>

<template>
  <!-- Missing article -->
  <section v-if="!article" class="section">
    <div class="container narrow empty-state" role="alert">
      <h1>Article not found</h1>
      <p>We couldn’t find the article “{{ route.params.slug }}”. It may have been moved or unpublished.</p>
      <router-link class="btn btn-primary" to="/news">← Back to all news</router-link>
    </div>
  </section>

  <template v-else>
    <article class="article-page">
      <div class="container article-container">
        <!-- Breadcrumb -->
        <nav class="article-crumbs" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link>
          <span aria-hidden="true">›</span>
          <router-link to="/news">News</router-link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" class="crumb-current">{{ article.category }}</span>
        </nav>

        <!-- Header -->
        <header class="article-header">
          <div class="article-meta-top">
            <span class="pill" :style="pillStyle(article.category)">{{ article.category }}</span>
            <time :datetime="article.date">{{ formatDate(article.date) }}</time>
            <span class="reading-time">{{ minutes }} min read</span>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-byline">
            <span class="author-avatar" aria-hidden="true">{{ article.author.trim().charAt(0).toUpperCase() }}</span>
            <span>
              <strong>{{ article.author }}</strong>
              <span class="author-role">IFAK — Institut de Formation Apostolique de Kimihurura</span>
            </span>
          </div>
        </header>
      </div>

      <!-- Cover -->
      <div class="container article-cover-wrap">
        <img class="article-cover" :src="asset(article.image)" :alt="article.imageAlt || article.title" width="1600" height="900" />
      </div>

      <div class="container article-container">
        <!-- Body -->
        <div class="article-body">
          <p class="article-lede">{{ article.description }}</p>
          <div class="prose">
            <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
          </div>

          <div v-if="article.tags?.length" class="tag-row" aria-label="Article tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>

          <!-- Share -->
          <div class="share-row" aria-label="Share this article">
            <span class="share-label">Share this story</span>
            <div class="share-buttons">
              <a :href="shareLinks.x" target="_blank" rel="noopener noreferrer" aria-label="Share on X" class="share-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h3.6l5.1 6.9L18.4 4H20l-6.5 8.1L20.5 20H17l-5.3-7L6 20H4l6.8-8.4L4 4z"/></svg>
              </a>
              <a :href="shareLinks.facebook" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" class="share-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
              </a>
              <a :href="shareLinks.linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" class="share-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM4 9h2v12H4zM9.5 9h1.9v1.7h.03c.27-.5.92-1.05 1.9-1.05 2 0 2.37 1.3 2.37 3V21h-2v-7.1c0-1.7-.03-3.9-2.4-3.9-2.4 0-2.76 1.85-2.76 3.77V21h-2z"/></svg>
              </a>
              <a :href="shareLinks.whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" class="share-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.2zm4.5-6c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.13-.56.13-.17.25-.65.8-.8.97-.14.16-.29.18-.54.06a6.6 6.6 0 0 1-3.3-2.9c-.25-.43.25-.4.72-1.34.08-.17.04-.32-.02-.45-.07-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.77 2.7 4.3 3.79 1.6.7 2.26.75 3.08.63.5-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29z"/></svg>
              </a>
              <a :href="shareLinks.email" aria-label="Share by email" class="share-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              </a>
              <button type="button" class="share-btn share-copy" :aria-label="copied ? 'Link copied' : 'Copy article link'" @click="copyLink">
                <svg v-if="!copied" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              </button>
              <span v-if="copied" class="copied-hint" role="status">Link copied!</span>
            </div>
          </div>

          <p v-if="article.source" class="source-note">{{ article.source }}.</p>

          <router-link class="btn btn-outline back-news" to="/news">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Back to all news
          </router-link>
        </div>

        <!-- Related -->
        <RelatedNews :current="article" />
      </div>
    </article>
  </template>
</template>

<style scoped>
.narrow { max-width: 720px; margin-inline: auto; }
.article-page { background: var(--cream); padding-bottom: 4rem; }
.article-container { max-width: 1020px; }
.article-crumbs {
  display: flex; gap: 0.55rem; align-items: center; flex-wrap: wrap;
  font-size: 0.83rem; color: var(--muted); padding-top: 1.5rem;
}
.article-crumbs a { color: var(--navy-800); text-decoration: none; font-weight: 600; }
.article-crumbs a:hover { text-decoration: underline; }
.crumb-current { color: var(--gold-dark); font-weight: 600; }

.article-header { padding-block: 1.1rem 1.35rem; display: flex; flex-direction: column; gap: 0.9rem; }
.article-meta-top { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; color: var(--muted); font-size: 0.88rem; }
.reading-time::before { content: "· "; }
.article-title { font-size: clamp(1.7rem, 4.2vw, 2.6rem); line-height: 1.16; letter-spacing: -0.015em; max-width: 26ch; }
.article-byline { display: flex; align-items: center; gap: 0.75rem; }
.author-avatar {
  width: 46px; height: 46px; border-radius: 50%; flex: none;
  background: var(--navy-900); color: var(--gold-light);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 700; font-size: 1.1rem;
}
.article-byline strong { display: block; color: var(--navy-900); font-size: 0.95rem; }
.author-role { font-size: 0.78rem; color: var(--muted); }

.article-cover-wrap { margin-bottom: 1.5rem; }
.article-cover {
  width: 100%; aspect-ratio: 16 / 8.5; object-fit: cover;
  border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--line);
}

.article-body { max-width: 780px; }
.article-lede {
  font-size: 1.18rem; line-height: 1.6; color: var(--navy-800);
  border-left: 4px solid var(--gold); padding-left: 1.1rem; margin-bottom: 1.4rem;
  font-family: var(--font-display);
}

.tag-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem; }
.tag { font-size: 0.8rem; color: var(--navy-800); background: var(--navy-100); border-radius: 6px; padding: 0.3rem 0.65rem; text-decoration: none; }

.share-row {
  display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;
  margin-top: 1.75rem; padding-block: 1rem; border-block: 1px solid var(--line-strong);
}
.share-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.share-buttons { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.share-btn {
  width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid var(--line-strong); background: #fff;
  color: var(--navy-800); cursor: pointer; text-decoration: none;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}
.share-btn:hover { background: var(--navy-900); border-color: var(--navy-900); color: var(--gold-light); }
.copied-hint { font-size: 0.8rem; color: var(--gold-dark); font-weight: 600; }

.source-note { font-size: 0.82rem; color: var(--muted); font-style: italic; margin-top: 1.25rem; }
.back-news { margin-top: 1.5rem; }
</style>
