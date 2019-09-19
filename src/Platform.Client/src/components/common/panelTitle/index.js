import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Typography from '@material-ui/core/Typography';

const PanelTitle = ({ title }) => (
  <Typography variant="h4" className="panel-title">
    {title}
  </Typography>
);

PanelTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PanelTitle;
