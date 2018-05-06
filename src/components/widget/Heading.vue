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
            <img :src="$store.state.setup.logoImage" class="logo">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{$route.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>

        <v-divider></v-divider>

        <v-list-tile
          v-if="state.user.token"
          :href="url('Dashboard')">
          <v-list-tile-action>
            <v-icon :color="isActive('Dashboard')">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="state.user.token"
          :href="url('Project')">
          <v-list-tile-action>
            <v-icon :color="isActive('Project')">extension</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Projects</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="state.user.token"
          :href="url('Task')">
          <v-list-tile-action>
            <v-icon :color="isActive('Task')">assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tasks</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 1"
          :class="`${isActive('Report')}`"
          :href="url('Report')">Report</v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 3"
          :class="`${isActive('Report')}`"
          :href="`${url('Report')}${url('MyReport')}`">Report</v-list-tile>

        <v-list-tile
          v-if="state.user.token && state.user.role === 1"
          :class="`${isActive('User')}`"
          :href="url('Member')">Member</v-list-tile>

        <v-list-group
          prepend-icon="account_box"
          v-if="state.user.token"
          :href="url('Account')">

          <v-list-tile slot="activator">
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-if="state.user.token"
            :href="url('Account')">
            <v-list-tile-title>{{e('profile')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('Account')">recent_actors</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile
            v-if="state.user.token"
            :href="url('Account')">
            <v-list-tile-title>{{e('changePassword')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('Account')">vpn_key</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile
            v-if="state.user.token"
            :href="url('Account')">
            <v-list-tile-title>{{e('removeAccount')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('Account')">delete</v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list-group>

        <v-divider v-if="state.user.token"></v-divider>

        <v-list-tile
          v-if="state.user.token"
          @click="logout">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="!state.user.token"
          :href="url('Login')">
          <v-list-tile-action>
            <v-icon :color="isActive('Login')">lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logins</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="!state.user.token"
          :href="url('Register')">
          <v-list-tile-action>
            <v-icon :color="isActive('Register')">class</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Registers</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="!state.user.token"></v-divider>

        <v-list-tile
          v-if="setup.lang === 'en'"
          @click="switchLang('id', $event)">
          <v-list-tile-action>
            <v-icon>swap_horiz</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ID</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="setup.lang === 'id'"
          @click="switchLang('en', $event)">
          <v-list-tile-action>
            <v-icon>swap_horiz</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>EN</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-flex>
</template>

<script>

import componentText from '../user/account.lang';

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
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    logout(e) {
      e.preventDefault();
      this.$store.commit('logoutUser');
    },
    isActive(name) {
      if (this.$route.matched[0] === undefined) return '';
      return this.$route.matched[0].name === name ? 'primary' : '';
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
