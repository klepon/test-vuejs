<template>
  <div v-if="showError" :class="`alert alert-${getTheme()}`">
    <strong>{{errorName}}:</strong> {{errorMessage}}
  </div>
</template>

<script>

export default {
  name: 'ErrorMessage',
  props: ['errorName', 'errorMessage', 'showError', 'theme'],
  methods: {
    getTheme() {
      return this.theme === undefined ? 'danger' : this.theme;
    },
  },
};
</script>
