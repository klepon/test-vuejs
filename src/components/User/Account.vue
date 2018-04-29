<template>
  <section class="layout">
    <v-flex xs4 md3>
      <v-navigation-drawer permanent>
        <v-list dense class="pt-0">
          <v-list-tile @click="toggleTab('profile', $event)" :class="`${setClass(tabs.profile)}`">
            <v-list-tile-content>
              <v-list-tile-title>{{e('profile')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="toggleTab('changePassword', $event)" :class="`${setClass(tabs.changePassword)}`">
            <v-list-tile-content>
              <v-list-tile-title>{{e('changePassword')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="toggleTab('removeAccount', $event)" :class="`${setClass(tabs.removeAccount)}`">
            <v-list-tile-content>
              <v-list-tile-title>{{e('removeAccount')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>

    <v-flex xs8 md9>
      <div v-show="tabs.profile">
        <h1 class="title">{{e('profile')}}</h1>
        <div v-show="!editProfile">
          <ul class="list-unstyled">
            <li>{{e('yourName')}}: {{user.name}}</li>
            <li>{{e('yourDiscipline')}}: {{user.discipline}}</li>
            <li v-if="isAdmin()">{{e('yourCompany')}}: {{form.companyName}}</li>
          </ul>
          <v-btn @click="editProfile = true" class="primary">{{e('edit')}}</v-btn>
        </div>

        <v-form v-show="editProfile" class="flex xs12" v-model="form.valid" ref="form" lazy-validation>
          <v-text-field
            :label="e('yourName')"
            v-model="user.name"
          ></v-text-field>

          <v-text-field
            :label="e('yourDiscipline')"
            v-model="user.discipline"
          ></v-text-field>

          <v-text-field v-if="isAdmin()"
            :label="e('yourCompany')"
            v-model="form.companyName"
          ></v-text-field>

          <v-text-field type="password"
            :label="e('yourCurrentPasswod')"
            v-model="form.profilePass"
            :rules="form.requiredRules"
            required
          ></v-text-field>

          <v-alert type="info" :value="resultError !== ''">{{e(resultError)}}</v-alert>
          <v-progress-linear v-show="loading" indeterminate color="accent"></v-progress-linear>
          <div class="flex-horizontal">
            <v-btn @click="submitSaveProfile" class="primary">{{e('saveProfile')}}</v-btn>
            <v-btn flat @click="editProfile = false">{{e('cancel')}}</v-btn>
          </div>
        </v-form>
      </div>

      <v-form v-show="tabs.changePassword" class="flex xs12" v-model="form.valid" ref="changePassword" lazy-validation>
        <h1 class="title">{{e('changePassword')}}</h1>

        <v-text-field v-if="!form.countDownStart" type="password"
          :label="`${e('newPasswod')} - minimum ${form.minPassLength}`"
          v-model="form.newPass"
          :rules="form.passRules"
          required
        ></v-text-field>

        <v-text-field v-if="!form.countDownStart" type="password"
          :label="e('confirmPasswod')"
          v-model="form.rePass"
          :rules="form.passReRules"
          required
        ></v-text-field>

        <v-text-field v-if="!form.countDownStart" type="password"
          :label="e('yourCurrentPasswod')"
          v-model="form.oldPass"
          :rules="form.requiredRules"
          required
        ></v-text-field>

        <v-alert type="info" :value="resultError !== ''">{{e(resultError)}}</v-alert>
        <v-progress-linear v-show="loading" indeterminate color="accent"></v-progress-linear>
        <v-btn v-if="!form.countDownStart" @click="submitChangePassword" class="primary">{{e('saveProfile')}}</v-btn>

        <div v-if="form.countDownStart">
          <v-progress-linear
            :size="100"
            :width="15"
            :rotate="-90"
            :value="getProgress()"
            color="teal"
            />
          <p>{{reloadMessage()}}</p>
          <v-btn @click="logoutUser" class="primary">{{e('reloadNow')}}</v-btn>
        </div>
      </v-form>

      <div v-show="tabs.removeAccount">
        <h1 class="title">{{e('removeAccount')}}</h1>
        <p>{{e('removeAccountMessage')}}</p>
        <v-btn @click.stop="form.dialogDeleteAccount = true" class="error">{{e('deleteButton')}}</v-btn>

        <v-dialog v-model="form.dialogDeleteAccount" max-width="500px" persistent>
          <v-card>
            <v-toolbar color="error" dark>
              <v-toolbar-title>{{e('warningTitle')}}</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <p v-html="e('deleteMessageWarning')"></p>

              <v-text-field type="password" v-show="deletePassword"
                :label="e('deletePasswordConfirm')"
                v-model="form.deletePass"
                :rules="form.requiredRules"
                required
              ></v-text-field>

              <v-alert type="info" :value="resultError !== ''">{{e(resultError)}}</v-alert>
              <v-progress-linear v-show="loading" indeterminate color="accent"></v-progress-linear>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="submitDeleteAccount" class="error">{{e(deleteButtonText)}}</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat @click.stop="form.dialogDeleteAccount = false">{{e('cancel')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-flex>
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
        reloadTimeScale: 20,
        reloadTime: 0,
        countDownStart: false,
        countDownInterval: {},
        dialogDeleteAccount: false,
        valid: true,
        companyName: '',
        deletePass: '',
        profilePass: '',
        newPass: '',
        rePass: '',
        oldPass: '',
        minPassLength: 6,
        requiredRules: [
          v => !!v || this.e('passEmpty'),
        ],
        passRules: [
          v => !!v || this.e('passEmpty'),
          v => (v && v.length >= this.form.minPassLength) || this.e('Invalid password.'),
        ],
        passReRules: [
          v => !!v || this.e('passEmpty'),
          v => (v && v === this.form.newPass) || this.e('passwordNotMatch'),
        ],
      },
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    hideModal() {
      this.dialogDeleteAccount = false;
      this.deletePassword = false;
      this.loading = false;
    },
    isAdmin() {
      if (this.user.access[0] !== undefined) {
        if (this.user.access[0][0] === 'admin') {
          return true;
        }
      }
      return false;
    },
    getCompanyName() {
      if (this.user.company !== undefined) {
        return this.user.company.name;
      }
      return '';
    },
    toggleTab(key, e) {
      e.preventDefault();

      this.resultError = '';
      this.loading = false;

      this.tabs = { ...this.tabsTpl };
      this.tabs[key] = true;
    },
    setClass(bool) {
      return bool === true ? 'blue accent-1' : '';
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

      this.updateProfile();
    },
    updateProfile() {
      const apiUrl = `${url.member}/${this.user.id}?access_token=${this.user.token}`;
      const apiRequest = {
        body: JSON.stringify({
          discipline: this.user.discipline,
          name: this.user.name,
          company: this.form.companyName,
          email: this.user.email,
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
              ...jsonData,
            };

            this.$store.commit('setUser', newUser);

            // store update doesn't update the page, so let change data here
            this.editProfile = false;
            this.loading = false;
            // this.user = newUser;
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          this.loading = false;
          return null;
        });
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
            this.form.countDownStart = true;
            this.startCountDown();
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
        this.deleteAccount();
      }
    },
    deleteAccount() {
      const apiUrl = `${url.member}/${this.user.id}?access_token=${this.user.token}`;
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
          } else if (jsonData.error && jsonData.error.message) {
            this.resultError = jsonData.error.message;
            this.loading = false;
          }
        })
        .catch((err) => {
          this.$kpUtils.modalServerError(err);
          return null;
        });
    },
    getProgress() {
      return (100 / this.form.reloadTimeScale) * this.form.reloadTime;
    },
    getProgressSecond() {
      return this.form.reloadTimeScale - this.form.reloadTime;
    },
    reloadMessage() {
      return this.e('reLoginMessage').replace('#~#', this.getProgressSecond());
    },
    startCountDown() {
      this.form.reloadTime = 0;

      this.form.countDownInterval = setInterval(() => {
        this.form.reloadTime += 1;

        if (this.form.reloadTime >= this.form.reloadTimeScale) {
          clearInterval(this.form.countDownInterval);
          this.logoutUser();
        }
      }, 1000);
    },
    logoutUser() {
      this.$store.commit('logoutUser');
    },
  },
  beforeMount() {
    this.$kpUtils.isLoggedIn();
    this.form.companyName = this.getCompanyName();
  },
};
</script>
