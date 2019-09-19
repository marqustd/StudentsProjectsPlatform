export const MajorActionTypes = {
  GET_REQUEST: 'majors/GET_REQUEST',
  GET_COMPLETED: 'majors/GET_COMPLETED',
  GET_FAILED: 'majors/GET_FAILED',

  GET_ALL_REQUEST: 'majors/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'majors/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'majors/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'majors/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'majors/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'majors/GET_MORE_FAILED',

  EDIT_REQUEST: 'majors/EDIT_REQUEST',
  EDIT_COMPLETED: 'majors/EDIT_COMPLETED',
  EDIT_FAILED: 'majors/EDIT_FAILED',

  OBSOLETE_REQUEST: 'majors/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'majors/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'majors/OBSOLETE_FAILED',

  RESTORE_REQUEST: 'majors/RESTORE_REQUEST',
  RESTORE_COMPLETED: 'majors/RESTORE_COMPLETED',
  RESTORE_FAILED: 'majors/RESTORE_FAILED',

  ADD_REQUEST: 'majors/ADD_REQUEST',
  ADD_COMPLETED: 'majors/ADD_COMPLETED',
  ADD_FAILED: 'majors/ADD_FAILED',
};

export const loaderActionTypes = {
  LOADER_REGISTER: 'majors/LOADER_REGISTER',
  LOADER_RESOLVE: 'majors/LOADER_RESOLVE',
};

export const eventActionTypes = {
  EVENT_REGISTER: 'majors/EVENT_REGISTER',
  EVENT_REGISTERED: 'majors/EVENT_REGISTERED',
  EVENT_HANDLE: 'majors/EVENT_HANDLE',
  EVENT_HANDLED: 'majors/EVENT_HANDLED',
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
    type: MajorActionTypes.GET_REQUEST,
    payload: id,
  };
}
export function getCompleted(major) {
  return {
    type: MajorActionTypes.GET_COMPLETED,
    payload: major,
  };
}

export function getFailed(error) {
  return {
    type: MajorActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(search, index, count, obsolete) {
  return {
    type: MajorActionTypes.GET_ALL_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}
export function getAllCompleted(majors) {
  return {
    type: MajorActionTypes.GET_ALL_COMPLETED,
    payload: majors,
  };
}

export function getAllFailed(error) {
  return {
    type: MajorActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(search, index, count, obsolete) {
  return {
    type: MajorActionTypes.GET_MORE_REQUEST,
    payload: {
      search, index, count, obsolete,
    },
  };
}

export function getMoreCompleted(majors) {
  return {
    type: MajorActionTypes.GET_MORE_COMPLETED,
    payload: majors,
  };
}

export function getMoreFailed(error) {
  return {
    type: MajorActionTypes.GET_MORE_FAILED,
    payload: error,
  };
}

export function editRequest(id, name) {
  return {
    type: MajorActionTypes.EDIT_REQUEST,
    payload: { id, name },
  };
}

export function editCompleted(major) {
  return {
    type: MajorActionTypes.EDIT_COMPLETED,
    payload: major,
  };
}

export function editFailed(error) {
  return {
    type: MajorActionTypes.EDIT_FAILED,
    payload: error,
  };
}

export function addRequest(name) {
  return {
    type: MajorActionTypes.ADD_REQUEST,
    payload: { name },
  };
}

export function addCompleted(major) {
  return {
    type: MajorActionTypes.ADD_COMPLETED,
    payload: major,
  };
}

export function addFailed(error) {
  return {
    type: MajorActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function obsoleteRequest(id) {
  return {
    type: MajorActionTypes.OBSOLETE_REQUEST,
    payload: id,
  };
}

export function obosoleteCompleted(major) {
  return {
    type: MajorActionTypes.OBSOLETE_COMPLETED,
    payload: major,
  };
}

export function obsoleteFailed(error) {
  return {
    type: MajorActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function restoreRequest(id) {
  return {
    type: MajorActionTypes.RESTORE_REQUEST,
    payload: id,
  };
}

export function restoreCompleted(major) {
  return {
    type: MajorActionTypes.RESTORE_COMPLETED,
    payload: major,
  };
}

export function restoreFailed(error) {
  return {
    type: MajorActionTypes.RESTORE_FAILED,
    payload: error,
  };
}
