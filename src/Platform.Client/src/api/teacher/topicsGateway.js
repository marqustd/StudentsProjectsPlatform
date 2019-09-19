import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate, patchTemplate,
} from '../methods';


const { topics: urls } = teacherUrls;

export async function getTopic({ subjectId, topicId }) {
  const url = `${urls.GET}?subjectId=${subjectId}&topicId=${topicId}`;
  const result = await getTemplate(url);
  return result;
}

export async function getAllTopics({ subjectId, index, count }) {
  let queryString = `${urls.GET_ALL}?obsolete=true`;

  if (subjectId != null) { queryString += `&subjectId=${subjectId}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addTopic({ subjectId, name }) {
  const result = await postTemplate(urls.ADD, { subjectId, name });
  return result;
}

export async function editTopic(data) {
  const result = await patchTemplate(urls.EDIT, data);
  return result;
}

export async function obsoleteTopic(data) {
  const result = await patchTemplate(urls.OBSOLETE, data);
  return result;
}

export async function restoreTopic(data) {
  const result = await patchTemplate(urls.RESTORE, data);
  return result;
}
