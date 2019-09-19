import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import './style.scss';

const Comment = ({ author, date, content }) => (
  <Card className="comment">
    <header className="comment-header">
      <Typography className="comment-content" variant="subtitle2">
        {`${author}${'   '}${date}`}
      </Typography>
    </header>
    <Typography className="comment-content" variant="subtitle1">
      {content}
    </Typography>
  </Card>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Comment;
