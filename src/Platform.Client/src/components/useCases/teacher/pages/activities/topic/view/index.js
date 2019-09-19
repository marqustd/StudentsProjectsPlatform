import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MainSection from './mainSection';
import DescriptionSection from './descriptionSection';
import {
  getRequest, editRequest,
  obsoleteRequest, reopenRequest, deleteRequest,
} from '../../../../../../../store/teacher/activityTemplates/actions';
import LoadingPage from '../../../../../../pages/loading';

const ActivityViewPage = ({
  match, history, get, edit, activity,
  removeTemplate, obsoleteTemplate, reopenTemplate,
}) => {
  const [loaded, setLoaded] = useState(false);
  const subjectId = Number.parseInt(match.params.subjectId);
  const topicId = Number.parseInt(match.params.topicId);
  const activityId = Number.parseInt(match.params.activityId);
  const {
    activityId: id, name, description, includeArtifact, obsolete,
  } = activity;

  function handleEditMain(nameParam, includeParam) {
    edit(subjectId, activityId,
      nameParam, description, includeParam);
  }

  function handleEditDesc(descParam) {
    edit(subjectId, activityId,
      name, descParam, includeArtifact);
  }

  useEffect(() => {
    if (id === activityId) { setLoaded(true); }
  }, [activity]);

  useEffect(() => {
    get(subjectId, activityId);
  }, []);

  return (
    <section className="page">
      {loaded ? (
        <>
          <MainSection
            name={name}
            isObsolete={obsolete}
            includeArtifact={includeArtifact}
            edit={handleEditMain}
            remove={() => {
              history.push(`/subjects/${subjectId}/topics/${topicId}`);
              removeTemplate(subjectId, topicId, activityId);
            }}
            reopen={() => reopenTemplate(subjectId, topicId, activityId)}
            obsolete={() => obsoleteTemplate(subjectId, topicId, activityId)}
          />
          <DescriptionSection
            description={description}
            edit={handleEditDesc}
          />
        </>
      ) : <LoadingPage />}
    </section>
  );
};

ActivityViewPage.propTypes = {
  get: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  activity: PropTypes.objectOf(PropTypes.any).isRequired,
  removeTemplate: PropTypes.func.isRequired,
  obsoleteTemplate: PropTypes.func.isRequired,
  reopenTemplate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    activity: state.activityTemplates.activity,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    edit: editRequest,
    removeTemplate: deleteRequest,
    obsoleteTemplate: obsoleteRequest,
    reopenTemplate: reopenRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityViewPage));
