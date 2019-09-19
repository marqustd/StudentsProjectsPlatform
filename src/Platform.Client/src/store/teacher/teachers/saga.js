import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/teachersGateway';
import {
  loaderActions,
  teachersActionTypes,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  removeCompleted, removeFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/teachers';

const { addLoader, removeLoader } = loaderActions.actions;

function* getAllTeachers(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllTeachers, action.payload);
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

function* getMoreTeachers(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllTeachers, action.payload);
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

function* addTeacher(action) {
  const promise = call(gateway.addTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    null,
  );
}


function* removeTeacher(action) {
  const promise = call(gateway.removeTeacher, action.payload);
  yield authSafeCall(
    promise,
    action,
    removeCompleted,
    removeFailed,
    null,
    null,
  );
}

export default function* teachersSaga() {
  yield all([
    takeLatest(teachersActionTypes.GET_ALL_REQUEST, getAllTeachers),
    takeLatest(teachersActionTypes.GET_MORE_REQUEST, getMoreTeachers),
    takeLatest(teachersActionTypes.ADD_REQUEST, addTeacher),
    takeLatest(teachersActionTypes.REMOVE_REQUEST, removeTeacher),
  ]);
}
