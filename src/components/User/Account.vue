<template>
  <section class="account">
    <div class="row">
      <div class="col-4 col-md-3">
        <nav class="nav flex-column pull-left">
          <a @click="toggleTab('profile', $event)" :class="`nav-link ${setClass(tabs.profile)}`" href="#">{{e('profile')}}</a>
          <a @click="toggleTab('changePassword', $event)" :class="`nav-link ${setClass(tabs.changePassword)}`" href="#">{{e('changePassword')}}</a>
          <a @click="toggleTab('removeAccount', $event)" :class="`nav-link ${setClass(tabs.removeAccount)}`" href="#">{{e('removeAccount')}}</a>
        </nav>
      </div>

      <div class="col-8 col-md-9">
        <div v-show="tabs.profile">
          <h1>{{e('profile')}}</h1>
          <div v-show="!editProfile">
            <ul class="list-unstyled">
              <li>{{e('yourName')}}: {{user.name}}</li>
              <li>{{e('yourDiscipline')}}: {{user.discipline}}</li>
              <li>{{e('yourCompany')}}: {{user.company.name}}</li>
            </ul>
            <b-button @click="editProfile = true" variant="primary">{{e('edit')}}</b-button>
          </div>

          <b-form @submit="submitSaveProfile" v-show="editProfile">
            <b-form-group>
              <b-form-input type="text"
                v-model="user.name"
                :placeholder="e('yourName')" />
            </b-form-group>

            <b-form-group>
              <b-form-input type="text"
                v-model="user.discipline"
                :placeholder="e('yourDiscipline')" />
            </b-form-group>

            <b-form-group>
              <b-form-input type="text"
                v-model="user.company.name"
                :placeholder="e('yourCompany')" />
            </b-form-group>

            <b-form-group>
              <b-form-input type="password"
                v-model="form.profilePass"
                :placeholder="e('yourCurrentPasswod')" />
            </b-form-group>

            <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
            <div class="flex-horizontal">
              <b-button type="submit" variant="primary">{{e('saveProfile')}}</b-button>
              <b-button type="button" @click="editProfile = false" variant="secondary">{{e('cancel')}}</b-button>
              <div class="loader" v-show="loading"></div>
            </div>
          </b-form>
        </div>

        <b-form @submit="submitChangePassword" v-show="tabs.changePassword">
          <h1>{{e('changePassword')}}</h1>

          <b-form-group>
            <b-form-input type="password"
              v-model="form.newPass"
              @keyup.native="comparePassword"
              required
              :pattern="`.{${form.minPassLength},}`"
              :placeholder="`${e('newPasswod')} - minimum ${form.minPassLength}`" />
          </b-form-group>

          <b-form-group :description="e(notEqualPassword)">
            <b-form-input type="password"
              v-model="form.rePass"
              @keyup.native="comparePassword"
              required
              :placeholder="e('confirmPasswod')" />
          </b-form-group>

          <b-form-group>
            <b-form-input type="password"
              v-model="form.oldPass"
              required
              :placeholder="e('yourCurrentPasswod')" />
          </b-form-group>

          <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
          <div class="flex-horizontal">
            <b-button type="submit" variant="primary">{{e('saveProfile')}}</b-button>
            <div class="loader" v-show="loading"></div>
          </div>
        </b-form>

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

            <b-form-group v-show="deletePassword">
              <b-form-input type="password"
                v-model="form.deletePass"
                required
                :placeholder="e('deletePasswordConfirm')" />
            </b-form-group>

            <small v-show="resultError !== ''" class="form-text text-muted">{{e(resultError)}}</small>
            <div class="flex-horizontal">
              <b-button @click="submitDeleteAccount" variant="danger">{{e(deleteButtonText)}}</b-button>
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
import User from './_userStore';
import componentText from './account.lang';
import url from './_var';

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
      deletePassword: false,
      deleteButtonText: 'yesDeleteButton',
      form: {
        deletePass: '',
        profilePass: '',
        newPass: '',
        rePass: '',
        oldPass: '',
        minPassLength: 6,
      },
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    hideModal() {
      this.$refs.deleteAccount.hide();
      this.deletePassword = false;
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
      fetch(url.login, {
        body: JSON.stringify({
          email: this.user.email,
          password: pass,
        }),
        ...this.$kpUtils.apiHeader,
      })
        .then(response => response.json())
        .then(jsonData => nextFunction(jsonData))
        .catch((err) => {
          this.$kpUtils.modalServerError(err);

          this.deletePassword = false;
          this.loading = false;

          return null;
        });
    },
    submitSaveProfile(e) {
      e.preventDefault();

      this.resultError = '';
      this.loading = true;

      // empty Password
      if (this.form.profilePass === '') {
        this.resultError = 'passEmpty';
        this.loading = false;
        return;
      }

      this.loginUser(this.updateProfile, this.form.profilePass);
    },
    updateProfile(loginResult) {
      const apiUrl = `${url.member}/${loginResult.userId}?access_token=${loginResult.id}`;
      const apiRequest = {
        body: JSON.stringify({
          email: this.user.email,
          name: this.user.name,
          discipline: this.user.discipline,
          password: this.form.profilePass,
        }),
        ...this.$kpUtils.apiHeader,
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
            };

            this.$store.commit('setUser', newUser);

            // store update doesn't update the page, so let change data here
            this.editProfile = false;
            this.loading = false;
            this.user = newUser;
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          this.loading = false;
          return null;
        });
    },
    comparePassword() {
      this.notEqualPassword = '';

      if (this.form.newPass === '' || this.form.rePass === '') return;

      if (this.form.newPass !== this.form.rePass) {
        this.notEqualPassword = 'passwordNotMatch';
      }
    },
    submitChangePassword() {
      this.resultError = '';
      this.loading = true;

      // empty Password
      if (this.form.newPass === '' || this.form.rePass === '' || this.form.oldPass === '') {
        this.resultError = 'allRequired';
        this.loading = false;
        return;
      }

      // not match
      if (this.form.newPass !== this.form.rePass) {
        this.resultError = 'passwordNotMatch';
        this.loading = false;
        return;
      }

      this.changePassword();
    },
    changePassword() {
      const apiUrl = `${url.changePassword}/?access_token=${this.user.token}`;
      const apiRequest = {
        body: JSON.stringify({
          oldPassword: this.form.oldPass,
          newPassword: this.form.newPass,
        }),
        ...this.$kpUtils.apiHeader,
      };

      fetch(apiUrl, apiRequest)
        .then((response) => {
          if (response.ok === true) {
            this.resultError = 'passwordChanged';
            this.loading = false;
            this.form.newPass = '';
            this.form.rePass = '';
            this.form.oldPass = '';
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
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          this.loading = false;
        });
    },
    submitDeleteAccount() {
      if (!this.deletePassword) {
        this.deletePassword = true;
        this.deleteButtonText = 'deleteButton';
      } else {
        this.loading = true;
        this.loginUser(this.deleteAccount, this.form.deletePass);
      }
    },
    deleteAccount(loginResult) {
      if (loginResult.error && loginResult.error.message) {
        this.loading = false;
        this.resultError = 'Invalid password.';
        return;
      }

      const apiUrl = `${url.member}/${loginResult.userId}?access_token=${loginResult.id}`;
      const apiRequest = {
        body: JSON.stringify({
          password: this.form.deletePass,
          email: this.user.email,
        }),
        ...this.$kpUtils.apiHeader,
        method: 'DELETE',
      };

      fetch(apiUrl, apiRequest)
        .then(response => response.json())
        .then((jsonData) => {
          if (jsonData.count) {
            this.hideModal();
            this.$store.commit('setUser', {
              redirect: this.$kpUtils.routerUrl.Homepage.name,
              ...User.tpl,
            });
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          return null;
        });
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
  },
};
</script>
