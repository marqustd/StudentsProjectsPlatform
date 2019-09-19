import React, { useState, useEffect } from 'react';
import {
  Typography, IconButton, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@material-ui/icons';
import './style.scss';

const EditableField = ({ name, changeName }) => {
  const [editedName, setEditedName] = useState(name);
  const [edit, setEdit] = useState(false);

  useEffect(() => { setEditedName(name); }, [name]);

  function handleReset() {
    setEditedName(name);
    setEdit(false);
  }

  function handleSave() {
    changeName(editedName);
    setEdit(false);
  }

  return (
    edit
      ? (
        <div className="edit-input">
          <TextField
            style={{ flex: 'auto' }}
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
          />
          <IconButton onClick={handleSave}><CheckOutlined /></IconButton>
          <IconButton onClick={handleReset}><CloseOutlined /></IconButton>
        </div>
      )
      : (
        <Typography variant="h6" style={{ display: 'flex' }}>
          <span style={{ flex: 'auto', alignSelf: 'center' }}>{name}</span>
          <IconButton onClick={() => setEdit(true)}>
            <EditOutlined />
          </IconButton>
        </Typography>
      )
  );
};

EditableField.propTypes = {
  name: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
};

export default EditableField;
