import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './App.scss';
import Router from './components/layout/index';
import AdditionalSnackbarEvents from './components/additionalSnackbarEvents/index';
import { refreshTokenManualRequest } from './store/common/auth/actions';
import { loadStorage, KEYS } from './utility/helpers/storageManager';
import LoadingPage from './components/pages/loading';
import AuthorizationPage from './components/pages/auth/index';
import { resetMiddleware } from './store/root';

const teacherMiddlewareUpdate = () => import(/* webpackChunkName: "teacher-middleware" */ './store/teacher');
const studentMiddlewareUpdate = () => import(/* webpackChunkName: "student-middleware" */ './store/student');
const adminMiddlewareUpdate = () => import(/* webpackChunkName: "admin-middleware" */ './store/admin');

const AdminNaviList = () => import(/* webpackChunkName: "admin-navigation" */ './components/useCases/admin/navigation');
const StudentNavigationList = () => import(/* webpackChunkName: "student-navigation" */ './components/useCases/student/navigation');
const TeacherNaviList = () => import(/* webpackChunkName: "teacher-navigation" */ './components/useCases/teacher/navigation');

const AdminRouter = () => import(/* webpackChunkName: "admin-route" */ './components/useCases/admin/router');
const StudentRouter = () => import(/* webpackChunkName: "student-route" */ './components/useCases/student/router');
const TeacherRouter = () => import(/* webpackChunkName: "teacher-route" */ './components/useCases/teacher/router');


const App = ({ auth, app, refreshAuth }) => {
  const [roleInUse, setRoleInUse] = useState('');
  const [routes, setRoutes] = useState(<LoadingPage />);
  const [navigation, setNavigation] = useState(<LoadingPage />);

  const isAppReady = app.roleReady && auth.isAuth;
  const isValidated = auth.isAuth && auth.accessToken && auth.accessToken !== '';
  const needsRefresh = auth.isAuth && (!auth.accessToken || auth.accessToken === '');
  const needsAuthorization = !auth.isAuth;

  function updateRoutes() {
    switch ((auth.role || '').toUpperCase()) {
      case 'STUDENT':
        StudentRouter().then(component => setRoutes(component.default));
        break;

      case 'ADMIN':
        AdminRouter().then(component => setRoutes(component.default));
        break;

      case 'TEACHER':
        TeacherRouter().then(component => setRoutes(component.default));
        break;

      default:
        setRoutes(<LoadingPage />);
        break;
    }
  }

  function updateNavigationList() {
    switch ((auth.role || '').toUpperCase()) {
      case 'STUDENT':
        StudentNavigationList().then(component => setNavigation(component.default));
        break;

      case 'ADMIN':
        AdminNaviList().then(component => setNavigation(component.default));
        break;

      case 'TEACHER':
        TeacherNaviList().then(component => setNavigation(component.default));
        break;

      default:
        setRoutes(<LoadingPage />);
        break;
    }
  }

  function updateMiddlewares(newRole) {
    if ((newRole || '').toUpperCase() === (roleInUse || '').toUpperCase()) { return; }
    setRoleInUse(newRole);
    switch ((newRole || '').toUpperCase()) {
      case 'STUDENT':
        studentMiddlewareUpdate().then(mod => mod.updateReduxSaga());
        break;

      case 'ADMIN':
        adminMiddlewareUpdate().then(mod => mod.updateReduxSaga());
        break;

      case 'TEACHER':
        teacherMiddlewareUpdate().then(mod => mod.updateReduxSaga());
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (auth.isAuth) {
      const token = loadStorage(KEYS.refreshToken);
      if (token) {
        refreshAuth(token);
      }
    }
  }, [auth.isAuth]);

  function update() {
    updateMiddlewares(auth.role);
    updateRoutes();
    updateNavigationList();
  }


  useEffect(() => {
    if (auth.isAuth) {
      update();
    } else {
      resetMiddleware();
      setRoleInUse('');
      setRoutes(<LoadingPage />);
      setNavigation(<LoadingPage />);
    }
  }, [auth.role, auth.isAuth]);

  function getRouter() {
    if (isValidated && isAppReady) {
      return <Router routes={routes} navigationList={navigation} />;
    }
    if (needsRefresh) {
      return <LoadingPage />;
    }
    if (needsAuthorization) {
      return (
        <Switch>
          <Route exact path="/auth" component={AuthorizationPage} />
          <Redirect to="/auth" />
        </Switch>
      );
    }
    return <LoadingPage />;
  }

  const routerComponent = getRouter();
  return (
    <div className="app">
      <BrowserRouter>
        {routerComponent}
      </BrowserRouter>
      <AdditionalSnackbarEvents />
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  refreshAuth: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshAuth: refreshTokenManualRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
