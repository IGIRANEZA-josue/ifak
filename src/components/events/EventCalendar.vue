<script setup>
import { computed, ref } from 'vue'
import { toISODate, formatDate, dateBadge } from '../../utils/content'

const props = defineProps({
  events: { type: Array, required: true }
})

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const now = new Date()
const todayIso = toISODate(now)

const viewYear = ref(now.getFullYear())
const viewMonth = ref(now.getMonth()) // 0-based
const selectedIso = ref(todayIso)
const gridRef = ref(null)
const liveMessage = ref('')

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
)

const eventsByDate = computed(() => {
  const map = new Map()
  for (const event of props.events) {
    if (!map.has(event.date)) map.set(event.date, [])
    map.get(event.date).push(event)
  }
  return map
})

const cells = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const offset = (first.getDay() + 6) % 7 // weeks start on Monday
  const start = new Date(viewYear.value, viewMonth.value, 1 - offset)
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const total = Math.ceil((offset + daysInMonth) / 7) * 7
  const out = []
  for (let i = 0; i < total; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const iso = toISODate(d)
    out.push({
      iso,
      day: d.getDate(),
      inMonth: d.getMonth() === viewMonth.value,
      isToday: iso === todayIso,
      count: eventsByDate.value.get(iso)?.length || 0
    })
  }
  return out
})

const selectedEvents = computed(() => eventsByDate.value.get(selectedIso.value) || [])
const selectedBadge = computed(() => formatDate(selectedIso.value))

function prevMonth() {
  const d = new Date(viewYear.value, viewMonth.value - 1, 1)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
  liveMessage.value = `Showing ${monthLabel.value}`
}
function nextMonth() {
  const d = new Date(viewYear.value, viewMonth.value + 1, 1)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
  liveMessage.value = `Showing ${monthLabel.value}`
}
function goToday() {
  viewYear.value = now.getFullYear()
  viewMonth.value = now.getMonth()
  selectedIso.value = todayIso
  liveMessage.value = `Jumped to today, ${formatDate(todayIso)}`
}
function select(cell) {
  selectedIso.value = cell.iso
  liveMessage.value = cell.count
    ? `${formatDate(cell.iso)}: ${cell.count} event${cell.count > 1 ? 's' : ''}`
    : `${formatDate(cell.iso)}: no events`
}

function focusCell(index) {
  const buttons = gridRef.value?.querySelectorAll('[data-day-cell]')
  buttons?.[index]?.focus()
}

function onGridKeydown(event, index) {
  let target = null
  switch (event.key) {
    case 'ArrowRight': target = index + 1; break
    case 'ArrowLeft': target = index - 1; break
    case 'ArrowDown': target = index + 7; break
    case 'ArrowUp': target = index - 7; break
    case 'Home': target = index - (index % 7); break
    case 'End': target = index - (index % 7) + 6; break
    case 'PageUp': event.preventDefault(); prevMonth(); return
    case 'PageDown': event.preventDefault(); nextMonth(); return
    default: return
  }
  event.preventDefault()
  if (target !== null && target >= 0 && target < cells.value.length) focusCell(target)
}
</script>

<template>
  <div class="calendar-wrap">
    <p class="visually-hidden" aria-live="polite">{{ liveMessage }}</p>

    <!-- Month view -->
    <div class="calendar-card" role="application" aria-label="School events calendar">
      <div class="calendar-header">
        <button type="button" class="cal-nav" aria-label="Previous month" @click="prevMonth">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 class="calendar-month" aria-live="polite">{{ monthLabel }}</h3>
        <button type="button" class="cal-nav" aria-label="Next month" @click="nextMonth">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button type="button" class="cal-today" @click="goToday">Today</button>
      </div>

      <div class="calendar-weekdays" aria-hidden="true">
        <span v-for="d in WEEKDAYS" :key="d">{{ d }}</span>
      </div>

      <div ref="gridRef" class="calendar-grid" role="grid" :aria-label="`Days of ${monthLabel}`">
        <button
          v-for="(cell, index) in cells"
          :key="cell.iso"
          data-day-cell
          type="button"
          role="gridcell"
          class="cal-day"
          :class="{
            outside: !cell.inMonth,
            today: cell.isToday,
            'has-events': cell.count > 0,
            selected: cell.iso === selectedIso
          }"
          :aria-selected="cell.iso === selectedIso ? 'true' : 'false'"
          :aria-label="`${formatDate(cell.iso)}${cell.count ? `, ${cell.count} event${cell.count > 1 ? 's' : ''}` : ', no events'}`"
          @click="select(cell)"
          @keydown="onGridKeydown($event, index)"
        >
          <span class="cal-day-num">{{ cell.day }}</span>
          <span v-if="cell.count" class="cal-dots" aria-hidden="true">
            <span v-for="n in Math.min(cell.count, 3)" :key="n" class="cal-dot"></span>
          </span>
        </button>
      </div>

      <p class="calendar-legend"><span class="cal-dot legend-dot" aria-hidden="true"></span> Day with scheduled event(s)</p>
    </div>

    <!-- Selected day details -->
    <div class="day-panel" aria-live="polite">
      <p class="day-panel-eyebrow">{{ dateBadge(selectedIso).weekday }}</p>
      <h3 class="day-panel-date">{{ selectedBadge }}</h3>

      <div v-if="selectedEvents.length" class="day-events">
        <router-link
          v-for="event in selectedEvents"
          :key="event.slug"
          class="day-event"
          :to="`/events/${event.slug}`"
        >
          <span class="day-event-time">{{ event.time || '—' }}</span>
          <span class="day-event-info">
            <span class="day-event-title">{{ event.title }}</span>
            <span class="day-event-location">{{ event.location }}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </router-link>
      </div>
      <div v-else class="day-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <p><strong>No events on this day.</strong></p>
        <p>Highlighted days have school events — select one to see details.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrap {
  display: grid;
  grid-template-columns: minmax(340px, 5fr) minmax(300px, 4fr);
  gap: 1.5rem;
  align-items: start;
}

.calendar-card {
  background: var(--bg); border: 1px solid var(--line);
  border-radius: var(--radius); box-shadow: var(--shadow-sm);
  padding: 1.15rem 1.15rem 1rem;
}
.calendar-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.calendar-month { flex: 1; text-align: center; font-size: 1.15rem; }
.cal-nav {
  width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--line-strong); background: var(--card); border-radius: var(--radius-sm);
  cursor: pointer; color: var(--accent); transition: background var(--transition);
}
.cal-nav:hover { background: var(--navy-soft); }
.cal-today {
  border: 1px solid var(--line-strong); background: var(--card); color: var(--accent);
  font-size: 0.8rem; font-weight: 600; border-radius: var(--radius-sm); padding: 0.45rem 0.85rem; cursor: pointer;
}
.cal-today:hover { background: var(--surface); border-color: var(--accent); }

.calendar-weekdays {
  display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
  color: var(--muted); text-align: center; padding-block: 0.35rem;
  border-bottom: 1px solid var(--line);
}
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 0.5rem; }

.cal-day {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; aspect-ratio: 1 / 1; border: 1px solid transparent; border-radius: 12px;
  background: transparent; cursor: pointer; color: var(--ink);
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}
.cal-day:hover { background: var(--navy-soft); }
.cal-day.outside { color: #b6c0ca; }
.cal-day.has-events { font-weight: 600; color: var(--accent); }
.cal-day.today { border: 1.5px solid var(--navy); }
.cal-day.selected { background: var(--navy); color: #fff; border-color: var(--accent); }
.cal-day-num { font-size: 0.92rem; line-height: 1; }
.cal-dots { display: flex; gap: 3px; height: 5px; }
.cal-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--navy); }
.cal-day.selected .cal-dot { background: #fff; }
.calendar-legend {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.75rem; color: var(--muted); margin-top: 0.75rem; padding-top: 0.6rem;
  border-top: 1px solid var(--line);
}
.legend-dot { display: inline-block; width: 8px; height: 8px; }

.day-panel {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.4rem; color: var(--ink);
  min-height: 280px; display: flex; flex-direction: column;
}
.day-panel-eyebrow { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.day-panel-date { color: var(--navy-ink); font-size: 1.4rem; font-weight: 650; margin: 0.3rem 0 1rem; }
.day-events { display: flex; flex-direction: column; gap: 0.65rem; }
.day-event {
  display: flex; align-items: center; gap: 0.85rem;
  background: var(--card); border: 1px solid var(--line);
  border-radius: var(--radius-sm); padding: 0.65rem 0.8rem;
  text-decoration: none; color: inherit; transition: border-color var(--transition);
}
.day-event:hover { border-color: var(--accent); }
.day-event-time {
  flex: none; font-weight: 650; color: var(--accent);
  min-width: 3.1rem; font-size: 0.9rem;
}
.day-event-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.day-event-title { color: var(--navy-ink); font-weight: 600; line-height: 1.35; }
.day-event-location { font-size: 0.78rem; color: var(--muted); }

.day-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; gap: 0.4rem; color: var(--muted); padding: 1.5rem 1rem;
  border: 1px dashed var(--line-strong); border-radius: var(--radius-sm);
}
.day-empty p { font-size: 0.9rem; }
.day-empty svg { color: var(--line-strong); margin-bottom: 0.25rem; }

@media (max-width: 940px) {
  .calendar-wrap { grid-template-columns: 1fr; }
}
</style>
