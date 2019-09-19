import React from 'react';
import PropTypes from 'prop-types';
import { CloudDownloadOutlined } from '@material-ui/icons';
import { IconButton, FormControlLabel } from '@material-ui/core';
import { API } from '../../../utility/helpers/config';
import './style.scss';

const Artifact = ({ name, link }) => {
  const button = (
    <IconButton type="submit">
      <CloudDownloadOutlined />
    </IconButton>
  );

  return (
    <a href={`${link}`} className="artifact">
      <FormControlLabel control={button} label={name} />
    </a>
  );
};


Artifact.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
export default Artifact;
