import { adminUrls } from '../../utility/helpers/config';
import {
  gatewayWorkflow, authPost, authGet, authPatch,
} from '../methods';

const { users: urls } = adminUrls;

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


export async function getStudent(id) {
  const result = await getTemplate(`${urls.GET_STUDENT}?id=${id}`);
  return result;
}
export async function getTeacher(id) {
  const result = await getTemplate(`${urls.GET_TEACHER}?id=${id}`);
  return result;
}
export async function getAdmin(id) {
  const result = await getTemplate(`${urls.GET_ADMIN}?id=${id}`);
  return result;
}

export async function getAllStudents({
  search, index, count, obsolete,
}) {
  let queryString = `${urls.GET_ALL_STUDENTS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }
  if (obsolete != null) { queryString += `&obsolete=${obsolete}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function getAllTeachers({
  search, index, count, obsolete,
}) {
  let queryString = `${urls.GET_ALL_TEACHERS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }
  if (obsolete != null) { queryString += `&obsolete=${obsolete}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function getAllAdmins({
  search, index, count, obsolete,
}) {
  let queryString = `${urls.GET_ALL_ADMINS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }
  if (obsolete != null) { queryString += `&obsolete=${obsolete}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addStudent(data) {
  const result = await postTemplate(urls.ADD_STUDENT, data);
  return result;
}
export async function addTeacher(data) {
  const result = await postTemplate(urls.ADD_TEACHER, data);
  return result;
}
export async function addAdmin(data) {
  const result = await postTemplate(urls.ADD_ADMIN, data);
  return result;
}

export async function editStudent(data) {
  const result = await patchTemplate(urls.EDIT_STUDENT, data);
  return result;
}
export async function editTeacher(data) {
  const result = await patchTemplate(urls.EDIT_TEACHER, data);
  return result;
}
export async function editAdmin(data) {
  const result = await patchTemplate(urls.EDIT_ADMIN, data);
  return result;
}

export async function obsoleteStudent(id) {
  const result = await patchTemplate(`${urls.OBSOLETE_STUDENT}`, { id });
  return result;
}
export async function obsoleteTeacher(id) {
  const result = await patchTemplate(`${urls.OBSOLETE_TEACHER}`, { id });
  return result;
}
export async function obsoleteAdmin(id) {
  const result = await patchTemplate(`${urls.OBSOLETE_ADMIN}`, { id });
  return result;
}

export async function restoreStudent(id) {
  const result = await patchTemplate(`${urls.RESTORE_STUDENT}`, { id });
  return result;
}
export async function restoreTeacher(id) {
  const result = await patchTemplate(`${urls.RESTORE_TEACHER}`, { id });
  return result;
}
export async function restoreAdmin(id) {
  const result = await patchTemplate(`${urls.RESTORE_ADMIN}`, { id });
  return result;
}
