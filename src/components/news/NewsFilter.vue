<script setup>
defineProps({
  query: { type: String, default: '' },
  category: { type: String, default: '' },
  sort: { type: String, default: 'newest' },
  categories: { type: Array, required: true },
  resultCount: { type: Number, required: true },
  totalCount: { type: Number, required: true }
})
const emit = defineEmits(['update:query', 'update:category', 'update:sort', 'clear'])
</script>

<template>
  <form class="filter-bar" role="search" aria-label="Filter news articles" @submit.prevent>
    <div class="filter-row">
      <div class="search-wrap filter-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <label class="visually-hidden" for="news-search">Search articles by title or description</label>
        <input
          id="news-search"
          class="control"
          type="search"
          name="q"
          placeholder="Search articles, topics, keywords…"
          autocomplete="off"
          :value="query"
          @input="emit('update:query', $event.target.value)"
        />
      </div>

      <div class="filter-group">
        <label class="visually-hidden" for="news-category">Filter by category</label>
        <select id="news-category" class="control" :value="category" @change="emit('update:category', $event.target.value)">
          <option value="">All categories</option>
          <option v-for="cat in categories" :key="cat.slug" :value="cat.name">{{ cat.name }}</option>
        </select>

        <label class="visually-hidden" for="news-sort">Sort articles</label>
        <select id="news-sort" class="control" :value="sort" @change="emit('update:sort', $event.target.value)">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <button type="button" class="btn btn-outline btn-sm clear-btn" :disabled="!query && !category && sort === 'newest'" @click="emit('clear')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        Clear filters
      </button>
    </div>

    <p class="filter-count" aria-live="polite">
      Showing <strong>{{ resultCount }}</strong> of {{ totalCount }} articles
      <template v-if="category"> in <strong>{{ category }}</strong></template>
      <template v-if="query"> matching “<strong>{{ query }}</strong>”</template>
    </p>
  </form>
</template>

<style scoped>
.filter-bar {
  background: var(--paper); border: 1px solid var(--line);
  border-radius: var(--radius); padding: 1rem 1.1rem;
  box-shadow: var(--shadow-sm);
  display: flex; flex-direction: column; gap: 0.6rem;
}
.filter-row { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.filter-search { flex: 1 1 320px; }
.filter-group { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.filter-group select { width: auto; min-width: 180px; }
.clear-btn { flex: none; }
.filter-count { font-size: 0.85rem; color: var(--muted); padding-inline: 0.15rem; }
@media (max-width: 640px) {
  .filter-group { width: 100%; }
  .filter-group select { flex: 1; min-width: 0; width: 100%; }
  .clear-btn { width: 100%; justify-content: center; }
}
</style>
