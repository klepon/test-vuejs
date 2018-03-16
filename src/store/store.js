// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import routerUrl from '@/variables/routerUrl';
// import userStore from '@/components/User/UserStore';

Vue.use(Vuex);

// role harusnya bukan bagian user,karna user bisa multi project and beda role di tiap project
const userTpl = {
  role: 1, // 1 admin, 2 watcher, 3 member
  token: '',
  name: '',
  discipline: '',
};

export default new Vuex.Store({
  state: {
    setup: {
      lang: 'en',
      logoImage: 'static/logo.png',
    },
    user: { ...userTpl },
  },
  mutations: {
    setUser(state, params) {
      // set user detil
      if (!params.login) {
        state.user = { ...userTpl };
      } else {
        state.user = { ...params.userData };
      }

      // redirect user after login/logout success
      router.push({ name: params.login ? routerUrl.Project.name : routerUrl.Homepage.name });
    },
    switchLang(state, langCode) {
      state.setup.lang = langCode;
    },
    logoutUser() {
      this.commit('setUser', { login: false });
    },
  },
});
