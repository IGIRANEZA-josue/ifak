<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import OfficialLogo from './OfficialLogo.vue'

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Events' },
  { to: '/announcements', label: 'Announcements' }
]

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

function onScroll() {
  scrolled.value = window.scrollY > 16
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

function onKeydown(e) {
  if (e.key === 'Escape') mobileOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <!-- Utility bar -->
    <div class="topbar">
      <div class="container topbar-inner">
        <div class="topbar-contacts">
          <a href="mailto:info@ifakdonbosco.ac.rw" class="topbar-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
            info@ifakdonbosco.ac.rw
          </a>
          <a href="tel:+250787949474" class="topbar-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.9a16 16 0 0 0 4 4l3.26-1.22a2 2 0 0 1 2.11.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +250 787 949 474
          </a>
        </div>
        <div class="topbar-social" aria-label="IFAK on social media">
          <a href="https://www.facebook.com/people/IFAK-Kimihurura/100054528967190/" target="_blank" rel="noopener noreferrer" aria-label="IFAK on Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 3.5h-2.6c-2.7 0-4.4 1.8-4.4 4.6v2.4H5.5v3.4h3v6.6h3.6v-6.6h2.5l.4-3.4h-2.9V8.5c0-1 .5-1.6 1.9-1.6h2.5V3.5z"/></svg>
          </a>
          <a href="https://x.com/IFAKDONBOSCO" target="_blank" rel="noopener noreferrer" aria-label="IFAK on X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h3.6l5.1 6.9L18.4 4H20l-6.5 8.1L20.5 20H17l-5.3-7L6 20H4l6.8-8.4L4 4z"/></svg>
          </a>
          <a href="https://www.youtube.com/@Ifakdonbosco2024/videos" target="_blank" rel="noopener noreferrer" aria-label="IFAK on YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.2-2.1C18.7 3.5 12 3.5 12 3.5s-6.7 0-8.3.6A3 3 0 0 0 1.5 6.2C1 8 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.2 2.1c1.6.6 8.3.6 8.3.6s6.7 0 8.3-.6a3 3 0 0 0 2.2-2.1c.5-1.9.5-5.8.5-5.8zM10.3 15.3V8.7L15.8 12l-5.5 3.3z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Main bar -->
    <div class="navbar">
      <div class="container navbar-inner">
        <router-link to="/" class="brand" aria-label="IFAK — Institut de Formation Apostolique de Kimihurura, home">
          <OfficialLogo :size="46" />
          <span class="brand-text">
            <span class="brand-name">IFAK</span>
            <span class="brand-tag">Don Bosco · Kimihurura</span>
          </span>
        </router-link>

        <nav class="nav-desktop" aria-label="Primary navigation">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ active: isActive(link.to) }"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </router-link>
          <router-link class="btn btn-gold btn-sm" :to="{ path: '/', hash: '#contact' }">Enquire</router-link>
        </nav>

        <button
          class="hamburger"
          type="button"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-panel"
          aria-label="Toggle navigation menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="bar" :class="{ open: mobileOpen }"></span>
        </button>
      </div>

      <!-- Mobile panel -->
      <div v-show="mobileOpen" id="mobile-panel" class="mobile-panel" role="region" aria-label="Mobile navigation">
        <div class="container">
          <nav aria-label="Mobile navigation links">
            <router-link
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="mobile-link"
              :class="{ active: isActive(link.to) }"
            >
              {{ link.label }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </router-link>
            <router-link class="btn btn-gold btn-block" :to="{ path: '/', hash: '#contact' }" @click="mobileOpen = false">Enquire / Contact the school</router-link>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* ---- Topbar ---- */
.topbar {
  background: var(--navy-950);
  color: rgba(244, 241, 232, 0.85);
  font-size: 0.78rem;
}
.topbar-inner {
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem; padding-block: 0.35rem;
}
.topbar-contacts { display: flex; gap: 1.25rem; min-width: 0; }
.topbar-item { display: inline-flex; align-items: center; gap: 0.4rem; color: inherit; text-decoration: none; white-space: nowrap; }
.topbar-item:hover { color: var(--gold-light); }
.topbar-social { display: flex; gap: 0.9rem; }
.topbar-social a { color: inherit; display: inline-flex; padding: 0.15rem; }
.topbar-social a:hover { color: var(--gold-light); }

/* ---- Main navbar ---- */
.navbar {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--line);
  transition: box-shadow var(--transition);
}
.site-header.scrolled .navbar { box-shadow: 0 6px 24px rgba(18, 40, 63, 0.12); }
.navbar-inner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; height: 68px;
}

.brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
.brand-text { display: flex; flex-direction: column; line-height: 1.05; }
.brand-name {
  font-family: var(--font-display); font-size: 1.55rem; font-weight: 700;
  color: var(--navy-900); letter-spacing: 0.08em;
}
.brand-tag {
  font-size: 0.62rem; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--gold-dark); margin-top: 0.15rem;
}

.nav-desktop { display: flex; align-items: center; gap: 0.35rem; }
.nav-link {
  position: relative; text-decoration: none; color: var(--navy-800);
  font-weight: 600; font-size: 0.92rem; padding: 0.5rem 0.85rem; border-radius: 8px;
}
.nav-link:hover { color: var(--navy-950); background: var(--navy-100); }
.nav-link.active { color: var(--navy-950); }
.nav-link.active::after {
  content: ""; position: absolute; left: 0.85rem; right: 0.85rem; bottom: -1px;
  height: 3px; border-radius: 3px 3px 0 0; background: var(--gold);
}
.nav-desktop .btn { margin-left: 0.5rem; }

/* ---- Hamburger ---- */
.hamburger {
  display: none; width: 44px; height: 44px; border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm); background: #fff; cursor: pointer; position: relative;
}
.bar, .bar::before, .bar::after {
  content: ""; position: absolute; left: 11px; right: 11px; height: 2px;
  background: var(--navy-900); border-radius: 2px; transition: transform var(--transition), opacity var(--transition);
}
.bar { top: 21px; }
.bar::before { left: 0; right: 0; top: -7px; }
.bar::after { left: 0; right: 0; top: 7px; }
.bar.open { background: transparent; }
.bar.open::before { transform: translateY(7px) rotate(45deg); }
.bar.open::after { transform: translateY(-7px) rotate(-45deg); }

/* ---- Mobile panel ---- */
.mobile-panel {
  background: #fff; border-top: 1px solid var(--line);
  box-shadow: 0 18px 32px rgba(18, 40, 63, 0.14);
  padding-block: 1rem 1.5rem;
}
.mobile-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.85rem 0.75rem; border-radius: var(--radius-sm);
  text-decoration: none; color: var(--navy-900); font-weight: 600;
  border-bottom: 1px solid var(--line);
}
.mobile-link:last-of-type { border-bottom: none; }
.mobile-link.active { background: var(--gold-soft); color: var(--gold-dark); }
.mobile-panel .btn { margin-top: 0.9rem; }

@media (max-width: 1023px) {
  .nav-desktop { display: none; }
  .hamburger { display: block; }
  .topbar-contacts .topbar-item:last-child { display: none; }
}
@media (max-width: 560px) {
  .topbar-social { display: none; }
  .brand-tag { display: none; }
}
</style>
