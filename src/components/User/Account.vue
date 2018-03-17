<template>
  <section v-show="user.token" class="container-fluid">
    <div class="row">
      <div class="col-sm-4 col-md-3">
        <nav class="nav flex-column">
          <a @click="toggleTab('profile', $event)" :class="`nav-link ${setClass(tabs.profile)}`" href="#">{{e('profile')}}</a>
          <a @click="toggleTab('changePassword', $event)" :class="`nav-link ${setClass(tabs.changePassword)}`" href="#">{{e('changePassword')}}</a>
          <a @click="toggleTab('removeAccount', $event)" :class="`nav-link ${setClass(tabs.removeAccount)}`" href="#">{{e('removeAccount')}}</a>
        </nav>
      </div>
      <div class="col-sm-8 col-md-9">
        <div v-show="tabs.profile">
          <h1>{{e('profile')}}</h1>
          <div class="form-group">
            <label for="userName">{{e('yourName')}}</label>
            <input :value="user.name" ref="name" type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label for="userName">{{e('yourDiscipline')}}</label>
            <input :value="user.discipline" ref="discipline" type="text" class="form-control" />
          </div>

          <button @click="saveProfile" type="submit" class="btn btn-primary">{{e('saveProfile')}}</button>

        </div>

        <div v-show="tabs.changePassword">
          <h1>{{e('changePassword')}}</h1>
          changePassword
        </div>

        <div v-show="tabs.removeAccount">
          <h1>{{e('removeAccount')}}</h1>
          <p>{{e('removeAccountMessage')}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import getTextByLang from '@/global/getTextByLang';
import componentText from './account.lang';

export default {
  name: 'Account',
  tabsTpl: {
    profile: false,
    changePassword: false,
    removeAccount: false,
  },
  data() {
    return {
      user: this.$store.state.user,
      tabs: {
        ...this.tabsTpl,
        profile: true,
      },
      componentText,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(this.componentText, copy, this.$store.state.setup.lang);
    },
    toggleTab(key, e) {
      e.preventDefault();

      this.tabs = { ...this.tabsTpl };
      this.tabs[key] = true;
    },
    setClass(bool) {
      return bool === true ? 'active' : '';
    },
    saveProfile() {
      if (this.user.name) {
        this.user.name = 'edit name';
      } else {
        this.user.name = 'add new name';
      }
    },
  },
};
</script>
