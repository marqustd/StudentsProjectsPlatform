import { EventMiddleware } from '../../../utility/events/logicFactory';

export const activitiesActionTypes = {
  GET_REQUEST: 'activities/GET_REQUEST',
  GET_COMPLETED: 'activities/GET_COMPLETED',
  GET_FAILED: 'activities/GET_FAILED',

  GET_ALL_REQUEST: 'activities/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'activities/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'activities/GET_ALL_FAILED',

  ADD_REQUEST: 'activities/ADD_REQUEST',
  ADD_COMPLETED: 'activities/ADD_COMPLETED',
  ADD_FAILED: 'activities/ADD_FAILED',

  REMOVE_REQUEST: 'activities/REMOVE_REQUEST',
  REMOVE_COMPLETED: 'activities/REMOVE_COMPLETED',
  REMOVE_FAILED: 'activities/REMOVE_FAILED',

  EDIT_REQUEST: 'activities/EDIT_REQUEST',
  EDIT_COMPLETED: 'activities/EDIT_COMPLETED',
  EDIT_FAILED: 'activities/EDIT_FAILED',

};

export function getRequest(subjectId, activityId) {
  return {
    type: activitiesActionTypes.GET_REQUEST,
    payload: { subjectId, activityId },
  };
}

export function getCompleted(activity) {
  return {
    type: activitiesActionTypes.GET_COMPLETED,
    payload: activity,
  };
}

export function getFailed(error) {
  return {
    type: activitiesActionTypes.GET_FAILED,
    payload: error,
  };
}

export function getAllRequest(subjectId, sectionId) {
  return {
    type: activitiesActionTypes.GET_ALL_REQUEST,
    payload: { subjectId, sectionId },
  };
}

export function getAllCompleted(activities) {
  return {
    type: activitiesActionTypes.GET_ALL_COMPLETED,
    payload: activities,
  };
}

export function getAllFailed(error) {
  return {
    type: activitiesActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function addRequest(subjectId, topicId, name, includeArtifact) {
  return {
    type: activitiesActionTypes.ADD_REQUEST,
    payload: {
      subjectId, topicId, name, includeArtifact,
    },
  };
}

export function addCompleted(activity) {
  return {
    type: activitiesActionTypes.ADD_COMPLETED,
    payload: activity,
  };
}

export function addFailed(error) {
  return {
    type: activitiesActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function removeRequest(subjectId, topicId, activityId) {
  return {
    type: activitiesActionTypes.REMOVE_REQUEST,
    payload: { subjectId, topicId, activityId },
  };
}

export function removeCompleted(activityId) {
  return {
    type: activitiesActionTypes.REMOVE_COMPLETED,
    payload: activityId,
  };
}

export function removeFailed(error) {
  return {
    type: activitiesActionTypes.REMOVE_FAILED,
    payload: error,
  };
}

export function editRequest(subjectId, topicId, activityId, name, description, includeArtifact) {
  return {
    type: activitiesActionTypes.EDIT_REQUEST,
    payload: {
      subjectId, topicId, activityId, name, description, includeArtifact,
    },
  };
}

export function editCompleted(activity) {
  return {
    type: activitiesActionTypes.EDIT_COMPLETED,
    payload: activity,
  };
}

export function editFailed(error) {
  return {
    type: activitiesActionTypes.EDIT_FAILED,
    payload: error,
  };
}


export const eventActions = new EventMiddleware('activities');
