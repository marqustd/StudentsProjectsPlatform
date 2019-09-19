import { adminUrls } from '../../utility/helpers/config';
import {
  gatewayWorkflow, authPost, authGet, authPatch,
} from '../methods';

const { majors: urls } = adminUrls;

async function postTemplate(url, data) {
  const promiseFetch = authPost(url, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

async function patchTemplate(url, data) {
  const promiseFetch = authPatch(url, data);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}

async function getTemplate(url) {
  const promiseFetch = authGet(url);
  const result = await gatewayWorkflow(promiseFetch);
  return result;
}


export async function getMajor(id) {
  const result = await getTemplate(`${urls.GET_MAJOR}?id=${id}`);
  return result;
}


export async function getAllMajors({
  search, index, count, obsolete,
}) {
  let queryString = `${urls.GET_ALL_MAJORS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }
  if (obsolete != null) { queryString += `&obsolete=${obsolete}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addMajor(data) {
  const result = await postTemplate(urls.ADD_MAJOR, data);
  return result;
}

export async function editMajor(data) {
  const result = await patchTemplate(urls.EDIT_MAJOR, data);
  return result;
}

export async function obsoleteMajor(id) {
  const result = await patchTemplate(`${urls.OBSOLETE_MAJOR}`, { id });
  return result;
}

export async function restoreMajor(id) {
  const result = await patchTemplate(`${urls.RESTORE_MAJOR}`, { id });
  return result;
}
