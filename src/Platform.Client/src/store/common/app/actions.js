export const AppActionTypes = {
  START_LOADING: 'app/START_LOADING',
  FINISH_LOADING: 'app/FINISH_LOADING',

  UPDATE_BREADCRUMB: 'app/UPDATE_BREADCRUMB',
};

export function showSpinner() {
  return {
    type: AppActionTypes.START_LOADING,
  };
}

export function hideSpinner() {
  return {
    type: AppActionTypes.FINISH_LOADING,
  };
}

export function updateBreadcumb(crumbs) {
  return {
    type: AppActionTypes.UPDATE_BREADCRUMB,
    payload: crumbs,
  };
}
