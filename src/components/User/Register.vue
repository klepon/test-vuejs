<template>
  <formPanel
    v-bind:title="e('pageTitle')"
    v-bind:labelUserEmail="e('userNameLabel')"
    v-bind:labelPassword="e('passwordLabel')"
    v-bind:loading="loading"

    v-bind:resultError="e(registerError)"
    v-bind:submitButton="e('registerButton')"
    v-bind:switchText="e('haveAccountText')"
    v-bind:switchButtonText="e('loginButton')"
    v-bind:switchUrl="routerUrl.Login.path"
    v-bind:componentText="componentText"
    v-bind:minPassLength="6"
    v-on:postAPI="postUser"
    v-on:startProcess="startProcess"
    v-on:endProcess="endProcess"
  />
</template>

<script>
import router from '@/global/router';
import componentText from './register.lang';
import url from './_var';
import formPanel from './FormPanel';

export default {
  name: 'Register',
  components: {
    formPanel,
  },
  data() {
    return {
      registerError: '',
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
    postUser({ user, pass }) {
      // connect API
      fetch(url.member, {
        body: JSON.stringify({
          email: user,
          password: pass,
          lang: this.$store.state.setup.lang,
        }), // must match 'Content-Type' header
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then((jsonData) => {
          // error - email exist
          if (jsonData.error &&
            jsonData.error.details &&
            jsonData.error.details.messages &&
            jsonData.error.details.messages.email
          ) {
            this.registerError = 'emailExist';
            this.loading = false;
            return;
          }

          // success
          if (jsonData.id) {
            router.push({ name: this.$kpUtils.routerUrl.Login.name });
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
