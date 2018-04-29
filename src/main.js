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

Vue.use(Vuetify);
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
