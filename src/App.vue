<template>
  <div class="wrapper">
    <section class="header">
      <img :src="$store.state.setup.logoImage" class="logo">

      <ul class="nav">
        <a class="nav-link" href="/#/">Homepage</a>
        <a class="nav-link" href="/#/Wysiwyg">Wysiwyg</a>
        <a class="nav-link" href="/#/Iframe">Iframe</a>
      </ul>

    </section>

    <section class="content">
      <router-view/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  @import 'vue-wysiwyg/dist/vueWysiwyg.css';
</style>

<style lang="scss">
  @import 'scss/bootstrap/bootstrap.scss';
  @import 'scss/app.scss';
</style>
