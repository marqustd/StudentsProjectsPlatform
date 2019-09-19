import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate, patchTemplate,
} from '../methods';

const { semesters: urls } = teacherUrls;

export async function getSemester({ subjectId, semesterId }) {
  const url = `${urls.GET}?subjectId=${subjectId}&semesterId=${semesterId}`;
  const result = await getTemplate(url);
  return result;
}

export async function getAllSemesters({ subjectId, index, count }) {
  let queryString = `${urls.GET_ALL}?`;

  if (subjectId != null) { queryString += `subjectId=${subjectId}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addSemester({ subjectId, majorId, password }) {
  const result = await postTemplate(urls.ADD, { subjectId, majorId, password });
  return result;
}

export async function editSemester({ semesterId, state }) {
  const result = await patchTemplate(urls.EDIT, { semesterId, state });
  return result;
}

export async function restoreSemester({ semesterId }) {
  const result = await patchTemplate(`${urls.RESTORE}/${semesterId}`);
  return result;
}

export async function obsoleteSemester({ semesterId }) {
  const result = await patchTemplate(`${urls.OBSOLETE}/${semesterId}`);
  return result;
}
