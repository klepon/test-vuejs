<template>
  <div v-if="showLoading">
    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    <p>{{loadingText}}</p>
  </div>
</template>

<script>

export default {
  name: 'LoadingText',
  props: ['loadingText', 'showLoading'],
};
</script>
