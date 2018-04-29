<template>
  <section class="project">

    <nav v-if="user.token && !isParent()" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="$kpUtils.routerUrl.Project.path">{{e(util.pagetTitleMapping[$kpUtils.routerUrl.Project.name])}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{projectNameByRouteId()}}</li>
      </ol>
    </nav>

    <div v-if="isParent()" class="row align-items-center justify-content-between">
      <div class="col-12 col-sm-7">
        <h1>{{projectNameByRouteId()}}</h1>
      </div>
      <div v-if="user.access.createProject" class="col-12 col-sm-5 text-sm-right mb-2 mb-sm-0">
        <v-btn :href="`${$kpUtils.routerUrl.Project.path}${$kpUtils.routerUrl.AddProject.path}`" flat primary>
          <v-icon dark left>add</v-icon>
          {{e('addProjectBtn')}}
        </v-btn>

      </div>

      show add project buat yg punya hak dan hide buat yg tidak punya hak
      <br />
      saat register haris buat ompany, access, group, kalo nggak, nggak bisa masuk
      <br/>

    </div>

    <div v-if="user.token && isParent()">
      <!-- show loading -->
      <v-progress-linear indeterminate color="cyan"></v-progress-linear>

      <loadingText v-bind:showLoading="isLoading()" v-bind:loadingText="e('loadingText')" />

      <!-- if error -->
      <errorMessage v-bind:showError="$kpUtils.isError(projects)"
        v-bind:errorName="$kpUtils.getErrorName(projects)"
        v-bind:errorMessage="$kpUtils.getErrorMessage(projects, e)" />

      <!-- list filter -->
      <listingFilter v-if="!$kpUtils.isError(projects) && !isLoading()"
        v-bind:data="projects"
        v-on:updateData="updateProjectRender"
        v-bind:keywordPlaceholder="e('search')"
        v-bind:searchIn="['name', 'description']"
        v-bind:sortByLabel="e('sortBy')"
        v-bind:sortByList="sortByList"
      />

      <!-- project listing -->
      <div v-if="isProjectExist()" class="list-group">
        <a v-for="project in getProjects()" v-show="isVisible(project)"
          v-bind:key="project.id"
          :href="projectDetailUrl(project)"
          class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{project.name}}</h5>
            <small>{{$kpUtils.date(project.date)}} - date end/due date</small>
          </div>
          <p v-html="project.description" class="mb-1" />
          <small>small info, milestone, percentage progress, etc</small>
        </a>
      </div>

      <!-- list pagination -->
      <pagination v-if="!$kpUtils.isError(projects)"
        v-bind:currentPage="page"
        v-bind:perpage="perpage"
        v-bind:total="total"
        v-on:setPage="setPage"
      />


    </div>

    <router-view :key="$route.fullPath"/>

  </section>
</template>

<script>
/* eslint-disable no-plusplus */
import componentText from './projectList.lang';
import url from './_var';
import loadingText from '../widget/LoadingText';
import errorMessage from '../widget/ErrorMessage';
import listingFilter from '../widget/ListingFilter';
import buttonIcon from '../widget/ButtonIcon';
import pagination from '../widget/Pagination';

export default {
  name: 'ProjectList',
  components: {
    loadingText,
    errorMessage,
    listingFilter,
    buttonIcon,
    pagination,
  },
  data() {
    return {
      user: this.$store.state.user,
      util: {
        loading: false,
        pagetTitleMapping: {
          [this.$kpUtils.routerUrl.AddProject.name]: 'addProject',
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
      perpage: 4,
      page: 0,
      total: 0,
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
        return this.projects.find(p => p.id === this.$route.params.id * 1).name;
      }

      return this.e(this.util.pagetTitleMapping[this.$route.name]);
    },
    projectDetailUrl(project) {
      return `${this.$kpUtils.routerUrl.Project.path}${this.$kpUtils.routerUrl.ProjectID.path}${project.id}/${project.name}/`;
    },
    updateProjectRender(newProject) {
      this.projects = newProject;
    },
    isVisible(project) {
      return project.visible || project.visible === undefined;
    },
    isLoading() {
      return this.util.loading;
    },
    isProjectExist() {
      return !this.$kpUtils.isError(this.projects) && !this.isLoading() && this.projects.length > 0;
    },
    getProjects() {
      const start = this.page * this.perpage;
      const visibleProject = this.projects.filter(p => this.isVisible(p));
      this.total = visibleProject.length;
      return visibleProject.slice(start, start + this.perpage);
    },
    setPage(page) {
      this.page = page;
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
