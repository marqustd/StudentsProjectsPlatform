export const AuthActionTypes = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_COMPLETED: 'auth/LOGIN_COMPLETED',
  LOGIN_FAILED: 'auth/LOGIN_FAILED',

  GOOGLE_LOGIN_REQUEST: 'auth/GOOGLE_LOGIN_REQUEST',
  GOOGLE_LOGIN_COMPLETED: 'auth/GOOGLE_LOGIN_COMPLETED',
  GOOGLE_LOGIN_FAILED: 'auth/GOOGLE_LOGIN_FAILED',

  REGISTER_REQUEST: 'auth/REGISTER_REQUEST',
  REGISTER_COMPLETED: 'auth/REGISTER_COMPLETED',
  REGISTER_FAILED: 'auth/REGISTER_FAILED',

  GOOGLE_REGISTER_REQUEST: 'auth/GOOGLE_REGISTER_REQUEST',
  GOOGLE_REGISTER_COMPLETED: 'auth/GOOGLE_REGISTER_COMPLETED',
  GOOGLE_REGISTER_FAILED: 'auth/GOOGLE_REGISTER_FAILED',

  REFRESH_TOKEN_REQUEST: 'auth/REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_COMPLETED: 'auth/REFRESH_TOKEN_COMPLETED',
  REFRESH_TOKEN_FAILED: 'auth/REFRESH_TOKEN_FAILED',

  REFRESH_TOKEN_MANUALLY_REQUEST: 'auth/REFRESH_TOKEN_MANUALLY_REQUEST',

  LOGOUT_REQUEST: 'auth/LOGOUT_REQUEST',
  LOGOUT_COMPLETED: 'auth/LOGOUT_COMPLETED',
  LOGOUT_FAILED: 'auth/LOGOUT_FAILED',

  REDO_CALL_REQUEST: 'auth/REDO_CALL_REQUEST',
  REDO_CALL_COMPLETED: 'auth/REDO_CALL_COMPLETED',
  REDO_CALL_FAILED: 'auth/REDO_CALL_FAILED',

  AUTH_EVENT_OCCURED: 'auth/AUTH_EVENT_OCCURED',
  AUTH_EVENT_HANDLED: 'auth/AUTH_EVENT_HANDLED',
};

export function registerAuthEvent(event) {
  return {
    type: AuthActionTypes.AUTH_EVENT_OCCURED,
    payload: event,
  };
}

export function handleAuthEvent(id) {
  return {
    type: AuthActionTypes.AUTH_EVENT_HANDLED,
    payload: id,
  };
}

export function googleLoginRequest(tokenId) {
  return {
    type: AuthActionTypes.GOOGLE_LOGIN_REQUEST,
    payload: tokenId,
  };
}

export function googleLoginCompleted(tokensAndClaims) {
  return {
    type: AuthActionTypes.GOOGLE_LOGIN_COMPLETED,
    payload: tokensAndClaims,
  };
}

export function googleLoginFailed(error) {
  return {
    type: AuthActionTypes.GOOGLE_LOGIN_FAILED,
    payload: error,
  };
}

export function loginRequest(email, password) {
  return {
    type: AuthActionTypes.LOGIN_REQUEST,
    payload: { email, password },
  };
}

export function loginCompleted(tokensAndClaims) {
  return {
    type: AuthActionTypes.LOGIN_COMPLETED,
    payload: tokensAndClaims,
  };
}

export function loginFailed(error) {
  return {
    type: AuthActionTypes.LOGIN_FAILED,
    payload: error,
  };
}
//
export function registerRequest(data) {
  return {
    type: AuthActionTypes.REGISTER_REQUEST,
    payload: data, // { firstName, lastName, albumNumber, ...other }
  };
}

export function registerCompleted() {
  return {
    type: AuthActionTypes.REGISTER_COMPLETED,
  };
}

export function registerFailed() {
  return {
    type: AuthActionTypes.REGISTER_FAILED,
  };
}

export function googleRegisterRequest(data) {
  return {
    type: AuthActionTypes.GOOGLE_REGISTER_REQUEST,
    payload: data, // { firstName, lastName, albumNumber }
  };
}

export function googleRegisterCompleted() {
  return {
    type: AuthActionTypes.GOOGLE_REGISTER_COMPLETED,
  };
}

export function googleRegisterFailed() {
  return {
    type: AuthActionTypes.GOOGLE_REGISTER_FAILED,
  };
}

export function refreshTokenRequest() {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_REQUEST,
  };
}

export function refreshTokenManualRequest(refreshToken) {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_MANUALLY_REQUEST,
    payload: refreshToken,
  };
}

export function refreshTokenCompleted(tokensAndClaims) {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_COMPLETED,
    payload: tokensAndClaims,
  };
}

export function refreshTokenFailed(error) {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_FAILED,
    payload: error,
  };
}

export function logoutRequest() {
  return {
    type: AuthActionTypes.LOGOUT_REQUEST,
  };
}

export function logoutCompleted() {
  return {
    type: AuthActionTypes.LOGOUT_COMPLETED,
  };
}

export function logoutFailed(error) {
  return {
    type: AuthActionTypes.LOGOUT_FAILED,
    payload: error,
  };
}

export function redoRequest(action) {
  return {
    type: AuthActionTypes.REDO_CALL_REQUEST,
    payload: action,
  };
}

export function redoCompleted() {
  return {
    type: AuthActionTypes.REDO_CALL_COMPLETED,
  };
}

export function redoFailed(error) {
  return {
    type: AuthActionTypes.REDO_CALL_FAILED,
    payload: error,
  };
}
