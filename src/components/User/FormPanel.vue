<template>
  <section class="layout">
    <v-flex sm8 offset-sm2 md8 lg6 offset-md2 offset-lg3>
      <v-card>
        <v-card-title primary-title>
          <v-form class="flex xs12" v-model="valid" ref="form" lazy-validation>

            <h1 class="title">{{title}}</h1>

            <v-text-field
              :label="labelUserEmail"
              v-model="user"
              :rules="emailRules"
              required
            ></v-text-field>

            <v-text-field
              :label="labelPassword"
              v-model="pass"
              :rules="passRules"
              type="password"
              required
            ></v-text-field>

            <v-alert v-show="resultError !== ''" type="info" :value="true">{{resultError}}</v-alert>
            <v-progress-linear v-show="loading" indeterminate color="accent"></v-progress-linear>
            <v-btn class="primary" @click="submit" :disabled="!valid">{{submitButton}}</v-btn>

          </v-form>
        </v-card-title>
      </v-card>

      <div class="mt-4">
        <p>{{switchText}}</p>
        <v-btn class="primary" :href="`${switchUrl}`">{{switchButtonText}}</v-btn>
        <v-btn :href="`${$kpUtils.routerUrl.Homepage.path}`" flat>
          {{e('goToHome')}}
          <v-icon dark left>arrow_forward</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </section>
</template>

<script>
export default {
  name: 'FormTpl',
  props: ['title', 'labelUserEmail', 'labelPassword', 'loading', 'resultError', 'submitButton', 'switchText', 'switchButtonText', 'switchUrl', 'componentText', 'minPassLength'],
  data() {
    return {
      valid: true,
      user: 'qw@qw.qw1',
      pass: '123456',
      emailRules: [
        v => !!v || this.e('userEmpty'),
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.e('userError'),
      ],
      passRules: [
        v => !!v || this.e('passEmpty'),
        v => (v && v.length >= this.minPassLength) || this.e('passError'),
      ],
    };
  },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(this.componentText, copy);
    },
    submit(e) {
      e.preventDefault();

      // reset error
      this.$emit('startProcess');

      // return if error
      if (!this.$refs.form.validate()) {
        this.$emit('endProcess');
        return;
      }

      this.$emit('postAPI', { user: this.user, pass: this.pass });
    },
  },
};
</script>
