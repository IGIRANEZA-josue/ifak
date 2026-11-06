<script setup>
import Crest from './Crest.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="site-footer" aria-labelledby="footer-heading">
    <div class="container">
      <h2 id="footer-heading" class="visually-hidden">Contact and site information</h2>
      <div class="footer-grid">
        <div class="footer-brand">
          <Crest :size="56" />
          <p class="footer-name">Institut de Formation<br />Apostolique de Kimihurura</p>
          <p class="footer-tagline">Dedicated to excellence — educating and evangelizing young people in the Salesian spirit of St John Bosco since 1964.</p>
        </div>

        <nav class="footer-col" aria-label="Footer navigation">
          <h3 class="footer-heading">Navigate</h3>
          <router-link to="/">Home</router-link>
          <router-link to="/news">News &amp; Articles</router-link>
          <router-link to="/events">Events &amp; Calendar</router-link>
          <router-link to="/announcements">School Announcements</router-link>
        </nav>

        <div class="footer-col">
          <h3 class="footer-heading">Visit us</h3>
          <p class="footer-text">IFAK Don Bosco Kimihurura<br />KN 14 Ave 41, Kimihurura<br />Gasabo District, Kigali — Rwanda</p>
          <a class="footer-link" href="https://www.google.com/maps/search/IFAK+Don+Bosco+Kimihurura" target="_blank" rel="noopener noreferrer">Open in Google Maps →</a>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Contact</h3>
          <a class="footer-link" href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>
          <a class="footer-link" href="tel:+250787949474">+250 787 949 474</a>
          <a class="footer-link" href="tel:+250788519195">+250 788 519 195</a>
          <a class="footer-link" href="tel:+250782379300">+250 782 379 300</a>
          <a class="footer-link" href="https://ifakdonbosco.ac.rw" rel="noopener noreferrer">ifakdonbosco.ac.rw</a>
          <div class="footer-social" aria-label="IFAK on social media">
            <a href="https://www.facebook.com/people/IFAK-Kimihurura/100054528967190/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
            </a>
            <a href="https://x.com/IFAKDONBOSCO" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h3.6l5.1 6.9L18.4 4H20l-6.5 8.1L20.5 20H17l-5.3-7L6 20H4l6.8-8.4L4 4z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Ifakdonbosco2024/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.2-2.1C18.7 3.5 12 3.5 12 3.5s-6.7 0-8.3.6A3 3 0 0 0 1.5 6.2C1 8 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.2 2.1c1.6.6 8.3.6 8.3.6s6.7 0 8.3-.6a3 3 0 0 0 2.2-2.1c.5-1.9.5-5.8.5-5.8zM10.3 15.3V8.7L15.8 12l-5.5 3.3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Institut de Formation Apostolique de Kimihurura. All rights reserved.</p>
        <p class="footer-note">A private Catholic school of the Salesians of Don Bosco · Kimihurura, Kigali</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--navy-900);
  color: rgba(244, 241, 232, 0.82);
  padding-top: clamp(2.5rem, 5vw, 4rem);
  border-top: 4px solid var(--gold);
}
.footer-grid {
  display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
  gap: 2.5rem; padding-bottom: 2.5rem;
}
.footer-name {
  font-family: var(--font-display); color: #fdfaf0; font-size: 1.05rem;
  margin: 0.9rem 0 0.6rem; line-height: 1.35;
}
.footer-tagline { font-size: 0.88rem; color: rgba(244,241,232,0.66); max-width: 40ch; }
.footer-heading {
  font-family: var(--font-sans); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-light);
  margin-bottom: 0.75rem;
}
.footer-col { display: flex; flex-direction: column; gap: 0.45rem; align-items: flex-start; }
.footer-col a, .footer-link { color: rgba(244,241,232,0.85); text-decoration: none; font-size: 0.92rem; }
.footer-col a:hover, .footer-link:hover { color: var(--gold-light); text-decoration: underline; text-underline-offset: 3px; }
.footer-text { font-size: 0.92rem; line-height: 1.65; }
.footer-social { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
.footer-social a {
  display: inline-flex; padding: 0.5rem; border-radius: 50%;
  border: 1px solid rgba(244,241,232,0.25); color: rgba(244,241,232,0.85);
  transition: border-color var(--transition), color var(--transition);
}
.footer-social a:hover { border-color: var(--gold); color: var(--gold-light); }

.footer-bottom {
  border-top: 1px solid rgba(244,241,232,0.15);
  padding-block: 1.1rem 1.4rem;
  display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  font-size: 0.8rem; color: rgba(244,241,232,0.6);
}

@media (max-width: 1023px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; gap: 1.75rem; } }
</style>
