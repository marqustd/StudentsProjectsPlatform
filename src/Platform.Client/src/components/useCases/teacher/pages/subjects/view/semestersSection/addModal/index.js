import React, { useState } from 'react';
import {
  TextField, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import DialogHOC from '../../../../../../../common/dialogHOC';
import SmartSelect from '../../../../../../../common/smartSelect';
import { adminUrls } from '../../../../../../../../utility/helpers/config';

const AddSemesterModalButton = ({ add }) => {
  const [password, setPassword] = useState('');
  const [majorId, setMajorId] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // eslint-disable-line

  function handleAdd() {
    if (majorId !== 0) {
      add(majorId, password);
      setOpen(false);
    }
  }

  function handleRequest(search) {
    let url = `${adminUrls.majors.GET_ALL_MAJORS}?count=5`;
    if (search) { url += `&search=${search}`; }
    return url;
  }

  function handleSmartSelectCallback(data) {
    setMajorId(data.id);
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
        {'Add semester'}
        <AddOutlined />
      </Button>
      <DialogHOC
        onClose={() => setOpen(false)}
        isLoading={loading}
        isOpen={open}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
        title="Add new semester"
        description=""
        confirmCallback={handleAdd}
        cancelCallback={handleCancel}
      >
        <TextField
          style={{ margin: '5px 0' }}
          label="Semester password"
          value={password}
          fullWidth
          onChange={e => setPassword(e.target.value)}
        />
        <SmartSelect
          buttonText="Select major"
          inputPlaceholder="Search for majors..."
          getRequestUrl={handleRequest}
          valueCallback={handleSmartSelectCallback}
          dataFilter={(data => data.array)}
          nameGetter={(m => `${m.name}`)}
        />
      </DialogHOC>
    </>
  );
};

AddSemesterModalButton.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddSemesterModalButton;
