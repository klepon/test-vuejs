// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

Vue.use(Vuex);

const userTpl = {
  level: 0, // 0 visitor, 1 manager, 2 suversisor, 3 member
  token: '',
  name: '',
  position: '',
};

export default new Vuex.Store({
  state: {
    setup: {
      lang: 'en',
      logoImage: 'static/logo.png',
    },
    user: { ...userTpl },
    data: {
      sampleText: 'Lorem ipsum<br /><b>Dolor</b> sit <i>amet</i> gitu lo',
    },
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
      router.push({ name: params.login ? 'Project' : 'Homepage' });
    },
    switchLang(state, langCode) {
      state.setup.lang = langCode;
    },
  },
});
