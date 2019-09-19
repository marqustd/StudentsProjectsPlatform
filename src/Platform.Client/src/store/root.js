import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer, appReducerWithRole } from './common/app/reducer';

import eventSaga from './common/events/saga';
import eventReducer from './common/events/reducer';

import authReducer from './common/auth/reducer';
import authSaga from './common/auth/saga';

import temporaryReducer from './common/temporary/reducer';
import temporarySaga from './common/temporary/saga';

import templateReducer from './common/template/reducer';
import templateSaga from './common/template/saga';

function* commonSaga() {
  yield all([
    authSaga(),
    eventSaga(),
    templateSaga(),
    temporarySaga()]);
}

function* rootSaga() {
  yield all([
    commonSaga(),
  ]);
}
const rootCommonWithRole = {
  auth: authReducer,
  app: appReducerWithRole,
  events: eventReducer,
  template: templateReducer,
  temporary: temporaryReducer,
};

const rootCommon = {
  auth: authReducer,
  app: appReducer,
  events: eventReducer,
  template: templateReducer,
  temporary: temporaryReducer,
};

const rootReducer = combineReducers({
  ...rootCommon,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);
let sagaProcess = sagaMiddleware.run(rootSaga);


export function resetMiddleware() {
  store.replaceReducer(combineReducers({ ...rootCommon }));
  sagaProcess.cancel();
  sagaProcess = sagaMiddleware.run(rootSaga);
}

export function updateReducer(nextReducer) {
  store.replaceReducer(combineReducers({
    ...rootCommonWithRole,
    ...nextReducer,
  }));
}

export function updateSaga(newSaga) {
  sagaProcess.cancel();
  sagaProcess = sagaMiddleware.run(function* saga() {
    yield all([
      commonSaga(),
      newSaga(),
    ]);
  });
}

export default store;
