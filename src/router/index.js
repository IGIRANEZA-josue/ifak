import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue'), meta: { title: 'IFAK | Don Bosco School, Kimihurura — Kigali' } },
  { path: '/news', name: 'news', component: () => import('../pages/News.vue'), meta: { title: 'News | IFAK — Don Bosco Kimihurura' } },
  { path: '/news/:slug', name: 'news-details', component: () => import('../pages/NewsDetails.vue'), meta: { title: 'Article | IFAK News' } },
  { path: '/events', name: 'events', component: () => import('../pages/Events.vue'), meta: { title: 'Events | IFAK — Don Bosco Kimihurura' } },
  { path: '/events/:slug', name: 'event-details', component: () => import('../pages/EventDetails.vue'), meta: { title: 'Event | IFAK' } },
  { path: '/announcements', name: 'announcements', component: () => import('../pages/Announcements.vue'), meta: { title: 'Announcements | IFAK — Don Bosco Kimihurura' } },
  { path: '/gallery', name: 'gallery', component: () => import('../pages/Gallery.vue'), meta: { title: 'Photo Gallery | IFAK — Don Bosco Kimihurura' } },
  { path: '/gallery/:slug', name: 'gallery-album', component: () => import('../pages/GalleryAlbum.vue'), meta: { title: 'Photo Album | IFAK Gallery' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue'), meta: { title: 'Page not found | IFAK' } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 90 }
    return { top: 0 }
  }
})

const DETAIL_ROUTES = new Set(['news-details', 'event-details'])
router.afterEach((to) => {
  // Detail pages manage their own document.title from the slug lookup.
  if (DETAIL_ROUTES.has(String(to.name))) return
  if (typeof document !== 'undefined') {
    document.title = to.meta.title || 'IFAK | Institut de Formation Apostolique de Kimihurura'
  }
})

export default router
