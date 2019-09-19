import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate, deleteTemplate,
} from '../methods';

const { teachers: urls } = teacherUrls;


export async function getAllTeachers({ subjectId, index, count }) {
  let queryString = `${urls.GET_ALL}?`;
  if (subjectId != null) { queryString += `subjectId=${subjectId}`; }
  if (index != null) { queryString += `&index=${index}`; }
  if (count != null) { queryString += `&count=${count}`; }

  const result = await getTemplate(queryString);
  return result;
}

export async function addTeacher({ subjectId, teacherId }) {
  const result = postTemplate(urls.ADD, { subjectId, teacherId });
  return result;
}

export async function removeTeacher({ subjectId, teacherId }) {
  const result = await deleteTemplate(urls.REMOVE, { subjectId, teacherId });
  return result;
}
