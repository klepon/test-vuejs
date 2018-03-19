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
            <b-button @click="editProfile = true" variant="primary">{{e('edit')}}</b-button>
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
              <input ref="pass" type="password" class="form-control" />
            </div>

            <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
            <div class="flex-horizontal">
              <b-button @click="saveProfile" variant="primary">{{e('saveProfile')}}</b-button>
              <b-button @click="editProfile = false" variant="secondary">{{e('cancel')}}</b-button>
              <div class="loader" v-show="loading"></div>
            </div>
          </div>
        </div>

        <div v-show="tabs.changePassword">
          <h1>{{e('changePassword')}}</h1>

          <div class="form-group">
            <label for="password">{{e('newPasswod')}}*</label>
            <input @keyup="comparePassword" v-model="newPass" type="password" class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">{{e('confirmPasswod')}}*</label>
            <input @keyup="comparePassword" v-model="rePass" type="password" class="form-control" />
            <small v-show="notEqualPassword !== ''" class="form-text text-muted">{{e(notEqualPassword)}}</small>
          </div>

          <div class="form-group">
            <label for="password">{{e('yourCurrentPasswod')}}*</label>
            <input v-model="oldPass" type="password" class="form-control" />
          </div>

          <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
          <div class="flex-horizontal">
            <b-button @click="changePassword" variant="primary">{{e('saveProfile')}}</b-button>
            <div class="loader" v-show="loading"></div>
          </div>
        </div>

        <div v-show="tabs.removeAccount">
          <h1>{{e('removeAccount')}}</h1>
          <p>{{e('removeAccountMessage')}}</p>
          <b-button v-b-modal.deleteAccount variant="danger">{{e('deleteButton')}}</b-button>
          <b-modal id="deleteAccount"
            ref="deleteAccount"
            :title="e('warningTitle')"
            header-bg-variant="danger"
            header-text-variant="light"
            :no-close-on-backdrop=true
            :no-close-on-esc=true
            :hide-footer=true
            >
            <p v-html="e('deleteMessageWarning')"></p>

            <div class="form-group" v-show="deletePassword">
              <label for="password">{{e('deletePasswordConfirm')}}*</label>
              <input ref="delpass" type="password" class="form-control" />
            </div>

            <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
            <div class="flex-horizontal">
              <b-button @click="prepareDeleteAccount" variant="danger">{{e(deleteButtonText)}}</b-button>
              <b-button @click="hideModal" variant="secondary">{{e('cancel')}}</b-button>
              <div class="loader" v-show="loading"></div>
            </div>

          </b-modal>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import routerUrl from '@/global/routerUrl';
import getTextByLang from '@/global/getTextByLang';
import fetching from '@/global/fetching';
import User from '@/components/user/_userStore';
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
      notEqualPassword: '',
      resultError: '',
      loading: false,
      user: this.$store.state.user,
      tabs: {
        ...this.tabsTpl,
        profile: true,
      },
      componentText,
      newPass: '',
      rePass: '',
      oldPass: '',
      deletePassword: false,
      deleteButtonText: 'yesDeleteButton',
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(this.componentText, copy, this.$store.state.setup.lang);
    },
    hideModal() {
      this.$refs.deleteAccount.hide();
      this.loading = false;
    },
    toggleTab(key, e) {
      e.preventDefault();

      this.resultError = '';
      this.loading = false;

      this.tabs = { ...this.tabsTpl };
      this.tabs[key] = true;
    },
    setClass(bool) {
      return bool === true ? 'active' : '';
    },
    loginUser(nextFunction, pass) {
      fetch(variable.apiUrl.login, {
        body: JSON.stringify({
          email: this.user.email,
          password: pass,
        }),
        ...fetching.header,
      })
        .then(response => response.json())
        .then(jsonData => nextFunction(jsonData))
        .catch(() => {
          this.loading = false;
          return null;
        });
    },
    saveProfile() {
      this.resultError = '';
      this.loading = true;

      // empty Password
      if (this.$refs.pass.value === '') {
        this.resultError = 'passEmpty';
        this.loading = false;
        return;
      }

      this.loginUser(this.updateUserProfile, this.$refs.pass.value);
    },
    updateUserProfile(loginResult) {
      const apiUrl = `${variable.apiUrl.member}/${loginResult.userId}?access_token=${loginResult.id}`;
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
            this.loading = false;
            return;
          }

          // success
          if (jsonData.id) {
            const newUser = {
              ...this.user,
              token: loginResult.id,
              name: this.$refs.name.value,
              discipline: this.$refs.discipline.value,
            };

            this.$store.commit('setUser', {
              userData: newUser,
            });

            // store update doesn't update the page, so let change data here
            this.editProfile = false;
            this.loading = false;
            this.user = newUser;
          }
        })
        .catch(() => {
          this.loading = false;
          return null;
        });
    },
    comparePassword() {
      this.notEqualPassword = '';
      if (this.newPass === '' || this.rePass === '') return;

      if (this.newPass !== this.rePass) {
        this.notEqualPassword = 'passwordNotMatch';
      }
    },
    changePassword() {
      this.resultError = '';
      this.loading = true;

      // empty Password
      if (this.newPass === '' || this.rePass === '' || this.oldPass === '') {
        this.resultError = 'allRequired';
        this.loading = false;
        return;
      }

      // not match
      if (this.newPass !== this.rePass) {
        this.resultError = 'passwordNotMatch';
        this.loading = false;
        return;
      }

      this.updatePassword();
    },
    updatePassword() {
      const apiUrl = `${variable.apiUrl.changePassword}/?access_token=${this.user.token}`;
      const apiRequest = {
        body: JSON.stringify({
          oldPassword: this.oldPass,
          newPassword: this.newPass,
        }),
        ...fetching.header,
      };

      fetch(apiUrl, apiRequest)
        .then((response) => {
          if (response.ok === true) {
            this.resultError = 'passwordChanged';
            this.loading = false;
            this.newPass = '';
            this.rePass = '';
            this.oldPass = '';
            return '';
          }

          return response.json();
        })
        .then((jsonData) => {
          if (jsonData.error && jsonData.error.message) {
            this.resultError = jsonData.error.message;
            this.loading = false;
          }
        })
        .catch(() => null);
    },
    prepareDeleteAccount() {
      if (!this.deletePassword) {
        this.deletePassword = true;
        this.deleteButtonText = 'deleteButton';
      } else {
        this.loading = true;
        this.loginUser(this.deleteAccount, this.$refs.delpass.value);
      }
    },
    deleteAccount(loginResult) {
      if (loginResult.error && loginResult.error.message) {
        this.loading = false;
        this.resultError = 'Invalid password.';
        return;
      }

      const apiUrl = `${variable.apiUrl.member}/${loginResult.userId}?access_token=${loginResult.id}`;
      const apiRequest = {
        body: JSON.stringify({
          password: this.$refs.delpass.value,
          email: this.user.email,
        }),
        ...fetching.header,
        method: 'DELETE',
      };

      fetch(apiUrl, apiRequest)
        .then(response => response.json())
        .then((jsonData) => {
          if (jsonData.count) {
            this.hideModal();
            this.$store.commit('setUser', {
              redirect: routerUrl.Homepage.name,
              userData: { ...User.tpl },
            });
          }
        })
        .catch(() => {
          this.loading = false;
          return null;
        });
    },
  },
};
</script>
