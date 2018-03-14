<template>
  <div class="wrapper">
    <section class="header">

      <div class="nav nav-pills">
        <a class="nav-link" href="/#/"><img :src="$store.state.setup.logoImage" class="logo"></a>

        <a v-show="state.user.token" :class="`nav-link${isActive('Dashboard')}`" href="/#/Dashboard">Dashboard</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Project')}`" href="/#/Project">Project</a>
        <a v-show="state.user.token" :class="`nav-link${isActive('Task')}`" href="/#/Task">Task</a>
        <a v-show="state.user.token && state.user.level === 1" :class="`nav-link${isActive('Report')}`" href="/#/Report">Report</a>
        <a v-show="state.user.token && state.user.level === 3" :class="`nav-link${isActive('MyReport')}`" href="/#/Report/MyReport">My Report</a>
        <a v-show="state.user.token && state.user.level === 1" :class="`nav-link${isActive('User')}`" href="/#/Member">Member</a>
        <a v-show="state.user.token" @click="logout" class="nav-link" href="/#/">Logout</a>

        <a v-show="!state.user.token" class="nav-link" href="/#/Login">Login</a>
        <a v-show="!state.user.token" class="nav-link" href="/#/Register/">Register</a>

        <a v-show="setup.lang === 'en'" @click="switchLang('id', $event)" class="nav-link" href="#">id</a>
        <a v-show="setup.lang === 'id'" @click="switchLang('en', $event)" class="nav-link" href="#">en</a>
      </div>

    </section>

    <router-view/>
  </div>
</template>

<script>
import apiUrl from '@/helper/apiUrl';

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
        method: 'POST', // or 'PUT'
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(() => this.$store.commit('setUser', { login: false }))
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
