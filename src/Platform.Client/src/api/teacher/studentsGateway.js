import { teacherUrls } from '../../utility/helpers/config';
import {
  postTemplate, deleteTemplate, getTemplate,
} from '../methods';

const { students: urls } = teacherUrls;

export async function getAllStudents({
  subjectId, sectionId, index, count,
}) {
  const getUrl = `${urls.GET_ALL}
?subjectId=${subjectId}
&sectionId=${sectionId}
&index=${index}
&count${count}`;

  const result = await getTemplate(getUrl);
  return result;
}

export async function addStudent({
  subjectId, sectionId, studentId,
}) {
  const result = await postTemplate(urls.ADD, { subjectId, sectionId, studentId });
  return result;
}

export async function removeStudent({
  subjectId, sectionId, studentId,
}) {
  const result = await deleteTemplate(urls.REMOVE, { subjectId, sectionId, studentId });
  return result;
}

export async function grade(data) {
  const result = await postTemplate(urls.grades.GRADE, data);
  return result;
}

export async function gradeAll(data) {
  const result = await postTemplate(urls.grades.GRADE_ALL, data);
  return result;
}
