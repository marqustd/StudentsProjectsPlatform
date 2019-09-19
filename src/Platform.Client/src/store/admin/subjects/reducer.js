import { SubjectActionTypes, loaderActionTypes, eventActionTypes } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';


const initialState = {
  subjects: { array: [], totalCount: 0 }, // [{id, name ,obsolete}]
  subject: {},
  loads: [],
  events: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SubjectActionTypes.GET_COMPLETED:
      return {
        ...state,
        subject: {
          id: payload.subjectId || 0,
          name: payload.name || '',
          isObsolete: payload.isObsolete, // TODO
          teacherId: payload.teacherId,
          teacherName: payload.teacherName,
        },
      };

    case SubjectActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        subjects: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case SubjectActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        subjects: {
          array: [
            ...state.subjects.array,
            ...(payload.array || [])],
          totalCount: state.subjects.totalCount + 1,
        },
      };

    case SubjectActionTypes.ADD_COMPLETED:
      return {
        ...state,
        subjects: {
          array: [...state.subjects.array, payload],
          totalCount: state.subjects.totalCount + 1,
        },
      };


    case SubjectActionTypes.OBSOLETE_COMPLETED:
    case SubjectActionTypes.RESTORE_COMPLETED:
    case SubjectActionTypes.EDIT_COMPLETED:
      return {
        ...state,
        subject: {
          id: payload.subjectId || 0,
          name: payload.name || '',
          isObsolete: payload.isObsolete,
          teacherId: payload.teacherId,
          teacherName: payload.teacherName,
        },
      };

    case SubjectActionTypes.GET_FAILED:
    case SubjectActionTypes.GET_ALL_FAILED:
    case SubjectActionTypes.GET_MORE_FAILED:
    case SubjectActionTypes.ADD_FAILED:
    case SubjectActionTypes.EDIT_FAILED:
    case SubjectActionTypes.OBSOLETE_FAILED:
    case SubjectActionTypes.RESTORE_FAILED:
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
