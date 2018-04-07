<template>
  <div v-if="showLoading" class="d-flex flex-column align-items-center">
    <div class="loader mb-3"></div>
    <div class="text-xs-center text-sm-left">{{loadingText}}</div>
  </div>
</template>

<script>

export default {
  name: 'LoadingText',
  props: ['loadingText', 'showLoading'],
};
</script>
