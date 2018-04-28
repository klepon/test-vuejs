// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/components/user/_userStore';
import kpUtils from '@/global/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setup: {
      lang: 'en',
      logoImage: 'static/logo.png',
    },
    util: {
      modal: {
        show: false,
        title: '',
        message: '',
        theme: '',
        themeColor: '',
      },
    },
    user: { ...User.tpl },
  },
  mutations: {
    switchLang(state, langCode) {
      state.setup.lang = langCode;
      kpUtils.setStringLocalStorage('mandorLang', langCode);
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
    setModal(state, data) {
      const { title, message, theme = 'info', themeColor = 'light', show = true } = data;
      this.state.util.modal = { title, message, theme, themeColor, show };
    },
  },
});
