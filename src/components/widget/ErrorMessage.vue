<template>
  <div v-if="showError" class="alert alert-danger">
    <strong>{{errorName}}:</strong> {{errorMessage}}
  </div>
</template>

<script>

export default {
  name: 'ErrorMessage',
  props: ['errorName', 'errorMessage', 'showError'],
};
</script>
