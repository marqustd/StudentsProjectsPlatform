// 11[00-49]
export const usersErrors = {
  NONE: { code: 1100, message: '' },
  NEW_STUDENT_DATA: { code: 1101, message: 'Could not create new student' },
  NEW_TEACHER_DATA: { code: 1102, message: 'Could not create new teacher' },
  NEW_ADMIN_DATA: { code: 1103, message: 'Could not create new admin' },
  STUDENT_IMPORT: { code: 1104, message: 'Students import file is invalid' },
  TEACHER_IMPORT: { code: 1105, message: 'Teachers import file is invalid' },
};

// 11[50-99]
export const usersInfos = {
  USER_ADDED: { code: 1150, message: 'User added successfully' },
  USER_FETCHED: { code: 1151, message: 'User fetched' },
  USER_EDITED: { code: 1152, message: 'User edited succesfully' },
  USER_OBSOLETED: { code: 1153, message: 'User obsoleted succesfully' },
  USER_RESTORED: { code: 1154, message: 'User restored succesfully' },
};
