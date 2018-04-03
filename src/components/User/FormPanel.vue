<template>
  <section class="user-form">
    <b-form @submit="onSubmit" class="col-8 col-md-6 offset-sm-2 offset-md-3">
      <b-card>
        <h1>{{title}}</h1>
        <b-form-group label-for="userName" :label="labelUserEmail" :description="userError">
          <b-form-input id="userName"
            type="email"
            v-model="user"
            required
            placeholder="my-email@domain.com">
          </b-form-input>
        </b-form-group>

        <b-form-group label-for="password" :label="labelPassword" :description="passError">
          <b-form-input id="password"
            type="password"
            v-model="pass"
            required
            >
          </b-form-input>
        </b-form-group>

        <small v-show="resultError !== ''" class="form-text text-muted">{{resultError}}</small>
        <div class="flex-horizontal">
          <b-button type="submit" variant="primary">{{submitButton}}</b-button>
          <div v-show="loading" class="loader"></div>
        </div>
      </b-card>

      <p>{{switchText}}</p>
      <a class="btn btn-secondary" :href="`/#${switchUrl}`">{{switchButtonText}}</a>
    </b-form>
  </section>
</template>

<script>
export default {
  name: 'FormTpl',
  props: ['title', 'labelUserEmail', 'labelPassword', 'loading', 'resultError', 'submitButton', 'switchText', 'switchButtonText', 'switchUrl', 'componentText', 'minPassLength'],
  data() {
    return {
      userError: '',
      passError: '',
      user: 'qw@qw.qw',
      pass: '123456',
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(this.componentText, copy);
    },
    onSubmit(e) {
      e.preventDefault();

      // reset error
      this.userError = '';
      this.passError = '';
      this.$emit('startProcess');

      // error email
      if (!this.$kpUtils.regex.email.test(String(this.user).toLowerCase())) this.userError = this.e('userError');

      // empty email
      if (this.user === '') this.userError = this.e('userEmpty');

      // error Password
      if (this.pass.length < this.minPassLength) this.passError = this.e('passError');

      // empty Password
      if (this.pass === '') this.passError = this.e('passEmpty');

      // return if error
      if (this.passError !== '' || this.userError !== '') {
        this.$emit('endProcess');
        return;
      }

      this.$emit('postAPI', { user: this.user, pass: this.pass });
    },
  },
};
</script>
