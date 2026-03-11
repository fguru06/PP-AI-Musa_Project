import { createRouter, createWebHashHistory } from 'vue-router'

const ROUTE_CHUNK_RETRY_KEY = 'route-chunk-retry'

function isDynamicImportFailure(error) {
  const message = String(error?.message || error || '')
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(message)
}

const routes = [
  { path: '/', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
  { path: '/editor/:id', name: 'editor', component: () => import('@/views/EditorView.vue'), props: true },
  { path: '/preview/:id', name: 'preview', component: () => import('@/views/PreviewView.vue'), props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.fullPath !== from.fullPath) {
    sessionStorage.removeItem(ROUTE_CHUNK_RETRY_KEY)
  }
  next()
})

router.onError((error, to) => {
  if (!isDynamicImportFailure(error)) {
    console.error(error)
    return
  }

  const targetHref = to ? router.resolve(to).href : window.location.href
  const previousRetryTarget = sessionStorage.getItem(ROUTE_CHUNK_RETRY_KEY)

  if (previousRetryTarget === targetHref) {
    sessionStorage.removeItem(ROUTE_CHUNK_RETRY_KEY)
    console.error('Route chunk failed to load after reload.', error)
    return
  }

  sessionStorage.setItem(ROUTE_CHUNK_RETRY_KEY, targetHref)
  window.location.assign(targetHref)
})

export default router
