import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import PanelTitle from '../../../../../../common/panelTitle';
import ArtifactsPanel from '../../../../../../common/artifactsPanel';
import { API } from '../../../../../../../utility/helpers/config';

const ArtifactsSection = ({
  ids,
}) => {
  const addUrl = `${API}/api/teacher/subject/${ids.subjectId}/topic/${ids.topicId}/artifact`;
  const getUrl = `${API}/api/teacher/topic/artifacts?subjectId=${ids.subjectId}&topicId=${ids.topicId}`;

  function removeUrlGetter(id) {
    return `${API}/api/teacher/subject/${ids.subjectId}/topic/${ids.topicId}/artifact/${id}`;
  }


  return (
    <Paper className="panel">
      <PanelTitle title="Artifacts:" />
      <ArtifactsPanel
        linkGenerator={id => `${API}/api/teacher/topic/artifact?subjectId=${ids.subjectId}&topicId=${ids.topicId}&artifactId=${id}`}
        canAdd
        canDelete
        getUrl={getUrl}
        removeUrlGetter={removeUrlGetter}
        addUrl={addUrl}
      />
    </Paper>
  );
};

ArtifactsSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ArtifactsSection;
