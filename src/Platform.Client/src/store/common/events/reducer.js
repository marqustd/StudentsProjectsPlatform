import { eventsActionTypes } from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const initialState = {
  events: [], // [{ id, code, message }]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case eventsActionTypes.EVENT_REGISTERED:
      return {
        events: [{
          ...action.payload,
          id: guidGenerator(),
        },
        ...state.events],
      };

    case eventsActionTypes.EVENT_HANDLED:
      return { events: state.events.filter(e => e.id !== action.payload) };

    default:
      return state;
  }
}
