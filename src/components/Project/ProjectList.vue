<template>
  <section class="container-fluid">

    <nav v-if="user.token && !isParent()" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('addProject')}}</li>
      </ol>
    </nav>

    <h1>{{e(util.pageTitle)}}{{projectNameByRouteId()}}</h1>

    <div v-if="user.token && isParent()">
      <a v-if="!projects.error" class="nav-link" href="/#/Project/AddProject">{{e('addProjectBtn')}}</a>

      <div v-show="util.loading" class="row">
        {{e('loadingText')}} <div class="loader"></div>
      </div>

      <div v-if="projects.error" class="alert alert-danger">
        <strong>{{projects.error.name}}:</strong> {{e(projects.error.message)}}
      </div>

      <div v-if="projects.length > 0" class="list-group">
        <a v-for="project in projects"
          v-bind:key="project.id"
          :href="`/#/Project/${project.id}/${project.name}/`"
          class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{project.name}}</h5>
            <small>put date here</small>
          </div>
          <p v-html="project.description" class="mb-1" />
          <small>small info, number of member maybe</small>
        </a>
      </div>
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
        pagetTitleMapping: {
          [this.$kpUtils.routerUrl.AddProject.name]: 'addProject',
          [this.$kpUtils.routerUrl.ProjectID.name]: 'projectDetail',
          [this.$kpUtils.routerUrl.Project.name]: 'projectList',
        },
      },
      projects: [],
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
    projectNameByRouteId() {
      if (this.$route.params.id && this.projects[0]) {
        this.util.pageTitle = this.util.pagetTitleMapping[this.$kpUtils.routerUrl.ProjectID.name];
        return this.projects.find(p => p.id === this.$route.params.id * 1).name;
      }

      this.util.pageTitle = this.util.pagetTitleMapping[this.$route.name];
      return '';
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
    this.getProjetList();
  },
  beforeRouteUpdate(to, from, next) {
    // reload data after save add project
    if (to.name === this.$kpUtils.routerUrl.Project.name && from.name === this.$kpUtils.routerUrl.AddProject.name) {
      this.getProjetList();
    }

    next();
  },
};
</script>
