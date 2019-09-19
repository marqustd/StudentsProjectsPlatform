import React, { useRef, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Marked from 'marked';
import PanelTitle from '../../../../../common/panelTitle';

const DetailsSection = ({
  activityName, activityDesc, isChecked,
}) => {
  const descriptionRef = useRef();

  useEffect(() => {
    descriptionRef.current.innerHTML = Marked(activityDesc);
  }, [activityDesc]);

  return (
    <Paper className="panel">
      <PanelTitle title={`Activity: ${activityName}`} />
      <Typography variant="headline">{`Is checked? ${isChecked ? '✅' : '❌'}`}</Typography>
      <div
        style={{
          margin: '20px 0',
          borderTop: '2px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
        }}
        ref={descriptionRef}
      />
    </Paper>
  );
};

DetailsSection.propTypes = {
  activityName: PropTypes.string.isRequired,
  activityDesc: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default DetailsSection;
