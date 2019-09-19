import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, patchTemplate,
} from '../methods';

const { subjects: urls } = teacherUrls;

export async function getSubject(subjectId) {
  const result = await getTemplate(`${urls.GET_SUBJECT}?subjectId=${subjectId}`);
  return result;
}


export async function getAllSubjects({
  search, index, count,
}) {
  let queryString = `${urls.GET_ALL_SUBJECTS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }

  const result = await getTemplate(queryString);
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
