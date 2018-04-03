<template>
  <section class="container-fluid">

    <p><b>Todo:</b></p>
    <ul>
      <li>nama project -> done</li>
      <li>keterangan project -> done</li>
      <li>set owner sebagai admin</li>
    </ul>

    <b-form @submit="onSubmit">
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

  </section>
</template>

<script>
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
            this.$router.push({ name: this.$kpUtils.routerUrl.Project.name });
          } else {
            switch (jsonData.error.statusCode) {
              case 422:
                this.$kpUtils.modalWarning({
                  message: this.e('code422'),
                });
                break;
              case 401:
                // no auth: {error.statusCode: 401}
                this.$kpUtils.modalWarning({
                  message: this.e('authNeeded'),
                });
                break;
              default:
                this.$kpUtils.modalServerError(null);
            }
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);

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
