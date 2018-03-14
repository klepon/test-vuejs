<template>
  <section class="container-fluid">
    <div v-show="user.token">
      <h2>Personal Report</h2>
      <p>laporan perorang, misal ekian jam di log, sekian task kelar/mandek dll</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PersonalReport',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
