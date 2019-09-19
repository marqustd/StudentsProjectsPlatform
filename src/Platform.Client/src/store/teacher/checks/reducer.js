import { checksActionTypes, loaderActions } from './actions';

const { actionTypes } = loaderActions;
const initialState = {
  checkArray: {
    array: [],
    totalCount: 0,
  },
  loads: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case checksActionTypes.CHECK_ALL_COMPLETED:
    case checksActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        checkArray: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case checksActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        checkArray: {
          array: [
            ...state.checkArray.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case checksActionTypes.CHECK_COMPLETED:
      return {
        ...state,
        checkArray: {
          ...state.checkArray,
          array: state.checkArray.array.map((g) => {
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
