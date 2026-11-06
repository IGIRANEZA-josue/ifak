<script setup>
import { computed } from 'vue'
import { useTheme } from '../utils/theme'

const { theme, toggle } = useTheme()
const isDark = computed(() => theme.value === 'dark')
const label = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'))
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-pressed="isDark"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <!-- Moon (shown in light mode: activate dark) -->
    <svg v-if="!isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <!-- Sun (shown in dark mode: activate light) -->
    <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2v2.25M12 19.75V22M2 12h2.25M19.75 12H22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px; border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong); background: var(--card);
  color: var(--accent); cursor: pointer;
  transition: background var(--transition), border-color var(--transition), color var(--transition);
}
.theme-toggle:hover { background: var(--surface); border-color: var(--accent); }
</style>
