import { TemplateActionTypes } from './actions';

const initialState = {
  myState: [],
  loads: [],
  events: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TemplateActionTypes.TEMPLATE_COMPLETED:
      return state;

    case TemplateActionTypes.TEMPLATE_FAILED:
      return state;

    default:
      return state;
  }
}
