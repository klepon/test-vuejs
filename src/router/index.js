import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/components/Homepage';
import Dashboard from '@/components/Dashboard';

import ProjectList from '@/components/Project/ProjectList';
import AddProject from '@/components/Project/AddProject';
import ProjectDetail from '@/components/Project/ProjectDetail';

import ProjectReport from '@/components/Report/ProjectReport';
import PersonalReport from '@/components/Report/PersonalReport';

import TaskList from '@/components/Task/TaskList';
import User from '@/components/User/User';
import Login from '@/components/User/Login';
import Register from '@/components/User/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/Login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register/',
      name: 'Register',
      component: Register,
    },
    {
      path: '/Dashboard/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/Project/',
      name: 'Project',
      component: ProjectList,
      children: [
        {
          path: 'AddProject',
          component: AddProject,
        },
        {
          path: ':id',
          component: ProjectDetail,
        },
      ],
    },
    {
      path: '/Report/',
      name: 'Report',
      component: ProjectReport,
      children: [
        {
          path: 'MyReport',
          component: PersonalReport,
        },
      ],
    },
    {
      path: '/Task/',
      name: 'Task',
      component: TaskList,
    },
    {
      path: '/Member/',
      name: 'Member',
      component: User,
    },
  ],
});
