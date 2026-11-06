<script setup>
import { computed } from 'vue'
import { allNews, splitEventsByDate, allAnnouncements } from '../utils/content'
import NewsCard from '../components/news/NewsCard.vue'
import EventCard from '../components/events/EventCard.vue'
import SmartImage from '../components/SmartImage.vue'

const latestNews = computed(() => allNews().slice(0, 3))
const upcoming = computed(() => splitEventsByDate().upcoming.slice(0, 2))
const latestAnnouncements = computed(() => allAnnouncements().slice(0, 3))

const pillars = [
  {
    title: 'Faith and formation',
    text: 'Daily prayer, Mass and accompaniment in the Salesian tradition. Students grow in faith as part of ordinary school life.',
    icon: '<path d="M12 2v6"/><path d="M9 5h6"/><path d="M7 22v-7a5 5 0 0 1 10 0v7"/><path d="M4 22h16"/>'
  },
  {
    title: 'Education',
    text: 'Ordinary and Advanced Level programmes, five A-Level combinations, and a culture of high expectations and discipline.',
    icon: '<path d="m22 9-10-5L2 9l10 5 10-5z"/><path d="M6 11.5V16c0 1.5 3 3.5 6 3.5s6-2 6-3.5v-4.5"/><path d="M22 9v6"/>'
  },
  {
    title: 'Community',
    text: 'Don Bosco’s preventive system: presence, reason and kindness. Every student is known, accompanied and cared for.',
    icon: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3.6 2.8-5.5 5.5-5.5s4.9 1.9 5.5 5.5"/><circle cx="17" cy="9.5" r="2.6"/><path d="M15.5 14.7c2.8.2 4.2 2 4.7 5.3"/>'
  }
]
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">Salesians of Don Bosco · Kimihurura, Kigali</p>
        <h1 class="hero-title">Institut de Formation Apostolique de Kimihurura</h1>
        <p class="hero-lede">
          IFAK is a private Catholic secondary school in Kimihurura, Gasabo District, in the City of Kigali.
          The school has been educating and evangelizing young people since 1964.
        </p>
        <div class="hero-ctas">
          <router-link class="btn btn-primary" to="/news">Read the latest news</router-link>
          <router-link class="btn btn-outline" to="/announcements">School announcements</router-link>
        </div>
        <dl class="hero-facts">
          <div><dt>Founded</dt><dd>1964 · Golden jubilee 2015</dd></div>
          <div><dt>Levels</dt><dd>O-Level and A-Level</dd></div>
          <div><dt>A-Level</dt><dd>PCM · MCB · MCE · MEG · MPC</dd></div>
        </dl>
      </div>

      <figure class="hero-media">
        <SmartImage
          src="https://ifakdonbosco.ac.rw/wp-content/uploads/2022/09/DSC_0206.jpg"
          alt="IFAK Don Bosco Kimihurura campus"
          width="1400" height="788"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption class="hero-caption">IFAK Don Bosco Kimihurura, Kimihurura — Gasabo, Kigali.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ PILLARS ============ -->
  <section class="section pillars-section" aria-label="What characterises IFAK">
    <div class="container pillars-grid">
      <div v-for="pillar in pillars" :key="pillar.title" class="pillar">
        <svg class="pillar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="pillar.icon"></svg>
        <h2>{{ pillar.title }}</h2>
        <p>{{ pillar.text }}</p>
      </div>
    </div>
  </section>

  <!-- ============ LATEST NEWS ============ -->
  <section class="section news-preview" aria-labelledby="home-news-heading">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow">News</p>
          <h2 id="home-news-heading" class="section-title">Latest from the school</h2>
        </div>
        <router-link class="link-arrow" to="/news">All news
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      </div>
      <div class="grid-cards">
        <NewsCard v-for="article in latestNews" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>

  <!-- ============ UPCOMING EVENTS ============ -->
  <section class="section alt-section" aria-labelledby="home-events-heading">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow">Events</p>
          <h2 id="home-events-heading" class="section-title">Upcoming events</h2>
        </div>
        <router-link class="link-arrow" to="/events">Events &amp; calendar
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      </div>
      <div class="home-events-grid">
        <div class="home-events-list">
          <EventCard v-for="event in upcoming" :key="event.slug" :event="event" />
          <p v-if="!upcoming.length" class="muted-note">No upcoming events are listed yet. Please check the events page or contact the school office.</p>
        </div>
        <aside class="year-glance" aria-label="Key moments in the school year">
          <h3>Key moments in the school year</h3>
          <ul>
            <li><span>31 Jan</span>Feast of St John Bosco — Mass and celebration</li>
            <li><span>24 May</span>Feast of Mary Help of Christians — parish feast</li>
            <li><span>Nov</span>National examinations, Senior 3 and Senior 6</li>
          </ul>
          <p class="glance-note">Key dates are indicative. The official academic calendar is confirmed by the school office each term.</p>
          <router-link class="btn btn-primary btn-block" to="/events">Open the events calendar</router-link>
        </aside>
      </div>
    </div>
  </section>

  <!-- ============ ANNOUNCEMENTS PREVIEW ============ -->
  <section class="section" aria-labelledby="home-announcements-heading">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow">Notices</p>
          <h2 id="home-announcements-heading" class="section-title">Announcements</h2>
        </div>
        <router-link class="link-arrow" to="/announcements">All announcements
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      </div>
      <ul class="announce-preview">
        <li v-for="a in latestAnnouncements" :key="a.id">
          <router-link :to="{ path: '/announcements' }" class="announce-row">
            <span class="announce-row-date">{{ new Date(`${a.date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) }}</span>
            <span class="announce-row-title">{{ a.title }}</span>
            <span class="announce-row-cat">{{ a.category }}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </router-link>
        </li>
      </ul>
    </div>
  </section>

  <!-- ============ ABOUT / VISIT ============ -->
  <section class="section visit-section" aria-labelledby="home-visit-heading">
    <div class="container visit-grid">
      <div class="visit-copy">
        <p class="eyebrow">About the school</p>
        <h2 id="home-visit-heading" class="section-title">Over half a century of education and evangelisation</h2>
        <p>
          IFAK is a private Catholic secondary school located at Kimihurura sector, Gasabo District, in the
          City of Kigali, belonging to the Salesians of Don Bosco. Founded in 1964 and celebrant of its
          golden jubilee in 2015, it offers Ordinary Level and Advanced Level — with five A-Level
          combinations: PCM (Physics–Chemistry–Mathematics), MCB (Mathematics–Chemistry–Biology),
          MCE (Mathematics–Computer Science–Economics), MEG (Mathematics–Economics–Geography) and
          MPC (Mathematics–Physics–Computer Science).
        </p>
        <p>
          The school aims to give young people wide opportunities to develop knowledge, skills, positive
          attitudes and critical thinking, so they can be competitive in the labour market and contribute
          to the life of Rwanda.
        </p>
        <div class="visit-actions">
          <router-link class="btn btn-primary" to="/about">More about IFAK</router-link>
          <router-link class="btn btn-outline" to="/contact">Contact the school office</router-link>
        </div>
      </div>
      <figure class="visit-media">
        <SmartImage
          src="https://ifakdonbosco.ac.rw/wp-content/uploads/2026/03/Barore-4.jpg"
          alt="IFAK alumni gathered on campus during the anniversary celebrations"
          width="1100" height="750"
        />
        <figcaption class="visit-caption">Alumni gathered at IFAK Kimihurura during the 62nd anniversary celebrations, February 2026.</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Hero ---------- */
.hero { background: #fff; border-bottom: 1px solid var(--line); }
.hero-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(1.75rem, 4vw, 3.5rem); align-items: center;
  padding-block: clamp(2rem, 4.5vw, 3.25rem);
}
.hero-copy .eyebrow { margin-bottom: 0.6rem; }
.hero-title { font-size: clamp(1.75rem, 3.6vw, 2.35rem); line-height: 1.2; font-weight: 650; color: var(--navy-ink); }
.hero-lede { color: var(--muted); font-size: 1.02rem; line-height: 1.65; margin-top: 0.9rem; max-width: 52ch; }
.hero-ctas { display: flex; gap: 0.65rem; flex-wrap: wrap; margin-top: 1.4rem; }
.hero-facts {
  display: flex; gap: clamp(1.25rem, 3vw, 2.25rem); margin-top: 1.75rem; padding-top: 1.25rem;
  border-top: 1px solid var(--line); flex-wrap: wrap;
}
.hero-facts dt { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.hero-facts dd { font-size: 0.86rem; color: var(--navy-ink); font-weight: 550; margin-top: 0.25rem; }

.hero-media img {
  border-radius: var(--radius); border: 1px solid var(--line);
  aspect-ratio: 4 / 3; object-fit: cover; width: 100%;
}
.hero-caption { font-size: 0.78rem; color: var(--muted); margin-top: 0.5rem; }

/* ---------- Pillars ---------- */
.pillars-section { background: #fff; border-bottom: 1px solid var(--line); padding-block: clamp(1.5rem, 3vw, 2.25rem); }
.pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem; }
.pillar { border-top: 2px solid var(--navy); padding-top: 0.85rem; }
.pillar-icon { color: var(--navy); margin-bottom: 0.45rem; }
.pillar h2 { font-size: 0.98rem; font-weight: 600; }
.pillar p { color: var(--muted); font-size: 0.89rem; line-height: 1.6; margin-top: 0.3rem; }

/* ---------- Sections ---------- */
.alt-section { background: var(--surface); border-block: 1px solid var(--line); }

.home-events-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 1.5rem; align-items: start; }
.home-events-list { display: grid; gap: 1rem; }
.muted-note { color: var(--muted); }
.year-glance {
  background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
  padding: 1.4rem;
}
.year-glance h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; }
.year-glance ul { list-style: none; padding: 0; display: flex; flex-direction: column; }
.year-glance li {
  display: flex; gap: 0.75rem; align-items: baseline;
  padding-block: 0.55rem; border-bottom: 1px solid var(--line); font-size: 0.89rem; line-height: 1.5;
}
.year-glance li:last-of-type { border-bottom: none; }
.year-glance li span { flex: none; width: 3rem; font-weight: 650; color: var(--navy); font-size: 0.85rem; }
.glance-note { font-size: 0.76rem; color: var(--muted); margin-block: 0.75rem 0.9rem; }

/* ---------- Announcement preview ---------- */
.announce-preview { list-style: none; padding: 0; display: flex; flex-direction: column; }
.announce-row {
  display: grid; grid-template-columns: 3.5rem 1fr auto 1.4rem; align-items: center; gap: 1.1rem;
  padding: 0.7rem 0.25rem; text-decoration: none; color: var(--ink);
  border-bottom: 1px solid var(--line);
  transition: background var(--transition);
}
.announce-row:first-child { border-top: 1px solid var(--line); }
.announce-row:hover { background: var(--surface); }
.announce-row-date { font-weight: 600; color: var(--navy); font-size: 0.8rem; text-transform: uppercase; }
.announce-row-title { font-weight: 550; line-height: 1.45; font-size: 0.95rem; }
.announce-row-cat { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--muted); }
.announce-row svg { color: var(--muted); }

/* ---------- Visit / about ---------- */
.visit-section { border-top: 1px solid var(--line); }
.visit-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(1.75rem, 4vw, 3.5rem); align-items: center; }
.visit-copy p { color: var(--muted); margin-top: 0.85rem; line-height: 1.7; }
.visit-actions { display: flex; gap: 0.65rem; flex-wrap: wrap; margin-top: 1.25rem; }
.visit-media img { border-radius: var(--radius); border: 1px solid var(--line); aspect-ratio: 4 / 3; object-fit: cover; width: 100%; }
.visit-caption { font-size: 0.78rem; color: var(--muted); margin-top: 0.5rem; text-align: center; }

@media (max-width: 1023px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-media img { aspect-ratio: 16 / 10; }
  .home-events-grid { grid-template-columns: 1fr; }
  .visit-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .pillars-grid { grid-template-columns: 1fr; gap: 1.25rem; }
  .announce-row { grid-template-columns: 3rem 1fr 1.4rem; }
  .announce-row-cat { display: none; }
}
</style>
