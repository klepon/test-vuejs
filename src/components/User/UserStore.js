// Import Vue
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';

export default {
  /* set user data object
  * how to use; add on store state
    user: { ...User.tpl },
  */
  tpl: {
    token: '',
    name: '',
    discipline: '',
  },

  /* set user data on store to mark login/logout
  * how to use; add on store mutations
    setUser(state, params) {
      User.setUser(state, params);
    },
  */
  setUser(state, params) {
    // set user detil
    if (!params.login) {
      state.user = { ...this.tpl };
    } else {
      state.user = { ...params.userData };
    }

    // redirect user after login/logout success
    router.push({ name: params.login ? routerUrl.Dashboard.name : routerUrl.Homepage.name });
  },

  /* set user data on store to mark login/logout
  * how to use; add on store mutations
    logoutUser() {
      User.logoutUser(this);
    },
  */
  logoutUser(store) {
    store.commit('setUser', { login: false });
  },
};
