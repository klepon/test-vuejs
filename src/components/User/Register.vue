<template>
  <formPanel
    v-bind:title="e('pageTitle')"
    v-bind:labelUserEmail="e('userNameLabel')"
    v-bind:labelPassword="e('passwordLabel')"

    v-bind:resultError="e(registerError)"
    v-bind:submitButton="e('registerButton')"
    v-bind:switchText="e('haveAccountText')"
    v-bind:switchButtonText="e('loginButton')"
    v-bind:switchUrl="routerUrl.Login.path"
    v-bind:componentText="componentText"
    v-on:postAPI="postUser"
    v-on:resetError="registerError = ''"
  />
</template>

<script>
import router from '@/global/router';
import getTextByLang from '@/global/getTextByLang';
import apiUrl from '@/global/apiUrl';
import routerUrl from '@/global/routerUrl';
import fetching from '@/global/fetching';
import componentText from './register.lang';
import formPanel from './FormPanel';

export default {
  name: 'Register',
  components: {
    formPanel,
  },
  data() {
    return {
      registerError: '',
      routerUrl,
      componentText,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    postUser({ user, pass }) {
      // connect API
      fetch(apiUrl.register, {
        body: JSON.stringify({
          role: 1,
          discipline: '',
          name: '',
          realm: '',
          username: user,
          email: user,
          password: pass,
          emailVerified: true,
        }), // must match 'Content-Type' header
        ...fetching.header,
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
            return;
          }

          // success
          if (jsonData.id) {
            router.push({ name: routerUrl.Login.name });
          }
        })
        .catch(() => null);
    },
  },
};
</script>
