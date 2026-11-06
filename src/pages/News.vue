<script setup>
import { computed, ref, watch } from 'vue'
import categories from '../data/categories.json'
import { allNews } from '../utils/content'
import PageHero from '../components/PageHero.vue'
import FeaturedNews from '../components/news/FeaturedNews.vue'
import NewsFilter from '../components/news/NewsFilter.vue'
import NewsCard from '../components/news/NewsCard.vue'

const PAGE_SIZE = 6

const query = ref('')
const category = ref('')
const sort = ref('newest')
const visibleCount = ref(PAGE_SIZE)

const totalCount = allNews().length
const featured = computed(() => allNews().find((a) => a.featured) || null)
const hasActiveFilters = computed(() => Boolean(query.value.trim() || category.value) || sort.value !== 'newest')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  let items = allNews().filter((a) => {
    const matchesCategory = !category.value || a.category === category.value
    if (!matchesCategory) return false
    if (!q) return true
    const haystack = `${a.title} ${a.description} ${a.author} ${(a.tags || []).join(' ')}`.toLowerCase()
    return haystack.includes(q)
  })
  items.sort((a, b) =>
    sort.value === 'oldest'
      ? String(a.date).localeCompare(String(b.date))
      : String(b.date).localeCompare(String(a.date))
  )
  return items
})

const visible = computed(() => filtered.value.slice(0, visibleCount.value))
const remaining = computed(() => Math.max(0, filtered.value.length - visibleCount.value))

watch([query, category, sort], () => {
  visibleCount.value = PAGE_SIZE
})

function clearFilters() {
  query.value = ''
  category.value = ''
  sort.value = 'newest'
}
</script>

<template>
  <PageHero
    title="News from IFAK"
    subtitle="Stories, achievements and announcements from the IFAK Don Bosco Kimihurura community — students, teachers, alumni and friends."
    :crumbs="[{ label: 'News' }]"
  />

  <section class="section news-page">
    <div class="container">
      <!-- Featured article (hidden while filtering/searching) -->
      <FeaturedNews v-if="!hasActiveFilters && featured" :article="featured" class="featured-block" />

      <NewsFilter
        v-model:query="query"
        v-model:category="category"
        v-model:sort="sort"
        :categories="categories"
        :result-count="filtered.length"
        :total-count="totalCount"
        @clear="clearFilters"
        class="filter-block"
      />

      <!-- Results -->
      <div v-if="visible.length" class="grid-cards results-grid">
        <NewsCard v-for="article in visible" :key="article.slug" :article="article" />
      </div>

      <div v-else class="empty-state" role="status">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8.5 11h5"/></svg>
        <h3>No articles found</h3>
        <p v-if="query && category">Nothing matches “{{ query }}” in {{ category }}. Try a different search or category.</p>
        <p v-else-if="query">Nothing matches “{{ query }}”. Try different keywords — for example “national exams”, “Don Bosco” or “competition”.</p>
        <p v-else-if="category">There are no published articles in “{{ category }}” yet. Browse another category in the meantime.</p>
        <p v-else>No articles have been published yet.</p>
        <button type="button" class="btn btn-primary" @click="clearFilters">Clear all filters</button>
      </div>

      <div v-if="remaining > 0" class="load-more-row">
        <button type="button" class="btn btn-outline" @click="visibleCount += PAGE_SIZE">
          Show more articles
          <span class="remaining-count">({{ remaining }} remaining)</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-page { background: var(--bg); }
.featured-block { margin-bottom: 1.75rem; }
.filter-block { margin-bottom: 1.5rem; }
.results-grid { margin-top: 0.5rem; }
.load-more-row { display: flex; justify-content: center; margin-top: 2.25rem; }
.remaining-count { font-weight: 400; color: var(--muted); }
</style>
