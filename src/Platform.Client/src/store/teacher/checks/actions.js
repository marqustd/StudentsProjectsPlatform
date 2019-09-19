import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const checksActionTypes = {
  GET_ALL_REQUEST: 'checks/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'checks/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'checks/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'checks/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'checks/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'checks/GET_MORE_FAILED',

  CHECK_REQUEST: 'checks/CHECK_REQUEST',
  CHECK_COMPLETED: 'checks/CHECK_COMPLETED',
  CHECK_FAILED: 'checks/CHECK_FAILED',

  CHECK_ALL_REQUEST: 'checks/CHECK_ALL_REQUEST',
  CHECK_ALL_COMPLETED: 'checks/CHECK_ALL_COMPLETED',
  CHECK_ALL_FAILED: 'checks/CHECK_ALL_FAILED',
};

export function getAllRequest(subjectId, activityId, index, count) {
  return {
    type: checksActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, activityId, index, count,
    },
  };
}

export function getAllCompleted(checks) {
  return {
    type: checksActionTypes.GET_ALL_COMPLETED,
    payload: checks,
  };
}

export function getAllFailed(error) {
  return {
    type: checksActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, activityId, index, count) {
  return {
    type: checksActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, activityId, index, count,
    },
  };
}

export function getMoreCompleted(checks) {
  return {
    type: checksActionTypes.GET_ALL_COMPLETED,
    payload: checks,
  };
}

export function getMoreFailed(error) {
  return {
    type: checksActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}


export function checkRequest(subjectId, activityId, studentId, check) {
  return {
    type: checksActionTypes.CHECK_REQUEST,
    payload: {
      subjectId, activityId, studentId, check,
    },
  };
}

export function checkCompleted(check) {
  return {
    type: checksActionTypes.CHECK_COMPLETED,
    payload: check,
  };
}

export function checkFailed(error) {
  return {
    type: checksActionTypes.CHECK_FAILED,
    payload: error,
  };
}

export function checkAllRequest(subjectId, activityId, check) {
  return {
    type: checksActionTypes.CHECK_ALL_REQUEST,
    payload: {
      subjectId, activityId, check,
    },
  };
}

export function checkAllCompleted(checks) {
  return {
    type: checksActionTypes.CHECK_ALL_COMPLETED,
    payload: checks,
  };
}

export function checkAllFailed(error) {
  return {
    type: checksActionTypes.CHECK_ALL_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('checks');
