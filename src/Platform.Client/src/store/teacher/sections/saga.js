import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/sectionsGateway';
import {
  loaderActions,
  sectionsActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  getMoreCompleted, getMoreFailed,
  addCompleted, addFailed,
  editCompleted, editFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import loaderObject from '../../../utility/loaders/teacher/sections';
import { registerEvent } from '../../common/events/actions';
import { Infos } from '../../../utility/events/teacher/sections';

const { addLoader, removeLoader } = loaderActions.actions;

function* getSection(action) {
  const promise = call(gateway.getSections, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    null,
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

function* addSection(action) {
  const promise = call(gateway.addSection, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    null,
  );
}

function* editSection(action) {
  const promise = call(gateway.editSection, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    null,
    function* success() {
      yield put(registerEvent(Infos.SECTION_UPDATED));
    },
  );
}

export default function* semestersSaga() {
  yield all([
    takeLatest(sectionsActionTypes.GET_REQUEST, getSection),
    takeLatest(sectionsActionTypes.GET_ALL_REQUEST, getAllSections),
    takeLatest(sectionsActionTypes.GET_MORE_REQUEST, getMoreSections),
    takeLatest(sectionsActionTypes.ADD_REQUEST, addSection),
    takeLatest(sectionsActionTypes.EDIT_REQUEST, editSection),
  ]);
}
