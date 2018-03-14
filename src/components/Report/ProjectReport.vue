<template>
  <section class="container-fluid">
    <div v-show="user.token && isParent()">
      <h2>Project Report</h2>
      <p>laporan project, misal sekian task/projek kelar/mandek, sekian member kerja, sekian bug, etc</p>

    </div>

    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'ProjectReport',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  methods: {
    isParent() {
      return this.$route.matched.length === 1;
    },
  },
};
</script>
