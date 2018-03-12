<template>
  <div class="">
    Wysiwyg editor
    <br />
    <wysiwyg v-model="$store.state.data.sampleText" />
  </div>
</template>

<script>
export default {
  name: 'WysiwygEditor',
};
</script>
