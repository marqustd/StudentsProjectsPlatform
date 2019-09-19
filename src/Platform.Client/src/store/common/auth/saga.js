import {
  takeLatest, call, put, all, //  takeEvery,
} from 'redux-saga/effects';
import {
  login, googleLogin,
  register, googleRegister,
  refreshToken, logout,
} from '../../../api/common/authGateway';
import {
  AuthActionTypes,
  loginCompleted, loginFailed,
  googleLoginCompleted, googleLoginFailed,
  refreshTokenCompleted, refreshTokenFailed,
  logoutCompleted, logoutFailed,
  registerAuthEvent,
  registerCompleted,
  registerFailed,
  googleRegisterCompleted,
  googleRegisterFailed,
} from './actions';
import { registerEvent } from '../events/actions';
import { showSpinner, hideSpinner } from '../app/actions';
import { extendWithClaims } from '../../../utility/helpers/auth';
import { authErrors, authInfos } from '../../../utility/events/common/auth';
import { httpErrors } from '../../../utility/httpErrors';
import { filterForEvent } from '../../utility';
// TODO: Handle events from errors
function* enqueNotifications(errors) {
  yield all((errors || []).map(e => put(registerEvent(e))));
}


function* googleLoginRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(googleLogin, payload); // payload = tokenId
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(googleLoginCompleted(extendWithClaims(json.data)));
  } else {
    yield put(googleLoginFailed(json.errors));
    yield filterForEvent(
      json.errors,
      httpErrors.INVALID_DATA.code,
      registerAuthEvent,
      authErrors.GOOGLE_LOGIN_CREDENTIALS,
    );
  }
  yield enqueNotifications(json.errors);
}


function* loginRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(login, payload);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(loginCompleted(extendWithClaims(json.data)));
  } else {
    yield put(loginFailed(json.errors));
    yield filterForEvent( // check if error is removed
      json.errors,
      httpErrors.INVALID_DATA.code,
      registerAuthEvent,
      authErrors.STANDARD_LOGIN_CREDENTIALS,
    );
  }
  yield enqueNotifications(json.errors);
}


function* registerRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(register, payload);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(registerCompleted(json.data));
    yield put(registerEvent(authInfos.REGISTER_SUCCESS));
  } else {
    yield put(registerFailed());
    yield filterForEvent(
      json.errors,
      httpErrors.INVALID_DATA.code,
      registerAuthEvent,
      authErrors.STANDARD_REGISTER_CREDENTIALS,
    );
  }
  yield enqueNotifications(json.errors);
}

function* googleRegisterRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(googleRegister, payload);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(googleRegisterCompleted(json.data));
    yield put(registerEvent(authInfos.REGISTER_SUCCESS));
  } else {
    yield put(googleRegisterFailed());
    yield filterForEvent(
      json.errors,
      httpErrors.INVALID_DATA.code,
      registerAuthEvent,
      authErrors.GOOGLE_REGISTER_CREDENTIALS,
    );
  }
  yield enqueNotifications(json.errors);
}

// eslint-disable-next-line
function* refreshTokenRequestSaga(action) {
  yield put(showSpinner());
  const { succes, json } = yield call(refreshToken);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(refreshTokenCompleted(extendWithClaims(json.data)));
  } else {
    yield put(refreshTokenFailed(json.errors));
  }
  yield enqueNotifications(json.errors);
}

function* manualRefreshTokenRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(refreshToken, payload);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(refreshTokenCompleted(extendWithClaims(json.data)));
  } else {
    yield put(refreshTokenFailed(json.errors));
  }
  yield enqueNotifications(json.errors);
}

// eslint-disable-next-line
function* logoutRequestSaga(action) {
  yield put(showSpinner());
  const { succes, json } = yield call(logout);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(logoutCompleted());
  } else {
    yield put(logoutFailed(json.errors));
  }
  yield enqueNotifications(json.errors);
}

// if response.status == 401
function* redoRequestSaga({ payload }) {
  yield put(showSpinner());
  const { succes, json } = yield call(refreshToken);
  yield put(hideSpinner());
  if (succes) { // response: 200
    yield put(refreshTokenCompleted(extendWithClaims(json.data)));
    yield put(payload);
  } else {
    yield put(refreshTokenFailed());
  }
  yield enqueNotifications(json.errors);
}

export default function* authSaga() {
  yield all([
    takeLatest(AuthActionTypes.LOGIN_REQUEST, loginRequestSaga),
    takeLatest(AuthActionTypes.GOOGLE_LOGIN_REQUEST, googleLoginRequestSaga),
    takeLatest(AuthActionTypes.REGISTER_REQUEST, registerRequestSaga),
    takeLatest(AuthActionTypes.GOOGLE_REGISTER_REQUEST, googleRegisterRequestSaga),
    takeLatest(AuthActionTypes.REFRESH_TOKEN_REQUEST, refreshTokenRequestSaga),
    takeLatest(AuthActionTypes.REFRESH_TOKEN_MANUALLY_REQUEST, manualRefreshTokenRequestSaga),
    takeLatest(AuthActionTypes.LOGOUT_REQUEST, logoutRequestSaga),
    takeLatest(AuthActionTypes.REDO_CALL_REQUEST, redoRequestSaga),
  ]);
}
