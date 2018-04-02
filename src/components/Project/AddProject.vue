<template>
  <section class="container-fluid">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('addProject')}}</li>
      </ol>
    </nav>

    <b-form @submit="onSubmit">
      <h1>{{e('addProject')}}</h1>

      <b-form-group :description="util.titleError">
        <b-form-input
          type="text"
          v-model="project.title"
          required
          :placeholder="e('title')">
        </b-form-input>
      </b-form-group>

      <b-form-group :description="e('descriptionDesc')">
        <wysiwyg v-model="project.description" :placeholder="e('description')" />
      </b-form-group>

      <b-btn type="submit" variant="primary">{{e('submmitBtn')}}</b-btn>
    </b-form >

    <p><b>Todo:</b></p>
    <ul>
      <li>nama project</li>
      <li>keterangan project</li>
      <li>set owner sebagai admin</li>
    </ul>
  </section>
</template>

<script>
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';
import componentText from './addProject.lang';
import url from './_var';

export default {
  name: 'AddProject',
  data() {
    return {
      user: this.$store.state.user,
      project: {
        title: '',
        description: '',
      },
      util: {
        loading: false,
        titleError: '',
      },
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    onSubmit(e) {
      e.preventDefault();

      this.util.loading = true;

      // connect API
      fetch(`${url.addProject}?access_token=${this.user.token}`, {
        body: JSON.stringify({
          name: this.project.title,
          description: this.project.description,
        }),
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then((jsonData) => {
          // success
          if (jsonData.id) {
            router.push({
              path: routerUrl.Project.path,
              function() {
                console.log('router complete');
              },
            });
          } else {
            // no auth: {error.statusCode: 401}
            this.$kpUtils.utilModal({
              title: 'warningTitle',
              message: 'authNeeded',
            });
          }
        })
        .catch(() => {
          this.$kpUtils.utilModal({
            title: 'warningTitle',
            message: 'serverError',
          });

          this.util.loading = false;
          return null;
        });
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
  },
};
</script>
