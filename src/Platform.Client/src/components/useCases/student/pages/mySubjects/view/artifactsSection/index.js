import React from 'react';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../../common/panelTitle';
import ArtifactsPanel from '../../../../../../common/artifactsPanel';
import { API } from '../../../../../../../utility/helpers/config';

const ArtifactsSection = ({
  subjectId,
}) => {
  const getUrl = `${API}/api/student/subject/artifacts?subjectId=${subjectId}`;

  function linkGenerator(id) {
    return `${API}/api/student/subject/artifact?subjectId=${subjectId}&artifactId=${id}`;
  }

  return (
    <>
      <PanelTitle title="Artifacts:" />
      <ArtifactsPanel
        linkGenerator={linkGenerator}
        getUrl={getUrl}
      />
    </>
  );
};

ArtifactsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
};

export default ArtifactsSection;
