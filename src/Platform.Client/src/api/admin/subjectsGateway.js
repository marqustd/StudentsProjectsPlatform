import { adminUrls } from '../../utility/helpers/config';
import {
  gatewayWorkflow, authPost, authGet, authPatch,
} from '../methods';

const { subjects: urls } = adminUrls;

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


export async function getSubject(id) {
  const result = await getTemplate(`${urls.GET_SUBJECT}?id=${id}`);
  return result;
}


export async function getAllSubjects({
  search, index, count, obsolete,
}) {
  let queryString = `${urls.GET_ALL_SUBJECTS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }
  if (obsolete != null) { queryString += `&obsolete=${obsolete}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addSubject(data) {
  const result = await postTemplate(urls.ADD_SUBJECT, data);
  return result;
}

export async function editSubject(data) {
  const result = await patchTemplate(urls.EDIT_SUBJECT, data);
  return result;
}

export async function obsoleteSubject(id) {
  const result = await patchTemplate(`${urls.OBSOLETE_SUBJECT}`, { id });
  return result;
}

export async function restoreSubject(id) {
  const result = await patchTemplate(`${urls.RESTORE_SUBJECT}`, { id });
  return result;
}
