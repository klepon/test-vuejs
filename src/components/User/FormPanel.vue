<template>
  <section class="container-fluid">
    <div class="col-sm-8 col-md-6 offset-sm-2 offset-md-3">
      <b-card>
        <h1>{{title}}</h1>
        <div class="form-group">
          <label for="userName">{{labelUserEmail}}</label>
          <input value="qw@qw.qw" ref="user" type="email" id="userName" placeholder="my-email@domain.com" class="form-control" />
          <small v-show="userError !== ''" class="form-text text-muted">{{userError}}</small>
        </div>

        <div class="form-group">
          <label for="password">{{labelPassword}}</label>
          <input value="123456" ref="pass" type="password" id="password" class="form-control" />
          <small v-show="passError !== ''" class="form-text text-muted">{{passError}}</small>
        </div>

        <small v-show="resultError !== ''" class="form-text text-muted">{{resultError}}</small>
        <div class="flex-horizontal">
          <b-button @click="onClick" variant="primary">{{submitButton}}</b-button>
          <div v-show="loading" class="loader"></div>
        </div>
      </b-card>

      <p>{{switchText}}</p>
      <a class="btn btn-secondary" :href="`/#${switchUrl}`">{{switchButtonText}}</a>
    </div>
  </section>
</template>

<script>
import getTextByLang from '@/global/getTextByLang';
import regex from '@/global/regex';

export default {
  name: 'FormTpl',
  props: ['title', 'labelUserEmail', 'labelPassword', 'loading', 'resultError', 'submitButton', 'switchText', 'switchButtonText', 'switchUrl', 'componentText', 'minPassLength'],
  data() {
    return {
      userError: '',
      passError: '',
    };
  },
  methods: {
    e(copy) {
      return getTextByLang(this.componentText, copy, this.$store.state.setup.lang);
    },
    onClick(e) {
      e.preventDefault();

      // reset error
      this.userError = '';
      this.passError = '';
      this.$emit('startProcess');

      // error email
      if (!regex.email.test(String(this.$refs.user.value).toLowerCase())) this.userError = this.e('userError');

      // empty email
      if (this.$refs.user.value === '') this.userError = this.e('userEmpty');

      // error Password
      if (this.$refs.pass.value.length < this.minPassLength) this.passError = this.e('passError');

      // empty Password
      if (this.$refs.pass.value === '') this.passError = this.e('passEmpty');

      // return if error
      if (this.passError !== '' || this.userError !== '') {
        this.$emit('endProcess');
        return;
      }

      this.$emit('postAPI', { user: this.$refs.user.value, pass: this.$refs.pass.value });
    },
  },
};
</script>
