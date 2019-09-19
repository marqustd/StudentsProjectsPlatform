import { AuthActionTypes } from './actions';
import {
  loadStorage, saveStorage, removeStorage, KEYS,
} from '../../../utility/helpers/storageManager';
import { guidGenerator } from '../../../utility/helpers/guid';

/* eslint-disable */
const devState = {
  accessToken: 'mocked-access-token',
  refreshToken: 'mocked-refresh-token',
  expiration: 1000000,
  isAuth: true,
  fullName: 'Mocked User',
  username: 'mocked',
  email: 'mocked@local.host',
  role: 'Student',
  id: '1',
  events: [],
};
/* eslint-enable */

const emptyState = {
  accessToken: '',
  refreshToken: '',
  expiration: 0,
  isAuth: false,
  fullName: '',
  username: '',
  email: '',
  role: '',
  id: '',
  events: [],
};

const getInitialState = () => ({
  accessToken: '',
  refreshToken: loadStorage(KEYS.refreshToken) || '',
  expiration: 0,
  isAuth: loadStorage(KEYS.isAuth) || false,
  fullName: '',
  username: '',
  email: '',
  role: '',
  id: '',
  events: [],
});

export default function reducer(state = getInitialState(), { type, payload }) {
  // return devState;
  // /* eslint-disable */
  switch (type) {
    case AuthActionTypes.REFRESH_TOKEN_REQUEST:
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.LOGOUT_REQUEST:
      return state;

    case AuthActionTypes.LOGIN_COMPLETED:
    case AuthActionTypes.GOOGLE_LOGIN_COMPLETED:
      saveStorage(KEYS.refreshToken, payload.refreshToken);
      saveStorage(KEYS.isAuth, true);
      return { ...state, ...payload };

    case AuthActionTypes.REFRESH_TOKEN_COMPLETED:
      return { ...state, ...payload };

    case AuthActionTypes.LOGOUT_COMPLETED:
      removeStorage(KEYS.refreshToken);
      removeStorage(KEYS.isAuth);
      return emptyState;

    case AuthActionTypes.LOGIN_FAILED:
    case AuthActionTypes.GOOGLE_LOGIN_FAILED:
      return { ...state };

    case AuthActionTypes.REFRESH_TOKEN_FAILED: // Should logout user
      removeStorage(KEYS.refreshToken);
      removeStorage(KEYS.isAuth);
      return emptyState;

    case AuthActionTypes.LOGOUT_FAILED:
      return { ...state };

    case AuthActionTypes.AUTH_EVENT_HANDLED:
      return { ...state, events: [...state.events.filter(e => e.id !== payload)] };

    case AuthActionTypes.AUTH_EVENT_OCCURED:
      return {
        ...state,
        events: [...state.events,
          {
            ...payload,
            id: guidGenerator(),
          },
        ],
      };

    default:
      return state;
  }
}
