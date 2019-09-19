import {
  takeLatest, call, all, put, //  takeEvery,
} from 'redux-saga/effects';
import * as gateway from '../../../api/admin/usersGateway';
import {
  studentActionTypes,
  teacherActionTypes,
  adminActionTypes,
  // Students
  getStudentCompleted, getStudentFailed,
  getAllStudentsCompleted, getAllStudentsFailed,
  getMoreStudentsCompleted, getMoreStudentsFailed,
  addStudentCompleted, addStudentFailed,
  editStudentCompleted, editStudentFailed,
  obsoleteStudentCompleted, obsoleteStudentFailed,
  restoreStudentCompleted, restoreStudentFailed,
  // Teachers
  getTeacherCompleted, getTeacherFailed,
  getAllTeachersCompleted, getAllTeachersFailed,
  getMoreTeachersCompleted, getMoreTeachersFailed,
  addTeacherCompleted, addTeacherFailed,
  editTeacherCompleted, editTeacherFailed,
  obsoleteTeacherCompleted, obsoleteTeacherFailed,
  restoreTeacherCompleted, restoreTeacherFailed,
  // Admins
  getAdminCompleted, getAdminFailed,
  getAllAdminsCompleted, getAllAdminsFailed,
  getMoreAdminsCompleted, getMoreAdminsFailed,
  addAdminCompleted, addAdminFailed,
  editAdminCompleted, editAdminFailed,
  obsoleteAdminCompleted, obsoleteAdminFailed,
  restoreAdminCompleted, restoreAdminFailed,
  // Loaders
  registerLoader, resolveLoader,
  // Events
  registerUsersEvent,

} from './actions';
import { registerEvent } from '../../common/events/actions';
import loaders from '../../../utility/loaders/admin/users';
import { authSafeCall } from '../../utility';
import { usersInfos } from '../../../utility/events/admin/users';

function* getUserSuccess() {
  yield put(registerUsersEvent(usersInfos.USER_FETCHED));
}
// Students

function* getStudent(action) {
  const promise = call(gateway.getStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    getStudentCompleted,
    getStudentFailed,
    null,
    getUserSuccess,
  );
}

function* getAllStudents(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllStudents, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllStudentsCompleted,
    getAllStudentsFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* getMoreStudents(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllStudents, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreStudentsCompleted,
    getMoreStudentsFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* addStudent(action) {
  yield put(registerLoader(loaders.CREATE_STUDENT));
  const promise = call(gateway.addStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    addStudentCompleted,
    addStudentFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_ADDED)); },
  );
  yield put(resolveLoader(loaders.CREATE_STUDENT));
}

function* editStudent(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.editStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    editStudentCompleted,
    editStudentFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_EDITED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}

function* obsoleteStudent(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.obsoleteStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteStudentCompleted,
    obsoleteStudentFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_OBSOLETED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}


function* restoreStudent(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.restoreStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreStudentCompleted,
    restoreStudentFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_RESTORED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}


// Teachers
function* getTeacher(action) {
  const promise = call(gateway.getTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    getTeacherCompleted,
    getTeacherFailed,
    null,
    getUserSuccess,
  );
}

function* getAllTeachers(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllTeachers, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllTeachersCompleted,
    getAllTeachersFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* getMoreTeachers(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllTeachers, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreTeachersCompleted,
    getMoreTeachersFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* addTeacher(action) {
  yield put(registerLoader(loaders.CREATE_TEACHER));
  const promise = call(gateway.addTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    addTeacherCompleted,
    addTeacherFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_ADDED)); },
  );
  yield put(resolveLoader(loaders.CREATE_TEACHER));
}

function* editTeacher(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.editTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    editTeacherCompleted,
    editTeacherFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_EDITED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}

function* obsoleteTeacher(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.obsoleteTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteTeacherCompleted,
    obsoleteTeacherFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_OBSOLETED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}


function* restoreTeacher(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.restoreTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreTeacherCompleted,
    restoreTeacherFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_RESTORED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}


// Admins
function* getAdmin(action) {
  const promise = call(gateway.getAdmin, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAdminCompleted,
    getAdminFailed,
    null,
    getUserSuccess,
  );
}

function* getAllAdmins(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllAdmins, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllAdminsCompleted,
    getAllAdminsFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* getMoreAdmins(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllAdmins, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreAdminsCompleted,
    getMoreAdminsFailed,
    // handleErrors,
    // handleSucces,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* addAdmin(action) {
  yield put(registerLoader(loaders.CREATE_ADMIN));
  const promise = call(gateway.addAdmin, action.payload);
  yield authSafeCall(
    promise,
    action,
    addAdminCompleted,
    addAdminFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_ADDED)); },
  );
  yield put(resolveLoader(loaders.CREATE_ADMIN));
}

function* editAdmin(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.editAdmin, action.payload);
  yield authSafeCall(
    promise,
    action,
    editAdminCompleted,
    editAdminFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_EDITED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}

function* obsoleteAdmin(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.obsoleteAdmin, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteAdminCompleted,
    obsoleteAdminFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_OBSOLETED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}


function* restoreAdmin(action) {
  yield put(registerLoader(loaders.UPDATE_USER));
  const promise = call(gateway.restoreAdmin, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreAdminCompleted,
    restoreAdminFailed,
    null,
    function* success() { yield put(registerEvent(usersInfos.USER_RESTORED)); },
  );
  yield put(resolveLoader(loaders.UPDATE_USER));
}

export default function* templateSaga() {
  yield all([
    takeLatest(studentActionTypes.GET_REQUEST, getStudent),
    takeLatest(teacherActionTypes.GET_REQUEST, getTeacher),
    takeLatest(adminActionTypes.GET_REQUEST, getAdmin),

    takeLatest(studentActionTypes.GET_ALL_REQUEST, getAllStudents),
    takeLatest(teacherActionTypes.GET_ALL_REQUEST, getAllTeachers),
    takeLatest(adminActionTypes.GET_ALL_REQUEST, getAllAdmins),

    takeLatest(studentActionTypes.GET_MORE_REQUEST, getMoreStudents),
    takeLatest(teacherActionTypes.GET_MORE_REQUEST, getMoreTeachers),
    takeLatest(adminActionTypes.GET_MORE_REQUEST, getMoreAdmins),

    takeLatest(studentActionTypes.ADD_REQUEST, addStudent),
    takeLatest(teacherActionTypes.ADD_REQUEST, addTeacher),
    takeLatest(adminActionTypes.ADD_REQUEST, addAdmin),

    takeLatest(studentActionTypes.EDIT_REQUEST, editStudent),
    takeLatest(teacherActionTypes.EDIT_REQUEST, editTeacher),
    takeLatest(adminActionTypes.EDIT_REQUEST, editAdmin),

    takeLatest(studentActionTypes.OBSOLETE_REQUEST, obsoleteStudent),
    takeLatest(teacherActionTypes.OBSOLETE_REQUEST, obsoleteTeacher),
    takeLatest(adminActionTypes.OBSOLETE_REQUEST, obsoleteAdmin),

    takeLatest(studentActionTypes.RESTORE_REQUEST, restoreStudent),
    takeLatest(teacherActionTypes.RESTORE_REQUEST, restoreTeacher),
    takeLatest(adminActionTypes.RESTORE_REQUEST, restoreAdmin),
  ]);
}
