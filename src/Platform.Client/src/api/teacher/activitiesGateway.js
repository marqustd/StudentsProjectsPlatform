import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate,
} from '../methods';

const { activities: urls } = teacherUrls;

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

export async function removeActivity({ subjectId, topicId, activityId }) {
  return {
    succes: true,
    json: {
      code: 200,
      data: activityId,
    },
  };
}

export async function addActivity({
  subjectId, topicId, name, includeArtifact,
}) {
  return {
    succes: true,
    json: {
      code: 200,
      data: { activityId: 10, name: 'Obecnosc X', includeArtifact: false },
    },
  };
}
