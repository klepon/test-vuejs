// Import Vue
import router from '@/router';
import routerUrl from '@/variables/routerUrl';

export default {
  tpl: {
    role: 1, // 1 admin, 2 watcher, 3 member
    token: '',
    name: '',
    discipline: '',
  },
  setUser: (state, params) => {
    // set user detil
    if (!params.login) {
      state.user = { ...this.tpl };
    } else {
      state.user = { ...params.userData };
    }

    // redirect user after login/logout success
    router.push({ name: params.login ? routerUrl.Project.name : routerUrl.Homepage.name });
  },
  // mutations: {
  //   setUser(state, params) {
  //     // set user detil
  //     if (!params.login) {
  //       state.user = { ...userTpl };
  //     } else {
  //       state.user = { ...params.userData };
  //     }
  //
  //     // redirect user after login/logout success
  //     router.push({ name: params.login ? routerUrl.Project.name : routerUrl.Homepage.name });
  //   },
  //   switchLang(state, langCode) {
  //     state.setup.lang = langCode;
  //   },
  //   logoutUser() {
  //     this.commit('setUser', { login: false });
  //   },
  // },
};
