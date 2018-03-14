<template>
  <section class="container-fluid">
    <div v-show="!user.token">
      <h1>tak ada token, silahkan login dulu</h1>
    </div>
    <div v-show="user.token">
      <h1>Dashboard</h1>

      <div class="col-sm-6 col-md-4">
        <h3>{{user.name}}</h3>
        <p>{{user.position}}</p>
      </div>
      <p>berisi ringkasan project, task, dan report, misal 20 task complit, 30 bug, 2 project done, 1 mangkrak, etc</p>
      <p>project -> task -> task status</p>
      <p>sortcut</p>
      <ul>
        <li>add project</li>
        <li>add member</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
