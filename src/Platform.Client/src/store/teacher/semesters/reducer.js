import { semestersActionTypes, loaderActions } from './actions';

const { actionTypes: loaderActionTypes } = loaderActions;
const initialState = {
  // eslint-disable-next-line
  semestersState: { array: [], totalCount: 0 },
  semester: {},
  loads: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    // Subjects
    case semestersActionTypes.RESTORE_COMPLETED:
    case semestersActionTypes.OBSOLETE_COMPLETED:
    case semestersActionTypes.EDIT_COMPLETED:
    case semestersActionTypes.GET_COMPLETED:
      return {
        ...state,
        semester: {
          semesterId: payload.semesterId || 0,
          semesterName: payload.semesterName || '',
          majorId: payload.majorId || '',
          majorName: payload.majorName || '',
          state: payload.state || 0,
          password: payload.password || '',
          obsolete: payload.obsolete || false,
        },
      };

    case semestersActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        semestersState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case semestersActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        semestersState: {
          array: [
            ...state.semestersState.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case semestersActionTypes.ADD_COMPLETED:
      return {
        ...state,
        semestersState: {
          array: [...state.semestersState.array, payload],
          totalCount: state.semestersState.totalCount + 1,
        },
      };

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

    default:
      return state;
  }
}
