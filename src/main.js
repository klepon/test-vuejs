// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import { Card, Modal, Button, Form, FormGroup, FormInput, FormSelect } from 'bootstrap-vue/es/components';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/angle-double-right';
import 'vue-awesome/icons/angle-double-left';
import 'vue-awesome/icons/plus';

import store from './global/store';
import router from './global/router';
import kpUtils from './global/utils';

import App from './App';

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

Vue.use(Card);
Vue.use(Modal);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormGroup);
Vue.use(FormInput);
Vue.use(FormSelect);

Vue.component('icon', Icon);

const kpInstallPlugin = {
  install() {
    Vue.kpUtils = kpUtils;
    Vue.prototype.$kpUtils = kpUtils;
  },
};
Vue.use(kpInstallPlugin);

Vue.config.productionTip = false;

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
