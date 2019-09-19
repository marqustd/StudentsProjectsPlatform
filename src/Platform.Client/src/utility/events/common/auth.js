// 10[00-49]
export const authErrors = {
  NONE: { code: 1000, message: '' },
  STANDARD_LOGIN_CREDENTIALS: { code: 1001, message: 'Invalid login credentials' },
  GOOGLE_LOGIN_CREDENTIALS: { code: 1002, message: 'Invalid google account' },
  STANDARD_REGISTER_CREDENTIALS: { code: 1003, message: 'Invalid register credentials' },
  GOOGLE_REGISTER_CREDENTIALS: { code: 1004, message: 'Ivalid register credentials' },
};

// 10[50-99]
export const authInfos = {
  REGISTER_SUCCESS: { code: 1050, message: 'Registration success' },
};
