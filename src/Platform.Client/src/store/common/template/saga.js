import {
  takeLatest, call, all, //  takeEvery,
} from 'redux-saga/effects';
import { getTest } from '../../../api/common/templateGateway';
import { TemplateActionTypes, getAllCompleted, getAllFailed } from './actions';
import { authSafeCall } from '../../utility';

function* handleErrors() { yield; }

function* handleSucces() { yield; }

function* getTemplate(action) {
  const promise = call(getTest);
  yield authSafeCall(
    promise,
    action,
    getAllCompleted,
    getAllFailed,
    handleErrors,
    handleSucces,
  );
}

export default function* templateSaga() {
  yield all([
    takeLatest(TemplateActionTypes.TEMPLATE_REQUEST, getTemplate),
  ]);
}
