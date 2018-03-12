import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Wysiwyg from '@/components/Wysiwyg-editor';
import Iframe from '@/components/Iframe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/Wysiwyg',
      name: 'Wysiwyg',
      component: Wysiwyg,
    },
    {
      path: '/Iframe',
      name: 'Iframe',
      component: Iframe,
    },
  ],
});
