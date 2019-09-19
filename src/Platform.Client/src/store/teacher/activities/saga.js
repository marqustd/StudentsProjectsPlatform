import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/activitiesGateway';
import {
  eventActions,
  activitiesActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  addCompleted, addFailed,
  removeCompleted, removeFailed,
} from './actions';
import { authSafeCall } from '../../utility';
import { Infos } from '../../../utility/events/teacher/activities';

const { eventAddRequest } = eventActions.actions;
const { actions, eventActionTypes } = eventActions;


function* getActivity(action) {
  const promise = call(gateway.getActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    getCompleted,
    getFailed,
    null,
    null,
  );
}

function* getAllActivities(action) {
  const promise = call(gateway.getAllActivities, action.payload);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    null,
    function* success() {
      yield put(eventAddRequest(Infos.ACTIVITIES_FETCHED));
    },
  );
}

function* addActivity(action) {
  const promise = call(gateway.addActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    addCompleted,
    addFailed,
    null,
    null,
  );
}

function* removeActivity(action) {
  const promise = call(gateway.removeActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    removeCompleted,
    removeFailed,
    null,
    null,
  );
}

// Events
function* addEvent(action) {
  yield put(actions.eventAddCompleted(action.payload));
}

function* removeEvent(action) {
  yield put(actions.eventRemoveCompleted(action.payload));
}


export default function* artifactSaga() {
  yield all([
    takeLatest(activitiesActionTypes.GET_REQUEST, getActivity),
    takeLatest(activitiesActionTypes.GET_ALL_REQUEST, getAllActivities),
    takeLatest(activitiesActionTypes.ADD_REQUEST, addActivity),
    takeLatest(activitiesActionTypes.REMOVE_REQUEST, removeActivity),
    takeLatest(eventActionTypes.EVENT_ADD_REQUEST, addEvent),
    takeLatest(eventActionTypes.EVENT_REMOVE_REQUEST, removeEvent),
  ]);
}
