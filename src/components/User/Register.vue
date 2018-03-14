<template>
  <div class="container-fluid">
    ini Register
    <a href="#" @click="register">Register</a>
  </div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    register(e) {
      e.preventDefault();
      this.$store.commit('setUser', { token: 'token aja', level: 3, login: true });
    },
  },
};
</script>
