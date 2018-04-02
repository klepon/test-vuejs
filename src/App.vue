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

      <div class="row header-line">
        <div class="col-sm-1 bg-primary"></div>
        <div class="col-sm-1 bg-secondary"></div>
        <div class="col-sm-1 bg-success"></div>
        <div class="col-sm-1 bg-danger"></div>
        <div class="col-sm-1 bg-warning"></div>
        <div class="col-sm-1 bg-light"></div>
        <div class="col-sm-1 bg-info"></div>
        <div class="col-sm-5 bg-dark"></div>
      </div>
    </section>

    <router-view/>

    <b-modal v-model="util.modal.show"
      :hide-footer=true
      :title="util.modal.title"
      :header-bg-variant="util.modal.theme"
      :header-text-variant="util.modal.themeColor"
      >
      <p v-html="util.modal.message"></p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      state: this.$store.state,
      setup: this.$store.state.setup,
      util: this.$store.state.util,
    };
  },
  methods: {
    logout(e) {
      e.preventDefault();
      this.$store.commit('logoutUser');
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
      if (child) return this.$kpUtils.routerUrl[page].path;

      return `/#${this.$kpUtils.routerUrl[page].path}`;
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
