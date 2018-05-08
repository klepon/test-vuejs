<template>
  <section>
    <h1 class="col-12 title">Dashboard</h1>

    <p class="col-12"><small>{{user.token}}</small></p>
    <p class="col-12"><small>{{user.email}}</small></p>

    <v-layout>
      <v-flex xs6 md4>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0" @click="editProfile">{{name()}}</h3>
              <p @click="editProfile">{{discipline()}}{{companyName()}}</p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs6 md8>
        <p>berisi ringkasan project, task, dan report, misal 20 task complit, 30 bug, 2 project done, 1 mangkrak, etc</p>
        <p>project -> task -> task status</p>
        <p>sortcut</p>
        <ul>
          <li>add project</li>
          <li>add member</li>
        </ul>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import router from '@/global/router';
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
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    editProfile() {
      router.push({ path: this.$kpUtils.routerUrl.AccountProfile.pathMainRoute });
    },
    companyName() {
      if (this.$kpUtils.isAdmin() || this.user.company.name) {
        return ` - ${this.user.company.name || this.e('addCompany')}`;
      }

      return '';
    },
    discipline() {
      return this.user.discipline || this.e('addDiscipline');
    },
    name() {
      return this.user.name || this.e('addName');
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
  },
};
</script>
