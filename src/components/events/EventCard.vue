<script setup>
import { formatDate, dateBadge, pillStyle } from '../../utils/content'
import SmartImage from '../SmartImage.vue'

defineProps({
  event: { type: Object, required: true },
  past: { type: Boolean, default: false }
})
</script>

<template>
  <article class="card card-hover event-card" :class="{ past }">
    <router-link class="event-media" :to="`/events/${event.slug}`" :aria-label="`Event details: ${event.title}`" tabindex="-1">
      <SmartImage :src="event.image" :fallback="event.imageFallback" :alt="event.imageAlt || event.title" width="520" height="390" />
      <div class="event-badge" aria-hidden="true">
        <span class="event-badge-day">{{ dateBadge(event.date).day }}</span>
        <span class="event-badge-month">{{ dateBadge(event.date).month }} {{ dateBadge(event.date).year }}</span>
      </div>
    </router-link>

    <div class="event-body">
      <div class="event-topline">
        <span class="pill" :style="pillStyle(event.category)">{{ event.category }}</span>
        <span v-if="event.indicative" class="indicative-tag" title="Date is indicative — confirm with the school office">Indicative date</span>
      </div>
      <h3 class="card-title">
        <router-link :to="`/events/${event.slug}`">{{ event.title }}</router-link>
      </h3>
      <ul class="event-meta">
        <li v-if="event.time">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          {{ event.time }} · {{ formatDate(event.date) }}
        </li>
        <li>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
          <span>{{ event.location }}</span>
        </li>
      </ul>
      <p class="card-desc">{{ event.description }}</p>
      <router-link class="read-more" :to="`/events/${event.slug}`">
        View details
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.event-card {
  display: grid; grid-template-columns: 210px 1fr;
  overflow: hidden;
}
.event-media { position: relative; display: block; overflow: hidden; min-height: 190px; }
.event-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.past .event-media img { filter: grayscale(55%); opacity: 0.9; }
.event-badge {
  position: absolute; left: 0.75rem; bottom: 0.75rem;
  background: var(--navy-900); border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-sm); padding: 0.35rem 0.65rem; text-align: center;
  box-shadow: var(--shadow-md);
}
.event-badge-day { display: block; font-family: var(--font-display); font-size: 1.45rem; font-weight: 700; color: var(--gold-light); line-height: 1; }
.event-badge-month { display: block; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em; color: rgba(244,241,232,0.85); margin-top: 0.2rem; }
.event-body { padding: 1rem 1.15rem 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; }
.event-topline { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.indicative-tag {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: #7c2d12; background: #fde8d0; border: 1px solid #f5c9a3;
  border-radius: 999px; padding: 0.2rem 0.55rem;
}
.event-meta { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; color: var(--muted); }
.event-meta li { display: flex; align-items: flex-start; gap: 0.45rem; }
.event-meta svg { flex: none; margin-top: 0.12rem; }
@media (max-width: 700px) {
  .event-card { grid-template-columns: 1fr; }
  .event-media { min-height: 180px; aspect-ratio: 16/9; }
}
</style>
