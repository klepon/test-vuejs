<template>
  <v-flex py-0>
    <v-btn @click.stop="drawer = !drawer" class="hidden-md-and-up btn--bottom btn--floating btn--fixed btn--right fixed primary">
      <v-icon dark>more_vert</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      :class="slideOnXs"
      :style="`${drawerStyle()} ${showSmAndUp}`"
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

          <v-list-tile-action v-if="showMiniTrigger">
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="!showMiniTrigger">
            <v-btn icon @click.native.stop="drawer = !drawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>

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
            :href="url('AccountProfile')">
            <v-list-tile-title>{{e('profile')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('profile', 'sub')">recent_actors</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile
            v-if="state.user.token"
            :href="url('AccountChangePassword')">
            <v-list-tile-title>{{e('changePassword')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('change-password', 'sub')">vpn_key</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile
            v-if="state.user.token"
            :href="url('AccountDeleteAccount')">
            <v-list-tile-title>{{e('removeAccount')}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon :color="isActive('remove-account', 'sub')">delete</v-icon>
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
      windowHeight: 0,
      windowScrollY: 0,
      drawer: false,
      mini: true,
      showMiniTrigger: true,
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
    isActive(name, sub) {
      if (this.$route.matched[0] === undefined) return '';

      if (sub !== undefined) {
        if (name === this.$route.params.sub) return 'primary';
      }

      return this.$route.matched[0].name === name ? 'primary' : '';
    },
    switchLang(langCode, e) {
      if (e !== null) e.preventDefault();
      this.$store.commit('switchLang', langCode);
    },
    url(page) {
      return this.$kpUtils.routerUrl[page].path;
    },
    drawerStyle() {
      if (!this.drawer) return 'height: 100%;';
      return `height: ${this.windowHeight}px; top: ${this.windowScrollY}px; overflow:scroll;`;
    },
  },
  beforeMount() {
    // check lang, use localStorage data
    const lsLang = this.$kpUtils.getStringLocalStorage('mandorLang');
    if (lsLang !== this.$store.state.setup.lang) {
      this.switchLang(lsLang, null);
    }
  },
  mounted() {
    const self = this;
    self.windowScrollY = window.scrollY;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        self.windowHeight = window.innerHeight;
        self.drawer = self.hideDrawerOverlayXsAndUp;
        if (self.drawer) {
          self.mini = false;
          self.showMiniTrigger = false;
        } else {
          self.showMiniTrigger = true;
        }
      });

      window.addEventListener('scroll', () => {
        self.windowScrollY = window.scrollY;
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleScroll);
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    slideOnXs() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return 'navigation-drawer--temporary navigation-drawer--absolute';
        default: return 'navigation-drawer--permanent';
      }
    },
    hideDrawerOverlayXsAndUp() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return this.drawer;
        default: return false;
      }
    },
    showSmAndUp() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return '';
        default: return 'transform: none;';
      }
    },
  },
};
</script>
