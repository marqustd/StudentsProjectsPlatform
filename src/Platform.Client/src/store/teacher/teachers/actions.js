import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const teachersActionTypes = {
  GET_ALL_REQUEST: 'teachers/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'teachers/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'teachers/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'teachers/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'teachers/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'teachers/GET_MORE_FAILED',

  ADD_REQUEST: 'teachers/ADD_REQUEST',
  ADD_COMPLETED: 'teachers/ADD_COMPLETED',
  ADD_FAILED: 'teachers/ADD_FAILED',

  REMOVE_REQUEST: 'teachers/REMOVE_REQUEST',
  REMOVE_COMPLETED: 'teachers/REMOVE_COMPLETED',
  REMOVE_FAILED: 'teachers/REMOVE_FAILED',
};

export function getAllRequest(subjectId, index, count) {
  return {
    type: teachersActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getAllCompleted(teachersState) {
  return {
    type: teachersActionTypes.GET_ALL_COMPLETED,
    payload: teachersState,
  };
}

export function getAllFailed(error) {
  return {
    type: teachersActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, index, count) {
  return {
    type: teachersActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getMoreCompleted(teachersState) {
  return {
    type: teachersActionTypes.GET_ALL_COMPLETED,
    payload: teachersState,
  };
}

export function getMoreFailed(error) {
  return {
    type: teachersActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}


export function addRequest(subjectId, teacherId) {
  return {
    type: teachersActionTypes.ADD_REQUEST,
    payload: { subjectId, teacherId },
  };
}

export function addCompleted(teacher) {
  return {
    type: teachersActionTypes.ADD_COMPLETED,
    payload: teacher,
  };
}

export function addFailed(error) {
  return {
    type: teachersActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function removeRequest(subjectId, teacherId) {
  return {
    type: teachersActionTypes.REMOVE_REQUEST,
    payload: { subjectId, teacherId },
  };
}

export function removeCompleted(teacherId) {
  return {
    type: teachersActionTypes.REMOVE_COMPLETED,
    payload: teacherId,
  };
}

export function removeFailed(error) {
  return {
    type: teachersActionTypes.REMOVE_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('teachers');
