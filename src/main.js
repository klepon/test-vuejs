// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';

import store from './global/store';
import router from './global/router';

import App from './App';

Vue.config.productionTip = false;
Vue.use(wysiwyg, {}); // config https://github.com/chmln/vue-wysiwyg

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
