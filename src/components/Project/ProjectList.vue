<template>
  <section class="container-fluid">

    <nav v-if="user.token && !isParent()" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('addProject')}}</li>
      </ol>
    </nav>

    <h1>{{e(util.pageTitle)}}</h1>

    <div v-if="user.token && isParent()">
      <a v-if="!projects.error" class="nav-link" href="/#/Project/AddProject">{{e('addProjectBtn')}}</a>

      <div v-show="util.loading" class="row">
        {{e('loadingText')}} <div class="loader"></div>
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

    <router-view :key="$route.fullPath"/>
  </section>
</template>

<script>
import componentText from './projectList.lang';
import url from './_var';

export default {
  name: 'ProjectList',
  data() {
    return {
      user: this.$store.state.user,
      util: {
        loading: false,
        pageTitle: 'projectList',
      },
      projects: {},
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    isParent() {
      return this.$route.matched.length === 1;
    },
    getProjetList() {
      this.util.loading = true;

      // connect API
      fetch(`${url.getProjects}${this.user.token}`)
        .then(response => response.json())
        .then((jsonData) => {
          this.projects = jsonData;
          this.util.loading = false;
        })
        .catch(() => {
          this.$kpUtils.utilModal({
            title: 'warningTitle',
            message: 'serverError',
          });

          this.util.loading = false;
        });
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
    this.getProjetList();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === this.$kpUtils.routerUrl.Project.name && from.name === this.$kpUtils.routerUrl.AddProject.name) {
      this.getProjetList();
    }

    // switch page title
    switch (to.name) {
      case this.$kpUtils.routerUrl.AddProject.name:
        this.util.pageTitle = 'addProject';
        break;
      case this.$kpUtils.routerUrl.ProjectID.name:
        this.util.pageTitle = 'projectDetail';
        break;
      default:
        this.util.pageTitle = 'projectList';
    }

    next();
  },
};
</script>
