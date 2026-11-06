<script setup>
import Crest from '../components/Crest.vue'
</script>

<template>
  <section class="not-found section">
    <div class="container not-found-inner">
      <Crest :size="84" title="IFAK crest" />
      <p class="not-found-code">404</p>
      <h1>This page wandered off campus</h1>
      <p>The page you’re looking for doesn’t exist or may have been moved. Let’s get you back to the right place.</p>
      <div class="not-found-actions">
        <router-link class="btn btn-primary" to="/">Back to home</router-link>
        <router-link class="btn btn-outline" to="/news">Read the news</router-link>
        <router-link class="btn btn-outline" to="/events">See events</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found { background: var(--cream); }
.not-found-inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.85rem; padding-block: 2rem; }
.not-found-code { font-family: var(--font-display); font-size: clamp(3.5rem, 12vw, 6rem); font-weight: 700; color: var(--navy-100); line-height: 1; -webkit-text-stroke: 1.5px var(--navy-800); }
.not-found-inner h1 { font-size: clamp(1.4rem, 3vw, 2rem); }
.not-found-inner p { color: var(--muted); max-width: 46ch; }
.not-found-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-top: 0.75rem; }
</style>
