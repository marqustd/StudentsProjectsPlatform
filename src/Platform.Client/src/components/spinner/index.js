import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './style.scss';

const Spinner = ({ isLoading }) => (
  <span id="loading-spinner">
    { isLoading && <CircularProgress size={30} thickness={5} />}
  </span>
);

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading,
  };
}


export default connect(mapStateToProps)(Spinner);
