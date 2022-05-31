import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashbaord/home.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashbaord/Create.vue')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashbaord/Details.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
