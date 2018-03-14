<template>
  <section class="container-fluid">
    <div v-show="user.token">
      <h1>Add Project</h1>

      <p>Todo:</p>
      <ul>
        <li>nama project</li>
        <li>keterangan project</li>
        <li>member yg disertakan</li>
      </ul>

      <div class="form-group">
        <label for="projectName">Project name</label>
        <input type="text" id="projectName" placeholder="Project name" class="form-control" />
      </div>

      <div class="form-group">
        <label for="projectDesc">Project description</label>
        <wysiwyg id="projectDesc" placeholder="Project description" />
        <small class="form-text text-muted">Sort description about your project</small>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>

    </div>
  </section>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
