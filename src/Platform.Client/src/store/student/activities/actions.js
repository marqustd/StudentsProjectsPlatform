export const activitiesActionTypes = {
  GET_REQUEST: 'student_activities/GET_REQUEST',
  GET_COMPLETED: 'student_activities/GET_COMPLETED',
  GET_FAILED: 'student_activities/GET_FAILED',

  GET_ALL_REQUEST: 'student_activities/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'student_activities/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'student_activities/GET_ALL_FAILED',

  UPLOAD_ARTIFACT_REQUEST: 'student_activities/UPLOAD_ARTIFACT_REQUEST',
  UPLOAD_ARTIFACT_COMPLETED: 'student_activities/UPLOAD_ARTIFACT_COMPLETED',
  UPLOAD_ARTIFACT_FAILED: 'student_activities/UPLOAD_ARTIFACT_FAILED',
};

export function uploadArtifactRequest(activityId, file) {
  return {
    type: activitiesActionTypes.UPLOAD_ARTIFACT_REQUEST,
    payload: { activityId, file },
  };
}

export function uploadArtifactCompleted(artifact) {
  return {
    type: activitiesActionTypes.UPLOAD_ARTIFACT_COMPLETED,
    payload: artifact,
  };
}

export function uploadArtifactFailed(error) {
  return {
    type: activitiesActionTypes.UPLOAD_ARTIFACT_FAILED,
    payload: error,
  };
}

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
