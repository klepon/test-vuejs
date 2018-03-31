// Import Vue
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';
import kpUtils from '@/global/utils';
import url from './_var';

export default {
  /* set user data object
  * how to use; add on store state
    user: { ...User.tpl },
  */
  tpl: {
    token: '',
    name: '',
    discipline: '',
    email: '',
  },

  localStorageKey: 'userData',

  /* check if user already login
  * how to use;
  * add on store mutations
    isUserLogin() {
      User.isUserLogin(this);
    },
  * add on main.js or on first page with import store from './global/store';
    store.commit('isUserLogin');
  */
  isUserLogin(store) {
    const userData = kpUtils.getLocalStorage(this.localStorageKey);
    if (userData !== null) {
      store.commit('setUser', userData);
    }
  },

  /* set user data on store to mark login/logout
  * how to use; add on store mutations
    setUser(state, params) {
      User.setUser(state, params);
    },
  */
  setUser(state, params) {
    // set user detil
    const { token, name, discipline, email } = params;
    state.user = { token, name, discipline, email };
    kpUtils.setLocalStorage(this.localStorageKey, { ...state.user });

    // redirect user after login/logout success
    if (params.redirect) router.push({ name: params.redirect });
  },

  /* set user data on store to mark login/logout
  * how to use; add on store mutations
    logoutUser() {
      User.logoutUser(this);
    },
  */
  logoutUser(store) {
    fetch(`${url.member}/logout?access_token=${store.state.user.token}`, {
      body: JSON.stringify({}),
      ...kpUtils.apiHeader,
    })
      .then(() => {
        store.commit('setUser', {
          redirect: routerUrl.Homepage.name,
          ...this.tpl,
        });
      })
      .catch(() => null);
  },
};
