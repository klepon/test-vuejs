<template>
  <section v-show="user.token" class="container-fluid">
    <div class="row">
      <div class="col-sm-4 col-md-3">
        <nav class="nav flex-column pull-left">
          <a @click="toggleTab('profile', $event)" :class="`nav-link ${setClass(tabs.profile)}`" href="#">{{e('profile')}}</a>
          <a @click="toggleTab('changePassword', $event)" :class="`nav-link ${setClass(tabs.changePassword)}`" href="#">{{e('changePassword')}}</a>
          <a @click="toggleTab('removeAccount', $event)" :class="`nav-link ${setClass(tabs.removeAccount)}`" href="#">{{e('removeAccount')}}</a>
        </nav>
      </div>

      <div class="col-sm-8 col-md-9">
        <div v-show="tabs.profile">
          <h1>{{e('profile')}}</h1>
          <div v-show="!editProfile">
            <ul class="list-unstyled">
              <li>{{e('yourName')}}: {{user.name}}</li>
              <li>{{e('yourDiscipline')}}: {{user.discipline}}</li>
            </ul>
            <button @click="editProfile = true" type="submit" class="btn btn-primary">{{e('edit')}}</button>
          </div>

          <div v-show="editProfile">
            <div class="form-group">
              <label for="userName">{{e('yourName')}}</label>
              <input :value="user.name" ref="name" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="userName">{{e('yourDiscipline')}}</label>
              <input :value="user.discipline" ref="discipline" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="password">{{e('yourCurrentPasswod')}}*</label>
              <input ref="pass" type="password" id="password" class="form-control" />
            </div>

            <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
            <button @click="saveProfile" type="submit" class="btn btn-primary">{{e('saveProfile')}}</button>
            <button @click="editProfile = false" type="submit" class="btn btn-secondary">{{e('cancel')}}</button>
          </div>
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
import fetching from '@/global/fetching';
import componentText from './account.lang';
import variable from './_var';

export default {
  name: 'Account',
  tabsTpl: {
    profile: false,
    changePassword: false,
    removeAccount: false,
  },
  data() {
    return {
      editProfile: false,
      resultError: '',
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
      // empty Password
      if (this.$refs.pass.value === '') {
        this.resultError = 'passEmpty';
        return;
      }

      // connect API
      const apiUrl = `${variable.apiUrl.member}/1?access_token=${this.user.token}`;
      const apiRequest = {
        body: JSON.stringify({
          discipline: this.$refs.discipline.value,
          name: this.$refs.name.value,
          password: this.$refs.pass.value,
          email: this.user.email,
        }),
        ...fetching.header,
        method: 'PUT',
      };

      fetch(apiUrl, apiRequest)
        .then(response => response.json())
        .then((jsonData) => {
          if (jsonData.error && jsonData.error.message) {
            this.resultError = jsonData.error.message;
            return;
          }

          // success
          if (jsonData.id) {
            const newUser = {
              ...this.user,
              name: this.$refs.name.value,
              discipline: this.$refs.discipline.value,
            };

            this.editProfile = false;
            this.user = newUser;

            this.$store.commit('setUser', {
              userData: newUser,
            });
          }
        })
        .catch(() => null);
    },
  },
};
</script>
