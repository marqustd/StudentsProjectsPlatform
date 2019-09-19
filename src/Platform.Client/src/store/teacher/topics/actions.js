import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const topicsActionTypes = {
  GET_REQUEST: 'topics/GET_REQUEST',
  GET_COMPLETED: 'topics/GET_COMPLETED',
  GET_FAILED: 'topics/GET_FAILED',

  GET_ALL_REQUEST: 'topics/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'topics/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'topics/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'topics/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'topics/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'topics/GET_MORE_FAILED',

  ADD_REQUEST: 'topics/ADD_REQUEST',
  ADD_COMPLETED: 'topics/ADD_COMPLETED',
  ADD_FAILED: 'topics/ADD_FAILED',

  EDIT_REQUEST: 'topics/EDIT_REQUEST',
  EDIT_COMPLETED: 'topics/EDIT_COMPLETED',
  EDIT_FAILED: 'topics/EDIT_FAILED',

  OBSOLETE_REQUEST: 'topics/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'topics/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'topics/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'topics/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'topics/RESTORE_COMPLETED',
  RESTORE_FAILED: 'topics/RESTORE_FAILED',
};

export function getRequest(subjectId, topicId) {
  return {
    type: topicsActionTypes.GET_REQUEST,
    payload: { subjectId, topicId },
  };
}

export function getCompleted(topic) {
  return {
    type: topicsActionTypes.GET_COMPLETED,
    payload: topic,
  };
}

export function getFailed(error) {
  return {
    type: topicsActionTypes.GET_FAILED,
    payload: error,
  };
}

export function obsoleteRequest(subjectId, topicId) {
  return {
    type: topicsActionTypes.OBSOLETE_REQUEST,
    payload: { subjectId, topicId },
  };
}

export function obsoleteCompleted(topic) {
  return {
    type: topicsActionTypes.OBSOLETE_COMPLETED,
    payload: topic,
  };
}

export function obsoleteFailed(error) {
  return {
    type: topicsActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreRequest(subjectId, topicId) {
  return {
    type: topicsActionTypes.RESTORE_REQUEST,
    payload: { subjectId, topicId },
  };
}

export function restoreCompleted(topic) {
  return {
    type: topicsActionTypes.RESTORE_COMPLETED,
    payload: topic,
  };
}

export function restoreFailed(error) {
  return {
    type: topicsActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

export function getAllRequest(subjectId, index, count) {
  return {
    type: topicsActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getAllCompleted(topicsState) {
  return {
    type: topicsActionTypes.GET_ALL_COMPLETED,
    payload: topicsState,
  };
}

export function getAllFailed(error) {
  return {
    type: topicsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, index, count) {
  return {
    type: topicsActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, index, count },
  };
}

export function getMoreCompleted(topicsState) {
  return {
    type: topicsActionTypes.GET_ALL_COMPLETED,
    payload: topicsState,
  };
}

export function getMoreFailed(error) {
  return {
    type: topicsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}


export function addRequest(subjectId, name) {
  return {
    type: topicsActionTypes.ADD_REQUEST,
    payload: { subjectId, name },
  };
}

export function addCompleted(topic) {
  return {
    type: topicsActionTypes.ADD_COMPLETED,
    payload: topic,
  };
}

export function addFailed(error) {
  return {
    type: topicsActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editRequest(subjectId, topicId, name, description) {
  return {
    type: topicsActionTypes.EDIT_REQUEST,
    payload: {
      subjectId, topicId, name, description,
    },
  };
}

export function editCompleted(topic) {
  return {
    type: topicsActionTypes.EDIT_COMPLETED,
    payload: topic,
  };
}


export function editFailed(error) {
  return {
    type: topicsActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export const loaderActions = new LoaderMiddleware('topics');
