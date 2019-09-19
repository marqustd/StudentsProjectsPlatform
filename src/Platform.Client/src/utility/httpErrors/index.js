export const httpErrors = {
  FETCH_ERROR: {
    code: 600,
    message: 'Failed to fetch data',
  },
  UNKNOWN: {
    code: 601,
    message: 'Unknown error, unexpected response',
  },
  INVALID_DATA: {
    code: 400,
    message: 'Invalid data',
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    code: 401,
  },
  CONFLICT: {
    code: 409,
    message: 'Data conflict',
  },
};
