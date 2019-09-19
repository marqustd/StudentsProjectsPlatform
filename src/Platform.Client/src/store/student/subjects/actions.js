import { LoaderMiddleware, EventMiddleware } from '../../../utility/events/logicFactory';

export const subjectActionTypes = {

  GET_ALL_REQUEST: 'student_subjects/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'student_subjects/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'student_subjects/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'student_subjects/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'student_subjects/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'student_subjects/GET_MORE_FAILED',

  SIGN_IN_REQUEST: 'student_subjects/SIGN_IN_REQUEST',
  SIGN_IN_COMPLETED: 'student_subjects/SIGN_IN_COMPLETED',
  SIGN_IN_FAILED: 'student_subjects/SIGN_IN_FAILED',

};

export function signInRequest(subjectId, password) {
  return {
    type: subjectActionTypes.SIGN_IN_REQUEST,
    payload: { subjectId, password },
  };
}
export function signInCompleted(subject) {
  return {
    type: subjectActionTypes.SIGN_IN_COMPLETED,
    payload: subject,
  };
}

export function signInFailed(error) {
  return {
    type: subjectActionTypes.SIGN_IN_FAILED,
    payload: error,
  };
}

export function getAllRequest(search, index, count) {
  return {
    type: subjectActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count,
    },
  };
}

export function getAllCompleted(subjects) {
  return {
    type: subjectActionTypes.GET_ALL_COMPLETED,
    payload: subjects,
  };
}

export function getAllFailed(error) {
  return {
    type: subjectActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getMoreRequest(search, index, count) {
  return {
    type: subjectActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count,
    },
  };
}

export function getMoreCompleted(subjects) {
  return {
    type: subjectActionTypes.GET_MORE_COMPLETED,
    payload: subjects,
  };
}

export function getMoreFailed(error) {
  return {
    type: subjectActionTypes.GET_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('student_subjects');
export const eventsActions = new EventMiddleware('student_subjects');
