import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import JogarView from '../views/JogarView.vue'
import AdminView from '../views/AdminView.vue'
import FinanceiroView from '../views/FinanceiroView.vue'

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
      path: '/financeiro',
      name: 'financeiro',
      component: FinanceiroView
    },
  ]
})

export default router
