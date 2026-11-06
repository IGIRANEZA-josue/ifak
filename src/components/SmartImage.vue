<script setup>
// Renders an <img> that automatically swaps to a local fallback image if the
// preferred source (e.g. the official IFAK website CDN) fails to load.
// Parent-provided `class` falls through to the root <img> automatically.
import { ref } from 'vue'
import { asset } from '../utils/content'

const props = defineProps({
  src: { type: String, required: true },
  fallback: { type: String, default: '' },
  alt: { type: String, required: true },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: undefined }
})

const failed = ref(false)

function resolvedSrc() {
  const target = failed.value && props.fallback ? props.fallback : props.src
  return /^https?:\/\//.test(target) ? target : asset(target)
}
</script>

<template>
  <img
    :src="resolvedSrc()"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="fetchpriority"
    @error="failed = true"
  />
</template>
