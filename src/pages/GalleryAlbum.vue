<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import gallery from '../data/gallery.json'
import { formatDate } from '../utils/content'
import Lightbox from '../components/gallery/Lightbox.vue'
import AlbumCard from '../components/gallery/AlbumCard.vue'

const route = useRoute()
const album = computed(() => gallery.find((a) => a.slug === String(route.params.slug)) || null)
const otherAlbums = computed(() => gallery.filter((a) => a.slug !== album.value?.slug).slice(0, 2))

const lightboxIndex = ref(null)
const lightboxOpen = computed(() => lightboxIndex.value !== null)

function openLightbox(i) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }

watch(album, (a) => {
  if (typeof document !== 'undefined') {
    document.title = a ? `${a.title} | IFAK Gallery` : 'Album not found | IFAK Gallery'
  }
  closeLightbox()
}, { immediate: true })
</script>

<template>
  <section v-if="!album" class="section">
    <div class="container narrow empty-state" role="alert">
      <h1>Album not found</h1>
      <p>We couldn’t find the album “{{ route.params.slug }}”. It may have been renamed or removed.</p>
      <router-link class="btn btn-primary" to="/gallery">Back to the gallery</router-link>
    </div>
  </section>

  <template v-else>
    <section class="page-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link><span aria-hidden="true">›</span>
          <router-link to="/gallery">Gallery</router-link><span aria-hidden="true">›</span>
          <span aria-current="page">{{ album.title }}</span>
        </nav>
        <h1>{{ album.title }}</h1>
        <p>{{ album.summary }}</p>
      </div>
    </section>

    <section class="section album-page">
      <div class="container">
        <div class="album-meta">
          <span class="album-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {{ formatDate(album.date) }}
          </span>
          <span class="album-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
            {{ album.place }}
          </span>
          <span class="album-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 15-4.5-4.5L9 18"/></svg>
            {{ album.photos.length }} photos
          </span>
          <a class="album-source" :href="album.sourceUrl" target="_blank" rel="noopener noreferrer">See the original report on the official IFAK website →</a>
        </div>

        <ul class="photo-grid">
          <li v-for="(photo, i) in album.photos" :key="i">
            <button type="button" class="photo-thumb" :aria-label="`Open photo ${i + 1}: ${photo.caption}`" @click="openLightbox(i)">
              <img :src="photo.src" :alt="photo.caption" loading="lazy" width="640" height="480" />
            </button>
          </li>
        </ul>

        <p class="album-credit">Photos © IFAK / official IFAK website (ifakdonbosco.ac.rw). Photo captions describe the event as reported by the school.</p>

        <div class="album-foot">
          <router-link class="btn btn-outline" to="/gallery">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            All albums
          </router-link>
        </div>

        <section v-if="otherAlbums.length" class="more-albums" aria-labelledby="more-albums-heading">
          <h2 id="more-albums-heading">More albums</h2>
          <div class="more-albums-grid">
            <AlbumCard v-for="other in otherAlbums" :key="other.slug" :album="other" />
          </div>
        </section>
      </div>

      <Lightbox
        v-if="lightboxOpen"
        :photos="album.photos"
        :start-index="lightboxIndex"
        :album-title="album.title"
        @close="closeLightbox"
      />
    </section>
  </template>
</template>

<style scoped>
.narrow { max-width: 720px; margin-inline: auto; }
.album-page { background: var(--bg); }

.album-meta {
  display: flex; align-items: center; gap: 1.1rem 1.5rem; flex-wrap: wrap;
  padding-bottom: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--line);
  font-size: 0.87rem; color: var(--muted);
}
.album-meta-item { display: inline-flex; align-items: center; gap: 0.4rem; }
.album-meta-item svg { color: var(--accent); }
.album-source { font-size: 0.85rem; font-weight: 550; color: var(--accent); text-decoration: none; }
.album-source:hover { text-decoration: underline; }

.photo-grid {
  list-style: none; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 0.75rem;
}
.photo-thumb {
  display: block; width: 100%; padding: 0; border: 1px solid var(--line);
  border-radius: var(--radius); overflow: hidden; background: var(--surface-2);
  cursor: pointer; transition: border-color var(--transition), box-shadow var(--transition);
}
.photo-thumb:hover { border-color: var(--accent); box-shadow: var(--shadow-md); }
.photo-thumb img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }

.album-credit { margin-top: 1.5rem; font-size: 0.8rem; color: var(--muted); text-align: center; }
.album-foot { margin-top: 1.25rem; display: flex; }

.more-albums { margin-top: 2.25rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.more-albums h2 { font-size: 1.15rem; font-weight: 650; margin-bottom: 0.9rem; }
.more-albums-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
</style>
