<script setup>
// Official IFAK logo from the school's website, with an inline SVG crest as fallback.
import { ref } from 'vue'
import Crest from './Crest.vue'

defineProps({
  size: { type: Number, default: 46 }
})

const LOGO_URL = 'https://ifakdonbosco.ac.rw/wp-content/uploads/2022/09/Logo.jpeg'
const failed = ref(false)
</script>

<template>
  <img
    v-if="!failed"
    class="official-logo"
    :src="LOGO_URL"
    alt="IFAK — Institut de Formation Apostolique de Kimihurura logo"
    :width="size"
    :height="size"
    @error="failed = true"
  />
  <Crest v-else :size="size" />
</template>

<style scoped>
.official-logo {
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  padding: 3px;
  box-shadow: 0 1px 4px rgba(18, 40, 63, 0.35);
}
</style>
