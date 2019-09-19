import { LoaderMiddleware, EventMiddleware } from '../../../utility/events/logicFactory';

export const subjectActionTypes = {

  GET_ALL_REQUEST: 'student_mySubjects/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'student_mySubjects/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'student_mySubjects/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'student_mySubjects/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'student_mySubjects/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'student_mySubjects/GET_MORE_FAILED',

  GET_REQUEST: 'student_mySubjects/GET_REQUEST',
  GET_COMPLETED: 'student_mySubjects/GET_COMPLETED',
  GET_FAILED: 'student_mySubjects/GET_FAILED',

};

export function getRequest(subjectId) {
  return {
    type: subjectActionTypes.GET_REQUEST,
    payload: subjectId,
  };
}
export function getCompleted(subject) {
  return {
    type: subjectActionTypes.GET_COMPLETED,
    payload: subject,
  };
}

export function getFailed(error) {
  return {
    type: subjectActionTypes.GET_FAILED,
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

export const loaderActions = new LoaderMiddleware('student_mySubjects');
export const eventsActions = new EventMiddleware('student_mySubjects');
