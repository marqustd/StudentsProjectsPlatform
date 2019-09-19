import {
  put, all, takeEvery, //  takeEvery,
} from 'redux-saga/effects';
import {
  eventRegistered,
  eventHandled,
  eventsActionTypes,
} from './actions';


function* registerEventSaga({ payload }) {
  yield put(eventRegistered(payload));
}

function* handleEventSaga({ payload }) {
  yield put(eventHandled(payload));
}


export default function* eventSaga() {
  yield all([
    takeEvery(eventsActionTypes.EVENT_REGISTER_REQUEST, registerEventSaga),
    takeEvery(eventsActionTypes.EVENT_HANDLE_REQUEST, handleEventSaga),
  ]);
}
