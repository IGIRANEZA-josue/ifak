<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] } // [{ label, to? }]
})
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <router-link to="/">Home</router-link>
        <span aria-hidden="true">›</span>
        <template v-for="(crumb, i) in crumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
          <span v-else aria-current="page">{{ crumb.label }}</span>
          <span v-if="i < crumbs.length - 1" aria-hidden="true">›</span>
        </template>
      </nav>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>
