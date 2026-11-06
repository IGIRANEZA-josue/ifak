<script setup>
import { computed } from 'vue'
import { allNews, splitEventsByDate, allAnnouncements } from '../utils/content'
import SmartImage from '../components/SmartImage.vue'
import NewsCard from '../components/news/NewsCard.vue'
import EventCard from '../components/events/EventCard.vue'
import Crest from '../components/Crest.vue'

const latestNews = computed(() => allNews().slice(0, 3))
const upcoming = computed(() => splitEventsByDate().upcoming.slice(0, 2))
const latestAnnouncements = computed(() => allAnnouncements().slice(0, 3))

const pillars = [
  {
    title: 'Faith & Evangelisation',
    text: 'A Catholic community rooted in the Salesian charism — Sunday Mass, daily prayer, and formation that helps every student grow in faith.',
    icon: '<path d="M12 2v6"/><path d="M9 5h6"/><path d="M7 22v-7a5 5 0 0 1 10 0v7"/><path d="M4 22h16"/>'
  },
  {
    title: 'Academic Excellence',
    text: 'Ordinary and Advanced Level programmes, including five A-Level combinations, with teaching anchored in discipline and high expectations.',
    icon: '<path d="m22 9-10-5L2 9l10 5 10-5z"/><path d="M6 11.5V16c0 1.5 3 3.5 6 3.5s6-2 6-3.5v-4.5"/><path d="M22 9v6"/>'
  },
  {
    title: 'Family & Community',
    text: 'Don Bosco’s preventive system — presence, reason and kindness. Students are known, accompanied and formed as whole persons.',
    icon: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3.6 2.8-5.5 5.5-5.5s4.9 1.9 5.5 5.5"/><circle cx="17" cy="9.5" r="2.6"/><path d="M15.5 14.7c2.8.2 4.2 2 4.7 5.3"/>'
  }
]
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow eyebrow-light">Salesian Don Bosco · Kimihurura, Kigali</span>
        <h1 class="hero-title">A family school forming <em>good Christians</em> and <em>honest citizens</em>.</h1>
        <p class="hero-lede">
          IFAK — Institut de Formation Apostolique de Kimihurura — has educated and evangelized
          young people in Kigali since 1964, pairing strong academics with the warmth of Don Bosco’s
          preventive system.
        </p>
        <div class="hero-ctas">
          <router-link class="btn btn-gold" to="/news">Latest news &amp; stories</router-link>
          <router-link class="btn hero-btn-ghost" to="/announcements">School announcements</router-link>
        </div>
        <dl class="hero-facts">
          <div><dt>Since 1964</dt><dd>Over six decades serving Rwanda</dd></div>
          <div><dt>O &amp; A Level</dt><dd>Five A-Level combinations</dd></div>
          <div><dt>Private · Catholic</dt><dd>Salesians of Don Bosco</dd></div>
        </dl>
      </div>

      <figure class="hero-media">
        <SmartImage
          src="https://ifakdonbosco.ac.rw/wp-content/uploads/2022/09/DSC_0206.jpg"
          fallback="/images/hero-campus.jpg"
          alt="IFAK Don Bosco Kimihurura campus"
          width="1400" height="788"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption class="hero-badge">
          <Crest :size="40" title="IFAK crest" />
          <span>
            <strong>IFAK at 62</strong>
            Celebrating 62 years of Salesian education in 2026
          </span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ PILLARS ============ -->
  <section class="section pillars-section" aria-label="What makes IFAK unique">
    <div class="container pillars-grid">
      <div v-for="pillar in pillars" :key="pillar.title" class="pillar">
        <span class="pillar-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="pillar.icon"></svg>
        </span>
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
          <span class="eyebrow">From the school</span>
          <h2 id="home-news-heading" class="section-title">Latest news</h2>
        </div>
        <router-link class="link-arrow" to="/news">View all news
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
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
          <span class="eyebrow">Mark your calendar</span>
          <h2 id="home-events-heading" class="section-title">Upcoming events</h2>
        </div>
        <router-link class="link-arrow" to="/events">All events &amp; calendar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      </div>
      <div class="home-events-grid">
        <div class="home-events-list">
          <EventCard v-for="event in upcoming" :key="event.slug" :event="event" />
          <p v-if="!upcoming.length" class="muted-note">No upcoming events are listed yet — please check the events page or contact the school office.</p>
        </div>
        <aside class="year-glance" aria-label="School year at a glance">
          <h3>The school year at a glance</h3>
          <ul>
            <li><span>31 Jan</span>Feast of St John Bosco — school Mass &amp; celebration</li>
            <li><span>24 May</span>Feast of Mary Help of Christians — parish feast</li>
            <li><span>Nov</span>National examination period (Senior 3 &amp; Senior 6)</li>
          </ul>
          <p class="glance-note">Key dates are indicative. The school office publishes the official academic calendar each term.</p>
          <router-link class="btn btn-gold btn-block" to="/events">Open the events calendar</router-link>
        </aside>
      </div>
    </div>
  </section>

  <!-- ============ ANNOUNCEMENTS PREVIEW ============ -->
  <section class="section" aria-labelledby="home-announcements-heading">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Notices &amp; circulars</span>
          <h2 id="home-announcements-heading" class="section-title">Announcements</h2>
        </div>
        <router-link class="link-arrow" to="/announcements">All announcements
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      </div>
      <ul class="announce-preview">
        <li v-for="a in latestAnnouncements" :key="a.id">
          <router-link :to="{ path: '/announcements' }" class="announce-row">
            <span class="announce-row-date">{{ new Date(`${a.date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) }}</span>
            <span class="announce-row-title">{{ a.title }}</span>
            <span class="announce-row-cat">{{ a.category }}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </router-link>
        </li>
      </ul>
    </div>
  </section>

  <!-- ============ ABOUT / VISIT ============ -->
  <section class="section visit-section" aria-labelledby="home-visit-heading">
    <div class="container visit-grid">
      <div class="visit-copy">
        <span class="eyebrow">About IFAK</span>
        <h2 id="home-visit-heading" class="section-title">Over half a century of education and evangelisation</h2>
        <p>
          IFAK is a private Catholic secondary school located at Kimihurura sector, Gasabo District, in the
          City of Kigali, belonging to the Salesians of Don Bosco. Founded in 1964 and celebrant of its
          golden jubilee in 2015, the school offers Ordinary Level and Advanced Level — with five A-Level
          combinations: PCM (Physics–Chemistry–Mathematics), MCB (Mathematics–Chemistry–Biology),
          MCE (Mathematics–Computer Science–Economics), MEG (Mathematics–Economics–Geography) and
          MPC (Mathematics–Physics–Computer Science).
        </p>
        <p>
          The school’s aim is to provide young people wide opportunities to develop knowledge, skills,
          positive attitudes and critical thinking — to be competitive in the labour market and contribute
          to the social and political life of Rwanda.
        </p>
        <div class="visit-actions">
          <a class="btn btn-primary" href="mailto:info@ifakdonbosco.ac.rw">Write to the school office</a>
          <a class="btn btn-outline" href="tel:+250787949474">+250 787 949 474</a>
        </div>
      </div>
      <figure class="visit-media">
        <SmartImage src="https://ifakdonbosco.ac.rw/wp-content/uploads/2026/03/Barore-4.jpg" fallback="/images/news/barore-alumni.jpg" alt="IFAK alumni gathering on campus during the school’s anniversary celebration" loading="lazy" width="1100" height="750" />
        <figcaption class="visit-caption">Alumni gathered at IFAK Kimihurura during the 62nd anniversary celebrations.</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Hero ---------- */
.hero {
  background:
    radial-gradient(1000px 520px at 88% -12%, rgba(201,162,39,0.25), transparent 60%),
    radial-gradient(640px 420px at -12% 108%, rgba(201,162,39,0.14), transparent 55%),
    var(--navy-900);
  color: #f4f1e8;
  overflow: hidden;
}
.hero-inner {
  display: grid; grid-template-columns: 1.05fr 1fr;
  gap: clamp(2rem, 5vw, 4rem); align-items: center;
  padding-block: clamp(2.5rem, 6vw, 4.5rem);
}
.eyebrow-light { color: var(--gold-light); }
.eyebrow-light::before { background: var(--gold-light); }
.hero-title {
  color: #fdfaf0; font-size: clamp(2.1rem, 5vw, 3.35rem);
  line-height: 1.12; margin-top: 1.1rem; letter-spacing: -0.015em;
}
.hero-title em { font-style: italic; color: var(--gold-light); }
.hero-lede { color: rgba(244,241,232,0.85); font-size: 1.05rem; line-height: 1.65; margin-top: 1.1rem; max-width: 56ch; }
.hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.6rem; }
.hero-btn-ghost {
  display: inline-flex; align-items: center; padding: 0.72rem 1.4rem; border-radius: 999px;
  border: 1px solid rgba(244,241,232,0.35); color: #f4f1e8; text-decoration: none;
  font-weight: 600; font-size: 0.92rem; transition: border-color var(--transition), background var(--transition);
}
.hero-btn-ghost:hover { border-color: var(--gold); background: rgba(201,162,39,0.12); }
.hero-facts { display: flex; gap: clamp(1.25rem, 3vw, 2.25rem); margin-top: 2rem; flex-wrap: wrap; }
.hero-facts dt { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--gold-light); }
.hero-facts dd { font-size: 0.75rem; color: rgba(244,241,232,0.66); max-width: 16ch; margin-top: 0.15rem; line-height: 1.4; }

.hero-media { position: relative; }
.hero-media img {
  border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255,255,255,0.12); aspect-ratio: 4 / 4.6; object-fit: cover; width: 100%;
}
.hero-badge {
  position: absolute; left: -1.25rem; bottom: 1.75rem;
  display: flex; align-items: center; gap: 0.7rem;
  background: #fffdf6; color: var(--navy-900);
  border-radius: var(--radius); padding: 0.65rem 0.95rem;
  box-shadow: var(--shadow-lg); max-width: 260px;
}
.hero-badge strong { display: block; font-size: 0.82rem; }
.hero-badge span { font-size: 0.72rem; color: var(--muted); line-height: 1.35; }

/* ---------- Pillars ---------- */
.pillars-section { padding-block: clamp(2rem, 4vw, 3rem); background: var(--paper); border-bottom: 1px solid var(--line); }
.pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.pillar { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem 0.25rem; }
.pillar-icon {
  width: 52px; height: 52px; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center;
  background: var(--gold-soft); color: var(--gold-dark);
}
.pillar h2 { font-size: 1.12rem; }
.pillar p { color: var(--muted); font-size: 0.92rem; line-height: 1.6; }

/* ---------- Sections ---------- */
.alt-section { background: var(--navy-100); background: linear-gradient(180deg, #f3f1e8 0%, #eeece1 100%); }
.news-preview, .visit-section { background: var(--cream); }

.home-events-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 1.5rem; align-items: start; }
.home-events-list { display: grid; gap: 1.1rem; }
.muted-note { color: var(--muted); }
.year-glance {
  background: var(--navy-900); border-radius: var(--radius);
  padding: 1.6rem; color: rgba(244,241,232,0.85);
  box-shadow: var(--shadow-md);
}
.year-glance h3 { color: #fdfaf0; font-size: 1.15rem; margin-bottom: 1rem; }
.year-glance ul { list-style: none; padding: 0; display: flex; flex-direction: column; }
.year-glance li {
  display: flex; gap: 0.85rem; align-items: baseline;
  padding-block: 0.65rem; border-bottom: 1px solid rgba(253,250,240,0.12); font-size: 0.9rem; line-height: 1.5;
}
.year-glance li:last-of-type { border-bottom: none; }
.year-glance li span { flex: none; width: 3rem; font-family: var(--font-display); font-weight: 700; color: var(--gold-light); }
.glance-note { font-size: 0.75rem; color: rgba(244,241,232,0.55); margin-block: 0.85rem 1rem; }

/* ---------- Announcement preview ---------- */
.announce-preview { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.announce-row {
  display: grid; grid-template-columns: 3.5rem 1fr auto auto; align-items: center; gap: 1rem;
  background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-sm);
  padding: 0.75rem 1rem; text-decoration: none; color: var(--ink);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.announce-row:hover { border-color: var(--gold-dark); box-shadow: var(--shadow-sm); }
.announce-row-date { font-family: var(--font-display); font-weight: 700; color: var(--navy-900); font-size: 0.85rem; text-transform: uppercase; text-align: center; line-height: 1.25; }
.announce-row-title { font-weight: 600; line-height: 1.4; }
.announce-row-cat { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }

/* ---------- Visit / about ---------- */
.visit-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.visit-copy p { color: var(--muted); margin-top: 0.9rem; line-height: 1.7; }
.visit-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.4rem; }
.visit-media img { border-radius: var(--radius-lg); box-shadow: var(--shadow-md); aspect-ratio: 4 / 3.1; object-fit: cover; width: 100%; }
.visit-caption { font-size: 0.8rem; color: var(--muted); margin-top: 0.6rem; text-align: center; }

@media (max-width: 1023px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-media img { aspect-ratio: 16 / 10; }
  .hero-badge { left: 0.75rem; }
  .home-events-grid { grid-template-columns: 1fr; }
  .visit-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .pillars-grid { grid-template-columns: 1fr; }
  .announce-row { grid-template-columns: 3rem 1fr; }
  .announce-row-cat, .announce-row svg:last-child { display: none; }
}
</style>
