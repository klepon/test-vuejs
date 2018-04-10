<template>
  <div v-if="user.token">
    <!-- show loading -->
    <loadingText v-bind:showLoading="isLoading()" v-bind:loadingText="e('loadingText')" />

    <!-- if error -->
    <errorMessage v-bind:showError="$kpUtils.isError(projects)"
      theme="warning"
      v-bind:errorName="e('attentionTitle')"
      v-bind:errorMessage="$kpUtils.getErrorMessage(projects, e)" />

    <hr />

    <div>
      <p>detail project for id: {{$route.params.id}}, project terdiri dari</p>
      <ul>
        <li>project title dan descripsi</li>
        <li>component task, prop project id, component task yg cari user dari projectnya</li>
        <li>component member/user, menjadi bagian dari project</li>
        <li>component report</li>
      </ul>

      <p>component task</p>
      <ul>
        <li>add Task; support nested task max child 1, parent task otomatis jadi group/folder</li>
        <li>task otomatis memiliki tag sesuai disiplin member</li>
        <li>task memiliki; prioritas, status, pinned, date, assign, etc min-max, time logged, projectID, order dalam group, private note, comment, title, deskripsi, attachment</li>
        <li>component member/user, menjadi bagian dari project dan otomatis assign ke task ybs</li>
      </ul>

      <p>project detail view</p>
      <ul>
        <li>task collection (list | column)</li>
        <li>drag and drop for status</li>
        <li>drag and drop for reorder</li>
        <li>drag and drop lintas group</li>
        <li>view detail task in sidebar</li>
        <li>view detail task in new window</li>
      </ul>

    </div>
  </div>
</template>

<script>
import componentText from './projectDetail.lang';
import url from './_var';
import loadingText from '../widget/LoadingText';
import errorMessage from '../widget/ErrorMessage';

export default {
  name: 'AddProject',
  components: {
    loadingText,
    errorMessage,
  },
  data() {
    return {
      util: {
        loading: true,
      },
      user: this.$store.state.user,
      projects: [],
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    isLoading() {
      return this.util.loading;
    },
    getProjetList() {
      this.util.loading = true;

      // connect API
      fetch(`${url.getProjectAndChild.replace('~id~', this.$route.params.id)}${this.user.token}`)
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
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
    this.getProjetList();
  },
};
</script>
