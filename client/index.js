import 'normalize.css'; // eslint-disable-line
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import 'open-iconic'; // eslint-disable-line

import './base.css';
import NpmGuiNav from './components/npm-gui-nav.vue';
import NpmGuiConsole from './components/npm-gui-console.vue';
import NpmGuiInfo from './components/npm-gui-info.vue';

import { routes } from './routes';

import { npmGuiStore } from './store';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(npmGuiStore);

function initialize() {
  const router = new VueRouter({
    routes,
  });

  const app = new Vue({
    components: {
      NpmGuiNav,
      NpmGuiConsole,
      NpmGuiInfo,
    },
    store,
    router,
  }).$mount('#npm-gui-vue');

  if (!window.localStorage.getItem('npm-gui-id')) {
    window.localStorage.setItem('npm-gui-id', new Date());
  }
  axios.post('/api/log', { id: window.localStorage.getItem('npm-gui-id') });

  return app;
}

initialize();
