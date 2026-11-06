<script setup>
import OfficialLogo from './OfficialLogo.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="site-footer" aria-labelledby="footer-heading">
    <div class="container">
      <h2 id="footer-heading" class="visually-hidden">Contact and site information</h2>
      <div class="footer-grid">
        <div class="footer-brand">
          <OfficialLogo :size="54" />
          <p class="footer-name">Institut de Formation<br />Apostolique de Kimihurura</p>
          <p class="footer-tagline">A private Catholic secondary school of the Salesians of Don Bosco, educating and evangelizing young people in Kigali since 1964.</p>
        </div>

        <nav class="footer-col" aria-label="Footer navigation">
          <h3 class="footer-heading">Site</h3>
          <router-link to="/">Home</router-link>
          <router-link to="/news">News &amp; articles</router-link>
          <router-link to="/events">Events &amp; calendar</router-link>
          <router-link to="/announcements">School announcements</router-link>
        </nav>

        <div class="footer-col">
          <h3 class="footer-heading">Visit</h3>
          <p class="footer-text">IFAK Don Bosco Kimihurura<br />KN 14 Ave 41, Kimihurura<br />Gasabo District, Kigali — Rwanda</p>
          <a class="footer-link" href="https://www.google.com/maps/search/IFAK+Don+Bosco+Kimihurura" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Contact</h3>
          <a class="footer-link" href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a>
          <a class="footer-link" href="tel:+250787949474">+250 787 949 474</a>
          <a class="footer-link" href="tel:+250788519195">+250 788 519 195</a>
          <a class="footer-link" href="tel:+250782379300">+250 782 379 300</a>
          <div class="footer-social" aria-label="IFAK on social media">
            <a href="https://www.facebook.com/people/IFAK-Kimihurura/100054528967190/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
            </a>
            <a href="https://x.com/IFAKDONBOSCO" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h3.6l5.1 6.9L18.4 4H20l-6.5 8.1L20.5 20H17l-5.3-7L6 20H4l6.8-8.4L4 4z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Ifakdonbosco2024/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.2-2.1C18.7 3.5 12 3.5 12 3.5s-6.7 0-8.3.6A3 3 0 0 0 1.5 6.2C1 8 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.2 2.1c1.6.6 8.3.6 8.3.6s6.7 0 8.3-.6a3 3 0 0 0 2.2-2.1c.5-1.9.5-5.8.5-5.8zM10.3 15.3V8.7L15.8 12l-5.5 3.3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Institut de Formation Apostolique de Kimihurura. All rights reserved.</p>
        <p>A Salesians of Don Bosco school · Kimihurura, Kigali</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--navy);
  color: rgba(255, 255, 255, 0.78);
  padding-top: clamp(2.25rem, 4vw, 3.5rem);
}
.footer-grid {
  display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
  gap: 2.25rem; padding-bottom: 2.25rem;
}
.footer-name {
  font-size: 0.98rem; font-weight: 600; color: #fff;
  margin: 0.85rem 0 0.5rem; line-height: 1.4;
}
.footer-tagline { font-size: 0.86rem; color: rgba(255,255,255,0.66); max-width: 42ch; }
.footer-heading {
  font-size: 0.68rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.55);
  margin-bottom: 0.65rem;
}
.footer-col { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }
.footer-col a, .footer-link { color: rgba(255,255,255,0.82); text-decoration: none; font-size: 0.9rem; }
.footer-col a:hover, .footer-link:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
.footer-text { font-size: 0.9rem; line-height: 1.6; }
.footer-social { display: flex; gap: 0.6rem; margin-top: 0.5rem; }
.footer-social a {
  display: inline-flex; padding: 0.45rem; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.8);
  transition: border-color var(--transition), color var(--transition);
}
.footer-social a:hover { border-color: #fff; color: #fff; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.14);
  padding-block: 1rem 1.25rem;
  display: flex; justify-content: space-between; gap: 0.75rem 1.5rem; flex-wrap: wrap;
  font-size: 0.8rem; color: rgba(255,255,255,0.6);
}

@media (max-width: 1023px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
</style>
