// Import Vue
import router from '@/global/router';
import kpUtils from '@/global/utils';
import utilLang from '@/global/_util.lang';
import url from './_var';

export default {
  /* set user data object
  * how to use; add on store state
    user: { ...User.getTpl() },
  */
  getTpl(data) {
    const {
      id = 0,
      name = '',
      email = '', // use for request
      token = '', // use for request
      admin = false,
      hashGroup = false,
      discipline = '',
      company = {}, // id, name
    } = data === undefined ? {} : data;

    return {
      id,
      name,
      email,
      token,
      admin,
      hashGroup,
      discipline,
      company,
    };
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
    const { redirect } = params;

    // set user detil
    state.user = { ...this.getTpl(params) };
    kpUtils.setLocalStorage(this.localStorageKey, { ...state.user });

    // redirect user after login/logout success
    if (redirect) router.push({ name: redirect });
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
          redirect: kpUtils.routerUrl.Login.name,
          ...this.getTpl(),
        });
      })
      .catch(() => {
        store.commit('setModal', {
          title: this.e('warningTitle', store),
          message: this.e('serverError', store),
        });

        store.commit('setUser', {
          redirect: kpUtils.routerUrl.Login.name,
          ...this.getTpl(),
        });
      });
  },
  e(copy, store) {
    return kpUtils.getTextByLang(utilLang, copy, store.state.setup.lang);
  },
};
