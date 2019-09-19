import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const sectionsActionTypes = {
  GET_REQUEST: 'sections/GET_REQUEST',
  GET_COMPLETED: 'sections/GET_COMPLETED',
  GET_FAILED: 'sections/GET_FAILED',

  GET_ALL_REQUEST: 'sections/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'sections/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'sections/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'sections/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'sections/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'sections/GET_MORE_FAILED',

  ADD_REQUEST: 'sections/ADD_REQUEST',
  ADD_COMPLETED: 'sections/ADD_COMPLETED',
  ADD_FAILED: 'sections/ADD_FAILED',

  EDIT_REQUEST: 'sections/EDIT_REQUEST',
  EDIT_COMPLETED: 'sections/EDIT_COMPLETED',
  EDIT_FAILED: 'sections/EDIT_FAILED',
};

export function getRequest(subjectId, semesterId, sectionId) {
  return {
    type: sectionsActionTypes.GET_REQUEST,
    payload: { subjectId, semesterId, sectionId },
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

export function getAllRequest(subjectId, semesterId, index, count) {
  return {
    type: sectionsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, semesterId, index, count,
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

export function getMoreRequest(subjectId, semesterId, index, count) {
  return {
    type: sectionsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, semesterId, index, count,
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


export function addRequest(subjectId, semesterId, topicId, name, capacity) {
  return {
    type: sectionsActionTypes.ADD_REQUEST,
    payload: {
      subjectId, semesterId, topicId, name, capacity,
    },
  };
}

export function addCompleted(section) {
  return {
    type: sectionsActionTypes.ADD_COMPLETED,
    payload: section,
  };
}

export function addFailed(error) {
  return {
    type: sectionsActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function editRequest(subjectId, semesterId, sectionId, name, state, capacity) {
  return {
    type: sectionsActionTypes.EDIT_REQUEST,
    payload: {
      subjectId,
      semesterId,
      sectionId,
      name,
      state,
      capacity,
    },
  };
}

export function editCompleted(section) {
  return {
    type: sectionsActionTypes.EDIT_COMPLETED,
    payload: section,
  };
}

export function editFailed(error) {
  return {
    type: sectionsActionTypes.EDIT_FAILED,
    payload: error,
  };
}


export const loaderActions = new LoaderMiddleware('sections');
