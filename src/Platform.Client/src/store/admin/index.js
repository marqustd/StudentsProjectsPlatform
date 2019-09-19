import { all } from 'redux-saga/effects';
import usersReducer from './users/reducer';
import usersSaga from './users/saga';
import majorsSaga from './majors/saga';
import majorsReducer from './majors/reducer';
import subjectsSaga from './subjects/saga';
import subjectsReducer from './subjects/reducer';
import { updateReducer, updateSaga } from '../root';

function* adminSaga() {
  yield all([
    usersSaga(),
    majorsSaga(),
    subjectsSaga()]);
}

const adminReducer = {
  users: usersReducer,
  majorState: majorsReducer,
  subjectState: subjectsReducer,
};

export function updateReduxSaga() {
  updateSaga(adminSaga);
  updateReducer(adminReducer);
}
