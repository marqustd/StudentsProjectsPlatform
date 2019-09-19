import { getAuth } from '../utility/helpers/auth';
import { httpErrors } from '../utility/httpErrors';

const commonHeaders = {
  'Content-Type': 'application/json',
};

export function get(url, headersData) {
  return fetch(url, {
    // credentials: 'include',
    mode: 'cors',
    headers: headersData,
  });
}

export function post(url, data, headersData) {
  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    // credentials: 'include',
    headers: {
      ...commonHeaders,
      ...headersData,
    },
  });
}

export function remove(url, data, headersData) {
  return fetch(url, {
    mode: 'cors',
    method: 'DELETE',
    body: JSON.stringify(data),
    // credentials: 'include',
    headers: {
      ...commonHeaders,
      ...headersData,
    },
  });
}

export function upload(url, file, headersData) {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {
    ...commonHeaders,
    ...headersData,
  };

  delete headers['Content-Type'];

  const options = {
    mode: 'cors',
    method: 'POST',
    body: formData,
    headers,
  };

  return fetch(url, options);
}

export function patch(url, data, headersData) {
  return fetch(url, {
    mode: 'cors',
    method: 'PATCH',
    body: JSON.stringify(data),
    // credentials: 'include',
    headers: {
      ...commonHeaders,
      ...headersData,
    },
  });
}

export function authGet(url, headers) {
  const auth = getAuth();
  const headersData = {
    ...headers,
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return get(url, headersData);
}

export function authPost(url, data, headers) {
  const auth = getAuth();
  const headersData = {
    ...headers,
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return post(url, data, headersData);
}

export function authUpload(url, file, headers) {
  const auth = getAuth();
  const headersData = {
    ...headers,
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return upload(url, file, headersData);
}


export function authPatch(url, data, headers) {
  const auth = getAuth();
  const headersData = {
    ...headers,
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return patch(url, data, headersData);
}

export function authDelete(url, data, headers) {
  const auth = getAuth();
  const headersData = {
    ...headers,
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return remove(url, data, headersData);
}


export const error = json => ({
  succes: false,
  json, // json : {  data: object, meta: object, errors: [] }
});

export const succes = json => ({
  succes: true,
  json, // json : { data: object, meta: object, errors: [] }
});

export async function gatewayWorkflow(fetchPromise) {
  let response;
  try {
    try {
      response = await fetchPromise;
    } catch (err) {
      return error({ errors: [httpErrors.FETCH_ERROR] });
    } // eslint-disable-next-line
  	const data = await response.json(); // data : { success: bool, payload: object, message: string }
    if (response.ok) {
      return succes(data);
    }
    // If unauthorized
    if (response.status === 401) {
      return error({
        errors: [httpErrors.UNAUTHORIZED],
      });
    }
    return error(data);
  } catch (err) {
    console.log(err);
    return error({
      errors: [httpErrors.UNKNOWN],
    });
  }
}

// Templates ready to use:
/* eslint-disable */
const mockResult = {
  succes: true,
  json: {},
};
/* eslint-enable */

export async function postTemplate(url, data) {
  const promiseFetch = authPost(url, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function uploadTemplate(url, file) {
  const promiseFetch = authUpload(url, file);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function getTemplate(url) {
  const promiseFetch = authGet(url);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function patchTemplate(url, data) {
  const promiseFetch = authPatch(url, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function deleteTemplate(url, data) {
  const promiseFetch = authDelete(url, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}
