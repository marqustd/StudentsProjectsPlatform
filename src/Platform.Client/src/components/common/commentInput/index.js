import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton } from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import './style.scss';

const CommentInput = ({ sender }) => {
  const [comment, setComment] = useState('');

  function handleSend() {
    sender(comment);
    setComment('');
  }

  function handleEnter(e) {
    const key = e.keyCode || e.which;
    if (key === 13) { handleSend(); }
  }


  return (
    <div className="comment-writer">
      <TextField
        onKeyUp={handleEnter}
        className="comment-input"
        variant="standard"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <IconButton color="primary" className="comment-send" onClick={handleSend}><SendOutlined /></IconButton>
    </div>
  );
};

CommentInput.propTypes = {
  sender: PropTypes.func.isRequired,
};

export default CommentInput;
