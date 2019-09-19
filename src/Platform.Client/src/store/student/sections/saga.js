import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/student/sectionsGateway';
import {
  loaderActions,
  eventActions,
  sectionsActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  signInCompleted, signInFailed,
  signOutCompleted, signOutFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/sections';
import { registerEvent } from '../../common/events/actions';
import { Infos } from '../../../utility/events/student/sections';

const { addLoader, removeLoader } = loaderActions.actions;
const { eventAddRequest, eventAddCompleted, eventRemoveCompleted } = eventActions.actions;

function* getSection(action) {
  const promise = call(gateway.getSection, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    function* success() {
      yield put(eventAddRequest(Infos.GET_COMPLETED));
    },
  );
}

function* getAllSections(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllSections, action.payload);
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

function* getMoreSections(action) {
  yield put(addLoader(loaderObject.LOAD_TABLE));
  const promise = call(gateway.getAllSections, action.payload);
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

function* signInToSection(action) {
  const promise = call(gateway.signIn, action.payload);
  yield authSafeCall(
    promise,
    action,
    signInCompleted,
    signInFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.SIGNED_IN));
    },
  );
}

function* signOutFromSection(action) {
  const promise = call(gateway.signOut, action.payload);
  yield authSafeCall(
    promise,
    action,
    signOutCompleted,
    signOutFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.SIGNED_OUT));
    },
  );
}

function* sectionEventAdd(action) {
  yield put(eventAddCompleted(action.payload));
}

function* sectionEventRemove(action) {
  yield put(eventRemoveCompleted(action.payload));
}

export default function* sectionsSaga() {
  yield all([
    takeLatest(sectionsActionTypes.GET_REQUEST, getSection),
    takeLatest(sectionsActionTypes.GET_ALL_REQUEST, getAllSections),
    takeLatest(sectionsActionTypes.GET_MORE_REQUEST, getMoreSections),
    takeLatest(sectionsActionTypes.SIGN_IN_REQUEST, signInToSection),
    takeLatest(sectionsActionTypes.SIGN_OUT_REQUEST, signOutFromSection),
    takeLatest(eventActions.eventActionTypes.EVENT_ADD_REQUEST, sectionEventAdd),
    takeLatest(eventActions.eventActionTypes.EVENT_REMOVE_REQUEST, sectionEventRemove),
  ]);
}
