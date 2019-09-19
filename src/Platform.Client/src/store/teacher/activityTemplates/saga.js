import {
  takeLatest, call, all, put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/teacher/activityTemplatesGateway';
import {
  eventActions,
  activityTemplatesActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  addCompleted, addFailed,
  obsoleteCompleted, obsoleteFailed,
  editFailed, editCompleted,
  reopenCompleted, reopenFailed,
  deleteCompleted, deleteFailed,
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

function* editActivity(action) {
  const promise = call(gateway.editActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    editCompleted,
    editFailed,
    null,
    null,
  );
}

function* obsoleteActivity(action) {
  const promise = call(gateway.obsoleteActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    obsoleteCompleted,
    obsoleteFailed,
    null,
    null,
  );
}

function* reopenActivity(action) {
  const promise = call(gateway.reopenActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    reopenCompleted,
    reopenFailed,
    null,
    null,
  );
}

function* deleteActivity(action) {
  const promise = call(gateway.deleteActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    deleteCompleted,
    deleteFailed,
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
    takeLatest(activityTemplatesActionTypes.GET_REQUEST, getActivity),
    takeLatest(activityTemplatesActionTypes.GET_ALL_REQUEST, getAllActivities),
    takeLatest(activityTemplatesActionTypes.ADD_REQUEST, addActivity),
    takeLatest(activityTemplatesActionTypes.EDIT_REQUEST, editActivity),
    takeLatest(activityTemplatesActionTypes.OBSOLETE_REQUEST, obsoleteActivity),
    takeLatest(activityTemplatesActionTypes.DELETE_REQUEST, deleteActivity),
    takeLatest(activityTemplatesActionTypes.REOPEN_REQUEST, reopenActivity),
    takeLatest(eventActionTypes.EVENT_ADD_REQUEST, addEvent),
    takeLatest(eventActionTypes.EVENT_REMOVE_REQUEST, removeEvent),
  ]);
}
