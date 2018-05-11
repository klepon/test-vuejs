<template>
  <section class="layout">
    <v-form class="flex xs12" v-model="form.valid" ref="form" lazy-validation>
      <v-text-field
        :label="e('title')"
        v-model="project.title"
        :rules="form.required"
        required
      ></v-text-field>

      <v-text-field
        :label="e('sortDesc')"
        v-model="project.sortDesc"
      ></v-text-field>

      <wysiwyg class="mt-2 mb-4" v-model="project.description" :placeholder="e('description')" />

      <v-progress-linear v-show="util.loading" indeterminate color="accent"></v-progress-linear>
      <v-btn class="primary ml-0" @click="onSubmit" :disabled="!form.valid">{{e('submmitBtn')}}</v-btn>
    </v-form>
  </section>
</template>

<script>
import componentText from './addProject.lang';
import url from './_var';

/* eslint-disable no-console */

export default {
  name: 'AddProject',
  data() {
    return {
      user: this.$store.state.user,
      project: {
        title: '',
        description: '',
        sortDesc: '',
      },
      util: {
        loading: false,
      },
      form: {
        required: [
          v => !!v || this.e('titleRequired'),
        ],
        valid: true,
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
          sortDescription: this.project.sortDesc,
        }),
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then((jsonData) => {
          // success
          if (jsonData.id) {
            const path = `${this.$kpUtils.routerUrl.Project.pathMainRoute}${this.$kpUtils.routerUrl.ProjectID.path}${jsonData.id}/${jsonData.name}`;
            this.$router.push({ path });
          } else {
            switch (jsonData.error.statusCode) {
              case 422:
                this.$kpUtils.modalWarning({
                  message: this.e('code422'),
                });
                break;
              case 401:
                // no auth: {error.statusCode: 401}, not admin or already have 1 project
                this.$kpUtils.modalWarning({
                  message: this.e('createProjectNotAllowed'),
                });
                break;
              default:
                this.$kpUtils.modalServerError(null);
            }

            this.util.loading = false;
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);

          this.util.loading = false;
          this.$store.commit('logoutUser');
          return null;
        });
    },
  },
};
</script>
