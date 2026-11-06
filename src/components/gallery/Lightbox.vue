<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  photos: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  albumTitle: { type: String, default: '' }
})
const emit = defineEmits(['close'])

const index = ref(props.startIndex)
const imgError = ref(false)
const closeButton = ref(null)
let previousOverflow = ''

const current = computed(() => props.photos[index.value] || null)
const counter = computed(() => `${index.value + 1} / ${props.photos.length}`)
const hasMultiple = computed(() => props.photos.length > 1)

function next() {
  if (!hasMultiple.value) return
  index.value = (index.value + 1) % props.photos.length
  imgError.value = false
}
function prev() {
  if (!hasMultiple.value) return
  index.value = (index.value - 1 + props.photos.length) % props.photos.length
  imgError.value = false
}
function onKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); emit('close') }
  else if (event.key === 'ArrowRight') { event.preventDefault(); next() }
  else if (event.key === 'ArrowLeft') { event.preventDefault(); prev() }
}

watch(current, () => { imgError.value = false })

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  window.removeEventListener('keydown', onKeydown)
})

// Lock body scroll and bind keys while the lightbox is mounted
if (typeof document !== 'undefined') {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
}
</script>

<template>
  <div class="lightbox" role="dialog" aria-modal="true" :aria-label="`Photo viewer — ${albumTitle}`" @click.self="emit('close')">
    <button ref="closeButton" type="button" class="lightbox-close" aria-label="Close photo viewer" @click="emit('close')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>

    <button v-if="hasMultiple" type="button" class="lightbox-arrow lightbox-prev" aria-label="Previous photo" @click="prev">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>

    <figure v-if="current" class="lightbox-figure">
      <div v-if="imgError" class="lightbox-error" role="alert">
        <p>This photo could not be loaded.</p>
        <a href="https://ifakdonbosco.ac.rw/" target="_blank" rel="noopener noreferrer">View the official IFAK website →</a>
      </div>
      <img v-else :src="current.src" :alt="current.caption" class="lightbox-img" />
      <figcaption class="lightbox-caption">
        <span class="lightbox-caption-text">{{ current.caption }}</span>
        <span class="lightbox-counter" aria-live="polite">{{ counter }}</span>
      </figcaption>
    </figure>

    <button v-if="hasMultiple" type="button" class="lightbox-arrow lightbox-next" aria-label="Next photo" @click="next">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(8, 17, 26, 0.93);
  display: flex; align-items: center; justify-content: center;
  padding: clamp(0.75rem, 3vw, 2rem);
}
.lightbox-figure {
  max-width: min(1200px, 100%); max-height: 100%;
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
}
.lightbox-img {
  max-width: 100%; max-height: 78vh; object-fit: contain;
  border-radius: 6px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.lightbox-caption {
  display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem;
  width: 100%; color: rgba(255,255,255,0.88); font-size: 0.88rem; line-height: 1.5;
}
.lightbox-counter { flex: none; color: rgba(255,255,255,0.55); font-variant-numeric: tabular-nums; font-size: 0.82rem; }
.lightbox-close {
  position: absolute; top: 0.9rem; right: 0.9rem;
  width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.25);
  border-radius: 6px; cursor: pointer;
}
.lightbox-close:hover { background: rgba(255,255,255,0.18); }
.lightbox-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 52px; height: 64px; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.07); color: #fff; border: 1px solid rgba(255,255,255,0.18);
  border-radius: 6px; cursor: pointer;
}
.lightbox-arrow:hover { background: rgba(255,255,255,0.16); }
.lightbox-prev { left: clamp(0.4rem, 2vw, 1.5rem); }
.lightbox-next { right: clamp(0.4rem, 2vw, 1.5rem); }
.lightbox-error { color: #fff; text-align: center; padding: 3rem; }
.lightbox-error a { color: #cfdce8; }

@media (max-width: 700px) {
  .lightbox-arrow { width: 40px; height: 52px; top: auto; bottom: 5.5rem; transform: none; }
  .lightbox-img { max-height: 70vh; }
  .lightbox-caption { flex-direction: column; gap: 0.25rem; }
}
</style>
