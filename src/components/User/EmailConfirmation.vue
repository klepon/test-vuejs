<template>
  <section class="container-fluid">
    {{$route.params}}
    <b-card>
      <h1>{{e('title')}}</h1>
      <p>{{e('verifiying')}}</p>
      <div class="loader"></div>
    </b-card>
  </section>
</template>

<script>
// import router from '@/global/router';
import componentText from './email-confirmation.lang';

export default {
  name: 'Dashboard',
  data() {
    return {
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
  },
};
</script>
