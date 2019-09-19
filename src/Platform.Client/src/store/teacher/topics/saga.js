import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/topicsGateway';
import {
  loaderActions,
  topicsActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  editFailed, editCompleted,
  obsoleteCompleted, obsoleteFailed,
  restoreCompleted, restoreFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/topics';
import { registerEvent } from '../../common/events/actions';
import { Infos } from '../../../utility/events/teacher/topics';

const { addLoader, removeLoader } = loaderActions.actions;
// Saga

function* getTopic(action) {
  const promise = call(gateway.getTopic, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    null,
  );
}

function* getAllTopics(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllTopics, action.payload);
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

function* getMoreTopics(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllTopics, action.payload);
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

function* addTopic(action) {
  const promise = call(gateway.addTopic, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.TOPIC_ADDED));
    },
  );
}

function* editTopic(action) {
  const promise = call(gateway.editTopic, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.TOPIC_UPDATED));
    },
  );
}

function* obsoleteTopic(action) {
  const promise = call(gateway.obsoleteTopic, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteCompleted,
    obsoleteFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.TOPIC_UPDATED));
    },
  );
}

function* restoreTopic(action) {
  const promise = call(gateway.restoreTopic, action.payload);
  yield authSafeCall(
    promise,
    action,
    restoreCompleted,
    restoreFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.TOPIC_UPDATED));
    },
  );
}

export default function* semestersSaga() {
  yield all([
    takeLatest(topicsActionTypes.GET_REQUEST, getTopic),
    takeLatest(topicsActionTypes.GET_ALL_REQUEST, getAllTopics),
    takeLatest(topicsActionTypes.GET_MORE_REQUEST, getMoreTopics),
    takeLatest(topicsActionTypes.ADD_REQUEST, addTopic),
    takeLatest(topicsActionTypes.EDIT_REQUEST, editTopic),
    takeLatest(topicsActionTypes.RESTORE_REQUEST, restoreTopic),
    takeLatest(topicsActionTypes.OBSOLETE_REQUEST, obsoleteTopic),
  ]);
}
