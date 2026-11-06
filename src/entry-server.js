// SSR entry used for smoke testing (not shipped to the browser).
import { createSSRApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import News from './pages/News.vue'
import NewsDetails from './pages/NewsDetails.vue'
import Events from './pages/Events.vue'
import EventDetails from './pages/EventDetails.vue'
import Announcements from './pages/Announcements.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: News },
  { path: '/news/:slug', component: NewsDetails },
  { path: '/events', component: Events },
  { path: '/events/:slug', component: EventDetails },
  { path: '/announcements', component: Announcements },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

export async function render(url) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const app = createSSRApp(App).use(router)
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
