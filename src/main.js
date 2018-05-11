// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vuetify from 'vuetify';
import wysiwyg from 'vue-wysiwyg';

import store from './global/store';
import router from './global/router';
import kpUtils from './global/utils';

import App from './App';

require('vuetify/dist/vuetify.min.css');

Vue.use(Vuetify, {
  theme: {
    primary: '#007bff',
    secondary: '#6c757d',
    accent: '#d1ecf1',
    error: '#dc3545',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
  },
});

Vue.use(wysiwyg, {
  hideModules: {
    bold: false,
    italic: false,
    underline: true,
    justifyLeft: true,
    justifyCenter: true,
    justifyRight: true,
    headings: true,
    link: true,
    code: true,
    orderedList: false,
    unorderedList: false,
    image: true,
    table: true,
    removeFormat: true,
  },
}); // config https://github.com/chmln/vue-wysiwyg

const kpInstallPlugin = {
  install() {
    Vue.kpUtils = kpUtils;
    Vue.prototype.$kpUtils = kpUtils;
  },
};
Vue.use(kpInstallPlugin);

Vue.config.productionTip = false;

// redirect to homepage if page not found
router.beforeEach((to, from, next) => {
  // check for user login, redirect if not login
  kpUtils.isLoggedIn(to);

  if (!to.matched.length) {
    next('/');
  } else {
    next();
  }
});

// check if user already login
store.commit('isUserLogin');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
