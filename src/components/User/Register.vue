<template>
  <div class="container-fluid">
    <div class="col-sm-8 col-md-6 offset-sm-2 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h1>Register</h1>
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

          <small v-show="registerError !== ''" class="form-text text-muted">{{e(registerError)}}</small>
          <button @click="register" type="submit" class="btn btn-primary">{{e('registerButton')}}</button>
        </div>
      </div>

      <p>{{e('haveAccountText')}}</p>
      <a class="btn btn-secondary" :href="`/#${routerUrl.Login.path}`">{{e('loginButton')}}</a>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import componentText from '@/lang/Register.lang';
import getTextByLang from '@/helper/getTextByLang';
import regex from '@/variables/regex';
import apiUrl from '@/variables/apiUrl';
import routerUrl from '@/variables/routerUrl';
import fetching from '@/variables/fetching';

export default {
  name: 'Register',
  data() {
    return {
      userError: '',
      passError: '',
      registerError: '',
      routerUrl,
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(componentText, copy, this.$store.state.setup.lang);
    },
    register(e) {
      e.preventDefault();

      // validate
      if (!this.validInput()) return;

      // post user
      this.postUser();
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
    postUser() {
      // reset error message
      this.registerError = '';

      // connect API
      fetch(apiUrl.register, {
        body: JSON.stringify({
          role: 1,
          discipline: '',
          name: '',
          realm: '',
          username: this.$refs.user.value,
          email: this.$refs.user.value,
          password: this.$refs.pass.value,
          emailVerified: true,
        }), // must match 'Content-Type' header
        ...fetching.header,
      })
        .then(response => response.json())
        .then((jsonData) => {
          // error - email exist
          if (jsonData.error &&
            jsonData.error.details &&
            jsonData.error.details.messages &&
            jsonData.error.details.messages.email
          ) {
            this.registerError = 'emailExist';
            return;
          }

          // success
          if (jsonData.id) {
            router.push({ name: routerUrl.Login.name });
          }
        })
        .catch(() => null);
    },
  },
};
</script>
