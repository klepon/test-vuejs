// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import { Card, Modal, Button, Form, FormGroup, FormInput } from 'bootstrap-vue/es/components';

import store from './global/store';
import router from './global/router';
import kpUtils from './global/utils';

import App from './App';

Vue.config.productionTip = false;
Vue.use(wysiwyg, {}); // config https://github.com/chmln/vue-wysiwyg
Vue.use(Card);
Vue.use(Modal);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormGroup);
Vue.use(FormInput);

const mp = {
  install() {
    Vue.kpUtils = kpUtils;
    Vue.prototype.$kpUtils = kpUtils;
  },
};
Vue.use(mp);


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
