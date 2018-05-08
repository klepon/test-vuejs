import Vue from 'vue';
import Router from 'vue-router';

import routerUrl from '@/global/routerUrl';

import Dashboard from '@/components/dashboard/Dashboard';

import User from '@/components/member/Member';

import AddProject from '@/components/project/AddProject';
import ProjectDetail from '@/components/project/ProjectDetail';
import ProjectList from '@/components/project/ProjectList';

import Homepage from '@/components/publicPage/Homepage';

import ProjectReport from '@/components/report/ProjectReport';
import PersonalReport from '@/components/report/PersonalReport';

import TaskList from '@/components/task/TaskList';

import Account from '@/components/user/Account';
import Login from '@/components/user/Login';
import Register from '@/components/user/Register';
import EmailConfirmation from '@/components/user/EmailConfirmation';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: routerUrl.Homepage.pathMainRoute,
      name: routerUrl.Homepage.name,
      component: Homepage,
    },
    {
      path: routerUrl.Account.pathMainRoute,
      name: routerUrl.Account.name,
      component: Account,
      children: [
        {
          path: routerUrl.SubAccount.path,
          component: Account,
        },
      ],
    },
    {
      path: routerUrl.Login.pathMainRoute,
      name: routerUrl.Login.name,
      component: Login,
    },
    {
      path: routerUrl.Register.pathMainRoute,
      name: routerUrl.Register.name,
      component: Register,
    },
    {
      path: routerUrl.EmailConfirmation.pathMainRoute,
      name: routerUrl.EmailConfirmation.name,
      component: EmailConfirmation,
    },
    {
      path: routerUrl.Dashboard.pathMainRoute,
      name: routerUrl.Dashboard.name,
      component: Dashboard,
    },
    {
      path: routerUrl.Project.pathMainRoute,
      name: routerUrl.Project.name,
      component: ProjectList,
      children: [
        {
          path: routerUrl.AddProject.path,
          name: routerUrl.AddProject.name,
          component: AddProject,
        },
        {
          path: routerUrl.ProjectID.pathMainRoute,
          name: routerUrl.ProjectID.name,
          component: ProjectDetail,
        },
      ],
    },
    {
      path: routerUrl.Report.pathMainRoute,
      name: routerUrl.Report.name,
      component: ProjectReport,
      children: [
        {
          path: routerUrl.MyReport.path,
          name: routerUrl.MyReport.name,
          component: PersonalReport,
        },
      ],
    },
    {
      path: routerUrl.Task.pathMainRoute,
      name: routerUrl.Task.name,
      component: TaskList,
    },
    {
      path: routerUrl.Member.pathMainRoute,
      name: routerUrl.Member.name,
      component: User,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
