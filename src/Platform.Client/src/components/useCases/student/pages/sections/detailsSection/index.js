import React, { useRef, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import Marked from 'marked';
import PanelTitle from '../../../../../common/panelTitle';
import ArtifactsSection from './artifactsSection';

const DetailsSection = ({
  subjectId, sectionId, topicName, topicDescription,
}) => {
  const descriptionRef = useRef();

  useEffect(() => {
    descriptionRef.current.innerHTML = Marked(topicDescription);
  }, [topicDescription]);

  return (
    <Paper className="panel">
      <PanelTitle title={`Topic: ${topicName}`} />
      <div
        style={{
          margin: '20px 0',
          borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
        }}
        className="topic-description"
        ref={descriptionRef}
      />
      <ArtifactsSection
        subjectId={subjectId}
        sectionId={sectionId}
      />
    </Paper>
  );
};

DetailsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  sectionId: PropTypes.number.isRequired,
  topicName: PropTypes.string.isRequired,
  topicDescription: PropTypes.string.isRequired,
};

export default DetailsSection;
