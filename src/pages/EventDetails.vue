<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate, dateBadge, splitParagraphs, findEventBySlug, buildShareLinks, allEventsSorted } from '../utils/content'
import EventCard from '../components/events/EventCard.vue'
import SmartImage from '../components/SmartImage.vue'

const route = useRoute()
const event = computed(() => findEventBySlug(String(route.params.slug)))

const paragraphs = computed(() => splitParagraphs(event.value?.content || ''))
const isPast = computed(() => event.value && event.value.date < new Date().toISOString().slice(0, 10))

const shareLinks = computed(() => {
  if (!event.value) return {}
  const url = typeof window !== 'undefined' ? window.location.href : `https://ifakdonbosco.ac.rw/events/${event.value.slug}`
  return buildShareLinks({ title: event.value.title, url })
})

function toGoogleDate(iso, time, addHours) {
  const [h, m] = (time || '09:00').split(':').map(Number)
  const d = new Date(`${iso}T00:00:00`)
  d.setHours((h || 0) + addHours, m || 0, 0, 0)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

const googleCalendarUrl = computed(() => {
  const e = event.value
  if (!e) return '#'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${toGoogleDate(e.date, e.time, 0)}/${toGoogleDate(e.date, e.time, 2)}`,
    details: e.description,
    location: e.location
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
})

const related = computed(() => {
  const current = event.value
  if (!current) return []
  const others = allEventsSorted().filter((e) => e.slug !== current.slug)
  const sameCategory = others.filter((e) => e.category === current.category)
  const byDistance = [...others].sort((a, b) =>
    Math.abs(new Date(a.date) - new Date(current.date)) - Math.abs(new Date(b.date) - new Date(current.date))
  )
  const merged = [...sameCategory]
  for (const e of byDistance) if (!merged.includes(e)) merged.push(e)
  return merged.slice(0, 3)
})

watch(event, (e) => {
  if (typeof document !== 'undefined') {
    document.title = e ? `${e.title} | IFAK Events` : 'Event not found | IFAK Events'
  }
}, { immediate: true })
</script>

<template>
  <section v-if="!event" class="section">
    <div class="container narrow empty-state" role="alert">
      <h1>Event not found</h1>
      <p>We couldn’t find the event “{{ route.params.slug }}”. It may have been moved or unpublished.</p>
      <router-link class="btn btn-primary" to="/events">Back to all events</router-link>
    </div>
  </section>

  <template v-else>
    <article class="event-detail">
      <div class="container event-container">
        <!-- Breadcrumb -->
        <nav class="article-crumbs" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link><span aria-hidden="true">›</span>
          <router-link to="/events">Events</router-link><span aria-hidden="true">›</span>
          <span aria-current="page" class="crumb-current">{{ event.category }}</span>
        </nav>

        <!-- Header -->
        <header class="event-header">
          <div class="event-meta-row">
            <span class="pill">{{ event.category }}</span>
            <span v-if="event.indicative" class="indicative-tag">Indicative date — confirm with the school office</span>
            <span v-if="isPast" class="past-tag">Past event</span>
          </div>
          <h1 class="event-title">{{ event.title }}</h1>
        </header>
      </div>

      <div class="container event-container">
        <SmartImage
          class="event-cover"
          :src="event.image"
          :fallback="event.imageFallback"
          :alt="event.imageAlt || event.title"
          width="1600" height="900"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div class="container event-detail-body">
        <aside class="event-facts" aria-label="Event details">
          <h2 class="facts-heading">When &amp; where</h2>
          <ul>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span><strong>{{ formatDate(event.date) }}</strong><br />{{ dateBadge(event.date).weekday }}</span>
            </li>
            <li v-if="event.time">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <span><strong>{{ event.time }}</strong><br />Local time (CAT)</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
              <span>{{ event.location }}</span>
            </li>
          </ul>

          <a class="btn btn-primary btn-block" :href="googleCalendarUrl" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M12 12v4M10 14h4"/></svg>
            Add to Google Calendar
          </a>

          <router-link v-if="event.newsSlug" class="related-story-link" :to="`/news/${event.newsSlug}`">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
            Read the full story in News
          </router-link>

          <div class="share-block">
            <span class="share-label">Share this event</span>
            <div class="share-buttons">
              <a :href="shareLinks.x" target="_blank" rel="noopener noreferrer" aria-label="Share on X" class="share-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h3.6l5.1 6.9L18.4 4H20l-6.5 8.1L20.5 20H17l-5.3-7L6 20H4l6.8-8.4L4 4z"/></svg>
              </a>
              <a :href="shareLinks.facebook" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" class="share-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
              </a>
              <a :href="shareLinks.whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" class="share-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.2zm4.5-6c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.13-.56.13-.17.25-.65.8-.8.97-.14.16-.29.18-.54.06a6.6 6.6 0 0 1-3.3-2.9c-.25-.43.25-.4.72-1.34.08-.17.04-.32-.02-.45-.07-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.77 2.7 4.3 3.79 1.6.7 2.26.75 3.08.63.5-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29z"/></svg>
              </a>
              <a :href="shareLinks.email" aria-label="Share by email" class="share-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              </a>
            </div>
          </div>
        </aside>

        <div class="event-article">
          <p class="event-lede">{{ event.description }}</p>
          <div class="prose">
            <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
          </div>

          <div v-if="event.tags?.length" class="tag-row">
            <span v-for="tag in event.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>

          <router-link class="btn btn-outline back-events" to="/events">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            All events
          </router-link>
        </div>
      </div>

      <!-- Related events -->
      <div v-if="related.length" class="container related-events">
        <h2 class="related-heading">You may also be interested in</h2>
        <div class="related-grid">
          <EventCard v-for="rel in related" :key="rel.slug" :event="rel" :past="rel.date < new Date().toISOString().slice(0, 10)" />
        </div>
      </div>
    </article>
  </template>
</template>

<style scoped>
.narrow { max-width: 720px; margin-inline: auto; }
.event-detail { background: var(--bg); padding-bottom: 3rem; }
.event-container { max-width: 1020px; }

.article-crumbs {
  display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;
  font-size: 0.83rem; color: var(--muted); padding-top: 1.4rem;
}
.article-crumbs a { color: var(--accent); text-decoration: none; font-weight: 550; }
.article-crumbs a:hover { text-decoration: underline; }
.crumb-current { color: var(--muted); }

.event-header { padding-block: 0.9rem 1.1rem; display: flex; flex-direction: column; gap: 0.6rem; }
.event-meta-row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.indicative-tag {
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em;
  color: var(--amber-text); background: var(--amber-bg); border: 1px solid var(--amber-border);
  border-radius: 4px; padding: 0.18rem 0.45rem;
}
.past-tag {
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--muted); border: 1px solid var(--line-strong); border-radius: 4px; padding: 0.18rem 0.45rem;
}
.event-title { font-size: clamp(1.5rem, 3.4vw, 2.1rem); line-height: 1.22; font-weight: 650; max-width: 34ch; }

.event-cover {
  width: 100%; aspect-ratio: 16 / 8; object-fit: cover;
  border-radius: var(--radius); border: 1px solid var(--line);
  background: var(--surface-2);
}

.event-detail-body {
  display: grid; grid-template-columns: 360px 1fr; gap: 1.75rem;
  padding-block: 1.5rem 0; align-items: start;
}

.event-facts {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 1.25rem; display: flex; flex-direction: column; gap: 0.9rem;
  position: sticky; top: 96px;
}
.facts-heading { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.event-facts ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.event-facts li { display: flex; gap: 0.65rem; align-items: flex-start; font-size: 0.9rem; line-height: 1.5; }
.event-facts li svg { flex: none; color: var(--accent); margin-top: 0.12rem; }
.related-story-link {
  display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; font-weight: 550;
  color: var(--accent); text-decoration: none; border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; background: var(--card);
}
.related-story-link:hover { border-color: var(--accent); }

.share-block { border-top: 1px solid var(--line-strong); padding-top: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem; }
.share-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.share-buttons { display: flex; gap: 0.4rem; }
.share-btn {
  width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm); border: 1px solid var(--line-strong); background: var(--card); color: var(--accent);
  text-decoration: none; transition: background var(--transition), border-color var(--transition);
}
.share-btn:hover { background: var(--navy); color: #fff; border-color: var(--accent); }

.event-lede {
  font-size: 1.08rem; line-height: 1.6; color: var(--navy-ink); font-weight: 550;
  margin-bottom: 1.15rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line);
}
.tag-row { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-top: 1.4rem; }
.tag { font-size: 0.8rem; color: var(--ink); background: var(--surface); border: 1px solid var(--line); border-radius: 4px; padding: 0.25rem 0.6rem; }
.back-events { margin-top: 1.4rem; }

.related-events { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.related-heading { font-size: 1.15rem; font-weight: 650; margin-bottom: 0.9rem; }
.related-grid { display: grid; gap: 0.9rem; }

@media (max-width: 980px) {
  .event-detail-body { grid-template-columns: 1fr; }
  .event-facts { position: static; order: 2; }
  .event-article { order: 1; }
}
</style>
