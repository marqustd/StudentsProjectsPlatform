import { topicsActionTypes, loaderActions } from './actions';

const {
  actionTypes: loaderActionTypes,
} = loaderActions;

const initialState = {
  // eslint-disable-next-line
  topicsState: { array: [], totalCount: 0 },
  topic: {}, // {id, name, description, subjectId?}
  loads: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case topicsActionTypes.GET_COMPLETED:
    case topicsActionTypes.RESTORE_COMPLETED:
    case topicsActionTypes.OBSOLETE_COMPLETED:
    case topicsActionTypes.EDIT_COMPLETED:
      return {
        ...state,
        topic: {
          topicId: payload.topicId || 0,
          name: payload.name || '',
          description: payload.description || '',
          obsolete: payload.obsolete || false,
        },
      };

    case topicsActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        topicsState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case topicsActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        topicsState: {
          array: [
            ...state.topicsState.array,
            ...(payload.array || [])],
          totalCount: state.topicsState.totalCount,
        },
      };

    case topicsActionTypes.ADD_COMPLETED:
      return {
        ...state,
        topicsState: {
          array: [...state.topicsState.array, payload],
          totalCount: state.topicsState.totalCount + 1,
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
