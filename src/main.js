import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import weather from './store/modules/weather/'
import weatherRoutes from './router/weather'
import map from './components/map/Map'
import history from './components/history/History'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAQLHaQvwBiE8KziqCQpIgySYZNhNNEMNw',
    libraries: 'places',
  },
  installComponents: true
});

const store = new Vuex.Store({
  modules: {
    weather
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...weatherRoutes,
      { name: 'Map', path: '/', component: map },
      { name: 'History', path: '/history', component: history },
  ]
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
