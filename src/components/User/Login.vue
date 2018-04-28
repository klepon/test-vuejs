<template>
  <formPanel
    v-bind:title="e('pageTitle')"
    v-bind:labelUserEmail="e('userNameLabel')"
    v-bind:labelPassword="e('passwordLabel')"
    v-bind:loading="loading"

    v-bind:resultError="e(loginError)"
    v-bind:submitButton="e('loginButton')"
    v-bind:switchText="e('noAccountText')"
    v-bind:switchButtonText="e('registerButton')"
    v-bind:switchUrl="routerUrl.Register.path"
    v-bind:componentText="componentText"
    v-bind:minPassLength="1"
    v-on:postAPI="doLogin"
    v-on:startProcess="startProcess"
    v-on:endProcess="endProcess"
  />
</template>

<script>
import componentText from './login.lang';
import url from './_var';
import formPanel from './FormPanel';

export default {
  name: 'Login',
  components: {
    formPanel,
  },
  data() {
    return {
      loginError: '',
      loading: false,
      routerUrl: this.$kpUtils.routerUrl,
      componentText,
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    startProcess() {
      this.loginError = '';
      this.loading = true;
    },
    endProcess() {
      this.loading = false;
    },
    doLogin({ user, pass }) {
      // connect API
      fetch(url.login, {
        body: JSON.stringify({
          email: user,
          password: pass,
        }), // must match 'Content-Type' header
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then((userData) => {
          // if success, login user
          if (userData.email) {
            this.$store.commit('setUser', {
              redirect: this.$kpUtils.routerUrl.Dashboard.name,
              ...userData,
            });
          } else if (userData.error) { // if error login
            this.$kpUtils.modalWarning({ message: this.e(userData.error.message) });
            this.loading = false;
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          this.loading = false;
          return null;
        });
    },
  },
};
</script>
