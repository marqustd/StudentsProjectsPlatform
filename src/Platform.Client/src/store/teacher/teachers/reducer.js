import { teachersActionTypes, loaderActions } from './actions';

const { actionTypes } = loaderActions;

const initialState = {
  loads: [],
  teachersState: {
    array: [],
    totalCount: 0,
  },
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case teachersActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        teachersState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case teachersActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        teachersState: {
          array: [
            ...state.teachersState.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount,
        },
      };

    case teachersActionTypes.ADD_COMPLETED:
      return {
        ...state,
        teachersState: {
          array: [
            ...state.teachersState.array, payload,
          ],
          totalCount: state.teachersState.totalCount + 1,
        },
      };


    case teachersActionTypes.REMOVE_COMPLETED:
      return {
        ...state,
        teachersState: {
          array: state.teachersState.array.filter(t => t.teacherId !== payload.teacherId),
          totalCount: state.teachersState.totalCount - 1,
        },
      };

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
