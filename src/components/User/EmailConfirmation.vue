<template>
  <section class="container-fluid">
    <b-card>
      <h1>{{e('title')}}</h1>
      <div v-if="verified === null">
        <p>{{e('verifiying')}}</p>
        <div class="loader"></div>
      </div>

      <div v-if="verified !== null" class="">
        <b-alert v-if="verified" variant="success" show v-html="successMessage()" />
        <b-alert v-if="!verified" variant="danger" show v-html="errorMessage()" />
      </div>
    </b-card>
  </section>
</template>

<script>
// import router from '@/global/router';
import url from './_var';
import componentText from './email-confirmation.lang';

export default {
  name: 'Dashboard',
  data() {
    return {
      verified: null,
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    successMessage() {
      return this.e('verifySuccess').replace('#~#', this.$kpUtils.routerUrl.Login.path);
    },
    errorMessage() {
      return this.e('verifyFail').replace('#~#', this.$kpUtils.routerUrl.Register.path);
    },
  },
  mounted() {
    // change language
    this.$store.commit('switchLang', this.$route.params.lang);

    // check validity
    fetch(`${url.verifyEmail}${this.$route.params.hash}`)
      .then(response => response.json())
      .then((response) => {
        if (response.verified) {
          this.verified = true;
        } else {
          this.verified = false;
        }
      }).catch((err) => {
        this.$kpUtils.modalServerError(err);
      });
  },
};
</script>
