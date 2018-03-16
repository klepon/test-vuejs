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

import Login from '@/components/user/Login';
import Register from '@/components/user/Register';

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
