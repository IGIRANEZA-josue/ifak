<script setup>
import { ref, computed } from 'vue'
import { formatDate, splitParagraphs } from '../../utils/content'

const props = defineProps({
  announcement: { type: Object, required: true }
})

const expanded = ref(false)
const detailsId = computed(() => `announcement-details-${props.announcement.id}`)
const paragraphs = computed(() => splitParagraphs(props.announcement.content))

function attachmentHref(file) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return base + '/' + String(file).replace(/^\//, '')
}
</script>

<template>
  <article class="announcement card">
    <div class="announcement-date" aria-hidden="true">
      <span class="announcement-day">{{ new Date(`${announcement.date}T00:00:00`).getDate() }}</span>
      <span class="announcement-month">{{ new Date(`${announcement.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) }}</span>
    </div>

    <div class="announcement-body">
      <div class="announcement-topline">
        <span class="pill">{{ announcement.category }}</span>
        <time class="announcement-datetime" :datetime="announcement.date">{{ formatDate(announcement.date) }}</time>
        <span v-if="announcement.indicative" class="indicative-tag">Indicative</span>
      </div>

      <h3 class="announcement-title">{{ announcement.title }}</h3>
      <p class="announcement-desc">{{ announcement.description }}</p>

      <div :id="detailsId" v-show="expanded" class="announcement-details prose">
        <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
      </div>

      <div class="announcement-actions">
        <button
          type="button"
          class="read-more toggle-btn"
          :aria-expanded="expanded"
          :aria-controls="detailsId"
          @click="expanded = !expanded"
        >
          {{ expanded ? 'Hide full notice' : 'Read full notice' }}
          <svg class="chevron" :class="{ open: expanded }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>

        <a
          v-if="announcement.attachment"
          class="attachment-chip"
          :href="attachmentHref(announcement.attachment.file)"
          :download="announcement.attachment.file.split('/').pop()"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6M9 15l3 3 3-3"/></svg>
          <span>
            <span class="attachment-label">{{ announcement.attachment.label }}</span>
            <span class="attachment-meta">PDF attachment — download</span>
          </span>
        </a>

        <router-link v-if="announcement.relatedSlug" class="read-more" :to="`/news/${announcement.relatedSlug}`">
          Read the related story
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<style scoped>
.announcement { display: grid; grid-template-columns: 96px 1fr; }
.announcement-date {
  background: var(--surface);
  border-right: 1px solid var(--line);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.15rem; padding: 1rem 0.5rem; text-align: center;
}
.announcement-day { font-size: 1.6rem; font-weight: 700; color: var(--accent); line-height: 1; }
.announcement-month { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
.announcement-body { padding: 1.1rem 1.35rem 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.announcement-topline { display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; }
.announcement-datetime { font-size: 0.8rem; color: var(--muted); }
.announcement-title { font-size: 1.18rem; line-height: 1.3; }
.announcement-desc { color: var(--muted); font-size: 0.94rem; }
.announcement-details { font-size: 0.95rem; background: var(--bg); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 0.9rem 1rem; margin-top: 0.25rem; }
.announcement-actions { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; margin-top: 0.25rem; }
.toggle-btn { background: none; border: none; cursor: pointer; font-size: 0.88rem; }
.chevron { transition: transform var(--transition); }
.chevron.open { transform: rotate(180deg); }
.attachment-chip {
  display: inline-flex; align-items: center; gap: 0.6rem;
  border: 1px solid var(--line-strong); border-radius: var(--radius-sm);
  padding: 0.45rem 0.75rem; text-decoration: none; color: var(--accent);
  background: var(--card); transition: border-color var(--transition), box-shadow var(--transition);
}
.attachment-chip:hover { border-color: var(--accent); box-shadow: var(--shadow-sm); }
.attachment-label { display: block; font-size: 0.82rem; font-weight: 600; line-height: 1.3; }
.attachment-meta { display: block; font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
@media (max-width: 640px) {
  .announcement { grid-template-columns: 64px 1fr; }
  .announcement-day { font-size: 1.35rem; }
  .announcement-body { padding: 0.9rem 1rem 1rem; }
}
</style>
