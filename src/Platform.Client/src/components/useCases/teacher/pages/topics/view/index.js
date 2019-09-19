import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsSection from './detailsSection';
import DescriptionSection from './descriptionSection';
import ArtifactsSection from './artifactsSection';
import ActivitiesSection from './activitiesSection';
import {
  getRequest, editRequest, obsoleteRequest, restoreRequest,
} from '../../../../../../store/teacher/topics/actions';

const TopicViewPage = ({
  match, topic, get, edit, obsolete, restore,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const subjectId = Number.parseInt(match.params.subjectId);
  const topicId = Number.parseInt(match.params.topicId);
  const {
    topicId: id,
    name: newName,
    description: newDescription,
    obsolete: isObsolete,
  } = topic;

  useEffect(() => {
    get(subjectId, topicId);
  }, []);

  useEffect(() => {
    if (id === topicId) {
      setName(newName);
      setDescription(newDescription);
      setIsLoaded(true);
    }
  }, [topic]);

  function handleNameEdit(param) {
    edit(subjectId, topicId, param, description);
  }

  function handleDescEdit(param) {
    edit(subjectId, topicId, name, param);
  }

  return (
    <section className="page">
      {isLoaded && (
      <>
        <DetailsSection
          name={name}
          isObsolete={isObsolete}
          edit={handleNameEdit}
          obsolete={() => obsolete(subjectId, topicId)}
          restore={() => restore(subjectId, topicId)}
        />
        <DescriptionSection description={description} edit={handleDescEdit} />
        <ArtifactsSection ids={{ subjectId, topicId }} />
        <ActivitiesSection ids={{ subjectId, topicId }} />
      </>
      )}
    </section>
  );
};

TopicViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  topic: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  obsolete: PropTypes.func.isRequired,
  restore: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    topic: state.topics.topic,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    edit: editRequest,
    obsolete: obsoleteRequest,
    restore: restoreRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicViewPage));
