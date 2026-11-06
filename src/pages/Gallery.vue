<script setup>
import gallery from '../data/gallery.json'
import PageHero from '../components/PageHero.vue'
import AlbumCard from '../components/gallery/AlbumCard.vue'

const totalPhotos = gallery.reduce((sum, album) => sum + album.photos.length, 0)
</script>

<template>
  <PageHero
    title="Photo gallery"
    subtitle="Official photographs from the life of IFAK Don Bosco Kimihurura — anniversary celebrations, parish feasts, commemorations, competitions and campus life."
    :crumbs="[{ label: 'Gallery' }]"
  />

  <section class="section gallery-page">
    <div class="container">
      <div class="gallery-note" role="note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 15-4.5-4.5L9 18"/></svg>
        <span>
          Every photograph on this page comes from the school’s official website (ifakdonbosco.ac.rw) — the school’s own photography.
          No AI-generated or stock images are used anywhere on this site. {{ totalPhotos }} photos across {{ gallery.length }} albums.
        </span>
      </div>

      <div class="albums-grid">
        <AlbumCard v-for="album in gallery" :key="album.slug" :album="album" />
      </div>

      <p class="gallery-credit">
        Photos © IFAK — Institut de Formation Apostolique de Kimihurura. Used with the school’s permission for this website.
        For full-resolution originals, contact the school office:
        <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.gallery-page { background: var(--bg); }
.gallery-note {
  display: flex; gap: 0.65rem; align-items: flex-start;
  background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--navy);
  border-radius: var(--radius-sm); padding: 0.7rem 0.9rem;
  font-size: 0.88rem; color: var(--ink); line-height: 1.55; margin-bottom: 1.5rem;
}
.gallery-note svg { flex: none; color: var(--accent); margin-top: 0.1rem; }
.albums-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.25rem; }
.gallery-credit { margin-top: 2rem; text-align: center; font-size: 0.82rem; color: var(--muted); }
.gallery-credit a { color: var(--accent); font-weight: 550; text-decoration: none; }
.gallery-credit a:hover { text-decoration: underline; }
</style>
