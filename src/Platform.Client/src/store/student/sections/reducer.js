import { sectionsActionTypes, loaderActions, eventActions } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const { eventActionTypes } = eventActions;
const { actionTypes: loaderActionTypes } = loaderActions;
const initialState = {
  // eslint-disable-next-line
  sectionsArray: { array: [], totalCount: 0 },
  section: {},
  loads: [],
  events: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case sectionsActionTypes.SIGN_IN_COMPLETED:
    case sectionsActionTypes.SIGN_OUT_COMPLETED:
    case sectionsActionTypes.GET_COMPLETED:
      return {
        ...state,
        section: {
          grade: payload.grade || null,
          sectionId: payload.sectionId || 0,
          name: payload.name || '',
          status: payload.status || 0,
          capacity: payload.capacity || 0,
          membersCount: payload.membersCount || 0,
          topicId: payload.topicId || 0,
          topicName: payload.topicName || '',
          topicDescription: payload.topicDescription || '',
          isSignedIn: payload.isSignedIn || false,
        },
      };

    case sectionsActionTypes.GET_ALL_COMPLETED:
      return {
        ...state,
        sectionsArray: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };

    case sectionsActionTypes.GET_MORE_COMPLETED:
      return {
        ...state,
        sectionsArray: {
          array: [
            ...state.sectionsArray.array,
            ...(payload.array || [])],
          totalCount: payload.totalCount || 0,
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
