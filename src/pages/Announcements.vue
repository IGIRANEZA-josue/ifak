<script setup>
import { computed, ref, watch } from 'vue'
import { allAnnouncements } from '../utils/content'
import PageHero from '../components/PageHero.vue'
import AnnouncementCard from '../components/announcements/AnnouncementCard.vue'

const CATEGORIES = ['Admissions', 'Academic', 'Examinations', 'School Calendar Updates', 'Competitions', 'General Notices']

const query = ref('')
const category = ref('')

const totalCount = allAnnouncements().length

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return allAnnouncements().filter((a) => {
    if (category.value && a.category !== category.value) return false
    if (!q) return true
    const haystack = `${a.title} ${a.description} ${a.content} ${a.category}`.toLowerCase()
    return haystack.includes(q)
  })
})

function clearFilters() {
  query.value = ''
  category.value = ''
}
</script>

<template>
  <PageHero
    title="School Announcements"
    subtitle="Official notices from the IFAK administration — admissions, examinations, calendar updates and important information for families and the school community."
    :crumbs="[{ label: 'Announcements' }]"
  />

  <section class="section announcements-page">
    <div class="container narrow">
      <div class="notice notice-block" role="note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 12v4"/></svg>
        <span>
          Notices marked <em>“indicative”</em> describe recurring arrangements; dates and procedures are confirmed by the
          school office each term. For official confirmation call <a href="tel:+250787949474">+250 787 949 474</a> or email
          <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>.
        </span>
      </div>

      <!-- Toolbar -->
      <form class="toolbar" role="search" aria-label="Filter announcements" @submit.prevent>
        <div class="search-wrap toolbar-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <label class="visually-hidden" for="announcement-search">Search announcements</label>
          <input id="announcement-search" v-model="query" class="control" type="search" placeholder="Search notices…" autocomplete="off" />
        </div>
        <label class="visually-hidden" for="announcement-category">Filter by category</label>
        <select id="announcement-category" v-model="category" class="control toolbar-select">
          <option value="">All categories</option>
          <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button type="button" class="btn btn-outline btn-sm" :disabled="!query && !category" @click="clearFilters">
          Clear
        </button>
      </form>

      <p class="result-count" aria-live="polite">
        Showing <strong>{{ filtered.length }}</strong> of {{ totalCount }} announcements
        <template v-if="category"> in <strong>{{ category }}</strong></template>
      </p>

      <!-- List -->
      <div v-if="filtered.length" class="announcement-list">
        <AnnouncementCard v-for="announcement in filtered" :key="announcement.id" :announcement="announcement" />
      </div>

      <div v-else class="empty-state" role="status">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8.5 11h5"/></svg>
        <h3>No announcements found</h3>
        <p>Nothing matches your search{{ category ? ` in ${category}` : '' }}. Try different keywords.</p>
        <button type="button" class="btn btn-primary" @click="clearFilters">Clear filters</button>
      </div>

      <p class="footer-note">
        Questions about any notice? Contact the school office —
        <a href="tel:+250787949474">+250 787 949 474</a> · <a href="tel:+250788519195">+250 788 519 195</a> ·
        <a href="tel:+250782379300">+250 782 379 300</a> · <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 980px; }
.announcements-page { background: var(--bg); }
.notice-block { margin-bottom: 1.5rem; }
.notice-block a { color: inherit; font-weight: 600; }

.toolbar { display: flex; gap: 0.7rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; }
.toolbar-search { flex: 1 1 280px; }
.toolbar-select { width: auto; min-width: 220px; }
.result-count { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.25rem; padding-inline: 0.15rem; }

.announcement-list { display: flex; flex-direction: column; gap: 1.1rem; }
.footer-note { margin-top: 2rem; font-size: 0.85rem; color: var(--muted); text-align: center; }
.footer-note a { color: var(--navy); font-weight: 600; text-decoration: none; }
.footer-note a:hover { text-decoration: underline; }
@media (max-width: 640px) {
  .toolbar-select, .toolbar .btn { flex: 1; }
}
</style>
