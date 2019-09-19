import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate, patchTemplate,
} from '../methods';

const { sections: urls } = teacherUrls;

export async function getSections({ subjectId, semesterId, sectionId }) {
  const queryBuilder = `${urls.GET}?subjectId=${subjectId}&semesterId=${semesterId}&sectionId=${sectionId}`;
  const result = await getTemplate(queryBuilder);
  return result;
}

export async function getAllSections({
  subjectId, semesterId, index, count,
}) {
  const queryBuilder = `${urls.GET_ALL}?subjectId=${subjectId}&semesterId=${semesterId}&index=${index}&count=${count}`;
  const result = await getTemplate(queryBuilder);
  return result;
}

export async function addSection(data) {
  const result = await postTemplate(urls.ADD, data);
  return result;
}

export async function editSection(data) {
  const result = await patchTemplate(urls.EDIT, data);
  return result;
}
