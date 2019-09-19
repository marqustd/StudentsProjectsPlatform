import {
  takeLatest, call, all, // put,
} from 'redux-saga/effects';
import * as gateway from '../../../api/student/activitiesGateway';
import {
  activitiesActionTypes,
  getCompleted, getFailed,
  getAllCompleted, getAllFailed,
  uploadArtifactCompleted, uploadArtifactFailed,
} from './actions';
import { authSafeCall } from '../../utility';

function* uploadActivity(action) {
  const promise = call(gateway.uploadActivity, action.payload);
  yield authSafeCall(
    promise,
    action,
    uploadArtifactCompleted,
    uploadArtifactFailed,
    null,
    null,
  );
}

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
    null,
  );
}

export default function* artifactSaga() {
  yield all([
    takeLatest(activitiesActionTypes.GET_REQUEST, getActivity),
    takeLatest(activitiesActionTypes.GET_ALL_REQUEST, getAllActivities),
    takeLatest(activitiesActionTypes.UPLOAD_ARTIFACT_REQUEST, uploadActivity),
  ]);
}
