<template>
  <v-alert :type="getTheme()" :value="showError">
    <strong>{{errorName}}:</strong> {{errorMessage}}
  </v-alert>
</template>

<script>

export default {
  name: 'ErrorMessage',
  props: ['errorName', 'errorMessage', 'showError', 'theme'],
  methods: {
    getTheme() {
      return this.theme === undefined ? 'error' : this.theme;
    },
  },
};
</script>
