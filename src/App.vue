<template>
  <v-app>
    <v-content>
      <v-toolbar color="white">
        <v-toolbar-items>
          <v-btn flat :href="url('Homepage')">home</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat>Link One</v-btn>
          <v-btn flat>Link Two</v-btn>
          <v-btn flat>Link Three</v-btn>
        </v-toolbar-items>

        <v-toolbar-side-icon class="hidden-sm-and-up"></v-toolbar-side-icon>
      </v-toolbar>
      <section class="header container">
        <div class="layout nav-border">
          <div>
            <a class="nav-link" :href="url('Homepage')"><img :src="$store.state.setup.logoImage" class="logo"></a>
          </div>
          <div v-if="state.user.token">
            <a :class="`nav-link${isActive('Dashboard')}`" :href="url('Dashboard')">Dashboard</a>
          </div>
          <div v-if="state.user.token">
            <a :class="`nav-link${isActive('Project')}`" :href="url('Project')">Project</a>
          </div>
          <div v-if="state.user.token">
            <a :class="`nav-link${isActive('Task')}`" :href="url('Task')">Task</a>
          </div>
          <div v-if="state.user.token && state.user.role === 1">
            <a :class="`nav-link${isActive('Report')}`" :href="url('Report')">Report</a>
          </div>
          <div v-if="state.user.token && state.user.role === 3">
            <a :class="`nav-link${isActive('Report')}`" :href="`${url('Report')}${url('MyReport')}`">My Report</a>
          </div>
          <div v-if="state.user.token && state.user.role === 1">
            <a :class="`nav-link${isActive('User')}`" :href="url('Member')">Member</a>
          </div>
          <div v-if="state.user.token">
            <a :class="`nav-link${isActive('Account')}`" :href="url('Account')">Account</a>
          </div>
          <div v-if="state.user.token">
            <a @click="logout" class="nav-link" :href="url('Homepage')">Logout</a>
          </div>
          <div v-if="!state.user.token">
            <a :class="`nav-link${isActive('Login')}`" :href="url('Login')">Login</a>
          </div>
          <div v-if="!state.user.token">
            <a :class="`nav-link${isActive('Register')}`" :href="url('Register')">Register</a>
          </div>
          <div v-if="setup.lang === 'en'">
            <a @click="switchLang('id', $event)" class="nav-link" href="#">id</a>
          </div>
          <div v-if="setup.lang === 'id'">
            <a @click="switchLang('en', $event)" class="nav-link" href="#">en</a>
          </div>
        </div>
      </section>

      <v-layout>
        <v-flex xs1 v-for="(color, i) in app.colors" v-bind:key="i">
          <v-progress-linear value="100" height="7" :color="color"></v-progress-linear>
        </v-flex>
        <v-flex :class="longLine()">
          <v-progress-linear value="100" height="7" color="cyan"></v-progress-linear>
        </v-flex>
      </v-layout>

      <v-container grid-list-md>

        <router-view/>

        <v-dialog v-model="util.modal.show" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly">
          <v-card>
            <v-toolbar :color="util.modal.theme" :dark="util.modal.dark">
              <v-toolbar-title>{{util.modal.title}}</v-toolbar-title>
            </v-toolbar>

            <v-card-text v-html="util.modal.message"></v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.stop="util.modal.show = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      state: this.$store.state,
      setup: this.$store.state.setup,
      util: this.$store.state.util,
      app: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'accent'],
      },
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
      if (e !== null) e.preventDefault();
      this.$store.commit('switchLang', langCode);
    },
    url(page) {
      return this.$kpUtils.routerUrl[page].path;
    },
    longLine() {
      return `xs${12 - this.app.colors.length}`;
    },
  },
  beforeMount() {
    // check lang, use localStorage data
    const lsLang = this.$kpUtils.getStringLocalStorage('mandorLang');
    if (lsLang !== this.$store.state.setup.lang) {
      this.switchLang(lsLang, null);
    }
  },
  computed: {
    hideXs() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'hidden-xs-only';
        default: return '';
      }
    },
  },
};
</script>

<style lang="scss">
  @import 'vue-wysiwyg/dist/vueWysiwyg.css';
  @import 'scss/app.scss';
</style>
