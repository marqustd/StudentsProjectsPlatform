import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress,
} from '@material-ui/core';

const DialogHOC = ({
  onClose,
  isOpen,
  isLoading,
  title, description,
  cancelButtonText, confirmButtonText,
  cancelCallback, confirmCallback,
  children,
}) => (
  <>
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelCallback} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={confirmCallback} color="primary" autoFocus>
          {isLoading ? <CircularProgress /> : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

DialogHOC.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  cancelCallback: PropTypes.func.isRequired,
  confirmCallback: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DialogHOC;
