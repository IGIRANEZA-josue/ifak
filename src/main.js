import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App).use(router)
app.mount('#app')

// Instagram-style boot splash: fade it out once the router is ready,
// then remove it from the DOM entirely. Hard fallback if anything hangs.
const splash = document.getElementById('splash')
const hideSplash = () => {
  if (!splash || splash.dataset.done) return
  splash.dataset.done = '1'
  splash.classList.add('splash-out')
  const remove = () => splash.remove()
  splash.addEventListener('transitionend', remove, { once: true })
  window.setTimeout(remove, 800)
}

router.isReady().then(hideSplash).catch(hideSplash)
window.setTimeout(hideSplash, 4000)
