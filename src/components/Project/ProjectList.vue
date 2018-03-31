<template>
  <section class="container-fluid">
    <div v-if="user.token && isParent()">
      <h1>{{e('projectList')}}</h1>
      <a class="nav-link" href="/#/Project/AddProject">Add Project</a>

      <div v-show="util.loading" class="">
        Loading.... <div class="loader"></div>
      </div>

      <div v-if="projects.error" class="alert alert-danger">
        <strong>{{projects.error.name}}:</strong> {{e(projects.error.message)}}
      </div>

      <ul v-if="projects.length > 0">
        <li v-for="project in projects" v-bind:key="project.id">
          <a :href="`/#/Project/${project.id}`">{{project.name}}</a>
          <p>{{project.description}}</p>
        </li>
      </ul>

    </div>

    <router-view/>
  </section>
</template>

<script>
import componentText from './addProject.lang';
import url from './_var';

export default {
  name: 'ProjectList',
  data() {
    return {
      user: this.$store.state.user,
      util: {
        loading: false,
      },
      projects: {},
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    isParent() {
      return this.$route.matched.length === 1;
    },
    getProjetData() {
      this.util.loading = true;

      // connect API
      fetch(`${url.getProjectAndChild}${this.user.token}`)
        .then(response => response.json())
        .then((jsonData) => {
          this.projects = jsonData;
          this.util.loading = false;
        })
        .catch(() => {
          this.util.loading = false;
        });
    },
  },
  beforeMount() {
    this.getProjetData();
    this.$kpUtils.isLoggedIn();
  },
};
</script>
