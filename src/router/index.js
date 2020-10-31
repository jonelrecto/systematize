import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase'
import routes from './routes'

Vue.use(VueRouter)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
// const firebaseApp = Vue.prototype.$firebaseApp

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  let userToken = null
  firebase.auth().onAuthStateChanged(user => {
    console.log(user, 'usr')
    userToken = user
    Router.beforeResolve((to, from, next) => {
      if (!to.meta.requiredAuth || userToken) {
        console.log(userToken, 'usertoekn')
        console.log(to, 'next()')
        next()
      } else {
        console.log('not authenticated')
        next({ path: '/login' })
      }
    })
  })
  return Router
}
