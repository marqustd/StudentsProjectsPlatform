import { sectionsActionTypes, loaderActions } from './actions';

const { actionTypes: loaderActionTypes } = loaderActions;
const initialState = {
  // eslint-disable-next-line
  sectionsState: { array: [], totalCount: 0 },
  section: {},
  loads: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case sectionsActionTypes.EDIT_COMPLETED:
    case sectionsActionTypes.GET_COMPLETED:
      return {
        ...state,
        section: {
          sectionId: payload.sectionId || 0,
          name: payload.name || '',
          status: payload.status || 0,
          capacity: payload.capacity || 0,
          membersCount: payload.membersCount || 0,
        },
      };

    case sectionsActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        sectionsState: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case sectionsActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        sectionsState: {
          array: [
            ...state.sectionsState.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount || 0,
        },
      };

    case sectionsActionTypes.ADD_COMPLETED:
      return {
        ...state,
        sectionsState: {
          array: [...state.sectionsState.array, payload],
          totalCount: state.sectionsState.totalCount + 1,
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
