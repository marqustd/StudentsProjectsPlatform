import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../common/panelTitle';
import Artifact from '../../../../../common/artifact';
import FileUploader from '../../../../../common/fileUploader';

const ArtifactSection = ({
  artifactName, artifactLink, upload,
}) => {
  const isValid = artifactName !== null && artifactLink !== null;

  return (
    <Paper className="panel">
      <PanelTitle title="Activity artifact" />
      {isValid
        ? (
          <>
            <Artifact name={artifactName} link={artifactLink} />
          </>
        )
        : <p>No artifact</p>}
      <div style={{ marginTop: '10px' }}>
        <FileUploader uploadAction={upload} />
      </div>
    </Paper>
  );
};

ArtifactSection.propTypes = {
  artifactName: PropTypes.string,
  artifactLink: PropTypes.string,
  upload: PropTypes.func.isRequired,
};


ArtifactSection.defaultProps = {
  artifactName: null,
  artifactLink: null,
};

export default ArtifactSection;
