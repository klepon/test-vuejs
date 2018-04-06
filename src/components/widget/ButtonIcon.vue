<template>
  <a class="btn btn-primary"
    :href="link">
    <span class="d-flex align-items-center">
      <icon :name="icon" class="mr-2"></icon>
      <span>{{text}}</span>
    </span>
  </a>
</template>

<script>
export default {
  name: 'ButtonIcon',
  props: ['link', 'text', 'icon'],
};
</script>
