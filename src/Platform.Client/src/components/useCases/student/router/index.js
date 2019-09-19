import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../../pages/notFound';
import SubjectsPage from '../pages/subjects/search';
import MySubjectsPage from '../pages/mySubjects/search';
import SubjectDetailsPage from '../pages/mySubjects/view';
import SectionPage from '../pages/sections';
import ActivityViewPage from '../pages/activity';

const StudentRouter = () => (
  <Switch>
    <Redirect from="/auth" to="/subjects" /> {/* Handle auth redirect */}
    <Redirect exact from="/" to="/subjects" />
    <Redirect exact from="/home" to="/subjects" />
    <Route exact path="/subjects" component={SubjectsPage} />
    <Route exact path="/mysubjects/" component={MySubjectsPage} />
    <Route exact path="/mysubjects/:subjectId" component={SubjectDetailsPage} />
    <Route exact path="/mysubjects/:subjectId/sections/:sectionId" component={SectionPage} />
    <Route exact path="/mysubjects/:subjectId/sections/:sectionId/activities/:activityId" component={ActivityViewPage} />
    <Route exact path="/not_found" component={NotFound} />
    <Redirect from="/" to="/not_found" />
  </Switch>
);

StudentRouter.propTypes = {

};

export default StudentRouter;
