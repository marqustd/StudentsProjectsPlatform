import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CheckedSection from './checkedSection';
import ArtifactSection from './artifactSection';
import DiscussionSection from './discussionSection';
import { getRequest } from '../../../../../../../store/teacher/activities/actions';
import LoadingPage from '../../../../../../pages/loading';
import { teacherUrls } from '../../../../../../../utility/helpers/config';

const ActivityViewPage = ({ match, get, activity }) => {
  const [loaded, setLoaded] = useState(false);
  const subjectId = Number.parseInt(match.params.subjectId);
  const semesterId = Number.parseInt(match.params.semesterId);
  const sectionId = Number.parseInt(match.params.sectionId);
  const activityId = Number.parseInt(match.params.activityId);
  const ids = {
    subjectId, semesterId, sectionId, activityId,
  };
  const {
    activityId: id,
    includeArtifact,
    artifactName,
  } = activity;
  const hasArtifact = includeArtifact;
  const artifactLink = teacherUrls.activities.DOWNLOAD_GETTER(activityId);

  useEffect(() => {
    get(subjectId, activityId);
  }, []);

  useEffect(() => {
    if (id === activityId && !loaded) {
      setLoaded(true);
    }
  });

  return (
    <section className="page">
      {loaded
        ? (
          <>
            {hasArtifact && (
            <ArtifactSection
              artifactLink={artifactLink}
              artifactName={artifactName}
            />
            )}
            <DiscussionSection ids={ids} />
            <CheckedSection ids={ids} />
          </>
        )
        : <LoadingPage />}
    </section>
  );
};

ActivityViewPage.propTypes = {
  activity: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    activity: state.activities.activity,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityViewPage));
