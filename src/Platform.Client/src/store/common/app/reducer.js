import { AppActionTypes } from './actions';

const initialState = {
  roleReady: false,
  crumbs: [],
};

const baseCrumb = { name: 'Home', link: '/' };

function baseReducer(state, { type, payload }) {
  switch (type) {
    case AppActionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case AppActionTypes.FINISH_LOADING:
      return { ...state, isLoading: false };

    case AppActionTypes.UPDATE_BREADCRUMB:
      return { ...state, crumbs: [baseCrumb, ...payload] };

    default:
      return state;
  }
}

export function appReducer(state = initialState, action) {
  state.roleReady = false;
  return baseReducer(state, action);
}

export function appReducerWithRole(state = initialState, action) {
  state.roleReady = true;
  return baseReducer(state, action);
}
