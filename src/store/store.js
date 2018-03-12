// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setup: {
      logoImage: 'static/logo.png',
    },
    data: {
      sampleText: 'Lorem ipsum<br /><b>Dolor</b> sit <i>amet</i> gitu lo',
    },
  },
});
