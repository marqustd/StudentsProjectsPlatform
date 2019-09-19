import React from 'react';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../../common/panelTitle';
import ArtifactsPanel from '../../../../../../common/artifactsPanel';
import { API } from '../../../../../../../utility/helpers/config';

const ArtifactsSection = ({
  subjectId, sectionId,
}) => {
  const getUrl = `${API}/api/student/topic/artifacts?subjectId=${subjectId}&sectionId=${sectionId}`;

  function linkGenerator(id) {
    return `${API}/api/student/topic/artifact?subjectId=${subjectId}&sectionId=${sectionId}&artifactId=${id}`;
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
  sectionId: PropTypes.number.isRequired,
};

export default ArtifactsSection;
