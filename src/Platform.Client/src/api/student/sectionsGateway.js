import { studentUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate,
} from '../methods';

const { sections: urls } = studentUrls;

export async function getSection({ subjectId, sectionId }) {
  const queryBuilder = `${urls.GET_SECTION}?subjectId=${subjectId}&sectionId=${sectionId}`;
  const result = await getTemplate(queryBuilder);
  return result;
}

export async function getAllSections({
  subjectId, index, count,
}) {
  const queryBuilder = `${urls.GET_ALL_SECTIONS}?subjectId=${subjectId}&index=${index}&count=${count}`;
  const result = await getTemplate(queryBuilder);
  return result;
}

export async function signIn(data) {
  const result = await postTemplate(urls.SIGN_IN, data);
  return result;
}

export async function signOut(data) {
  const result = await postTemplate(urls.SIGN_OUT, data);
  return result;
}
