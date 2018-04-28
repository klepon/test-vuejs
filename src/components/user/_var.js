import setting from '@/global/setting';

export default {
  member: `${setting.apiUrl}member`,
  login: `${setting.apiUrl}member/login`,
  changePassword: `${setting.apiUrl}member/change-password`,
  verifyEmail: `${setting.apiUrl}member/verified?hash=`,
};
