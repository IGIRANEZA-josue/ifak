<script setup>
import { computed } from 'vue'
import { allEventsSorted, splitEventsByDate } from '../utils/content'
import PageHero from '../components/PageHero.vue'
import UpcomingEvents from '../components/events/UpcomingEvents.vue'
import PastEvents from '../components/events/PastEvents.vue'
import EventCalendar from '../components/events/EventCalendar.vue'

const events = allEventsSorted()
const split = computed(() => splitEventsByDate())
const upcoming = computed(() => split.value.upcoming)
const past = computed(() => split.value.past)
</script>

<template>
  <PageHero
    title="Events at IFAK"
    subtitle="Celebrations, feasts, commemorations and school activities — browse what is coming up, explore the calendar, and look back at moments from the life of the school."
    :crumbs="[{ label: 'Events' }]"
  />

  <section class="section events-page">
    <div class="container">
      <div class="notice notice-block" role="note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 12v4"/></svg>
        <span>
          <strong>Please note:</strong> dates marked <em>“indicative”</em> reflect recurring school and parish celebrations
          for the 2026–2027 year. The official academic calendar is confirmed each term by the school office —
          call <a href="tel:+250787949474">+250 787 949 474</a> or write to <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a> to verify.
        </span>
      </div>

      <!-- Upcoming -->
      <div class="events-section-head">
        <h2 id="upcoming-heading">Upcoming events <span class="count-badge">{{ upcoming.length }}</span></h2>
        <p class="section-sub">What is coming up in the life of the Don Bosco Kimihurura community.</p>
      </div>
      <UpcomingEvents v-if="upcoming.length" :events="upcoming" />
      <p v-else class="muted-note">No upcoming events are listed yet. Please check back soon or contact the school office.</p>

      <!-- Calendar -->
      <div class="events-section-head calendar-head">
        <h2 id="calendar-heading">School calendar</h2>
        <p class="section-sub">Navigate the months, select a highlighted day, and see what is scheduled. Full keyboard support: arrows to move, Page Up / Page Down to change month.</p>
      </div>
      <EventCalendar :events="events" aria-labelledby="calendar-heading" />

      <!-- Past -->
      <div class="events-section-head past-head">
        <h2 id="past-heading">Past events <span class="count-badge count-muted">{{ past.length }}</span></h2>
        <p class="section-sub">Moments from the life of IFAK — select any event to read the full story.</p>
      </div>
      <PastEvents v-if="past.length" :events="past" />
      <p v-else class="muted-note">No past events recorded yet.</p>
    </div>
  </section>
</template>

<style scoped>
.events-page { background: var(--bg); }
.notice-block { margin-bottom: 2rem; }
.notice-block a { color: inherit; font-weight: 600; }
.events-section-head { margin-top: 2.25rem; margin-bottom: 1.1rem; }
.events-section-head h2 { font-size: clamp(1.35rem, 2.6vw, 1.8rem); display: flex; align-items: center; gap: 0.7rem; }
.calendar-head { margin-top: 2.75rem; }
.past-head { margin-top: 2.75rem; }
.section-sub { color: var(--muted); margin-top: 0.3rem; max-width: 70ch; }
.count-badge {
  font-size: 0.72rem; font-weight: 600;
  background: var(--navy-soft); color: var(--accent); border-radius: 4px;
  padding: 0.15rem 0.55rem; text-align: center; border: 1px solid var(--line-strong);
}
.count-muted { background: var(--navy-soft); color: var(--accent); }
.muted-note { color: var(--muted); padding: 1rem 0; }
</style>
