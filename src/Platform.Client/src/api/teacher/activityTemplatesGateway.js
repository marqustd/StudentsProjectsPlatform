import { teacherUrls } from '../../utility/helpers/config';
import {
  getTemplate, postTemplate, patchTemplate, deleteTemplate,
} from '../methods';

const { activityTemplates: urls } = teacherUrls;

export async function getActivity({ subjectId, activityId }) {
  const getUrl = `${urls.GET}?subjectId=${subjectId}&activityId=${activityId}`;
  const result = await getTemplate(getUrl);
  return result;
}

export async function getAllActivities({ subjectId, topicId }) {
  const getUrl = `${urls.GET_ALL}?subjectId=${subjectId}&topicId=${topicId}`;
  const result = await getTemplate(getUrl);
  return result;
}

export async function obsoleteActivity({ subjectId, topicId, activityId }) {
  const patchUrl = urls.OBSOLETE;
  const result = await patchTemplate(patchUrl, { subjectId, topicId, activityId });
  return result;
}

export async function reopenActivity({ subjectId, topicId, activityId }) {
  const patchUrl = urls.RESTORE;
  const result = await patchTemplate(patchUrl, { subjectId, topicId, activityId });
  return result;
}

export async function deleteActivity({ subjectId, topicId, activityId }) {
  const patchUrl = urls.DELETE;
  const result = await deleteTemplate(patchUrl, { subjectId, topicId, activityId });
  return result;
}

export async function editActivity({
  subjectId, activityId, name, description, includeArtifact,
}) {
  const patchUrl = urls.EDIT;
  const result = await patchTemplate(patchUrl, {
    subjectId, activityId, name, description, includeArtifact,
  });
  return result;
}

export async function addActivity({
  subjectId, topicId, name, includeArtifact,
}) {
  const postUrl = urls.ADD;
  const result = await postTemplate(postUrl, {
    subjectId, topicId, name, includeArtifact,
  });
  return result;
}
