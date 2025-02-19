import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/joke',
      name: 'joke',
      component: () => import('../views/JokerView.vue'),
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('../views/FinishView.vue'),
    },
  ],
})

export default router
