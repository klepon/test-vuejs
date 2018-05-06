<template>
  <v-app>
    <v-content>
      <v-layout>
        <v-flex xs1 v-for="(color, i) in app.colors" v-bind:key="i">
          <v-progress-linear value="100" height="7" :color="color" class="ma-0"></v-progress-linear>
        </v-flex>
        <v-flex>
          <v-progress-linear value="100" height="7" color="cyan" class="ma-0"></v-progress-linear>
        </v-flex>
      </v-layout>

      <v-container grid-list-lg py-0 style="height: 100%;">
        <v-layout style="height: 100%;">
          <heading />

          <v-flex xs12 py-3>
            <router-view/>
          </v-flex>
        </v-layout>
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

import heading from './components/widget/Heading';

export default {
  name: 'App',
  components: {
    heading,
  },
  data() {
    return {
      setup: this.$store.state.setup,
      util: this.$store.state.util,
      app: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'accent'],
      },
    };
  },
};
</script>

<style lang="scss">
  @import 'vue-wysiwyg/dist/vueWysiwyg.css';
  @import 'scss/app.scss';
</style>
