<template>
  <v-flex py-0>
    <v-btn @click.stop="drawer = !drawer" class="hidden-md-and-up btn--bottom btn--floating btn--fixed btn--right fixed primary">
      <v-icon dark>more_vert</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      :class="slideXs"
      :style="showXsAbove"
      class="cyan lighten-5"
      >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon large>account_box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-if="state.user.token"
          :class="`nav-link${isActive('Dashboard')}`"
          :href="url('Dashboard')">
          <v-list-tile-action>
            <v-icon medium>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="state.user.token"
          :class="`nav-link${isActive('Project')}`"
          :href="url('Project')">Project</v-list-tile>

        <v-list-tile
          v-if="state.user.token"
          :class="`nav-link${isActive('Task')}`"
          :href="url('Task')">Task</v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 1"
          :class="`nav-link${isActive('Report')}`"
          :href="url('Report')">Report</v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 3"
          :class="`nav-link${isActive('Report')}`"
          :href="`${url('Report')}${url('MyReport')}`">Report</v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 1"
          :class="`nav-link${isActive('User')}`"
          :href="url('Member')">Member</v-list-tile>

        <v-list-tile
          v-if="state.user.token"
          @click="logout">Logout</v-list-tile>

        <v-list-tile
          v-if="!state.user.token"
          :class="`nav-link${isActive('Login')}`"
          :href="url('Login')">Login</v-list-tile>

        <v-list-tile
          v-if="!state.user.token"
          :class="`nav-link${isActive('Register')}`"
          :href="url('Register')">Register</v-list-tile>

        <v-list-tile
          v-if="setup.lang === 'en'"
          @click="switchLang('id', $event)">id</v-list-tile>

        <v-list-tile
          v-if="setup.lang === 'id'"
          @click="switchLang('en', $event)">en</v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-flex>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
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
      if (e !== null) e.preventDefault();
      this.$store.commit('switchLang', langCode);
    },
    url(page) {
      return this.$kpUtils.routerUrl[page].path;
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
    slideXs() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': return 'navigation-drawer--temporary navigation-drawer--absolute';
        default: return 'navigation-drawer--permanent';
      }
    },
    showXsAbove() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': return '';
        default: return 'transform: none;';
      }
    },
  },
};
</script>
