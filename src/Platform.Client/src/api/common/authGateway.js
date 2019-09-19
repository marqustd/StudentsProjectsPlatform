import { commonUrls } from '../../utility/helpers/config';
import {
  gatewayWorkflow, authPost, post,
} from '../methods';
import { getAuth } from '../../utility/helpers/auth';

const { auth: urls } = commonUrls;

export async function login(credentials) {
  const promiseFetch = post(urls.LOGIN, credentials);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function googleLogin(tokenId) {
  const promiseFetch = post(urls.GOOGLE_LOGIN, { tokenId });
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function register(data) {
  const promiseFetch = post(urls.REGISTER, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function googleRegister(data) {
  const promiseFetch = post(urls.GOOGLE_REGISTER, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function refreshToken(customeRefreshToken) {
  const auth = getAuth();
  const body = { refreshToken: customeRefreshToken || auth.refreshToken };
  const promiseFetch = post(urls.REFRESH_TOKEN, body);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

export async function logout() {
  const auth = getAuth();
  const body = { refreshToken: auth.refreshToken };
  const promiseFetch = authPost(urls.LOGOUT, body);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}
