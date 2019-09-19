export const SubjectActionTypes = {
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

  ADD_REQUEST: 'subjects/ADD_REQUEST',
  ADD_COMPLETED: 'subjects/ADD_COMPLETED',
  ADD_FAILED: 'subjects/ADD_FAILED',
};

export const loaderActionTypes = {
  LOADER_REGISTER: 'subjects/LOADER_REGISTER',
  LOADER_RESOLVE: 'subjects/LOADER_RESOLVE',
};

export const eventActionTypes = {
  EVENT_REGISTER: 'subjects/EVENT_REGISTER',
  EVENT_REGISTERED: 'subjects/EVENT_REGISTERED',
  EVENT_HANDLE: 'subjects/EVENT_HANDLE',
  EVENT_HANDLED: 'subjects/EVENT_HANDLED',
};

// Events
export function registerEvent(event) {
  return {
    type: eventActionTypes.EVENT_REGISTER,
    payload: event,
  };
}
export function eventRegistered(event) {
  return {
    type: eventActionTypes.EVENT_REGISTERED,
    payload: event,
  };
}

export function handleEvent(id) {
  return {
    type: eventActionTypes.EVENT_HANDLE,
    payload: id,
  };
}

export function eventHandled(id) {
  return {
    type: eventActionTypes.EVENT_HANDLED,
    payload: id,
  };
}

// Loaders
export function registerLoader(loader) {
  return {
    type: loaderActionTypes.LOADER_REGISTER,
    payload: loader,
  };
}

export function resolveLoader(loader) {
  return {
    type: loaderActionTypes.LOADER_RESOLVE,
    payload: loader,
  };
}

// Majors
export function getRequest(id) {
  return {
    type: SubjectActionTypes.GET_REQUEST,
    payload: id,
  };
}
export function getCompleted(subject) {
  return {
    type: SubjectActionTypes.GET_COMPLETED,
    payload: subject,
  };
}

export function getFailed(error) {
  return {
    type: SubjectActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(search, index, count, obsolete) {
  return {
    type: SubjectActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}
export function getAllCompleted(subjects) {
  return {
    type: SubjectActionTypes.GET_ALL_COMPLETED,
    payload: subjects,
  };
}

export function getAllFailed(error) {
  return {
    type: SubjectActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(search, index, count, obsolete) {
  return {
    type: SubjectActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getMoreCompleted(subjects) {
  return {
    type: SubjectActionTypes.GET_MORE_COMPLETED,
    payload: subjects,
  };
}

export function getMoreFailed(error) {
  return {
    type: SubjectActionTypes.GET_MORE_FAILED,
    payload: error,
  };
}

export function editRequest(subjectId, name) { // TODO
  return {
    type: SubjectActionTypes.EDIT_REQUEST,
    payload: { subjectId, name },
  };
}

export function editCompleted(subject) {
  return {
    type: SubjectActionTypes.EDIT_COMPLETED,
    payload: subject,
  };
}

export function editFailed(error) {
  return {
    type: SubjectActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function addRequest(name, teacherId) { // TODO
  return {
    type: SubjectActionTypes.ADD_REQUEST,
    payload: { name, teacherId },
  };
}

export function addCompleted(subject) {
  return {
    type: SubjectActionTypes.ADD_COMPLETED,
    payload: subject,
  };
}

export function addFailed(error) {
  return {
    type: SubjectActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function obsoleteRequest(id) {
  return {
    type: SubjectActionTypes.OBSOLETE_REQUEST,
    payload: id,
  };
}

export function obosoleteCompleted(subject) {
  return {
    type: SubjectActionTypes.OBSOLETE_COMPLETED,
    payload: subject,
  };
}

export function obsoleteFailed(error) {
  return {
    type: SubjectActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreRequest(id) {
  return {
    type: SubjectActionTypes.RESTORE_REQUEST,
    payload: id,
  };
}

export function restoreCompleted(major) {
  return {
    type: SubjectActionTypes.RESTORE_COMPLETED,
    payload: major,
  };
}

export function restoreFailed(error) {
  return {
    type: SubjectActionTypes.RESTORE_FAILED,
    payload: error,
  };
}
