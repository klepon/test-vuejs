<template>
  <section class="project">

    <nav v-if="user.token && !isParent()" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('addProject')}}</li>
      </ol>
    </nav>

    <h1>{{e(util.pageTitle)}}{{projectNameByRouteId()}}</h1>

    <div v-if="user.token && isParent()">
      <!-- add project, serach, and orderby -->
      <b-form v-if="!projects.error && !util.loading" @submit="onSubmit" class="form-inline">
        <a class="btn btn-primary" href="/#/Project/AddProject">{{e('addProjectBtn')}}</a>

        <b-form-group label-for="keyword">
          <b-form-input id="keyword"
            type="text"
            v-model="keyword"
            placeholder="search project">
          </b-form-input>
        </b-form-group>

        <label for="">Sort by:
          <select class="" name="">
            <option value="">Project name ascending</option>
            <option value="">Project name ascending</option>
            <option value="">Project name ascending</option>
            <option value="">Project name ascending</option>
          </select>
        </label>

      </b-form>

      <!-- show loading -->
      <div v-show="util.loading" class="row">
        {{e('loadingText')}} <div class="loader"></div>
      </div>

      <!-- if error -->
      <div v-if="projects.error" class="alert alert-danger">
        <strong>{{projects.error.name}}:</strong> {{e(projects.error.message)}}
      </div>

      <!-- project listing -->
      <div v-if="projects.length > 0" class="list-group">
        <a v-for="project in projects"
          v-bind:key="project.id"
          :href="`/#/Project/${project.id}/${project.name}/`"
          class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{project.name}}</h5>
            <small>{{$kpUtils.date(project.date)}} - date end/due date</small>
          </div>
          <p v-html="project.description" class="mb-1" />
          <small>small info, milestone, percentage progress, etc</small>
        </a>
      </div>

      <!-- add project and orderby bottom -->
      <div v-if="!projects.error && !util.loading" class="row">
        <a class="col-6 btn btn-primary" href="/#/Project/AddProject">{{e('addProjectBtn')}}</a>
        <select class="col-6 " name="">

        </select>
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
      keyword: '',
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
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
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
