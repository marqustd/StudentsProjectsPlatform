import { actionTypes } from './actions';

const initialState = {}; // dict<id, object>

export default function reducer(state = initialState, { type, payload }) {
  let newState;
  switch (type) {
    case actionTypes.AJAX_COMPLETED:
      newState = { ...state };
      newState[payload.id] = payload.data;
      return newState;

    case actionTypes.REMOVE_COMPLETED:
      newState = { ...state };
      delete newState[payload];
      return newState;

    case actionTypes.AJAX_FAILED:
    default:
      return state;
  }
}
