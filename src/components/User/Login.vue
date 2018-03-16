<template>
  <div class="container-fluid">
    <div class="col-sm-8 col-md-6 offset-sm-2 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h1>Login</h1>
          <div class="form-group">
            <label for="userName">{{e('userNameLabel')}}</label>
            <input value="qw@qw.qw" ref="user" type="email" id="userName" placeholder="my-email@domain.com" class="form-control" />
            <small v-show="userError !== ''" class="form-text text-muted">{{userError}}</small>
          </div>

          <div class="form-group">
            <label for="password">{{e('passwordLabel')}}</label>
            <input value="123456" ref="pass" type="password" id="password" class="form-control" />
            <small v-show="passError !== ''" class="form-text text-muted">{{passError}}</small>
          </div>

          <small v-show="loginError !== ''" class="form-text text-muted">{{e(loginError)}}</small>
          <button @click="login" type="submit" class="btn btn-primary">{{e('loginButton')}}</button>
        </div>
      </div>

      <p>{{e('noAccountText')}}</p>
      <a class="btn btn-secondary" :href="`/#${routerUrl.Register.path}`">{{e('registerButton')}}</a>
    </div>
  </div>
</template>

<script>
import componentText from '@/lang/Login.lang';
import getTextByLang from '@/helper/getTextByLang';
import regex from '@/variables/regex';
import apiUrl from '@/variables/apiUrl';
import routerUrl from '@/variables/routerUrl';
import fetching from '@/variables/fetching';

export default {
  name: 'Login',
  data() {
    return {
      userError: '',
      passError: '',
      loginError: '',
      routerUrl,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    login(e) {
      e.preventDefault();

      // validate input
      if (!this.validInput()) return;

      // API make login
      this.postLogin();
    },
    validInput() {
      // reset error
      this.userError = '';
      this.passError = '';

      // error email
      if (!regex.email.test(String(this.$refs.user.value).toLowerCase())) this.userError = this.e('userError');

      // empty email
      if (this.$refs.user.value === '') this.userError = this.e('userEmpty');

      // error Password
      if (this.$refs.pass.value.length < 6) this.passError = this.e('passError');

      // empty Password
      if (this.$refs.pass.value === '') this.passError = this.e('passEmpty');

      // return if error
      if (this.passError !== '' || this.userError !== '') return false;

      return true;
    },
    postLogin() {
      // reset error message
      this.loginError = '';

      // connect API
      fetch(apiUrl.login, {
        body: JSON.stringify({
          email: this.$refs.user.value,
          password: this.$refs.pass.value,
        }), // must match 'Content-Type' header
        ...fetching.header,
      })
        .then(response => response.json())
        .then(jsonData => this.getUserData(jsonData))
        .catch(() => null);
    },
    getUserData(loginResult) {
      // if error
      if (loginResult.error && loginResult.error.message) {
        this.loginError = loginResult.error.message;
        return;
      }

      // if success, get user data
      if (loginResult.id) {
        fetch(`${apiUrl.member}/${loginResult.userId}?access_token=${loginResult.id}`)
          .then(response => response.json())
          .then((userData) => {
            // if success, login user
            if (userData.email) {
              this.$store.commit('setUser', {
                login: true,
                userData: { token: loginResult.id, ...userData },
              });
            }
          })
          .catch(() => null);
      }
    },
  },
};
</script>
