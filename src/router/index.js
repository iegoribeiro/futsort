import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import JogarView from '../views/JogarView.vue'
import AdminView from '../views/AdminView.vue'
import MensalidadeView from '../views/MensalidadeView.vue'

const router = createRouter({
  //createWebHistory -> Remover # da rota, usar .htaccess
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jogar',
      component: JogarView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AdminView.vue')
    },
    {
      path: '/mensalidade',
      name: 'mensalidade',
      component: MensalidadeView
    },
  ]
})

export default router
