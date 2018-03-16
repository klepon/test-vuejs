import Vue from 'vue';
import Router from 'vue-router';

import routerUrl from '@/variables/routerUrl';

import Homepage from '@/components/Homepage';
import Dashboard from '@/components/Dashboard';

import ProjectList from '@/components/Project/ProjectList';
import AddProject from '@/components/Project/AddProject';
import ProjectDetail from '@/components/Project/ProjectDetail';

import ProjectReport from '@/components/Report/ProjectReport';
import PersonalReport from '@/components/Report/PersonalReport';

import TaskList from '@/components/Task/TaskList';
import User from '@/components/Member/Member';

import Login from '@/components/User/Login';
import Register from '@/components/User/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: routerUrl.Homepage.path,
      name: routerUrl.Homepage.name,
      component: Homepage,
    },
    {
      path: routerUrl.Login.path,
      name: routerUrl.Login.name,
      component: Login,
    },
    {
      path: routerUrl.Register.path,
      name: routerUrl.Register.name,
      component: Register,
    },
    {
      path: routerUrl.Dashboard.path,
      name: routerUrl.Dashboard.name,
      component: Dashboard,
    },
    {
      path: routerUrl.Project.path,
      name: routerUrl.Project.name,
      component: ProjectList,
      children: [
        {
          path: routerUrl.AddProject.path,
          component: AddProject,
        },
        {
          path: routerUrl.ProjectID.path,
          component: ProjectDetail,
        },
      ],
    },
    {
      path: routerUrl.Report.path,
      name: routerUrl.Report.name,
      component: ProjectReport,
      children: [
        {
          path: routerUrl.MyReport.path,
          component: PersonalReport,
        },
      ],
    },
    {
      path: routerUrl.Task.path,
      name: routerUrl.Task.name,
      component: TaskList,
    },
    {
      path: routerUrl.Member.path,
      name: routerUrl.Member.name,
      component: User,
    },
  ],
});
