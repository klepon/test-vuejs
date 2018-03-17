<template>
  <formPanel
    v-bind:title="e('pageTitle')"
    v-bind:labelUserEmail="e('userNameLabel')"
    v-bind:labelPassword="e('passwordLabel')"

    v-bind:resultError="e(loginError)"
    v-bind:submitButton="e('loginButton')"
    v-bind:switchText="e('noAccountText')"
    v-bind:switchButtonText="e('registerButton')"
    v-bind:switchUrl="routerUrl.Register.path"
    v-bind:componentText="componentText"
    v-bind:minPassLength="1"
    v-on:postAPI="postLogin"
    v-on:resetError="loginError = ''"
  />
</template>

<script>
import getTextByLang from '@/global/getTextByLang';
import routerUrl from '@/global/routerUrl';
import fetching from '@/global/fetching';
import componentText from './login.lang';
import variable from './_var';
import formPanel from './FormPanel';

export default {
  name: 'Login',
  components: {
    formPanel,
  },
  data() {
    return {
      loginError: '',
      routerUrl,
      componentText,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    postLogin({ user, pass }) {
      // connect API
      fetch(variable.apiUrl.login, {
        body: JSON.stringify({
          email: user,
          password: pass,
        }), // must match 'Content-Type' header
        ...fetching.header,
      })
        .then(response => response.json())
        .then(jsonData => this.getUserData(jsonData))
        .catch(() => null);
    },
    getUserData(loginResult) {
      // if error
      if (loginResult.error && loginResult.error.message) {
        this.loginError = loginResult.error.message;
        return;
      }

      // if success, get user data
      if (loginResult.id) {
        fetch(`${variable.apiUrl.member}/${loginResult.userId}?access_token=${loginResult.id}`)
          .then(response => response.json())
          .then((userData) => {
            // if success, login user
            if (userData.email) {
              this.$store.commit('setUser', {
                redirect: routerUrl.Dashboard.name,
                userData: { token: loginResult.id, ...userData },
              });
            }
          })
          .catch(() => null);
      }
    },
  },
};
</script>
