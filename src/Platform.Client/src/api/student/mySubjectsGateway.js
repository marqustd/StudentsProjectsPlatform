import { studentUrls } from '../../utility/helpers/config';
import {
  getTemplate,
} from '../methods';

const { mySubjects: urls } = studentUrls;

export async function getSubject(subjectId) {
  const result = await getTemplate(`${urls.GET_SUBJECTS}?subjectId=${subjectId}`);
  return result;
}

export async function getAllSubjects({
  search, index, count,
}) {
  let queryString = `${urls.FETCH_SUBJECTS}?`;

  if (search != null && search.trim() !== '') { queryString += `&search=${search}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }

  const result = await getTemplate(queryString);
  return result;
}
