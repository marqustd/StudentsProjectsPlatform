export const actionTypes = {
  AJAX_REQUEST: 'temporary/AJAX_REQUEST',
  AJAX_COMPLETED: 'temporary/AJAX_COMPLETED',
  AJAX_FAILED: 'temporary/AJAX_FAILED',
  REMOVE_REQUEST: 'temporary/REMOVE_REQUEST',
  REMOVE_COMPLETED: 'temporary/REMOVE_COMPLETED',
};
export const ajaxTypes = {
  GET: 0,
  POST: 1,
  PATCH: 2,
  DELETE: 3,
  UPLOAD: 4,
};

export function ajaxRequest(id, url, method = ajaxTypes.GET, body = {}) {
  return {
    type: actionTypes.AJAX_REQUEST,
    payload: {
      id, url, method, body,
    },
  };
}

export function ajaxCompleted(id, data) {
  return {
    type: actionTypes.AJAX_COMPLETED,
    payload: { id, data },
  };
}

export function ajaxFailed(errors) {
  return {
    type: actionTypes.AJAX_FAILED,
    payload: errors,
  };
}

export function removeRequest(id) {
  return {
    type: actionTypes.REMOVE_REQUEST,
    payload: id,
  };
}

export function removeCompleted(id) {
  return {
    type: actionTypes.REMOVE_COMPLETED,
    payload: id,
  };
}
