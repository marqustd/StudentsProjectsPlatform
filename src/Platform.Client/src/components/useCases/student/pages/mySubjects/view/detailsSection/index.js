import React, { useRef, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Marked from 'marked';
import PanelTitle from '../../../../../../common/panelTitle';
import ArtifactsSection from '../artifactsSection';

const DetailsSection = ({
  subjectId, subjectName, teacherName, description,
}) => {
  const descriptionRef = useRef();

  useEffect(() => {
    descriptionRef.current.innerHTML = Marked(description);
  }, [description]);

  return (
    <Paper className="panel">
      <PanelTitle title={subjectName} />
      <Typography>{`Teacher: ${teacherName}`}</Typography>
      <div
        style={{
          margin: '20px 0',
          borderTop: '2px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
        }}
        className="subject-description"
        ref={descriptionRef}
      />
      <ArtifactsSection subjectId={subjectId} />
    </Paper>
  );
};

DetailsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  subjectName: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DetailsSection;
