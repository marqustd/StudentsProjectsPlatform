import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import DialogHOC from '../dialogHOC';
import './style.scss';

const FileUploader = ({ buttonProps, buttonContent, uploadAction }) => {
  const [file, setFile] = useState(null);
  const inputRef = React.createRef();
  const [open, setOpen] = useState(false);

  function handleFile(e) {
    console.log('file:', e.target.file);
    console.log('files:', e.target.files);
    setFile(e.target.files[0]);
  }
  function handleClose() {
    setFile(null);
    setOpen(false);
  }

  function formatSize(size) {
    if (size > 1000000) { return `${(size / 1048576).toFixed(2)}MB`; }
    if (size > 100) { return `${(size / 1024).toFixed(2)}kB`; }
    return `${size}B`;
  }

  function uploadFile() {
    if (file !== null || file !== undefined) {
      uploadAction(file);
    }
    handleClose();
  }

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpen(true)}>
        {buttonContent}
      </Button>
      <DialogHOC
        isLoading={false}
        isOpen={open}
        onClose={handleClose}
        cancelButtonText="cancel"
        confirmButtonText="upload"
        cancelCallback={handleClose}
        confirmCallback={uploadFile}
        title="Upload file"
        description=""
      >
        <div className="file-uploader">
          <Typography>{(file !== null) ? `Name: ${file.name}` : ''}</Typography>
          <Typography>{(file !== null) ? `Size: ${formatSize(file.size)}` : ''}</Typography>
          <input style={{ display: 'none' }} onChange={handleFile} type="file" ref={inputRef} />
          <Button
            variant="outlined"
            color="primary"
            className="upload-button"
            onClick={() => inputRef.current.click()}
          >Choose file
          </Button>
        </div>
      </DialogHOC>
    </>
  );
};

FileUploader.propTypes = {
  uploadAction: PropTypes.func.isRequired,
  buttonProps: PropTypes.objectOf(PropTypes.any),
  buttonContent: PropTypes.objectOf(PropTypes.any),
};

FileUploader.defaultProps = {
  buttonProps: { variant: 'contained', color: 'primary' },
  buttonContent: 'Upload file',
};

export default FileUploader;
