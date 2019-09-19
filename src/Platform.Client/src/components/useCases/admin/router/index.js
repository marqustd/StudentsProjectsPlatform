import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../../pages/notFound';
import NewUser from '../pages/users/new';
import FindUserPage from '../pages/users/manage/find';
import TeacherDetailsPage from '../pages/users/manage/details/teacher';
import StudentDetailsPage from '../pages/users/manage/details/student';
import AdminDetailsPage from '../pages/users/manage/details/admin';
import MajorsPage from '../pages/majors/manage/find';
import MajorDetailsPage from '../pages/majors/manage/details';
import SubjectsPage from '../pages/subjects/manage/find';
import SubjectDetailsPage from '../pages/subjects/manage/details';

const AdminRouter = () => (
  <Switch>
    <Redirect from="/auth" to="/manage/users" /> {/* Handle auth redirect */}
    <Redirect exact from="/" to="/manage/users" />
    <Redirect exact from="/home" to="/manage/users" />
    <Route exact path="/manage/users" component={FindUserPage} />
    <Route exact path="/manage/users/new" component={NewUser} />
    <Route exact path="/manage/users/teacher/:id" component={TeacherDetailsPage} />
    <Route exact path="/manage/users/student/:id" component={StudentDetailsPage} />
    <Route exact path="/manage/users/admin/:id" component={AdminDetailsPage} />
    <Route exact path="/manage/majors" component={MajorsPage} />
    <Route exact path="/manage/majors/:id" component={MajorDetailsPage} />
    <Route exact path="/manage/subjects" component={SubjectsPage} />
    <Route exact path="/manage/subjects/:id" component={SubjectDetailsPage} />
    <Route exact path="/not_found" component={NotFound} />
    <Redirect from="/" to="/not_found" />
  </Switch>
);

AdminRouter.propTypes = {

};

export default AdminRouter;
