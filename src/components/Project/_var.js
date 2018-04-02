import setting from '@/global/setting';

export default {
  getProjects: `${setting.apiUrl}project?filter[order]=name ASC&access_token=`,
  getProjectAndChild: `${setting.apiUrl}project?filter=%7B%22include%22%3A%20%22child%22%7D&access_token=`,
  addProject: `${setting.apiUrl}project`,
  // changePassword: `${setting.apiUrl}api/member/change-password`,
};
