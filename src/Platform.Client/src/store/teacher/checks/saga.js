import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/checksGateway';
import {
  checksActionTypes,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  checkAllCompleted, checkAllFailed,
  checkCompleted, checkFailed,
  loaderActions,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/checks';

const { addLoader, removeLoader } = loaderActions.actions;

function* getAllChecks(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllStudents, action.payload);
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

function* getMoreChecks(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllStudents, action.payload);
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

function* checkStudent(action) {
  const promise = call(gateway.checkStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    checkCompleted,
    checkFailed,
    null,
    null,
  );
}

function* checkAllStudents(action) {
  const promise = call(gateway.checkAllStudents, action.payload);
  yield authSafeCall(
    promise,
    action,
    checkAllCompleted,
    checkAllFailed,
    null,
    null,
  );
}

export default function* teachersSaga() {
  yield all([
    takeLatest(checksActionTypes.GET_ALL_REQUEST, getAllChecks),
    takeLatest(checksActionTypes.GET_MORE_REQUEST, getMoreChecks),
    takeLatest(checksActionTypes.CHECK_REQUEST, checkStudent),
    takeLatest(checksActionTypes.CHECK_ALL_REQUEST, checkAllStudents),
  ]);
}
