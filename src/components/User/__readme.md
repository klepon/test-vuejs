** how to use
* open _userStore.js, create method and property on main store as show on this file
* add isUserLogin(store) on main.js or on first page with import store from './global/store';

** required
* { Card, Modal, Button, Form, FormGroup, FormInput } from 'bootstrap-vue/es/components';
* routerUrl from '@/global/routerUrl';
* getTextByLang from '@/global/getTextByLang';
* fetching from '@/global/fetching';
* regex from '@/global/regex';
* router from '@/global/router';
* setting from '@/global/setting';

** add auto redirect on user loose token on each page that need auth, see user/Account.vue
beforeMount() {
  this.$kpUtils.isLoggedIn();
},
