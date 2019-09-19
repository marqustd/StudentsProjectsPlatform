import { subjectActionTypes, loaderActionTypes, eventActionTypes } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';


const initialState = {
  // eslint-disable-next-line
  subjectsState: { array: [], totalCount: 0 }, // [{id, name, isObsolete, teachers:[ { id, name } ] }]
  subject: {},
  loads: [],
  events: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    // Subjects
    case subjectActionTypes.GET_COMPLETED:
      return {
        ...state,
        subject: {
          subjectId: payload.subjectId || 0,
          name: payload.name || '',
          description: payload.description || '',
          isObsolete: payload.isObsolete, // TODO
        },
      };

    case subjectActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        subjectsState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case subjectActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        subjectsState: {
          array: [
            ...state.subjectsState.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case subjectActionTypes.OBSOLETE_COMPLETED:
    case subjectActionTypes.RESTORE_COMPLETED:
    case subjectActionTypes.EDIT_COMPLETED:
      return {
        ...state,
        subject: {
          subjectId: payload.subjectId || 0,
          name: payload.name || '',
          description: payload.description || '',
        },
      };

    case subjectActionTypes.GET_FAILED:
    case subjectActionTypes.GET_ALL_FAILED:
    case subjectActionTypes.GET_MORE_FAILED:
    case subjectActionTypes.EDIT_FAILED:
    case subjectActionTypes.OBSOLETE_FAILED:
    case subjectActionTypes.RESTORE_FAILED:
      return state;

      // Loaders
    case loaderActionTypes.LOADER_ADDED:
      return {
        ...state,
        loads: [payload, ...state.loads],
      };

    case loaderActionTypes.LOADER_REMOVED:
      return {
        ...state,
        loads: state.loads.filter(l => l !== payload) || [],
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
