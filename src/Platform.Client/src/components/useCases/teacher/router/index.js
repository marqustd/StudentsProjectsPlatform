import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../../pages/notFound';
import SettingsPage from '../../../pages/settings';
import SubjectSearchPage from '../pages/subjects/search';
import SubjectViewPage from '../pages/subjects/view';
import SemesterViewPage from '../pages/semesters/view';
import TopicViewPage from '../pages/topics/view';
import TopicActivityViewPage from '../pages/activities/topic/view';
import SectionActivityViewPage from '../pages/activities/section/view';
import SectionViewPage from '../pages/sections/view';

const ManagerRouter = () => (
  <Switch>
    <Redirect from="/auth" to="/subjects" /> {/* Handle auth redirect */}
    <Redirect exact from="/" to="/subjects" />
    <Redirect exact from="/home" to="/subjects" />
    <Route exact path="/subjects" component={SubjectSearchPage} />
    <Route exact path="/subjects/:subjectId" component={SubjectViewPage} />
    <Route exact path="/subjects/:subjectId/topics/:topicId" component={TopicViewPage} />
    <Route exact path="/subjects/:subjectId/topics/:topicId/activities/:activityId" component={TopicActivityViewPage} />
    <Route exact path="/subjects/:subjectId/semesters/:semesterId" component={SemesterViewPage} />
    <Route exact path="/subjects/:subjectId/semesters/:semesterId/sections/:sectionId" component={SectionViewPage} />
    <Route exact path="/subjects/:subjectId/semesters/:semesterId/sections/:sectionId/activities/:activityId" component={SectionActivityViewPage} />
    <Route exact path="/settings" component={SettingsPage} />
    <Route exact path="/not_found" component={NotFound} />
    <Redirect from="/" to="/not_found" />
  </Switch>
);

ManagerRouter.propTypes = {

};

export default ManagerRouter;
