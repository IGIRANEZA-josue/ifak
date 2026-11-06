<script setup>
import { reactive, computed } from 'vue'
import PageHero from '../components/PageHero.vue'

const form = reactive({ name: '', email: '', topic: 'General enquiry', message: '' })

const topics = [
  'General enquiry',
  'Admissions & admission test',
  'Fees & financial information',
  'Visit / school tour',
  'Parent / guardian matter',
  'Media & other'
]

// Static site: no backend, so the form opens the visitor's email app with a
// pre-filled message. Nothing is stored, sent or processed by this website.
const mailtoHref = computed(() => {
  const subject = `[IFAK website] ${form.topic} — ${form.name || 'Website visitor'}`
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Topic: ${form.topic}`,
    '',
    form.message
  ].join('\n')
  return `mailto:info@ifakdonbosco.ac.rw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

function onSubmit(e) {
  e.preventDefault()
  window.location.href = mailtoHref.value
}
</script>

<template>
  <PageHero
    title="Contact IFAK"
    subtitle="Reach the school office, find the right department, or plan a visit to Kimihurura. The school team will answer during term time."
    :crumbs="[{ label: 'Contact' }]"
  />

  <section class="section" aria-labelledby="contact-options-heading">
    <div class="container">
      <h2 id="contact-options-heading" class="visually-hidden">Ways to reach the school</h2>
      <div class="contact-grid">
        <div class="card contact-card">
          <span class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          <h3>Visit us</h3>
          <address>
            IFAK Don Bosco Kimihurura<br />
            KN 14 Ave 41, Kimihurura<br />
            Gasabo District, Kigali — Rwanda
          </address>
          <a class="contact-action" href="https://www.google.com/maps/search/IFAK+Don+Bosco+Kimihurura" target="_blank" rel="noopener noreferrer">Open in Google Maps →</a>
        </div>

        <div class="card contact-card">
          <span class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.9a16 16 0 0 0 4 4l3.26-1.22a2 2 0 0 1 2.11.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <h3>Call us</h3>
          <ul class="contact-list">
            <li><a href="tel:+250787949474">+250 787 949 474</a></li>
            <li><a href="tel:+250788519195">+250 788 519 195</a></li>
            <li><a href="tel:+250782379300">+250 782 379 300</a></li>
          </ul>
          <p class="contact-note">For anything urgent during term time, calling is faster than email.</p>
        </div>

        <div class="card contact-card">
          <span class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
          </span>
          <h3>Email us</h3>
          <ul class="contact-list">
            <li><a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a><span>School office</span></li>
            <li><a href="mailto:dos@ifakdonbosco.ac.rw">dos@ifakdonbosco.ac.rw</a><span>Dean of Studies (academic)</span></li>
            <li><a href="mailto:dod@ifakdonbosco.ac.rw">dod@ifakdonbosco.ac.rw</a><span>Dean of Discipline (welfare)</span></li>
          </ul>
          <a class="contact-action" href="https://ifakdonbosco.ac.rw" target="_blank" rel="noopener noreferrer">ifakdonbosco.ac.rw ↗</a>
        </div>

        <div class="card contact-card">
          <span class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
          </span>
          <h3>Follow IFAK</h3>
          <ul class="contact-list">
            <li><a href="https://www.facebook.com/people/IFAK-Kimihurura/100054528967190/" target="_blank" rel="noopener noreferrer">Facebook — IFAK Kimihurura</a></li>
            <li><a href="https://x.com/IFAKDONBOSCO" target="_blank" rel="noopener noreferrer">X / Twitter — @IFAKDONBOSCO</a></li>
            <li><a href="https://www.youtube.com/@Ifakdonbosco2024/videos" target="_blank" rel="noopener noreferrer">YouTube — IFAK Don Bosco</a></li>
          </ul>
          <p class="contact-note">The official site is the reference for admissions, term dates and news.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section map-section" aria-labelledby="contact-map-heading">
    <div class="container map-grid">
      <div class="map-frame">
        <iframe
          title="Map — IFAK Don Bosco Kimihurura, Kigali"
          src="https://www.google.com/maps?q=IFAK%20Don%20Bosco%20Kimihurura%20Kigali&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div class="message-panel">
        <h2 id="contact-map-heading">Write to the school office</h2>
        <p class="message-note">
          This website has no backend — submitting opens your email app with the message pre-filled to
          <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>. Nothing you type here is stored by the site.
        </p>
        <form class="message-form" @submit="onSubmit">
          <div class="form-row">
            <label for="msg-name">Your name</label>
            <input id="msg-name" v-model.trim="form.name" type="text" required autocomplete="name" />
          </div>
          <div class="form-row">
            <label for="msg-email">Your email</label>
            <input id="msg-email" v-model.trim="form.email" type="email" required autocomplete="email" />
          </div>
          <div class="form-row">
            <label for="msg-topic">Topic</label>
            <select id="msg-topic" v-model="form.topic">
              <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="form-row">
            <label for="msg-body">Message</label>
            <textarea id="msg-body" v-model.trim="form.message" rows="4" required placeholder="How can the school help?"></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Open in your email app</button>
        </form>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="contact-admissions-heading">
    <div class="container admissions-strip">
      <p>
        <strong>Admissions?</strong> Admission to Ordinary and Advanced Level is competitive and by admission test.
        Check the current test schedule and requirements in the
        <router-link to="/announcements">school announcements</router-link>, or call
        <a href="tel:+250787949474">+250 787 949 474</a>.
      </p>
    </div>
  </section>

  <p class="sources-note container">
    Contact details as published on the official IFAK website (ifakdonbosco.ac.rw), verified 6 November 2026.
    Note: office hours are not published — please call ahead before visiting.
  </p>
</template>

<style scoped>
.section { padding-block: clamp(2rem, 4vw, 3.25rem); }

.contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
.contact-card { padding: 1.35rem; display: flex; flex-direction: column; gap: 0.5rem; }
.contact-icon { color: var(--navy); display: inline-flex; }
.contact-card h3 { font-size: 1rem; font-weight: 600; color: var(--navy-ink); }
.contact-card address { font-style: normal; color: var(--ink); line-height: 1.65; font-size: 0.92rem; }
.contact-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.contact-list a { color: var(--navy); text-decoration: none; font-size: 0.92rem; font-weight: 550; }
.contact-list a:hover { text-decoration: underline; }
.contact-list span { display: block; font-size: 0.75rem; color: var(--muted); }
.contact-action { margin-top: auto; color: var(--navy); font-weight: 600; font-size: 0.88rem; text-decoration: none; }
.contact-action:hover { text-decoration: underline; }
.contact-note { font-size: 0.78rem; color: var(--muted); line-height: 1.5; margin-top: auto; padding-top: 0.35rem; }

.map-section { background: var(--surface); border-block: 1px solid var(--line); }
.map-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 1.5rem; align-items: stretch; }
.map-frame { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; min-height: 340px; }
.map-frame iframe { display: block; width: 100%; height: 100%; min-height: 340px; border: 0; }

.message-panel h2 { font-size: 1.25rem; font-weight: 650; color: var(--navy-ink); }
.message-note { color: var(--muted); font-size: 0.88rem; margin-top: 0.4rem; line-height: 1.6; }
.message-note a { color: var(--navy); }
.message-form { display: grid; gap: 0.75rem; margin-top: 1rem; }
.form-row { display: grid; gap: 0.3rem; }
.form-row label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; color: var(--navy-ink); }
.form-row input, .form-row select, .form-row textarea {
  border: 1px solid var(--line-strong); border-radius: var(--radius-sm);
  padding: 0.55rem 0.7rem; font: inherit; font-size: 0.93rem; background: #fff; color: var(--ink);
}
.form-row input:focus, .form-row select:focus, .form-row textarea:focus {
  outline: 2px solid var(--navy); outline-offset: 1px; border-color: var(--navy);
}

.admissions-strip { border: 1px solid var(--line); border-left: 3px solid var(--navy); border-radius: var(--radius-sm); padding: 1rem 1.25rem; background: #fff; }
.admissions-strip p { line-height: 1.65; color: var(--ink); }
.admissions-strip a { color: var(--navy); }

.sources-note { font-size: 0.8rem; color: var(--muted); padding-block: 0 1.5rem; margin-bottom: 0.5rem; }

@media (max-width: 1023px) {
  .contact-grid { grid-template-columns: repeat(2, 1fr); }
  .map-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>
