import { activitiesActionTypes, eventActions } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const { eventActionTypes } = eventActions;

const initialState = {
  activities: [],
  activity: {},
  events: [],
  // {id, name, link }
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case activitiesActionTypes.GET_COMPLETED:
      return {
        ...state,
        activity: {
          activityId: payload.activityId,
          name: payload.name,
          description: payload.description,
          includeArtifact: payload.includeArtifact,
          artifactId: payload.artifactId || 0,
          artifactName: payload.artifactName || null,
          obsolete: payload.obsolete,
        },
      };

    case activitiesActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        activities: payload,
      };

    case activitiesActionTypes.ADD_COMPLETED:
      return {
        ...state,
        activities: [...state.activities, payload],
      };

    case activitiesActionTypes.REMOVE_COMPLETED:
      return {
        ...state,
        activities: state.activities.filter(a => a.activityId !== payload),
      };


    case activitiesActionTypes.EDIT_COMPLETED:
      return {
        ...state,
        activities: [
          ...state.activities
            .filter(a => a.activityId !== payload.activityId),
          payload],
      };
      // Events
    case eventActionTypes.EVENT_ADD_COMPLETED:
      return {
        ...state,
        events: [
          {
            ...payload,
            id: guidGenerator(),
          },
          ...state.events],
      };

    case eventActionTypes.EVENT_REMOVE_COMPLETED:
      return {
        ...state,
        events: state.events.filter(e => e.id !== payload),
      };

    default:
      return state;
  }
}
