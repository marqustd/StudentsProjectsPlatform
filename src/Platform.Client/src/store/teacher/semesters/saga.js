import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/semestersGateway';
import {
  loaderActions,
  semestersActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  editCompleted, editFailed,
  restoreCompleted, restoreFailed,
  obsoleteCompleted, obsoleteFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/semesters';

const { addLoader, removeLoader } = loaderActions.actions;
// Saga

function* getSemester(action) {
  const promise = call(gateway.getSemester, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    null,
  );
}

function* restoreSemester(action) {
  const promise = call(gateway.restoreSemester, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreCompleted,
    restoreFailed,
    null,
    null,
  );
}

function* obsoleteSemester(action) {
  const promise = call(gateway.obsoleteSemester, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteCompleted,
    obsoleteFailed,
    null,
    null,
  );
}

function* getAllSemesters(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllSemesters, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    null,
    null,
  );
  yield put(removeLoader(loaderObject.LOAD_TABLE));
}

function* getMoreSemesters(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllSemesters, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreCompleted,
    getMoreFailed,
    null,
    null,
  );
  yield put(removeLoader(loaderObject.LOAD_TABLE));
}

function* addSemester(action) {
  const promise = call(gateway.addSemester, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    null,
  );
}

function* editSemester(action) {
  const promise = call(gateway.editSemester, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    null,
    null,
  );
}

export default function* semestersSaga() {
  yield all([
    takeLatest(semestersActionTypes.GET_REQUEST, getSemester),
    takeLatest(semestersActionTypes.GET_ALL_REQUEST, getAllSemesters),
    takeLatest(semestersActionTypes.GET_MORE_REQUEST, getMoreSemesters),
    takeLatest(semestersActionTypes.ADD_REQUEST, addSemester),
    takeLatest(semestersActionTypes.EDIT_REQUEST, editSemester),
    takeLatest(semestersActionTypes.RESTORE_REQUEST, restoreSemester),
    takeLatest(semestersActionTypes.OBSOLETE_REQUEST, obsoleteSemester),
  ]);
}
