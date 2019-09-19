import { teacherUrls } from '../../utility/helpers/config';
import {
  postTemplate, getTemplate,
} from '../methods';

const { checks: urls } = teacherUrls.activities;

export async function getAllStudents({
  subjectId, activityId, index, count,
}) {
  const getUrl = `${urls.FETCH}
?subjectId=${subjectId}
&activityId=${activityId}
&index=${index}
&count${count}`;

  const result = await getTemplate(getUrl);
  return result;
}

export async function checkStudent(data) {
  const result = await postTemplate(urls.CHECK, data);
  return result;
}

export async function checkAllStudents(data) {
  const result = await postTemplate(urls.CHECK_ALL, data);
  return result;
}
