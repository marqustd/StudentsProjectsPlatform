import { activitiesActionTypes } from './actions';

const initialState = {
  activities: [],
  activity: {},
  events: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case activitiesActionTypes.UPLOAD_ARTIFACT_COMPLETED:
      return {
        ...state,
        activity: {
          ...state.activity,
          artifactId: payload.artifactId || null,
          artifactName: payload.name || null,
        },
      };

    case activitiesActionTypes.GET_COMPLETED:
      return {
        ...state,
        activity: {
          activityId: payload.activityId,
          name: payload.name,
          description: payload.description,
          includeArtifact: payload.includeArtifact,
          artifactId: payload.artifactId || null,
          artifactName: payload.artifactName || null,
          isChecked: payload.isChecked || false,
        },
      };

    case activitiesActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        activities: payload,
      };

    default:
      return state;
  }
}
