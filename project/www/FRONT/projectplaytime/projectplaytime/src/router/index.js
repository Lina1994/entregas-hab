import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
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
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
     /* allowAnon: true*/
    }
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
     /* allowAnon: true*/
    },
  },
  {
    path: '/Donate',
    name: 'Donate',
    component: () => import('../views/Donate.vue'),
    meta: {
     /* allowAnon: true*/
    },
  },
  {
    path: '/Validate',
    name: 'Validate',
    component: () => import('../views/ValidateUser.vue'),
    meta: {
     /* allowAnon: true*/
    },
  },
  {
    path: '/MyUser',
    name: 'MyUser',
    component: () => import('../views/MyUser.vue'),
    meta: {
     /* allowAnon: true*/
    },
  }

]

const router = new VueRouter({
  routes
})
//// COMPROBACIÓN PREVIA A ENTRADA EN LA RUTA URL
/*router.beforeEach( (to, from, next) => {
  if(!to.meta.allowAnon && !isLoggedIn()) {
    next( {
      path: '/',
      query: { redirect: to.fullPath }
    } )
  } else {
    next()
  }
} )*/

export default router
