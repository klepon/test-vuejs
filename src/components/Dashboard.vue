<template>
  <section class="container-fluid">
    <div v-show="!user.token">
      <h1>tak ada token, silahkan login dulu</h1>
    </div>
    <div v-show="user.token" class="row">
      <h1 class="col-sm-12">Dashboard</h1>

      <div class="col-sm-6 col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 @click="addName">{{user.name || e('addName')}}</h3>
            <p @click="addDiscipline">{{user.discipline   || e('addDiscipline')}}</p>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-8">
        <p>berisi ringkasan project, task, dan report, misal 20 task complit, 30 bug, 2 project done, 1 mangkrak, etc</p>
        <p>project -> task -> task status</p>
        <p>sortcut</p>
        <ul>
          <li>add project</li>
          <li>add member</li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script>
import componentText from '@/lang/Dashboard.lang';
import getTextByLang from '@/helper/getTextByLang';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    addName() {
      if (this.user.name) {
        this.user.name = 'edit name';
      } else {
        this.user.name = 'add new name';
      }
    },
    addDiscipline() {
      if (this.user.discipline) {
        this.user.discipline = 'edit discipline';
      } else {
        this.user.discipline = 'add new discipline';
      }
    },
  },
};
</script>
