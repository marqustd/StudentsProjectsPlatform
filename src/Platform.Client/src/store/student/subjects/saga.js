import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/student/subjectsGateway';
import {
  subjectActionTypes,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  loaderActions,
  signInCompleted,
  signInFailed,
} from './actions';
import loaders from '../../../utility/loaders/student/subjects';
import { authSafeCall } from '../../utility';
import { Infos } from '../../../utility/events/student/subjects';
import { registerEvent } from '../../common/events/actions';
// import { registerEvent } from '../../common/events/actions';

const { addLoader, removeLoader } = loaderActions.actions;
// Error handlers: function* handleErrors(errors) { yield; }

// Success handlers: function* handleSucces() { yield; }

// Saga
function* signIn(action) {
  const promise = call(gateway.signIn, action.payload);
  yield authSafeCall(
    promise,
    action,
    signInCompleted,
    signInFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.SUBJECT_SIGNED_IN));
    },
  );
}

function* getAllSubjects(action) {
  yield put(addLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    null,
    null,
  );
  yield put(removeLoader(loaders.LOAD_TABLE));
}

function* getMoreSubjects(action) {
  yield put(addLoader(loaders.LOAD_TABLE));
  const promise = call(gateway.getAllSubjects, action.payload);
  yield authSafeCall(
    promise,
    action,
    getMoreCompleted,
    getMoreFailed,
    null,
    null,
  );
  yield put(removeLoader(loaders.LOAD_TABLE));
}


export default function* subjectSaga() {
  yield all([
    takeLatest(subjectActionTypes.GET_ALL_REQUEST, getAllSubjects),
    takeLatest(subjectActionTypes.GET_MORE_REQUEST, getMoreSubjects),
    takeLatest(subjectActionTypes.SIGN_IN_REQUEST, signIn),
  ]);
}
