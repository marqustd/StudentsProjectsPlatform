import { all } from 'redux-saga/effects';
import { updateReducer, updateSaga } from '../root';
import subjectsSaga from './subjects/saga';
import subjectsReducer from './subjects/reducer';

import topicsSaga from './topics/saga';
import topicsReducer from './topics/reducer';

import semestersSaga from './semesters/saga';
import semestersReducer from './semesters/reducer';

import teachersSaga from './teachers/saga';
import teachersReducer from './teachers/reducer';

import activityTemplatesSaga from './activityTemplates/saga';
import activityTemplatesReducer from './activityTemplates/reducer';

import activitiesSaga from './activities/saga';
import activitiesReducer from './activities/reducer';

import sectionsSaga from './sections/saga';
import sectionsReducer from './sections/reducer';

import studentsSaga from './students/saga';
import studentsReducer from './students/reducer';

import checksSaga from './checks/saga';
import checksReducer from './checks/reducer';


function* teacherSaga() {
  yield all([
    subjectsSaga(),
    topicsSaga(),
    semestersSaga(),
    teachersSaga(),
    activityTemplatesSaga(),
    activitiesSaga(),
    sectionsSaga(),
    studentsSaga(),
    checksSaga(),
  ]);
}

const teacherReducer = {
  subjects: subjectsReducer,
  semesters: semestersReducer,
  topics: topicsReducer,
  teachers: teachersReducer,
  activityTemplates: activityTemplatesReducer,
  activities: activitiesReducer,
  sections: sectionsReducer,
  students: studentsReducer,
  checks: checksReducer,
};

export function updateReduxSaga() {
  updateSaga(teacherSaga);
  updateReducer(teacherReducer);
}
