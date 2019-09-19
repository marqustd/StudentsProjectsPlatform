import React, { useState } from 'react';
import {
  TextField, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import DialogHOC from '../../../../../../../common/dialogHOC';

const AddTopicModalButton = ({ add }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // eslint-disable-line

  function handleAdd() {
    add(name);
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {'Add topic'}
        <AddOutlined />
      </Button>
      <DialogHOC
        onClose={() => setOpen(false)}
        isLoading={loading}
        isOpen={open}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
        title="Add new topic"
        description=""
        confirmCallback={handleAdd}
        cancelCallback={handleCancel}
      >
        <TextField
          style={{ marginTop: '5px' }}
          label="Topic name"
          value={name}
          fullWidth
          onChange={e => setName(e.target.value)}
        />
      </DialogHOC>
    </>
  );
};

AddTopicModalButton.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddTopicModalButton;
