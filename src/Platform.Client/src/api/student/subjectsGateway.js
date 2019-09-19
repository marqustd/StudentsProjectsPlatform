import { studentUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate,
} from '../methods';

const { subjects: urls } = studentUrls;

export async function signIn(data) {
  const result = await postTemplate(urls.SIGN_IN_TO_SUBJECT, data);
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
