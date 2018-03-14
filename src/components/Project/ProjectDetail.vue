<template>
  <section class="container-fluid">
    <div v-show="user.token">
      <h1>Project Detail</h1>

      <p>detail project for id: {{$route.params.id}}</p>

      <ul>
        <li>add Task</li>
        <li>add task group</li>
        <li>manage board, add, edit, remove coloumn</li>
      </ul>

    </div>
  </section>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
