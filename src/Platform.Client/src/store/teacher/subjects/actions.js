export const subjectActionTypes = {
  GET_REQUEST: 'subjects/GET_REQUEST',
  GET_COMPLETED: 'subjects/GET_COMPLETED',
  GET_FAILED: 'subjects/GET_FAILED',

  GET_ALL_REQUEST: 'subjects/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'subjects/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'subjects/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'subjects/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'subjects/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'subjects/GET_MORE_FAILED',

  EDIT_REQUEST: 'subjects/EDIT_REQUEST',
  EDIT_COMPLETED: 'subjects/EDIT_COMPLETED',
  EDIT_FAILED: 'subjects/EDIT_FAILED',

  OBSOLETE_REQUEST: 'subjects/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'subjects/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'subjects/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'subjects/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'subjects/RESTORE_COMPLETED',
  RESTORE_FAILED: 'subjects/RESTORE_FAILED',

};

export const loaderActionTypes = {
  LOADER_ADDED: 'subjects/LOADER_ADDED',
  LOADER_REMOVED: 'subjects/LOADER_REMOVED',
};

export const eventActionTypes = {
  EVENT_ADD_REQUEST: 'subjects/EVENT_ADD_REQUEST',
  EVENT_ADD_COMPLETED: 'subjects/EVENT_ADD_COMPLETED',
  EVENT_REMOVE_REQUEST: 'subjects/EVENT_REMOVE_REQUEST',
  EVENT_REMOVE_COMPLETED: 'subjects/EVENT_REMOVE_COMPLETED',
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

export function editRequest(subjectId, name, description) { // TODO
  return {
    type: subjectActionTypes.EDIT_REQUEST,
    payload: { subjectId, name, description },
  };
}

export function editCompleted(subject) {
  return {
    type: subjectActionTypes.EDIT_COMPLETED,
    payload: subject,
  };
}

export function editFailed(error) {
  return {
    type: subjectActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function obsoleteRequest(subjectId) {
  return {
    type: subjectActionTypes.OBSOLETE_REQUEST,
    payload: subjectId,
  };
}

export function obosoleteCompleted(subject) {
  return {
    type: subjectActionTypes.OBSOLETE_COMPLETED,
    payload: subject,
  };
}

export function obsoleteFailed(error) {
  return {
    type: subjectActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreRequest(subjectId) {
  return {
    type: subjectActionTypes.RESTORE_REQUEST,
    payload: subjectId,
  };
}

export function restoreCompleted(major) {
  return {
    type: subjectActionTypes.RESTORE_COMPLETED,
    payload: major,
  };
}

export function restoreFailed(error) {
  return {
    type: subjectActionTypes.RESTORE_FAILED,
    payload: error,
  };
}

// Events
export function eventAddRequest(event) {
  return {
    type: eventActionTypes.EVENT_ADD_REQUEST,
    payload: event,
  };
}
export function eventAddCompleted(event) {
  return {
    type: eventActionTypes.EVENT_ADD_COMPLETED,
    payload: event,
  };
}

export function eventRemoveRequest(id) {
  return {
    type: eventActionTypes.EVENT_REMOVE_REQUEST,
    payload: id,
  };
}

export function eventRemoveCompleted(id) {
  return {
    type: eventActionTypes.EVENT_REMOVE_COMPLETED,
    payload: id,
  };
}

// Loaders
export function loaderAdd(loader) {
  return {
    type: loaderActionTypes.LOADER_ADDED,
    payload: loader,
  };
}

export function loaderRemove(loader) {
  return {
    type: loaderActionTypes.LOADER_REMOVED,
    payload: loader,
  };
}
