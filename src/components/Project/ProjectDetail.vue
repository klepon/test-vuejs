<template>
  <section v-if="user.token" class="container-fluid">
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
  beforeMount() {
    this.$kpUtils.isLoggedIn();
  },
};
</script>
