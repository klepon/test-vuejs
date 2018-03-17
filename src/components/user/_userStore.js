// Import Vue
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';
import fetching from '@/global/fetching';
import variable from './_var';

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

  /* set user data on store to mark login/logout
  * how to use; add on store mutations
    setUser(state, params) {
      User.setUser(state, params);
    },
  */
  setUser(state, params) {
    // set user detil
    state.user = { ...params.userData };

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
    fetch(`${variable.apiUrl.member}/logout?access_token=${store.state.user.token}`, {
      body: JSON.stringify({}),
      ...fetching.header,
    })
      .then(() => {
        store.commit('setUser', {
          redirect: routerUrl.Homepage.name,
          userData: { ...this.tpl },
        });
      })
      .catch(() => null);
  },
};
