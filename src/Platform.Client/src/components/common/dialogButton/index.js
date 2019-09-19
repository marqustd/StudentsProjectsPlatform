import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  DialogTitle, Button,
  Dialog, DialogContent,
  DialogContentText, DialogActions,
  CircularProgress, IconButton,
} from '@material-ui/core';

const DialogButton = ({
  buttonClass,
  icon,
  buttonText, okText, cancelText, dialogDescription, dialogTitle,
  onOk, isLoading, theme,
}) => {
  const [open, setOpen] = useState(false);

  function handleOk() {
    setOpen(false);
    onOk();
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickOpen() {
    setOpen(true);
  }

  const button = (icon !== null) ? (
    <IconButton
      className={buttonClass}
      disabled={isLoading}
      onClick={handleClickOpen}
    >
      {icon}
    </IconButton>
  )
    : (
      <Button
        className={buttonClass}
        disabled={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        {!isLoading ? buttonText : <CircularProgress color="primary" size={30} thickness={5} />}
      </Button>
    );

  return (
    <>
      {theme !== null
        ? (
          <MuiThemeProvider theme={theme}>
            {button}
          </MuiThemeProvider>
        )
        : button }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText}
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DialogButton.propTypes = {
  buttonClass: PropTypes.string,
  onOk: PropTypes.func,
  isLoading: PropTypes.bool,
  theme: PropTypes.objectOf(PropTypes.any),
  buttonText: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  dialogDescription: PropTypes.string,
  dialogTitle: PropTypes.string,
  icon: PropTypes.node,
};

DialogButton.defaultProps = {
  onOk: () => {},
  buttonClass: '',
  isLoading: false,
  buttonText: '',
  okText: 'Ok',
  cancelText: 'Cancel',
  dialogDescription: 'Are you sure?',
  dialogTitle: '',
  icon: null,
  theme: null,
};

export default DialogButton;
