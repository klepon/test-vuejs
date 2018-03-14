/* eslint-disable max-len */
<template>
  <div class="container-fluid">
    <div v-show="!user.token">
      <h1>tak ada token, silahkan login dulu</h1>
    </div>
    <div v-show="user.token">
      <h1>Member</h1>
      <p>berisi daftar user</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Member',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
