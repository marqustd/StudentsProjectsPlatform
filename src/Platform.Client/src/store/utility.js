import { put, all } from 'redux-saga/effects';
import { getAuth } from '../utility/helpers/auth';
import { redoRequest } from './common/auth/actions';
import { registerEvent } from './common/events/actions';

export function* filterForEvent(errors, code, handler, customError) {
  if (Array.isArray(errors)) {
    const index = errors.findIndex(e => e.code === code);
    if (index >= 0) {
      yield put(handler(customError || errors[index]));
      errors.splice(index, 1);
    }
  }
}


export function* defaultErrorsHandler(errors) {
  if (Array.isArray(errors)) {
    yield all((errors).map(e => put(registerEvent(e))));
  }
}

export function* authSafeCall(
  promise,
  requestAction,
  completedFunc,
  failedFunc,
  errorHandler,
  succesHandler,
) {
  const result = yield promise;
  const { json, succes } = result;
  if (succes) { // json if succes
    yield put(completedFunc(json.data));
    if (succesHandler) {
      yield succesHandler(json);
    }
  } else { // response if failed
    const auth = getAuth();
    // If not ok
    if (auth.isAuth
        && json
        && Array.isArray(json.errors)
        && json.errors.includes(e => e.code === 401)) {
      yield put(redoRequest(requestAction));
      return;
    }
    yield put(failedFunc(json.errors));
    if (errorHandler) {
      yield errorHandler(json.errors);
    } else {
      yield defaultErrorsHandler(json.errors);
    }
  }
}
