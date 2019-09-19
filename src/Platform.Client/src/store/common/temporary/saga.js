import {
  takeEvery, call, all, put,
} from 'redux-saga/effects';
import {
  actionTypes, ajaxCompleted, ajaxFailed, removeCompleted,
} from './actions';
import { authSafeCall } from '../../utility';
import { ajax } from '../../../api/common/temporaryGateway';

function* ajaxCall(action) {
  const {
    id, url, method, body,
  } = action.payload;
  const promise = call(ajax, url, method, body);
  yield authSafeCall(
    promise,
    action,
    data => ajaxCompleted(id, data),
    ajaxFailed,
  );
}

function* removeContainer({ payload }) {
  yield put(removeCompleted(payload));
}

export default function* templateSaga() {
  yield all([
    takeEvery(actionTypes.AJAX_REQUEST, ajaxCall),
    takeEvery(actionTypes.REMOVE_REQUEST, removeContainer),
  ]);
}
