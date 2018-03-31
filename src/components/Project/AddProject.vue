<template>
  <section class="container-fluid">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="`/#/Project/`">{{e('projectList')}}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{e('projectDetail')}}</li>
      </ol>
    </nav>

    <b-form @submit="onSubmit" v-show="user.token">
      <h1>{{e('addProject')}}</h1>

      <b-form-group :description="titleError">
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

    <div v-show="!user.token">
      {{e('pleaseLogin')}}
    </div>

    <p><b>Todo:</b></p>
    <ul>
      <li>nama project</li>
      <li>keterangan project</li>
      <li>set owner sebagai admin</li>
    </ul>
  </section>
</template>

<script>
import componentText from './addProject.lang';

export default {
  name: 'AddProject',
  data() {
    return {
      user: this.$store.state.user,
      project: {
        title: '',
        description: '',
      },
      titleError: '',
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    onSubmit() {
      // console.table({title: this.project.title, description: this.project.description});
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
  },
};
</script>
