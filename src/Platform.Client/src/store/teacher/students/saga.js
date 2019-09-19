import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/studentsGateway';
import {
  studentsActionTypes,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  removeCompleted, removeFailed,
  gradeCompleted, gradeFailed,
  gradeAllCompleted, gradeAllFailed,
  loaderActions,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/students';

const { addLoader, removeLoader } = loaderActions.actions;

function* getAllStudents(action) {
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

function* getMoreStudents(action) {
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

function* addStudent(action) {
  const promise = call(gateway.addStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    null,
  );
}


function* removeStudent(action) {
  const promise = call(gateway.removeStudent, action.payload);
  yield authSafeCall(
    promise,
    action,
    removeCompleted,
    removeFailed,
    null,
    null,
  );
}

function* gradeStudent(action) {
  const promise = call(gateway.grade, action.payload);
  yield authSafeCall(
    promise,
    action,
    gradeCompleted,
    gradeFailed,
    null,
    null,
  );
}

function* gradeAll(action) {
  const promise = call(gateway.gradeAll, action.payload);
  yield authSafeCall(
    promise,
    action,
    gradeAllCompleted,
    gradeAllFailed,
    null,
    null,
  );
}

export default function* teachersSaga() {
  yield all([
    takeLatest(studentsActionTypes.GET_ALL_REQUEST, getAllStudents),
    takeLatest(studentsActionTypes.GET_MORE_REQUEST, getMoreStudents),
    takeLatest(studentsActionTypes.ADD_REQUEST, addStudent),
    takeLatest(studentsActionTypes.REMOVE_REQUEST, removeStudent),
    takeLatest(studentsActionTypes.GRADE_REQUEST, gradeStudent),
    takeLatest(studentsActionTypes.GRADE_ALL_REQUEST, gradeAll),
  ]);
}
