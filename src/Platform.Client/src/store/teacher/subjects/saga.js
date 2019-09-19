import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/subjectsGateway';
import {
  subjectActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  editCompleted, editFailed,
  obosoleteCompleted, obsoleteFailed,
  restoreCompleted, restoreFailed,

  loaderAdd, loaderRemove,

  eventActionTypes,
  eventAddRequest,
  eventAddCompleted,
  eventRemoveCompleted,
} from './actions';
import loaders from '../../../utility/loaders/teacher/subjects';
import { authSafeCall } from '../../utility';
import { Infos, Errors } from '../../../utility/events/teacher/subjects';
import { httpErrors } from '../../../utility/httpErrors';
import { registerEvent } from '../../common/events/actions';

// Error handlers: function* handleErrors(errors) { yield; }

function* editErrorHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map((e) => {
      if (e.code === httpErrors.CONFLICT.code) {
        return put(eventAddRequest(Errors.SUBJECT_EDIT_NAME_CONFLICT));
      }
      return put(registerEvent(e));
    }));
  }
}

// Success handlers: function* handleSucces() { yield; }

function* editSuccessHandler() {
  yield put(eventAddRequest(Infos.SUBJECT_UPDATED));
  yield put(registerEvent(Infos.SUBJECT_UPDATED));
}
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
    null,
  );
}

function* getAllSubjects(action) {
  yield put(loaderAdd(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    null,
    null,
  );
  yield put(loaderRemove(loaders.LOAD_TABLE));
}

function* getMoreSubjects(action) {
  yield put(loaderAdd(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreCompleted,
    getMoreFailed,
    null,
    null,
  );
  yield put(loaderRemove(loaders.LOAD_TABLE));
}

function* editSubject(action) {
  yield put(loaderAdd(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.editSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    editErrorHandler,
    editSuccessHandler,
  );
  yield put(loaderRemove(loaders.UPDATE_SUBJECT));
}

function* obsoleteSubject(action) {
  yield put(loaderAdd(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.obsoleteSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    obosoleteCompleted,
    obsoleteFailed,
    null,
    obsoleteSuccessHandler,
  );
  yield put(loaderRemove(loaders.UPDATE_SUBJECT));
}

function* restoreSubject(action) {
  yield put(loaderAdd(loaders.UPDATE_SUBJECT));
  const promise = call(gateway.restoreSubject, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreCompleted,
    restoreFailed,
    null,
    restoreSuccessHandler,
  );
  yield put(loaderRemove(loaders.UPDATE_SUBJECT));
}

function* subjectEventAdd(action) {
  yield put(eventAddCompleted(action.payload));
}

function* subjectEventRemove(action) {
  yield put(eventRemoveCompleted(action.payload));
}

export default function* templateSaga() {
  yield all([
    takeLatest(subjectActionTypes.GET_REQUEST, getSubject),
    takeLatest(subjectActionTypes.GET_ALL_REQUEST, getAllSubjects),
    takeLatest(subjectActionTypes.GET_MORE_REQUEST, getMoreSubjects),
    takeLatest(subjectActionTypes.EDIT_REQUEST, editSubject),
    takeLatest(subjectActionTypes.OBSOLETE_REQUEST, obsoleteSubject),
    takeLatest(subjectActionTypes.RESTORE_REQUEST, restoreSubject),
    takeLatest(eventActionTypes.EVENT_ADD_REQUEST, subjectEventAdd),
    takeLatest(eventActionTypes.EVENT_REMOVE_REQUEST, subjectEventRemove),
  ]);
}
