import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const CommentsContainer = ({ children, maxHeight, maxWidth }) => (
  <div className="comments-container" style={{ maxHeight, maxWidth }}>
    {children}
  </div>
);

CommentsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
};

CommentsContainer.defaultProps = {
  maxHeight: '700px',
  maxWidth: '1000px',
};

export default CommentsContainer;
