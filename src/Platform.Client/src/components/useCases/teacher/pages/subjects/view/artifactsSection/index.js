import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../../common/panelTitle';
import ArtifactsPanel from '../../../../../../common/artifactsPanel';
import { API } from '../../../../../../../utility/helpers/config';

const ArtifactsSection = ({
  subjectId,
}) => {
  const addUrl = `${API}/api/teacher/subject/${subjectId}/artifact`;
  const getUrl = `${API}/api/teacher/subject/artifacts?subjectId=${subjectId}`;

  function removeUrlGetter(id) {
    return `${API}/api/teacher/subject/${subjectId}/artifact/${id}`;
  }

  return (
    <Paper className="panel">
      <PanelTitle title="Artifacts:" />
      <ArtifactsPanel
        linkGenerator={id => `${API}/api/teacher/subject/artifact?subjectId=${subjectId}&artifactId=${id}`}
        canAdd
        canDelete
        addUrl={addUrl}
        removeUrlGetter={removeUrlGetter}
        getUrl={getUrl}
      />
    </Paper>
  );
};

ArtifactsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
};

export default ArtifactsSection;
