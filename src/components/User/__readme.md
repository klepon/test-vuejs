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

** paid user - admin, limit project number base on admin package
- manage role
- manage company
- manage all project inside company
- all free user benefit

** free user
- no company until they joint a paid user
- join a project, role define by project owner
- create one project, be project owner, create more by joining company (one group with paid user)
- invite user to join own project

** logic
- user create project -> create access to
- user be admin -> enable create company -> create group, add all project to group
- user join admin -> create group, add user and project to group
