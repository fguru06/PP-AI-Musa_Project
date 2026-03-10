import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
  { path: '/editor/:id', name: 'editor', component: () => import('@/views/EditorView.vue'), props: true },
  { path: '/preview/:id', name: 'preview', component: () => import('@/views/PreviewView.vue'), props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
