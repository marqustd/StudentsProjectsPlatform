import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/admin/subjectsGateway';
import {
  SubjectActionTypes,

  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  editCompleted, editFailed,
  obosoleteCompleted, obsoleteFailed,
  restoreCompleted, restoreFailed,

  registerLoader, resolveLoader,

  registerEvent as registerSubjectEvent,
  eventActionTypes,
  eventRegistered,
  eventHandled,
} from './actions';
import loaders from '../../../utility/loaders/admin/subjects';
import { authSafeCall } from '../../utility';
import { Infos, Errors } from '../../../utility/events/admin/subjects';
import { httpErrors } from '../../../utility/httpErrors';
import { registerEvent } from '../../common/events/actions';

// Error handlers: function* handleErrors(errors) { yield; }
function* addErrorHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map((e) => {
      if (e.code === httpErrors.CONFLICT.code) {
        return put(registerSubjectEvent(Errors.SUBJECT_ADD_NAME_CONFLICT));
      }
      return put(registerEvent(e));
    }));
  }
}

function* editErrorHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map((e) => {
      if (e.code === httpErrors.CONFLICT.code) {
        return put(registerSubjectEvent(Errors.SUBJECT_EDIT_NAME_CONFLICT));
      }
      return put(registerEvent(e));
    }));
  }
}

// Success handlers: function* handleSucces() { yield; }
function* getSuccessHandler() { yield put(registerSubjectEvent(Infos.SUBJECT_FETCHED)); }
function* addSuccessHandler() { yield put(registerEvent(Infos.SUBJECT_ADDED)); }
function* editSuccessHandler() { yield put(registerSubjectEvent(Infos.SUBJECT_UPDATED)); }
function* obsoleteSuccessHandler() { yield put(registerEvent(Infos.SUBJECT_OBSOLETED)); }
function* restoreSuccessHandler() { yield put(registerEvent(Infos.SUBJECT_RESTORED)); }
// Saga

function* getSubject(action) {
  const promise = call(gateway.getSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    getSuccessHandler,
  );
}

function* getAllSubjects(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    null,
    null,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* getMoreSubjects(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreCompleted,
    getMoreFailed,
    null,
    null,
  );
  yield put(resolveLoader(loaders.LOAD_TABLE));
}

function* addSubject(action) {
  yield put(registerLoader(loaders.ADD_SUBJECT));
  const promise = call(gateway.addSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    addErrorHandler,
    addSuccessHandler,
  );
  yield put(resolveLoader(loaders.ADD_SUBJECT));
}

function* editSubject(action) {
  yield put(registerLoader(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.editSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    editErrorHandler,
    editSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_SUBJECT));
}

function* obsoleteSubject(action) {
  yield put(registerLoader(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.obsoleteSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    obosoleteCompleted,
    obsoleteFailed,
    null,
    obsoleteSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_SUBJECT));
}

function* restoreSubject(action) {
  yield put(registerLoader(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.restoreSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreCompleted,
    restoreFailed,
    null,
    restoreSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_SUBJECT));
}

function* subjectEventRegister(action) {
  yield put(eventRegistered(action.payload));
}

function* subjectEventHandle(action) {
  yield put(eventHandled(action.payload));
}

export default function* templateSaga() {
  yield all([
    takeLatest(SubjectActionTypes.GET_REQUEST, getSubject),
    takeLatest(SubjectActionTypes.GET_ALL_REQUEST, getAllSubjects),
    takeLatest(SubjectActionTypes.GET_MORE_REQUEST, getMoreSubjects),
    takeLatest(SubjectActionTypes.ADD_REQUEST, addSubject),
    takeLatest(SubjectActionTypes.EDIT_REQUEST, editSubject),
    takeLatest(SubjectActionTypes.OBSOLETE_REQUEST, obsoleteSubject),
    takeLatest(SubjectActionTypes.RESTORE_REQUEST, restoreSubject),
    takeLatest(eventActionTypes.EVENT_REGISTER, subjectEventRegister),
    takeLatest(eventActionTypes.EVENT_HANDLE, subjectEventHandle),
  ]);
}
