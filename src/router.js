import Vue from 'vue'
import Router from 'vue-router'
import ListMovie from './views/ListMovie.vue'
import Details from './views/Details.vue'
import AddMovie from '@/views/AddMovie'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ListMovie',
      component: ListMovie, props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details,
      props: true,
      meta: {
        requiresAuth: false
      }
    }
    ,
    {
      path: '/AddMovie',
      name: 'Movies',
      component: AddMovie,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("ACCESS_TOKEN") == null) {
      // next()
      next({
        path: '/',
        params: { nextUrl: '/' }
      })
      console.log('abc');
    }
  }
  next()
})

export default router;