export default {
  Homepage: {
    pathMainRoute: '/',
    path: '/#/',
    name: 'Homepage',
  },
  Login: {
    pathMainRoute: '/Login/',
    path: '/#/Login/',
    name: 'Login',
  },
  Register: {
    pathMainRoute: '/Register/',
    path: '/#/Register/',
    name: 'Register',
  },
  EmailConfirmation: {
    pathMainRoute: '/EmailConfirmation/:hash/:lang',
    path: '/#/EmailConfirmation/',
    name: 'EmailConfirmation',
  },
  Dashboard: {
    pathMainRoute: '/Dashboard/',
    path: '/#/Dashboard/',
    name: 'Dashboard',
  },
  Project: {
    pathMainRoute: '/Project/',
    path: '/#/Project/',
    name: 'Project',
  },
  ProjectID: {
    pathMainRoute: 'detail/:id/*',
    path: 'detail/',
    name: 'Detail Project',
  },
  AddProject: {
    path: 'AddProject',
    name: 'Add Project',
  },
  Report: {
    pathMainRoute: '/Report/',
    path: '/#/Report/',
    name: 'Report',
  },
  MyReport: {
    path: 'MyReport',
    name: 'MyReport',
  },
  Task: {
    pathMainRoute: '/Task/',
    path: '/#/Task/',
    name: 'Task',
  },
  Member: {
    pathMainRoute: '/Member/',
    path: '/#/Member/',
    name: 'Member',
  },
  Account: {
    pathMainRoute: '/Account/',
    path: '/#/Account/',
    name: 'Account',
  },
  SubAccount: {
    path: ':sub',
  },
  AccountProfile: {
    pathMainRoute: '/Account/profile',
    path: '/#/Account/profile',
    name: 'Profile',
  },
  AccountChangePassword: {
    path: '/#/Account/change-password',
    name: 'Change Password',
  },
  AccountDeleteAccount: {
    path: '/#/Account/remove-account',
    name: 'Remove Account',
  },
  foo: {
    pathMainRoute: '/foo/',
    path: '/#/foo/',
    name: 'foo',
  },
};
