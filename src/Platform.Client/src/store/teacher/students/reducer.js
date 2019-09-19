import { studentsActionTypes, loaderActions } from './actions';

const { actionTypes } = loaderActions;
const initialState = {
  studentsState: {
    array: [],
    totalCount: 0,
  },
  loads: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case studentsActionTypes.GRADE_ALL_COMPLETED:
    case studentsActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        studentsState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case studentsActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        studentsState: {
          array: [
            ...state.studentsState.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case studentsActionTypes.ADD_COMPLETED:
      return {
        ...state,
        studentsState: {
          array: [
            ...state.studentsState.array, payload,
          ],
          totalCount: state.studentsState.totalCount + 1,
        },
      };


    case studentsActionTypes.REMOVE_COMPLETED:
      return {
        ...state,
        studentsState: {
          array: state.studentsState.array.filter(s => s.studentId !== payload),
          totalCount: state.studentsState.totalCount - 1,
        },
      };

    case studentsActionTypes.GRADE_COMPLETED:
      return {
        ...state,
        studentsState: {
          ...state.studentsState,
          array: state.studentsState.array.map((g) => {
            if (g.studentId === payload.studentId) { return payload; }
            return g;
          }),
        },
      };

      // Loaders
    case actionTypes.ADD_LOADER:
      return {
        ...state,
        loads: [payload, ...state.loads],
      };

    case actionTypes.REMOVE_LOADER:
      return {
        ...state,
        loads: state.loads.filter(l => l !== payload) || [],
      };

    default:
      return state;
  }
}
