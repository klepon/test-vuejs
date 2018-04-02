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
    v-on:postAPI="postLogin"
    v-on:startProcess="startProcess"
    v-on:endProcess="endProcess"
  />
</template>

<script>
import routerUrl from '@/global/routerUrl';
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
      routerUrl,
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
    postLogin({ user, pass }) {
      // connect API
      fetch(url.login, {
        body: JSON.stringify({
          email: user,
          password: pass,
        }), // must match 'Content-Type' header
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then(jsonData => this.getUserData(jsonData))
        .catch(() => {
          this.$kpUtils.utilModal({
            title: 'warningTitle',
            message: 'serverError',
          });

          this.loading = false;
          return null;
        });
    },
    getUserData(loginResult) {
      // if error
      if (loginResult.error && loginResult.error.message) {
        this.loginError = loginResult.error.message;
        this.loading = false;
        return;
      }

      // if success, get user data
      if (loginResult.id) {
        fetch(`${url.member}/${loginResult.userId}?access_token=${loginResult.id}`)
          .then(response => response.json())
          .then((userData) => {
            // if success, login user
            if (userData.email) {
              this.$store.commit('setUser', {
                redirect: routerUrl.Dashboard.name,
                token: loginResult.id,
                ...userData,
              });
            }
          })
          .catch(() => {
            this.loading = false;
            return null;
          });
      }
    },
  },
};
</script>
