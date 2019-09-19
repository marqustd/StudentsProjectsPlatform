export function saveStorage(key, value) {
  try {
    const stringified = JSON.stringify(value);
    localStorage.setItem(key, stringified);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function loadStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
}

export const KEYS = {
  refreshToken: 'refresh_token',
  isAuth: 'is_auth',
};
