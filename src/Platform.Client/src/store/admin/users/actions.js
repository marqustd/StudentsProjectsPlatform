export const adminActionTypes = {
  GET_REQUEST: 'users/admins/GET_REQUEST',
  GET_COMPLETED: 'users/admins/GET_COMPLETED',
  GET_FAILED: 'users/admins/GET_FAILED',

  GET_ALL_REQUEST: 'users/admins/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'users/admins/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'users/admins/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'users/admins/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'users/admins/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'users/admins/GET_MORE_FAILED',

  ADD_REQUEST: 'users/admins/ADD_REQUEST',
  ADD_COMPLETED: 'users/admins/ADD_COMPLETED',
  ADD_FAILED: 'users/admins/ADD_FAILED',

  EDIT_REQUEST: 'users/admins/EDIT_REQUEST',
  EDIT_COMPLETED: 'users/admins/EDIT_COMPLETED',
  EDIT_FAILED: 'users/admins/EDIT_FAILED',

  OBSOLETE_REQUEST: 'users/admins/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'users/admins/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'users/admins/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'users/admins/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'users/admins/RESTORE_COMPLETED',
  RESTORE_FAILED: 'users/admins/RESTORE_FAILED',
};

export const teacherActionTypes = {
  GET_REQUEST: 'users/teachers/GET_REQUEST',
  GET_COMPLETED: 'users/teachers/GET_COMPLETED',
  GET_FAILED: 'users/teachers/GET_FAILED',

  GET_ALL_REQUEST: 'users/teachers/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'users/teachers/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'users/teachers/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'users/teachers/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'users/teachers/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'users/teachers/GET_MORE_FAILED',

  ADD_REQUEST: 'users/teachers/ADD_REQUEST',
  ADD_COMPLETED: 'users/teachers/ADD_COMPLETED',
  ADD_FAILED: 'users/teachers/ADD_FAILED',

  EDIT_REQUEST: 'users/teachers/EDIT_REQUEST',
  EDIT_COMPLETED: 'users/teachers/EDIT_COMPLETED',
  EDIT_FAILED: 'users/teachers/EDIT_FAILED',

  OBSOLETE_REQUEST: 'users/teachers/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'users/teachers/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'users/teachers/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'users/teachers/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'users/teachers/RESTORE_COMPLETED',
  RESTORE_FAILED: 'users/teachers/RESTORE_FAILED',
};

export const studentActionTypes = {
  GET_REQUEST: 'users/students/GET_REQUEST',
  GET_COMPLETED: 'users/students/GET_COMPLETED',
  GET_FAILED: 'users/students/GET_FAILED',

  GET_ALL_REQUEST: 'users/students/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'users/students/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'users/students/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'users/students/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'users/students/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'users/students/GET_MORE_FAILED',

  ADD_REQUEST: 'users/students/ADD_REQUEST',
  ADD_COMPLETED: 'users/students/ADD_COMPLETED',
  ADD_FAILED: 'users/students/ADD_FAILED',

  EDIT_REQUEST: 'users/students/EDIT_REQUEST',
  EDIT_COMPLETED: 'users/students/EDIT_COMPLETED',
  EDIT_FAILED: 'users/students/EDIT_FAILED',

  OBSOLETE_REQUEST: 'users/students/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'users/students/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'users/students/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'users/students/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'users/students/RESTORE_COMPLETED',
  RESTORE_FAILED: 'users/students/RESTORE_FAILED',
};

export const loaderActionTypes = {
  LOADER_REGISTER: 'users/loader/LOADER_REGISTER',
  LOADER_RESOLVE: 'users/loader/LOADER_RESOLVE',
};

export const eventActionTypes = {
  USERS_EVENT_OCCURED: 'users/event/USERS_EVENT_OCCURED',
  USERS_EVENT_HANDLED: 'users/event/USERS_EVENT_HANDLED',
};

// Events
export function registerUsersEvent(event) {
  return {
    type: eventActionTypes.USERS_EVENT_OCCURED,
    payload: event,
  };
}

export function handleUsersEvent(id) {
  return {
    type: eventActionTypes.USERS_EVENT_HANDLED,
    payload: id,
  };
}

// Loaders
export function registerLoader(loader) {
  return {
    type: loaderActionTypes.LOADER_REGISTER,
    payload: loader,
  };
}

export function resolveLoader(loader) {
  return {
    type: loaderActionTypes.LOADER_RESOLVE,
    payload: loader,
  };
}

// Student
export function getStudentRequest(id) {
  return {
    type: studentActionTypes.GET_REQUEST,
    payload: id,
  };
}

export function getStudentCompleted(student) {
  return {
    type: studentActionTypes.GET_COMPLETED,
    payload: student,
  };
}

export function getStudentFailed(error) {
  return {
    type: studentActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllStudentsRequest(search, index, count, obsolete) {
  return {
    type: studentActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getAllStudentsCompleted(students) {
  return {
    type: studentActionTypes.GET_ALL_COMPLETED,
    payload: students,
  };
}

export function getAllStudentsFailed(error) {
  return {
    type: studentActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function addStudentRequest(firstName, lastName, albumNumber, majorId) {
  return {
    type: studentActionTypes.ADD_REQUEST,
    payload: {
      firstName,
      lastName,
      albumNumber,
      majorId,
    },
  };
}

export function addStudentCompleted(student) {
  return {
    type: studentActionTypes.ADD_COMPLETED,
    payload: student,
  };
}

export function addStudentFailed(error) {
  return {
    type: studentActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editStudentRequest(student) {
  return {
    type: studentActionTypes.EDIT_REQUEST,
    payload: student,
  };
}

export function editStudentCompleted(student) {
  return {
    type: studentActionTypes.EDIT_COMPLETED,
    payload: student,
  };
}

export function editStudentFailed(error) {
  return {
    type: studentActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function obsoleteStudentRequest(studentId) {
  return {
    type: studentActionTypes.OBSOLETE_REQUEST,
    payload: studentId,
  };
}

export function obsoleteStudentCompleted(student) {
  return {
    type: studentActionTypes.OBSOLETE_COMPLETED,
    payload: student,
  };
}

export function obsoleteStudentFailed(error) {
  return {
    type: studentActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}


export function restoreStudentRequest(studentId) {
  return {
    type: studentActionTypes.RESTORE_REQUEST,
    payload: studentId,
  };
}

export function restoreStudentCompleted(student) {
  return {
    type: studentActionTypes.RESTORE_COMPLETED,
    payload: student,
  };
}

export function restoreStudentFailed(error) {
  return {
    type: studentActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

export function getMoreStudentsRequest(search, index, count, obsolete) {
  return {
    type: studentActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getMoreStudentsCompleted(students) {
  return {
    type: studentActionTypes.GET_MORE_COMPLETED,
    payload: students,
  };
}

export function getMoreStudentsFailed(error) {
  return {
    type: studentActionTypes.GET_MORE_FAILED,
    payload: error,
  };
}

// Teachers
export function getTeacherRequest(id) {
  return {
    type: teacherActionTypes.GET_REQUEST,
    payload: id,
  };
}

export function getTeacherCompleted(teacher) {
  return {
    type: teacherActionTypes.GET_COMPLETED,
    payload: teacher,
  };
}

export function getTeacherFailed(error) {
  return {
    type: teacherActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllTeachersRequest(search, index, count, obsolete) {
  return {
    type: teacherActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getAllTeachersCompleted(teachers) {
  return {
    type: teacherActionTypes.GET_ALL_COMPLETED,
    payload: teachers,
  };
}

export function getAllTeachersFailed(error) {
  return {
    type: teacherActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function addTeacherRequest(firstName, lastName, email) {
  return {
    type: teacherActionTypes.ADD_REQUEST,
    payload: { firstName, lastName, email },
  };
}

export function addTeacherCompleted(teacher) {
  return {
    type: teacherActionTypes.ADD_COMPLETED,
    payload: teacher,
  };
}

export function addTeacherFailed(error) {
  return {
    type: teacherActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editTeacherRequest(teacher) {
  return {
    type: teacherActionTypes.EDIT_REQUEST,
    payload: teacher,
  };
}

export function editTeacherCompleted(teacher) {
  return {
    type: teacherActionTypes.EDIT_COMPLETED,
    payload: teacher,
  };
}

export function editTeacherFailed(error) {
  return {
    type: teacherActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function obsoleteTeacherRequest(teacherId) {
  return {
    type: teacherActionTypes.OBSOLETE_REQUEST,
    payload: teacherId,
  };
}

export function obsoleteTeacherCompleted(teacher) {
  return {
    type: teacherActionTypes.OBSOLETE_COMPLETED,
    payload: teacher,
  };
}

export function obsoleteTeacherFailed(error) {
  return {
    type: teacherActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreTeacherRequest(teacherId) {
  return {
    type: teacherActionTypes.RESTORE_REQUEST,
    payload: teacherId,
  };
}

export function restoreTeacherCompleted(teacher) {
  return {
    type: teacherActionTypes.RESTORE_COMPLETED,
    payload: teacher,
  };
}

export function restoreTeacherFailed(error) {
  return {
    type: teacherActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

export function getMoreTeachersRequest(search, index, count, obsolete) {
  return {
    type: teacherActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getMoreTeachersCompleted(teachers) {
  return {
    type: teacherActionTypes.GET_MORE_COMPLETED,
    payload: teachers,
  };
}

export function getMoreTeachersFailed(error) {
  return {
    type: teacherActionTypes.GET_MORE_FAILED,
    payload: error,
  };
}

// Admins
export function getAdminRequest(id) {
  return {
    type: adminActionTypes.GET_REQUEST,
    payload: id,
  };
}

export function getAdminCompleted(admin) {
  return {
    type: adminActionTypes.GET_COMPLETED,
    payload: admin,
  };
}

export function getAdminFailed(error) {
  return {
    type: adminActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllAdminsRequest(search, index, count, obsolete) {
  return {
    type: adminActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getAllAdminsCompleted(admins) {
  return {
    type: adminActionTypes.GET_ALL_COMPLETED,
    payload: admins,
  };
}

export function getAllAdminsFailed(error) {
  return {
    type: adminActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function addAdminRequest(firstName, lastName, email) {
  return {
    type: adminActionTypes.ADD_REQUEST,
    payload: { firstName, lastName, email },
  };
}

export function addAdminCompleted(admin) {
  return {
    type: adminActionTypes.ADD_COMPLETED,
    payload: admin,
  };
}

export function addAdminFailed(error) {
  return {
    type: adminActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editAdminRequest(admin) {
  return {
    type: adminActionTypes.EDIT_REQUEST,
    payload: admin,
  };
}

export function editAdminCompleted(admin) {
  return {
    type: adminActionTypes.EDIT_COMPLETED,
    payload: admin,
  };
}

export function editAdminFailed(error) {
  return {
    type: adminActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function obsoleteAdminRequest(adminId) {
  return {
    type: adminActionTypes.OBSOLETE_REQUEST,
    payload: adminId,
  };
}

export function obsoleteAdminCompleted(admin) {
  return {
    type: adminActionTypes.OBSOLETE_COMPLETED,
    payload: admin,
  };
}

export function obsoleteAdminFailed(error) {
  return {
    type: adminActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreAdminRequest(adminId) {
  return {
    type: adminActionTypes.RESTORE_REQUEST,
    payload: adminId,
  };
}

export function restoreAdminCompleted(admin) {
  return {
    type: adminActionTypes.RESTORE_COMPLETED,
    payload: admin,
  };
}

export function restoreAdminFailed(error) {
  return {
    type: adminActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

export function getMoreAdminsRequest(search, index, count, obsolete) {
  return {
    type: adminActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getMoreAdminsCompleted(admins) {
  return {
    type: adminActionTypes.GET_MORE_COMPLETED,
    payload: admins,
  };
}

export function getMoreAdminsFailed(error) {
  return {
    type: adminActionTypes.GET_MORE_FAILED,
    payload: error,
  };
}
