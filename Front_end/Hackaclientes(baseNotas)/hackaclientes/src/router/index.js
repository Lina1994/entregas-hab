import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isLoggedIn } from '../api/utils.js'
import { checkIsAdmin } from '../api/utils.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      allowAnon: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/add-clients',
    name: 'AddClients',
    component: () => import('../views/AddClients.vue'),
    meta: {
      allowAnon: false,
      onlyAdmin: true
    },
    beforeEnter: (to, from, next) => {
      if(to.meta.onlyAdmin === true && !checkIsAdmin()){
        next({
          path: '/home',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/',
    name: 'Loging',
    component: () => import('../views/Loging.vue'),
    meta: {
      allowAnon: true
    }
  }
]

const router = new VueRouter({
  routes
})

//// COMPROBACIÓN PREVIA A ENTRADA EN LA RUTA URL
router.beforeEach( (to, from, next) => {
  if(!to.meta.allowAnon && !isLoggedIn()) {
    next( {
      path: '/',
      query: { redirect: to.fullPath }
    } )
  } else {
    next()
  }
} )

export default router
