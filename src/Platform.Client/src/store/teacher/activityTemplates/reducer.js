import { activityTemplatesActionTypes, eventActions } from './actions';
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
    case activityTemplatesActionTypes.EDIT_COMPLETED:
    case activityTemplatesActionTypes.OBSOLETE_COMPLETED:
    case activityTemplatesActionTypes.REOPEN_COMPLETED:
    case activityTemplatesActionTypes.GET_COMPLETED:
      return {
        ...state,
        activity: {
          activityId: payload.activityId,
          name: payload.name,
          description: payload.description,
          includeArtifact: payload.includeArtifact,
          obsolete: payload.obsolete,
        },
      };

    case activityTemplatesActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        activities: payload,
      };

    case activityTemplatesActionTypes.ADD_COMPLETED:
      return {
        ...state,
        activities: [...state.activities, payload],
      };

    case activityTemplatesActionTypes.DELETE_COMPLETED:
      return {
        ...state,
        activity: {},
        activities: state.activities.filter(a => a.activityId !== payload),
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
