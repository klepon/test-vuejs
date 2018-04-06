<template>
  <section class="project">

    <nav v-if="user.token && !isParent()" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('addProject')}}</li>
      </ol>
    </nav>

    <div class="row align-items-center justify-content-between">
      <div class="col">
        <h1>{{e(util.pageTitle)}}{{projectNameByRouteId()}}</h1>
      </div>
      <div v-if="user.token && isParent()" class="col text-right">
        <buttonIcon
          v-bind:link="`/#${$kpUtils.routerUrl.Project.path}${$kpUtils.routerUrl.AddProject.path}`"
          v-bind:text="e('addProjectBtn')"
          icon="plus" />
      </div>
    </div>

    <div v-if="user.token && isParent()">
      <!-- add project, search, and orderby -->
      <listingFilter v-if="!projects.error && !util.loading"
        v-bind:data="projects"
        v-on:updateData="updateProjectRender"
        v-bind:addItemButtonText="e('addProjectBtn')"
        v-bind:addItemButtonLink="`/#${$kpUtils.routerUrl.Project.path}${$kpUtils.routerUrl.AddProject.path}`"
        v-bind:keywordPlaceholder="e('search')"
        v-bind:searchIn="['name', 'description']"
        v-bind:sortByLabel="e('sortBy')"
        v-bind:sortByList="sortByList"
      />

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
        <a v-for="project in projects" v-show="showItem(project)"
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


    </div>

    <router-view :key="$route.fullPath"/>

  </section>
</template>

<script>
/* eslint-disable no-plusplus */
import componentText from './projectList.lang';
import url from './_var';
import listingFilter from '../widget/ListingFilter';
import buttonIcon from '../widget/ButtonIcon';
import pagination from '../widget/Pagination';

export default {
  name: 'ProjectList',
  components: {
    listingFilter,
    buttonIcon,
    pagination,
  },
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
      sortByList: [
        { text: this.e('sortNameAsc'), value: 'name~asc' },
        { text: this.e('sortNameDesc'), value: 'name~desc' },
        { text: this.e('sortDateAsc'), value: 'date~desc' },
        { text: this.e('sortDateDesc'), value: 'date~asc' },
      ],
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
    updateProjectRender(newProject) {
      this.projects = newProject;
    },
    showItem(project) {
      return project.visible || project.visible === undefined;
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
