// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/components/user/_userStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setup: {
      lang: 'en',
      logoImage: 'static/logo.png',
    },
    user: { ...User.tpl },
  },
  mutations: {
    switchLang(state, langCode) {
      state.setup.lang = langCode;
    },
    isUserLogin() {
      User.isUserLogin(this);
    },
    setUser(state, params) {
      User.setUser(state, params);
    },
    logoutUser() {
      User.logoutUser(this);
    },
  },
});
