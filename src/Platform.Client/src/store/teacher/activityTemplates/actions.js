import { EventMiddleware } from '../../../utility/events/logicFactory';

export const activityTemplatesActionTypes = {
  GET_REQUEST: 'activityTemplates/GET_REQUEST',
  GET_COMPLETED: 'activityTemplates/GET_COMPLETED',
  GET_FAILED: 'activityTemplates/GET_FAILED',

  GET_ALL_REQUEST: 'activityTemplates/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'activityTemplates/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'activityTemplates/GET_ALL_FAILED',

  ADD_REQUEST: 'activityTemplates/ADD_REQUEST',
  ADD_COMPLETED: 'activityTemplates/ADD_COMPLETED',
  ADD_FAILED: 'activityTemplates/ADD_FAILED',

  OBSOLETE_REQUEST: 'activityTemplates/OBSOLETE_REQUEST',
  OBSOLETE_COMPLETED: 'activityTemplates/OBSOLETE_COMPLETED',
  OBSOLETE_FAILED: 'activityTemplates/OBSOLETE_FAILED',

  REOPEN_REQUEST: 'activityTemplates/REOPEN_REQUEST',
  REOPEN_COMPLETED: 'activityTemplates/REOPEN_COMPLETED',
  REOPEN_FAILED: 'activityTemplates/REOPEN_FAILED',

  DELETE_REQUEST: 'activityTemplates/DELETE_REQUEST',
  DELETE_COMPLETED: 'activityTemplates/DELETE_COMPLETED',
  DELETE_FAILED: 'activityTemplates/DELETE_FAILED',

  EDIT_REQUEST: 'activityTemplates/EDIT_REQUEST',
  EDIT_COMPLETED: 'activityTemplates/EDIT_COMPLETED',
  EDIT_FAILED: 'activityTemplates/EDIT_FAILED',

};

export function getRequest(subjectId, activityId) {
  return {
    type: activityTemplatesActionTypes.GET_REQUEST,
    payload: { subjectId, activityId },
  };
}

export function getCompleted(activity) {
  return {
    type: activityTemplatesActionTypes.GET_COMPLETED,
    payload: activity,
  };
}

export function getFailed(error) {
  return {
    type: activityTemplatesActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(subjectId, topicId) {
  return {
    type: activityTemplatesActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, topicId },
  };
}

export function getAllCompleted(activities) {
  return {
    type: activityTemplatesActionTypes.GET_ALL_COMPLETED,
    payload: activities,
  };
}

export function getAllFailed(error) {
  return {
    type: activityTemplatesActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function addRequest(subjectId, topicId, name, includeArtifact) {
  return {
    type: activityTemplatesActionTypes.ADD_REQUEST,
    payload: {
      subjectId, topicId, name, includeArtifact,
    },
  };
}

export function addCompleted(activity) {
  return {
    type: activityTemplatesActionTypes.ADD_COMPLETED,
    payload: activity,
  };
}

export function addFailed(error) {
  return {
    type: activityTemplatesActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function obsoleteRequest(subjectId, topicId, activityId) {
  return {
    type: activityTemplatesActionTypes.OBSOLETE_REQUEST,
    payload: { subjectId, topicId, activityId },
  };
}

export function obsoleteCompleted(activity) {
  return {
    type: activityTemplatesActionTypes.OBSOLETE_COMPLETED,
    payload: activity,
  };
}

export function obsoleteFailed(error) {
  return {
    type: activityTemplatesActionTypes.OBSOLETE_FAILED,
    payload: error,
  };
}

export function deleteRequest(subjectId, topicId, activityId) {
  return {
    type: activityTemplatesActionTypes.DELETE_REQUEST,
    payload: { subjectId, topicId, activityId },
  };
}

export function deleteCompleted(activityId) {
  return {
    type: activityTemplatesActionTypes.DELETE_COMPLETED,
    payload: activityId,
  };
}

export function deleteFailed(error) {
  return {
    type: activityTemplatesActionTypes.DELETE_FAILED,
    payload: error,
  };
}

export function reopenRequest(subjectId, topicId, activityId) {
  return {
    type: activityTemplatesActionTypes.REOPEN_REQUEST,
    payload: { subjectId, topicId, activityId },
  };
}

export function reopenCompleted(activity) {
  return {
    type: activityTemplatesActionTypes.REOPEN_COMPLETED,
    payload: activity,
  };
}

export function reopenFailed(error) {
  return {
    type: activityTemplatesActionTypes.REOPEN_FAILED,
    payload: error,
  };
}

export function editRequest(subjectId, activityId, name, description, includeArtifact) {
  return {
    type: activityTemplatesActionTypes.EDIT_REQUEST,
    payload: {
      subjectId, activityId, name, description, includeArtifact,
    },
  };
}

export function editCompleted(activity) {
  return {
    type: activityTemplatesActionTypes.EDIT_COMPLETED,
    payload: activity,
  };
}

export function editFailed(error) {
  return {
    type: activityTemplatesActionTypes.EDIT_FAILED,
    payload: error,
  };
}


export const eventActions = new EventMiddleware('activityTemplates');
