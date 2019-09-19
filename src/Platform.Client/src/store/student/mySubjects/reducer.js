import { subjectActionTypes, loaderActions, eventsActions } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const { actionTypes: loaderActionTypes } = loaderActions;
const initialState = {
  subjectsArray: { array: [], totalCount: 0 },
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
          subjectName: payload.subjectName || '',
          description: payload.description || '',
          teacherName: payload.teacherName || '',
          sectionId: payload.sectionId || -1,
        },
      };

    case subjectActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        subjectsArray: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case subjectActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        subjectsArray: {
          array: [
            ...state.subjectsArray.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case subjectActionTypes.GET_FAILED:
    case subjectActionTypes.GET_ALL_FAILED:
    case subjectActionTypes.GET_MORE_FAILED:
      return state;

      // Loaders
    case loaderActionTypes.ADD_LOADER:
      return {
        ...state,
        loads: [payload, ...state.loads],
      };

    case loaderActionTypes.REMOVE_LOADER:
      return {
        ...state,
        loads: state.loads.filter(l => l !== payload) || [],
      };

      // Events
    case eventsActions.eventActionTypes.EVENT_ADD_COMPLETED:
      return {
        ...state,
        events: [
          {
            ...payload,
            id: guidGenerator(),
          },
          ...state.events],
      };

    case eventsActions.eventActionTypes.EVENT_REMOVE_COMPLETED:
      return {
        ...state,
        events: state.events.filter(e => e.id !== payload),
      };


    default:
      return state;
  }
}
