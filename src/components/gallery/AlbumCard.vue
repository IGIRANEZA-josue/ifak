<script setup>
import { computed } from 'vue'
import { formatDate } from '../../utils/content'

const props = defineProps({
  album: { type: Object, required: true }
})
const photoCount = computed(() => props.album.photos?.length || 0)
</script>

<template>
  <article class="card card-hover album-card">
    <router-link class="card-media album-media" :to="`/gallery/${album.slug}`" :aria-label="`Open album: ${album.title}`" tabindex="-1">
      <img :src="album.cover" :alt="album.title" width="800" height="500" loading="lazy" />
      <span class="album-count">{{ photoCount }} photos</span>
    </router-link>
    <div class="card-body">
      <time class="album-date" :datetime="album.date">{{ formatDate(album.date) }}</time>
      <h3 class="card-title">
        <router-link :to="`/gallery/${album.slug}`">{{ album.title }}</router-link>
      </h3>
      <p class="card-desc">{{ album.summary }}</p>
      <router-link class="read-more" :to="`/gallery/${album.slug}`">
        View album
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.album-card { display: flex; flex-direction: column; }
.album-media { aspect-ratio: 16 / 10; position: relative; }
.album-count {
  position: absolute; right: 0.6rem; bottom: 0.6rem;
  background: rgba(255, 255, 255, 0.95); border: 1px solid var(--line-strong);
  color: var(--navy-ink); font-size: 0.7rem; font-weight: 600;
  padding: 0.2rem 0.55rem; border-radius: 4px;
}
.album-date { font-size: 0.78rem; color: var(--muted); }
</style>
