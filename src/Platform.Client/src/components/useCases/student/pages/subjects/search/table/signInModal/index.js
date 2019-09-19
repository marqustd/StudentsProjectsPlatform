import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, TextField,
} from '@material-ui/core';
import DialogHOC from '../../../../../../../common/dialogHOC';
import './style.scss';

const SignInModal = ({ signIn, subjectName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSignIn() {
    setIsLoading(true);
    signIn(password);
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 500);
  }

  function handleCancel() {
    handleClose();
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Button onClick={handleOpen}>Sign in</Button>
      <DialogHOC
        isOpen={isOpen}
        // isLoading={isLoading}
        onClose={handleClose}
        cancelButtonText="Cancel"
        confirmButtonText="Sign in"
        title="Sign in to subject"
        description={subjectName}
        confirmCallback={handleSignIn}
        cancelCallback={handleCancel}
        isLoading={isLoading}
      >
        <TextField
          disabled={isLoading}
          className="subject-password"
          onChange={handlePassword}
          placeholder="password"
          type="password"
          value={password}
          fullWidth
        />
      </DialogHOC>
    </>
  );
};

SignInModal.propTypes = {
  signIn: PropTypes.func.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default SignInModal;
