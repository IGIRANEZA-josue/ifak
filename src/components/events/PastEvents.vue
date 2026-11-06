<script setup>
import EventCard from './EventCard.vue'
defineProps({
  events: { type: Array, required: true }
})
</script>

<template>
  <div class="event-list">
    <EventCard v-for="event in events" :key="event.slug" :event="event" past />
  </div>
</template>

<style scoped>
.event-list { display: grid; gap: 1.1rem; }
</style>
