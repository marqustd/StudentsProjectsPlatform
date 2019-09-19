import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ArtifactSection from './artifactSection';
import DiscussionSection from './discussionSection';
import { getRequest, uploadArtifactRequest } from '../../../../../store/student/activities/actions';
import LoadingPage from '../../../../pages/loading';
import DetailsSection from './detailsSection';
import { studentUrls } from '../../../../../utility/helpers/config';

const ActivityViewPage = ({
  match, get, upload, activity,
}) => {
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
    name,
    description,
    isChecked,
  } = activity;

  const artifactLink = studentUrls.activities.DOWNLOAD_GETTER(activityId);

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
            <DetailsSection
              activityDesc={description}
              activityName={name}
              isChecked={isChecked}
            />
            {includeArtifact && (
            <ArtifactSection
              upload={file => upload(activityId, file)}
              artifactName={artifactName}
              artifactLink={artifactLink}
            />
            )}
            <DiscussionSection ids={ids} />
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
  upload: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    activity: state.activities.activity,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    upload: uploadArtifactRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityViewPage));
