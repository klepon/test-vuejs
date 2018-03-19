<template>
  <section class="container-fluid">
    <div v-show="!user.token">
      <h1>tak ada token, silahkan login dulu</h1>
    </div>
    <div v-show="user.token" class="row">
      <h1 class="col-sm-12">Dashboard</h1>

      <p class="col-sm-12"><small>{{user.token}}</small></p>
      <p class="col-sm-12"><small>{{user.email}}</small></p>

      <div class="col-sm-6 col-md-4">
        <b-card>
          <h3 @click="editProfile">{{user.name || e('addName')}}</h3>
          <p @click="editProfile">{{user.discipline   || e('addDiscipline')}}</p>
        </b-card>
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
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';
import getTextByLang from '@/global/getTextByLang';
import componentText from './dashboard.lang';

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
    editProfile() {
      router.push({ name: routerUrl.Account.name });
    },
  },
};
</script>
