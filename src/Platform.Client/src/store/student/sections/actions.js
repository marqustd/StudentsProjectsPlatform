import { LoaderMiddleware, EventMiddleware } from '../../../utility/events/logicFactory';

export const sectionsActionTypes = {
  GET_REQUEST: 'student_sections/GET_REQUEST',
  GET_COMPLETED: 'student_sections/GET_COMPLETED',
  GET_FAILED: 'student_sections/GET_FAILED',

  GET_ALL_REQUEST: 'student_sections/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'student_sections/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'student_sections/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'student_sections/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'student_sections/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'student_sections/GET_MORE_FAILED',

  SIGN_IN_REQUEST: 'student_sections/SIGN_IN_REQUEST',
  SIGN_IN_COMPLETED: 'student_sections/SIGN_IN_COMPLETED',
  SIGN_IN_FAILED: 'student_sections/SIGN_IN_FAILED',

  SIGN_OUT_REQUEST: 'student_sections/SIGN_OUT_REQUEST',
  SIGN_OUT_COMPLETED: 'student_sections/SIGN_OUT_COMPLETED',
  SIGN_OUT_FAILED: 'student_sections/SIGN_OUT_FAILED',
};


export function signInRequest(subjectId, sectionId) {
  return {
    type: sectionsActionTypes.SIGN_IN_REQUEST,
    payload: { subjectId, sectionId },
  };
}

export function signInCompleted(section) {
  return {
    type: sectionsActionTypes.SIGN_IN_COMPLETED,
    payload: section,
  };
}

export function signInFailed(error) {
  return {
    type: sectionsActionTypes.SIGN_IN_FAILED,
    payload: error,
  };
}

export function signOutRequest(subjectId, sectionId) {
  return {
    type: sectionsActionTypes.SIGN_OUT_REQUEST,
    payload: { subjectId, sectionId },
  };
}

export function signOutCompleted(section) {
  return {
    type: sectionsActionTypes.SIGN_OUT_COMPLETED,
    payload: section,
  };
}

export function signOutFailed(error) {
  return {
    type: sectionsActionTypes.SIGN_OUT_FAILED,
    payload: error,
  };
}

export function getRequest(subjectId, sectionId) {
  return {
    type: sectionsActionTypes.GET_REQUEST,
    payload: { subjectId, sectionId },
  };
}

export function getCompleted(section) {
  return {
    type: sectionsActionTypes.GET_COMPLETED,
    payload: section,
  };
}

export function getFailed(error) {
  return {
    type: sectionsActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(subjectId, index, count) {
  return {
    type: sectionsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, index, count,
    },
  };
}

export function getAllCompleted(semestersState) {
  return {
    type: sectionsActionTypes.GET_ALL_COMPLETED,
    payload: semestersState,
  };
}

export function getAllFailed(error) {
  return {
    type: sectionsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, index, count) {
  return {
    type: sectionsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, index, count,
    },
  };
}

export function getMoreCompleted(sectionsState) {
  return {
    type: sectionsActionTypes.GET_ALL_COMPLETED,
    payload: sectionsState,
  };
}

export function getMoreFailed(error) {
  return {
    type: sectionsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('student_sections');
export const eventActions = new EventMiddleware('student_sections');
