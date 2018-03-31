import setting from '@/global/setting';

export default {
  getProjectAndChild: `${setting.apiUrl}api/project?filter=%7B%22include%22%3A%20%22child%22%7D&access_token=`,
  // login: `${setting.apiUrl}api/member/login`,
  // changePassword: `${setting.apiUrl}api/member/change-password`,
};
