<template>
  <div class="wrapper">
    <section class="header">
      <div class="nav nav-pills">
        <a class="nav-link" :href="url('Homepage')"><img :src="$store.state.setup.logoImage" class="logo"></a>

        <a v-show="state.user.token" :class="`nav-link${isActive('Dashboard')}`" :href="url('Dashboard')">Dashboard</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Project')}`" :href="url('Project')">Project</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Task')}`" :href="url('Task')">Task</a>
        <a v-show="state.user.token && state.user.role === 1" :class="`nav-link${isActive('Report')}`" :href="url('Report')">Report</a>
        <a v-show="state.user.token && state.user.role === 3" :class="`nav-link${isActive('MyReport')}`" :href="`${url('Report')}${url('MyReport')}`">My Report</a>
        <a v-show="state.user.token && state.user.role === 1" :class="`nav-link${isActive('User')}`" :href="url('Member')">Member</a>
        <a v-show="state.user.token" @click="logout" class="nav-link" :href="url('Homepage')">Logout</a>

        <a v-show="!state.user.token" class="nav-link" :href="url('Login')">Login</a>
        <a v-show="!state.user.token" class="nav-link" :href="url('Register')">Register</a>

        <a v-show="setup.lang === 'en'" @click="switchLang('id', $event)" class="nav-link" href="#">id</a>
        <a v-show="setup.lang === 'id'" @click="switchLang('en', $event)" class="nav-link" href="#">en</a>
      </div>
    </section>

    <router-view/>
  </div>
</template>

<script>
import apiUrl from '@/global/apiUrl';
import routerUrl from '@/global/routerUrl';
import fetching from '@/global/fetching';

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

      fetch(`${apiUrl.member}/logout?access_token=${this.$store.state.user.token}`, {
        body: JSON.stringify({}), // must match 'Content-Type' header
        ...fetching.header,
      })
        .then(() => this.$store.commit('logoutUser'))
        .catch(() => null);
    },
    isActive(name) {
      if (this.$route.matched[0] === undefined) return '';
      return this.$route.matched[0].name === name ? ' active' : '';
    },
    switchLang(langCode, e) {
      if (e) e.preventDefault();
      this.$store.commit('switchLang', langCode);
    },
    url(page) {
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
