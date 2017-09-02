
// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
// import VueI18n from 'vue-i18n'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'
import VueCordova from 'vue-cordova'
import '../node_modules/bootstrap/dist/js/bootstrap.min'
import '../node_modules/admin-lte/dist/js/app.min'

import './my-style.scss'
import 'vue-strap'
import KeenUI from 'keen-ui'

Vue.use(KeenUI)
// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)
// Vue.user(vuStrap)
Vue.use(VueRouter)
import jQuery from 'jquery'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
// import VueI18n from 'vue-i18n'

Vue.use(VeeValidate)
Vue.use(VueResource)
// Vue.use(VueI18n)

// var i18n = new VueI18n({
//   locale: 'en',
//   messages: { test: 'test' }
// })

// var i18n = new VueI18n({
//   locale: 'en',
//   messages: { test: 'test' }
// })
// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  if (to.auth && (to.router.app.$store.state.token === 'null')) {
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

jQuery(document).ready(function () {
// Start out app!
// eslint-disable-next-line no-new
  new Vue({
    el: '#root',
    router: router,
    store: store,
    // i18n: i18n,
    render: h => h(AppView)
  })

// Check local storage to handle refreshes
  if (window.localStorage) {
    var localUserString = window.localStorage.getItem('user') || 'null'
    var localUser = JSON.parse(localUserString)

    if (localUser && store.state.user !== localUser) {
      store.commit('SET_USER', localUser)
      store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    }
  }
  Vue.use(VueCordova, {
    optionTestKey: 'optionTestValue'
  })
// add cordova.js only if serving the app through file://
  if (window.location.protocol === 'file:' || window.location.port === '3000') {
    var cordovaScript = document.createElement('script')
    cordovaScript.setAttribute('type', 'text/javascript')
    cordovaScript.setAttribute('src', 'cordova.js')
    document.body.appendChild(cordovaScript)
  }
})// jquery
