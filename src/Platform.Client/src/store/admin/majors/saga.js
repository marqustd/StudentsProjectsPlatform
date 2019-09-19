import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/admin/majorsGateway';
import {
  MajorActionTypes,

  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  editCompleted, editFailed,
  obosoleteCompleted, obsoleteFailed,
  restoreCompleted, restoreFailed,

  registerLoader, resolveLoader,

  registerEvent as registerMajorEvent,
  eventActionTypes,
  eventRegistered,
  eventHandled,
} from './actions';
import loaders from '../../../utility/loaders/admin/majors';
import { authSafeCall } from '../../utility';
import { Infos, Errors } from '../../../utility/events/admin/majors';
import { httpErrors } from '../../../utility/httpErrors';
import { registerEvent } from '../../common/events/actions';


// Error handlers: function* handleErrors(errors) { yield; }
function* addErrorHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map((e) => {
      if (e.code === httpErrors.CONFLICT.code) {
        return put(registerMajorEvent(Errors.MAJOR_ADD_NAME_CONFLICT));
      }
      return put(registerEvent(e));
    }));
  }
}

function* editErrorHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map((e) => {
      if (e.code === httpErrors.CONFLICT.code) {
        return put(registerMajorEvent(Errors.MAJOR_EDIT_NAME_CONFLICT));
      }
      return put(registerEvent(e));
    }));
  }
}

// Success handlers: function* handleSucces() { yield; }
function* getSuccessHandler() { yield put(registerMajorEvent(Infos.MAJOR_FETCHED)); }
function* addSuccessHandler() { yield put(registerEvent(Infos.MAJOR_ADDED)); }
function* editSuccessHandler() { yield put(registerMajorEvent(Infos.MAJOR_UPDATED)); }
function* obsoleteSuccessHandler() { yield put(registerEvent(Infos.MAJOR_OBSOLETED)); }
function* restoreSuccessHandler() { yield put(registerEvent(Infos.MAJOR_RESTORED)); }
// Saga

function* getMajor(action) {
  const promise = call(gateway.getMajor, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    getSuccessHandler,
  );
}

function* getAllMajors(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllMajors, action.payload);
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

function* getMoreMajors(action) {
  yield put(registerLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllMajors, action.payload);
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

function* addMajor(action) {
  yield put(registerLoader(loaders.ADD_MAJOR));
  const promise = call(gateway.addMajor, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    addErrorHandler,
    addSuccessHandler,
  );
  yield put(resolveLoader(loaders.ADD_MAJOR));
}

function* editMajor(action) {
  yield put(registerLoader(loaders.UPDATE_MAJOR));
  const promise = call(gateway.editMajor, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    editErrorHandler,
    editSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_MAJOR));
}

function* obsoleteMajor(action) {
  yield put(registerLoader(loaders.UPDATE_MAJOR));
  const promise = call(gateway.obsoleteMajor, action.payload);
  yield authSafeCall(
    promise,
    action,
    obosoleteCompleted,
    obsoleteFailed,
    null,
    obsoleteSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_MAJOR));
}

function* restoreMajor(action) {
  yield put(registerLoader(loaders.UPDATE_MAJORd));
  const promise = call(gateway.restoreMajor, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreCompleted,
    restoreFailed,
    null,
    restoreSuccessHandler,
  );
  yield put(resolveLoader(loaders.UPDATE_MAJOR));
}

function* majorEventRegister(action) {
  yield put(eventRegistered(action.payload));
}

function* majorEventHandle(action) {
  yield put(eventHandled(action.payload));
}

export default function* templateSaga() {
  yield all([
    takeLatest(MajorActionTypes.GET_REQUEST, getMajor),
    takeLatest(MajorActionTypes.GET_ALL_REQUEST, getAllMajors),
    takeLatest(MajorActionTypes.GET_MORE_REQUEST, getMoreMajors),
    takeLatest(MajorActionTypes.ADD_REQUEST, addMajor),
    takeLatest(MajorActionTypes.EDIT_REQUEST, editMajor),
    takeLatest(MajorActionTypes.OBSOLETE_REQUEST, obsoleteMajor),
    takeLatest(MajorActionTypes.RESTORE_REQUEST, restoreMajor),
    takeLatest(eventActionTypes.EVENT_REGISTER, majorEventRegister),
    takeLatest(eventActionTypes.EVENT_HANDLE, majorEventHandle),
  ]);
}
