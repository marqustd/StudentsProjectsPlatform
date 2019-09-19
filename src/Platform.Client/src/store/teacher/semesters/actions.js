import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const semestersActionTypes = {
  GET_REQUEST: 'semesters/GET_REQUEST',
  GET_COMPLETED: 'semesters/GET_COMPLETED',
  GET_FAILED: 'semesters/GET_FAILED',

  GET_ALL_REQUEST: 'semesters/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'semesters/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'semesters/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'semesters/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'semesters/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'semesters/GET_MORE_FAILED',

  ADD_REQUEST: 'semesters/ADD_REQUEST',
  ADD_COMPLETED: 'semesters/ADD_COMPLETED',
  ADD_FAILED: 'semesters/ADD_FAILED',

  EDIT_REQUEST: 'semesters/EDIT_REQUEST',
  EDIT_COMPLETED: 'semesters/EDIT_COMPLETED',
  EDIT_FAILED: 'semesters/EDIT_FAILED',

  OBSOLETE_REQUEST: 'semesters/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'semesters/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'semesters/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'semesters/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'semesters/RESTORE_COMPLETED',
  RESTORE_FAILED: 'semesters/RESTORE_FAILED',
};

export function obsoleteRequest(semesterId) {
  return {
    type: semestersActionTypes.OBSOLETE_REQUEST,
    payload: { semesterId },
  };
}

export function obsoleteCompleted(semester) {
  return {
    type: semestersActionTypes.OBSOLETE_COMPLETED,
    payload: semester,
  };
}

export function obsoleteFailed(error) {
  return {
    type: semestersActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreRequest(semesterId) {
  return {
    type: semestersActionTypes.RESTORE_REQUEST,
    payload: { semesterId },
  };
}

export function restoreCompleted(semester) {
  return {
    type: semestersActionTypes.RESTORE_COMPLETED,
    payload: semester,
  };
}

export function restoreFailed(error) {
  return {
    type: semestersActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

export function getRequest(subjectId, semesterId) {
  return {
    type: semestersActionTypes.GET_REQUEST,
    payload: { subjectId, semesterId },
  };
}

export function getCompleted(semester) {
  return {
    type: semestersActionTypes.GET_COMPLETED,
    payload: semester,
  };
}

export function getFailed(error) {
  return {
    type: semestersActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(subjectId, index, count) {
  return {
    type: semestersActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getAllCompleted(semestersState) {
  return {
    type: semestersActionTypes.GET_ALL_COMPLETED,
    payload: semestersState,
  };
}

export function getAllFailed(error) {
  return {
    type: semestersActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, index, count) {
  return {
    type: semestersActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getMoreCompleted(semestersState) {
  return {
    type: semestersActionTypes.GET_ALL_COMPLETED,
    payload: semestersState,
  };
}

export function getMoreFailed(error) {
  return {
    type: semestersActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}


export function addRequest(subjectId, majorId, password) {
  return {
    type: semestersActionTypes.ADD_REQUEST,
    payload: { subjectId, majorId, password },
  };
}

export function addCompleted(semester) {
  return {
    type: semestersActionTypes.ADD_COMPLETED,
    payload: semester,
  };
}

export function addFailed(error) {
  return {
    type: semestersActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editRequest(semesterId, state) {
  return {
    type: semestersActionTypes.EDIT_REQUEST,
    payload: { semesterId, state },
  };
}

export function editCompleted(semester) {
  return {
    type: semestersActionTypes.EDIT_COMPLETED,
    payload: semester,
  };
}

export function editFailed(error) {
  return {
    type: semestersActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('semesters');
