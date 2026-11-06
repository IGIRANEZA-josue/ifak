import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// For a custom domain (e.g. ifakdonbosco.ac.rw) keep base '/'.
// For a GitHub Pages project site (username.github.io/ifak/) build with:
//   VITE_BASE=/ifak/ npm run build
// The router reads import.meta.env.BASE_URL, so deep links keep working.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true
  }
})
