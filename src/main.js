// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import { Card, Modal, Button } from 'bootstrap-vue/es/components';

import store from './global/store';
import router from './global/router';

import App from './App';

Vue.config.productionTip = false;
Vue.use(wysiwyg, {}); // config https://github.com/chmln/vue-wysiwyg
Vue.use(Card);
Vue.use(Modal);
Vue.use(Button);

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
