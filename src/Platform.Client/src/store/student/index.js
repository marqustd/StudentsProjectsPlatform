import { all } from 'redux-saga/effects';
import { updateReducer, updateSaga } from '../root';

import subjectsReducer from './subjects/reducer';
import subjectsSaga from './subjects/saga';

import mySubjectsReducer from './mySubjects/reducer';
import mySubjectsSaga from './mySubjects/saga';

import sectionsReducer from './sections/reducer';
import sectionsSaga from './sections/saga';

import activitiesSaga from './activities/saga';
import activitiesReducer from './activities/reducer';

function* studentSaga() {
  yield all([
    subjectsSaga(),
    mySubjectsSaga(),
    sectionsSaga(),
    activitiesSaga(),
  ]);
}

const studentReducer = {
  subjects: subjectsReducer,
  mySubjects: mySubjectsReducer,
  sections: sectionsReducer,
  activities: activitiesReducer,
};

export function updateReduxSaga() {
  console.log('UPDATING MIDDLEWARE');
  updateSaga(studentSaga);
  updateReducer(studentReducer);
}
