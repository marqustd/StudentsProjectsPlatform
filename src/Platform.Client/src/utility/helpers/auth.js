import jwtDecode from 'jwt-decode';
import store from '../../store/root';

export function getAuth() {
  const { auth } = store.getState();
  return auth;
}


export function extendWithClaims(tokens) {
  // eslint-disable-next-line
  const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn  } = tokens;
  const claims = jwtDecode(tokens.access_token);
  const safetyTimeSpan = 30000;
  const expiration = Date.now() + (expiresIn * 1000 - safetyTimeSpan);

  return {
    isAuth: true,
    id: claims.sub,
    accessToken,
    refreshToken,
    expiration,
    username: claims.name,
    email: claims.email,
    role: claims.role,
  };
}
