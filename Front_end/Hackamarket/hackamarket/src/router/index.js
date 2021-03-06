import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/RegistrarProducto',
    name: 'RegistrarProducto',
    component: () => import('../views/RegistrarProducto.vue')
  },
  {
    path: '/Clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/Registrar',
    name: 'Registrar',
    component: () => import('../views/Registrar.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
