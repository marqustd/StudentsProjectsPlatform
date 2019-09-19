import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../../../common/panelTitle';
import Artifact from '../../../../../../../common/artifact';

const ArtifactSection = ({
  artifactName, artifactLink,
}) => {
  const isValid = artifactName !== null && artifactLink !== null;

  return (
    <Paper className="panel">
      <PanelTitle title="Artifact:" />
      {isValid
        ? (
          <>
            <Artifact name={artifactName} link={artifactLink} />
          </>
        )
        : <p>Empty</p>}
    </Paper>
  );
};

ArtifactSection.propTypes = {
  artifactName: PropTypes.string,
  artifactLink: PropTypes.string,
};

ArtifactSection.defaultProps = {
  artifactName: null,
  artifactLink: null,
};
export default ArtifactSection;
