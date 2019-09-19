import { studentUrls } from '../../utility/helpers/config';
import {
  getTemplate, uploadTemplate,
} from '../methods';

const { activities: urls } = studentUrls;

export async function uploadActivity({ activityId, file }) {
  const url = urls.UPLOAD_GETTER(activityId);
  const result = await uploadTemplate(url, file);
  return result;
}

export async function getActivity({ subjectId, activityId }) {
  const getUrl = `${urls.GET}?subjectId=${subjectId}&activityId=${activityId}`;
  const result = await getTemplate(getUrl);
  return result;
}

export async function getAllActivities({ subjectId, sectionId }) {
  const getUrl = `${urls.GET_ALL}?subjectId=${subjectId}&sectionId=${sectionId}`;
  const result = await getTemplate(getUrl);
  return result;
}
