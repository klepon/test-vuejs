<template>
  <section class="container-fluid">
    <div v-show="user.token && isParent()">
      <h1>Project List</h1>
      <a class="nav-link" href="/#/Project/AddProject">Add Project</a>

      <ul>
        <li>
          <a href="/#/Project/1">Project 1</a>
        </li>
        <li>
          <a href="/#/Project/2">Project 2</a>
        </li>
        <li>
          <a href="/#/Project/23">Project 23</a>
        </li>
      </ul>

    </div>

    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'ProjectList',
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
