<template>
  <div class="wrapper">
    <section class="header">
      <div class="nav nav-border">
        <a class="nav-link" :href="url('Homepage')"><img :src="$store.state.setup.logoImage" class="logo"></a>

        <a v-show="state.user.token" :class="`nav-link${isActive('Dashboard')}`" :href="url('Dashboard')">Dashboard</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Project')}`" :href="url('Project')">Project</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Task')}`" :href="url('Task')">Task</a>
        <a v-show="state.user.token && state.user.role === 1" :class="`nav-link${isActive('Report')}`" :href="url('Report')">Report</a>
        <a v-show="state.user.token && state.user.role === 3" :class="`nav-link${isActive('Report')}`" :href="`${url('Report')}${url('MyReport', true)}`">My Report</a>
        <a v-show="state.user.token && state.user.role === 1" :class="`nav-link${isActive('User')}`" :href="url('Member')">Member</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Account')}`" :href="url('Account')">Account</a>
        <a v-show="state.user.token" @click="logout" class="nav-link" :href="url('Homepage')">Logout</a>

        <a v-show="!state.user.token" :class="`nav-link${isActive('Login')}`" :href="url('Login')">Login</a>
        <a v-show="!state.user.token" :class="`nav-link${isActive('Register')}`" :href="url('Register')">Register</a>

        <a v-show="setup.lang === 'en'" @click="switchLang('id', $event)" class="nav-link" href="#">id</a>
        <a v-show="setup.lang === 'id'" @click="switchLang('en', $event)" class="nav-link" href="#">en</a>
      </div>
    </section>

    <hr />

    <router-view/>
  </div>
</template>

<script>
import routerUrl from '@/global/routerUrl';

export default {
  name: 'App',
  data() {
    return {
      state: this.$store.state,
      setup: this.$store.state.setup,
    };
  },
  methods: {
    logout(e) {
      e.preventDefault();

      this.$store.commit('logoutUser');

      // fetch(`${apiUrl.member}/logout?access_token=${this.$store.state.user.token}`, {
      //   body: JSON.stringify({}), // must match 'Content-Type' header
      //   ...fetching.header,
      // })
      //   .then(() => this.$store.commit('logoutUser'))
      //   .catch(() => null);
    },
    isActive(name) {
      if (this.$route.matched[0] === undefined) return '';
      return this.$route.matched[0].name === name ? ' active' : '';
    },
    switchLang(langCode, e) {
      if (e) e.preventDefault();
      this.$store.commit('switchLang', langCode);
    },
    url(page, child) {
      if (child) return routerUrl[page].path;

      return `/#${routerUrl[page].path}`;
    },
  },
};
</script>

<style>
  @import 'vue-wysiwyg/dist/vueWysiwyg.css';
</style>

<style lang="scss">
  @import 'scss/bootstrap/bootstrap.scss';
  @import 'scss/app.scss';
</style>
