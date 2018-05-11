<template>
  <section class="project">
    <!-- title and AddProject -->
    <v-layout align-center>
      <v-flex xs12>
        <h1>{{projectNameByRouteId()}}</h1>
      </v-flex>
      <div v-if="isAllowCreateProject() && isParent()">
        <v-btn :href="`${$kpUtils.routerUrl.Project.path}${$kpUtils.routerUrl.AddProject.path}`" :class="`primary${iconButton} bottom-100`">
          <v-icon dark>add</v-icon>
          <span :class="hideMobile">{{e('addProjectBtn')}}</span>
        </v-btn>
      </div>
    </v-layout>

    <div v-if="user.token && isParent()">
      <!-- show loading -->
      <loadingText v-bind:showLoading="isLoading()" v-bind:loadingText="e('loadingText')" />

      <!-- if error -->
      <errorMessage v-bind:showError="$kpUtils.isError(projects)"
        v-bind:errorName="$kpUtils.getErrorName(projects)"
        v-bind:errorMessage="$kpUtils.getErrorMessage(projects, e)" />

      <!-- no project -->
      <p v-if="!$kpUtils.isError(projects) && !isLoading() && projects.length === 0">
        {{e('noProject')}}
      </p>

      <!-- list filter -->
      <listingFilter v-if="!$kpUtils.isError(projects) && !isLoading() && projects.length > 0"
        v-bind:data="projects"
        v-on:updateData="updateProjectRender"
        v-bind:keywordPlaceholder="e('search')"
        v-bind:searchIn="['name', 'description']"
        v-bind:sortByLabel="e('sortBy')"
        v-bind:sortByList="sortByList"
      />

      <!-- project listing -->
      <div class="pa-3 pb-4 d-block layout"
        v-for="project in getProjects()"
        v-show="isVisible(project)"
         v-if="isProjectExist()"
        :key="project.id">

        <v-layout justify-space-between align-end wrap pb-2>
          <a :href="projectDetailUrl(project)"><strong v-html="project.name"></strong></a>
          <small>{{$kpUtils.date(project.date)}} - date end/due date</small>
        </v-layout>

        <v-layout column justify-space-between align-content-start wrap>
          <span v-html="project.sortDescription"></span>
          <small>{{myProject.indexOf(project.id) >= 0 ? 'my project - ' : ''}}small info, milestone, percentage progress, etc</small>
        </v-layout>
      </div>

      <!-- list pagination -->
      <div class="text-xs-center" v-if="total > perpage">
        <v-pagination :length="Math.ceil(total / perpage)" v-model="page" :total-visible="5"></v-pagination>
      </div>
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

export default {
  name: 'ProjectList',
  components: {
    loadingText,
    errorMessage,
    listingFilter,
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
      myProject: ['', ''],
      perpage: 10,
      page: 1,
      total: 1,
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    isParent() {
      return this.$route.matched.length === 1;
    },
    isAllowCreateProject() {
      return this.$kpUtils.isAdmin() || (!this.$kpUtils.isAdmin() && this.myProject.length === 0);
    },
    getProjetList() {
      this.util.loading = true;

      // connect API
      fetch(`${url.getProjects}${this.user.token}`)
        .then(response => response.json())
        .then((jsonData) => {
          if (jsonData.error) {
            if (jsonData.error.statusCode === 401) { // Authorization Required
              this.$store.commit('logoutUser');
            }
          } else {
            this.projects = jsonData;
            this.util.loading = false;
            this.findMyProject();
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          this.util.loading = false;
          this.$store.commit('logoutUser');
        });
    },
    projectNameByRouteId() {
      if (this.$route.params.id && this.projects.length > 0) {
        const detailProject = this.projects.find(p => p.id === this.$route.params.id * 1);
        if (detailProject) {
          return detailProject.name;
        }
      }

      return this.e(this.util.pagetTitleMapping[this.$route.name]);
    },
    projectDetailUrl(project) {
      return `${this.$kpUtils.routerUrl.Project.path}${this.$kpUtils.routerUrl.ProjectID.path}${project.id}/${project.name}/`;
    },
    findMyProject() {
      this.myProject = [];
      this.projects.map((project) => {
        if (project.ownerID === this.user.id) {
          this.myProject.push(project.id);
        }

        return true;
      });
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
      const start = (this.page - 1) * this.perpage;
      const visibleProject = this.projects.filter(p => this.isVisible(p));
      this.total = visibleProject.length;
      return visibleProject.slice(start, start + this.perpage);
    },
  },
  beforeMount() {
    this.getProjetList();
  },
  beforeRouteUpdate(to, from, next) {
    // reload after add new project
    if (to.name === this.$kpUtils.routerUrl.ProjectID.name && from.name === this.$kpUtils.routerUrl.AddProject.name) {
      this.getProjetList();
    }

    next();
  },
  computed: {
    iconButton() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return ' btn--bottom btn--floating btn--fixed btn--left bottom-2 fixed';
        default: return '';
      }
    },
    hideMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'hidden-xs-only';
        default: return '';
      }
    },
  },
};
</script>
