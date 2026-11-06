<script setup>
defineProps({
  size: { type: Number, default: 44 },
  title: { type: String, default: 'IFAK crest' }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    role="img"
    :aria-label="title"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#12283f" />
    <path d="M32 5 L52 12 V31 C52 45 43.5 55.4 32 59 C20.5 55.4 12 45 12 31 V12 Z" fill="#1a3550" stroke="#c9a227" stroke-width="2.4" stroke-linejoin="round" />
    <path d="M32 14.5 L47.5 19.8 V31.4 C47.5 42 41 50.2 32 53.6 C23 50.2 16.5 42 16.5 31.4 V19.8 Z" fill="none" stroke="#c9a227" stroke-opacity="0.5" stroke-width="1.4" />
    <path d="M32 17 l3.35 6.8 7.5 1.1 -5.4 5.3 1.27 7.5L32 36.7 25.28 37.7 26.55 30.2l-5.4-5.3 7.5-1.1 Z" fill="#c9a227" />
    <text x="32" y="49.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="10.5" font-weight="700" letter-spacing="1.5" fill="#fdfaf0">IFAK</text>
  </svg>
</template>
