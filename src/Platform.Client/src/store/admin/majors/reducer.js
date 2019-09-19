import {
  MajorActionTypes,
  loaderActionTypes,
  eventActionTypes,
} from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const initialState = {
  majors: { array: [], totalCount: 0 }, // [{id, name ,obsolete}]
  major: {},
  loads: [],
  events: [],
};
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case MajorActionTypes.GET_COMPLETED:
      return {
        ...state,
        major: {
          id: payload.id || 0,
          name: payload.name || '',
          isObsolete: payload.isObsolete,
        },
      };

    case MajorActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        majors: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case MajorActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        majors: {
          array: [
            ...state.majors.array,
            ...(payload.array || [])],
          totalCount: state.majors.totalCount + 1,
        },
      };

    case MajorActionTypes.ADD_COMPLETED:
      return {
        ...state,
        majors: {
          array: [...state.majors.array, payload],
          totalCount: state.majors.totalCount + 1,
        },
      };
    case MajorActionTypes.EDIT_COMPLETED:
    case MajorActionTypes.OBSOLETE_COMPLETED:
    case MajorActionTypes.RESTORE_COMPLETED:
      return { ...state, major: payload };

    case MajorActionTypes.GET_FAILED:
    case MajorActionTypes.GET_ALL_FAILED:
    case MajorActionTypes.GET_MORE_FAILED:
    case MajorActionTypes.ADD_FAILED:
    case MajorActionTypes.EDIT_FAILED:
    case MajorActionTypes.OBSOLETE_FAILED:
    case MajorActionTypes.RESTORE_FAILED:
      return state;

      // Loaders
    case loaderActionTypes.LOADER_REGISTER:
      return {
        ...state,
        loads: [payload, ...state.loads],
      };

    case loaderActionTypes.LOADER_RESOLVE:
      return {
        ...state,
        loads: state.loads.filter(l => l !== payload) || [],
      };

      // Events
    case eventActionTypes.EVENT_REGISTERED:
      return {
        ...state,
        events: [
          {
            ...payload,
            id: guidGenerator(),
          },
          ...state.events],
      };

    case eventActionTypes.EVENT_HANDLED:
      return {
        ...state,
        events: state.events.filter(e => e.id !== payload),
      };

    default:
      return state;
  }
}
