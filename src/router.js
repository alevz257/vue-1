import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from '@/components/Home.vue'
import Auth from '@/components/Auth.vue'

const routes = [
    {
        path: '/', component: Home, meta: { requiresAuth: true}   
    },
    { 
        path: '/auth', component: Auth 
    },
]

const router = new VueRouter({
    routes
})

router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      let user;
      Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
        if (data && data.signInUserSession) {
          user = data;
        }
        next()
      }).catch((e) => {
        next({
          path: '/auth'
        });
      });
    }
    next()
  })

export default router 