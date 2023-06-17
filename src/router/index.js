import { createRouter, createWebHistory } from 'vue-router'
import JogarView from '../views/JogarView.vue'
import MensalidadeView from '../views/MensalidadeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jogar',
      component: JogarView
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/mensalidade',
      name: 'mensalidade',
      component: MensalidadeView
    },
  ]
})

export default router
