<template>
  <section class="container-fluid">
    <div v-show="user.token">
      <h1>Task List</h1>
      <b>sepertinya bakal gabung ke project detail</b>
      <p>daftar task sesuai yg login dan projectnya, semua task bisa dilihat selama dia diprojek tersebut</p>
      <p>lengkapi dengan filter agar mudah di cari</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
