export const API = 'http://localhost:5001';

export const commonUrls = {
  auth: {
    LOGIN: `${API}/api/account/login`,
    GOOGLE_LOGIN: `${API}/api/account/googlelogin`,
    REGISTER: `${API}/api/account/register`,
    GOOGLE_REGISTER: `${API}/api/account/googleregister`,
    REFRESH_TOKEN: `${API}/api/account/refresh`,
    LOGOUT: `${API}/api/account/logout`,
  },
};

export const adminUrls = {
  users: {
    GET_STUDENT: `${API}/api/student/get`,
    GET_TEACHER: `${API}/api/teacher/get`,
    GET_ADMIN: `${API}/api/admin/get`,
    GET_ALL_STUDENTS: `${API}/api/student/fetch`,
    GET_ALL_TEACHERS: `${API}/api/teacher/fetch`,
    GET_ALL_ADMINS: `${API}/api/admin/fetch`,
    ADD_STUDENT: `${API}/api/admin/student/add`,
    ADD_TEACHER: `${API}/api/admin/teacher/add`,
    ADD_ADMIN: `${API}/api/admin/add`,
    EDIT_STUDENT: `${API}/api/admin/student/patch`,
    EDIT_TEACHER: `${API}/api/admin/teacher/patch`,
    EDIT_ADMIN: `${API}/api/admin/patch`,
    OBSOLETE_STUDENT: `${API}/api/admin/student/obsolete`,
    OBSOLETE_TEACHER: `${API}/api/admin/teacher/obsolete`,
    OBSOLETE_ADMIN: `${API}/api/admin/obsolete`,
    RESTORE_STUDENT: `${API}/api/admin/student/restore`,
    RESTORE_TEACHER: `${API}/api/admin/teacher/restore`,
    RESTORE_ADMIN: `${API}/api/admin/restore`,
    IMPORT_TEACHERS: `${API}/api/admin/teacher/upload`,
    IMPORT_STUDENTS: `${API}/api/admin/student/upload`,
  },

  majors: {
    GET_MAJOR: `${API}/api/major/get`,
    GET_ALL_MAJORS: `${API}/api/major/fetch`,
    ADD_MAJOR: `${API}/api/admin/major/add`,
    EDIT_MAJOR: `${API}/api/admin/major/patch`,
    OBSOLETE_MAJOR: `${API}/api/admin/major/obsolete`,
    RESTORE_MAJOR: `${API}/api/admin/major/restore`,
  },

  subjects: {
    GET_SUBJECT: `${API}/api/subject/get`,
    GET_ALL_SUBJECTS: `${API}/api/subject/fetch`,
    ADD_SUBJECT: `${API}/api/admin/subject/add`,
    EDIT_SUBJECT: `${API}/api/admin/subject/patch`,
    OBSOLETE_SUBJECT: `${API}/api/admin/subject/obsolete`,
    RESTORE_SUBJECT: `${API}/api/admin/subject/restore`,
  },
};

export const teacherUrls = {
  subjects: {
    GET_SUBJECT: `${API}/api/teacher/subject/get`,
    GET_ALL_SUBJECTS: `${API}/api/teacher/subject/fetch`,
    EDIT_SUBJECT: `${API}/api/teacher/subject/patch`,
    OBSOLETE_SUBJECT: `${API}/api/teacher/subject/obsolete`,
    RESTORE_SUBJECT: `${API}/api/teacher/subject/restore`,
  },

  activities: {
    GET_ALL: `${API}/api/teacher/section/activities`,
    GET: `${API}/api/teacher/activity/get`,
    ADD: `${API}/api/teacher/`,
    REMOVE: `${API}/api/teacher/`,
    DOWNLOAD_GETTER: activityId => `${API}/api/teacher/activity/artifact?activityId=${activityId}`,
    discussion: {
      GET: `${API}/api/teacher/activity/discussion`,
      ADD: `${API}/api/teacher/activity/comment`,
    },
    checks: {
      CHECK_ALL: `${API}/api/teacher/activity/checkall`,
      CHECK: `${API}/api/teacher/activity/check`,
      FETCH: `${API}/api/teacher/activity/check`,
    },
  },

  activityTemplates: {
    GET_ALL: `${API}/api/teacher/activitytemplate/fetch`,
    GET: `${API}/api/teacher/activitytemplate/get`,
    EDIT: `${API}/api/teacher/activitytemplate/patch`,
    OBSOLETE: `${API}/api/teacher/activitytemplate/obsolete`,
    RESTORE: `${API}/api/teacher/activitytemplate/restore`,
    DELETE: `${API}/api/teacher/activitytemplate/delete`,
    ADD: `${API}/api/teacher/topic/activityTemplate`,
  },

  sections: {
    GET_ALL: `${API}/api/teacher/section/fetch`,
    GET: `${API}/api/teacher/section/get`,
    ADD: `${API}/api/teacher/section/add`,
    EDIT: `${API}/api/teacher/section/edit`,
    discussion: {
      GET: `${API}/api/teacher/section/discussion`,
      POST: `${API}/api/teacher/section/comment`,
    },
    members: {
      SEARCH: `${API}/api/teacher/section/searchstudents`,
    },
  },

  semesters: {
    GET_ALL: `${API}/api/teacher/semester/fetch`,
    GET: `${API}/api/teacher/semester/get`,
    ADD: `${API}/api/teacher/semester/add`,
    RESTORE: `${API}/api/teacher/semester/restore`,
    OBSOLETE: `${API}/api/teacher/semester/obsolete`,
    EDIT: `${API}/api/teacher/semester/state`,
    REPORT: `${API}/api/teacher/semester/report`,
  },

  topics: {
    GET_ALL: `${API}/api/teacher/topic/fetch`,
    GET: `${API}/api/teacher/topic/get`,
    ADD: `${API}/api/teacher/topic/add`,
    EDIT: `${API}/api/teacher/topic/patch`,
    RESTORE: `${API}/api/teacher/topic/restore`,
    OBSOLETE: `${API}/api/teacher/topic/obsolete`,
  },

  teachers: {
    GET_ALL: `${API}/api/teacher/subject/teachers`,
    ADD: `${API}/api/teacher/subject/teacher`,
    REMOVE: `${API}/api/teacher/subject/deleteteacher`,
  },

  students: {
    GET_ALL: `${API}/api/teacher/section/students`,
    ADD: `${API}/api/teacher/section/student`,
    REMOVE: `${API}/api/teacher/section/deletestudent`,
    grades: {
      GRADE: `${API}/api/teacher/student/grade`,
      GRADE_ALL: `${API}/api/teacher/section/grade`,
    },
  },


};

export const studentUrls = {
  subjects: {
    SIGN_IN_TO_SUBJECT: `${API}/api/student/subject/sign`,
    GET_ALL_SUBJECTS: `${API}/api/student/subject/find`,
  },
  mySubjects: {
    FETCH_SUBJECTS: `${API}/api/student/subject/fetch`,
    GET_SUBJECTS: `${API}/api/student/subject/get`,
  },
  sections: {
    GET_ALL_SECTIONS: `${API}/api/student/section/fetch`,
    GET_SECTION: `${API}/api/student/section/get`,
    SIGN_IN: `${API}/api/student/section/signin`,
    SIGN_OUT: `${API}/api/student/section/signout`,
    discussion: {
      GET: `${API}/api/student/section/discussion`,
      ADD: `${API}/api/student/section/comment`,
    },
  },
  activities: {
    GET_ALL: `${API}/api/student/section/activities`,
    GET: `${API}/api/student/activity/get`,
    UPLOAD_GETTER: activityId => `${API}/api/student/activity/${activityId}/artifact`,
    DOWNLOAD_GETTER: activityId => `${API}/api/student/activity/artifact?activityId=${activityId}`,
    discussion: {
      GET: `${API}/api/student/activity/discussion`,
      ADD: `${API}/api/student/activity/comment`,
    },
  },
};
