# IFAK — Institut de Formation Apostolique de Kimihurura

Official website of **IFAK (Don Bosco Kimihurura)** — a private Catholic secondary school of the
Salesians of Don Bosco located at Kimihurura sector, Gasabo District, Kigali, Rwanda.

This repository contains the complete **News, Announcements & Events system** as a fully static
website: no backend, no database, no admin dashboard. All content lives in JSON files in `src/data/`
and is rendered by Vue 3 at build time / in the browser.

## Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5**
- **Vue Router 4** (HTML5 history mode)
- **Custom CSS** (design system in `src/style.css` — no CSS frameworks)
- **JSON** files for all content (`src/data/`)

## Quick start

```bash
npm install
npm run dev        # local dev server on 0.0.0.0:5173
npm run build      # production build → dist/ (also creates dist/404.html)
npm run preview    # serve the production build on 0.0.0.0:4173
npm run test:ssr   # server-render smoke tests of every route (see below)
```

Requires Node.js 18+ (tested on Node 22).

## How content management works (the important part)

The site is static. To publish or change content you edit JSON files, add an image, rebuild and redeploy.
There is nothing else to maintain.

### 1. Add a news article

1. Add the cover photo to `public/images/news/` (e.g. `my-story.jpg`) — or point `"image"` at the
   official IFAK website's photo URL and keep a local copy in `"imageFallback"` (see below).
2. Add a record to `src/data/news.json`:

```json
{
  "id": 7,
  "slug": "my-story",
  "title": "My Story",
  "category": "Academic News",
  "date": "2026-11-20",
  "author": "IFAK Communications",
  "image": "/images/news/my-story.jpg",
  "imageFallback": "/images/news/my-story.jpg",
  "imageAlt": "Descriptive alt text for the photo",
  "featured": false,
  "description": "One-sentence summary shown on cards and at the top of the article.",
  "content": "Full article text.\n\nUse blank lines between paragraphs.",
  "tags": ["Tag1", "Tag2"],
  "source": "Where this story comes from (optional)"
}
```

Notes:
- **Images**: `image` may be either a local path (e.g. `/images/news/my-story.jpg`) or an absolute
  URL (e.g. the official site's `https://ifakdonbosco.ac.rw/wp-content/uploads/...`). Absolute URLs are
  rendered as-is; if they ever fail to load, the browser automatically swaps in the local
  `imageFallback`. Current records hotlink the school's real event photos from its official site with
  local fallbacks for offline resilience.
- `slug` becomes the URL: `/news/my-story`. Keep it lowercase-hyphenated and unique.
- `category` must match one of the 10 categories in `src/data/categories.json` exactly.
- `date` must be `YYYY-MM-DD`.
- Set `"featured": true` on exactly **one** article to make it the large banner on `/news`.
- Paragraphs in `content` are separated by a blank line (`\n\n`).

### 2. Add an event

1. Add the photo to `public/images/events/`.
2. Add a record to `src/data/events.json`:

```json
{
  "id": 7,
  "slug": "sports-day-2027",
  "title": "Annual Sports Day",
  "date": "2027-04-17",
  "time": "09:00",
  "location": "IFAK Don Bosco Kimihurura",
  "image": "/images/events/sports-day.jpg",
  "imageAlt": "Students competing at the annual sports day",
  "category": "Sports",
  "description": "Short summary for the event card.",
  "content": "Full event details.\n\nMultiple paragraphs are fine.",
  "indicative": true,
  "tags": ["Sports"]
}
```

- Past/upcoming is computed automatically from `date` vs today’s date.
- `"indicative": true` shows a small amber “Indicative date” badge and the notice on the Events page.
  Use it for dates that are not yet officially confirmed by the school office. Use `false` (or omit) for confirmed events.
- `"newsSlug": "some-news-slug"` optionally links the event to a full news story (renders “Read the full story”).
- Events appear on the interactive calendar automatically on their `date`.

### 3. Add an announcement

1. (Optional) Add a downloadable file to `public/attachments/` (e.g. `circular.pdf`).
2. Add a record to `src/data/announcements.json`:

```json
{
  "id": 6,
  "slug": "circular-exams-2027",
  "title": "National Examination Timetable Published",
  "date": "2026-11-20",
  "category": "Examinations",
  "description": "One-line summary.",
  "content": "Full notice text.\n\nSeparate paragraphs with blank lines.",
  "attachment": { "file": "/attachments/circular.pdf", "label": "Examination timetable (PDF)" },
  "relatedSlug": "weekly-tests-national-examinations",
  "indicative": false
}
```

- `category` must be one of: `Admissions`, `Academic`, `Examinations`, `School Calendar Updates`, `Competitions`, `General Notices`.
- `attachment` may be `null`. Only link files that actually exist in `public/attachments/`.
- `relatedSlug` optionally links to a news article (“Read the related story”).

### 4. Categories

`src/data/categories.json` holds the 10 news categories (name, slug, colour, description).
Add or recolour categories there — the news filter, pills and badges all read from it.

### 5. Rebuild & redeploy

```bash
npm run build   # → dist/
```

Deploy `dist/` to any static host.

#### Netlify
- Build command: `npm run build` · Publish directory: `dist`
- SPA fallback is already included (`public/_redirects` → `/* /index.html 200`)

#### GitHub Pages (custom domain, e.g. ifakdonbosco.ac.rw)
- Build with the default `base: '/'`, publish `dist/`
- `dist/404.html` is generated automatically (`postbuild`) so deep links work

#### GitHub Pages (project site, username.github.io/ifak/)
```bash
VITE_BASE=/ifak/ npm run build
```

## Project structure

```
src/
  components/
    Crest.vue                 # inline SVG school crest
    SiteNav.vue               # top utility bar + sticky nav + mobile panel
    SiteFooter.vue            # contact, links, socials (id="contact")
    PageHero.vue              # navy page-header band with breadcrumb
    news/
      FeaturedNews.vue        # large featured article banner
      NewsCard.vue            # reusable article card
      NewsFilter.vue          # search + category + sort + clear + result count
      RelatedNews.vue         # “Continue reading” (same category first)
    events/
      EventCard.vue           # event card with date badge
      EventCalendar.vue       # interactive month calendar (keyboard accessible)
      UpcomingEvents.vue      # upcoming list
      PastEvents.vue          # past list
    announcements/
      AnnouncementCard.vue    # expandable notice with PDF attachment support
  pages/
    Home.vue  News.vue  NewsDetails.vue  Events.vue  EventDetails.vue  Announcements.vue  NotFound.vue
  data/
    news.json  events.json  announcements.json  categories.json
  utils/
    content.js                # formatting, filtering, sharing helpers
  router/index.js
  style.css                   # design system (CSS variables, buttons, cards, prose…)
public/
  images/news/  images/events/   attachments/   favicon.svg  _redirects  sitemap.xml  robots.txt
scripts/
  postbuild.js                # dist/index.html → dist/404.html (GitHub Pages)
  make_admissions_pdf.py      # regenerates the admissions PDF attachment
  ssr-smoke.mjs               # SSR render checks for every route (npm run test:ssr)
```

## Testing

```bash
npm run build && npm run preview   # manual check on :4173
npm run test:ssr                   # renders every route and asserts expected content
```

The SSR smoke test (`scripts/ssr-smoke.mjs`) server-renders all routes — articles, events,
announcements, the calendar grid, 404s — and fails if any expected content is missing.

## Content sources & honesty notes

- Seeded articles are **adapted from the official IFAK website** (ifakdonbosco.ac.rw) and credited to
  their original authors. The parish/ADMA article was expanded with the full official report (Bishop
  Casimir Uwumukiza’s Mass, 25 first professions, Fr. Gabriel Ngendakuriyo presiding).
- **Photos of real events are hotlinked from the official IFAK website** (the school’s own images),
  e.g. the 62nd anniversary celebration, Kwibuka31, the Money Makeover Challenge, the ADMA vows Mass
  and Dean Mwizerwa’s examination preparation. Every hotlinked image has a **local generated
  fallback** in `public/images/` (wired via `SmartImage.vue` + the `imageFallback` field) so the site
  still renders if the official site is unreachable.
- The **homepage hero** and **About section** use real official-site photographs
  (`DSC_0206.jpg` campus; `Barore-4.jpg` alumni anniversary gathering) with local fallbacks.
- The **Christmas Celebration 2026** event has no real photo available; it uses an AI-generated
  illustrative image and is marked *indicative*.
- The navigation and footer display the **official IFAK logo** from the school’s site, with the
  inline-SVG crest as automatic fallback.
- Events marked *“indicative”* describe recurring school and parish celebrations and **must be
  confirmed with the school office** before being treated as official.
- If you prefer fully self-hosted images, copy the referenced files into `public/images/` and point
  the `image` fields at the local copies, then rebuild.

Contact for content updates: IFAK school office — info@ifakdonbosco.ac.rw · +250 787 949 474.
