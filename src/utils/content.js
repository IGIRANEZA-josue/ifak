// Shared helpers for content rendering.
import categories from '../data/categories.json'
import news from '../data/news.json'
import events from '../data/events.json'
import announcements from '../data/announcements.json'

/** Prefix a public/ asset path with the configured base URL. Absolute URLs pass through unchanged. */
export function asset(path) {
  if (/^https?:\/\//.test(String(path))) return String(path)
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '')
}

/** "2026-02-13" -> "13 February 2026" */
export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Short label parts for calendar/date badges */
export function dateBadge(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long' })
  }
}

const colorByName = new Map(categories.map((c) => [c.name, c.color]))

const ANNOUNCEMENT_COLORS = {
  Admissions: '#1e5aa8',
  Academic: '#1e5aa8',
  Examinations: '#4338ca',
  'School Calendar Updates': '#c2410c',
  Competitions: '#6d28d9',
  'General Notices': '#475569'
}

export function categoryColor(name) {
  return colorByName.get(name) || ANNOUNCEMENT_COLORS[name] || '#475569'
}

/** Inline style for a category pill (tinted translucent background). */
export function pillStyle(name) {
  const color = categoryColor(name)
  return {
    '--pill-color': color,
    '--pill-bg': `${color}14`,
    '--pill-border': `${color}33`
  }
}

export function readingTime(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 210))
}

export function splitParagraphs(content = '') {
  return String(content)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function sortedByDateDesc(items) {
  return [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export function allNews() {
  return sortedByDateDesc(news)
}

export function findNewsBySlug(slug) {
  return news.find((a) => a.slug === slug) || null
}

export function findEventBySlug(slug) {
  return events.find((e) => e.slug === slug) || null
}

export function allEventsSorted() {
  return [...events].sort((a, b) => String(a.date).localeCompare(String(b.date)))
}

export function splitEventsByDate() {
  const todayIso = toISODate(new Date())
  const sorted = allEventsSorted()
  return {
    upcoming: sorted.filter((e) => e.date >= todayIso),
    past: sorted.filter((e) => e.date < todayIso).reverse()
  }
}

export function allAnnouncements() {
  return sortedByDateDesc(announcements)
}

export function toISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function buildShareLinks({ title, url }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  return {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodedUrl}`
  }
}
