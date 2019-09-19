import React, { useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import DialogHOC from '../../../../../../../common/dialogHOC';
import SmartSelect from '../../../../../../../common/smartSelect';
import { adminUrls } from '../../../../../../../../utility/helpers/config';
import './style.scss';

const AddTeacherModalButton = ({ add }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // eslint-disable-line
  const [teacherId, setTeacherId] = useState(null);

  function handleAdd() {
    if (teacherId !== null) { add(teacherId); }
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleRequest(search) {
    let url = `${adminUrls.users.GET_ALL_TEACHERS}?count=5`;
    if (search) {
      url += `&search=${search}`;
    }
    return url;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {'Add teacher'}
        <AddOutlined />
      </Button>
      <DialogHOC
        onClose={() => setOpen(false)}
        isLoading={loading}
        isOpen={open}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
        title="Add new teacher"
        description=""
        confirmCallback={handleAdd}
        cancelCallback={handleCancel}
      >
        <SmartSelect
          disabled={false}
          error={false}
          buttonText="Find teacher"
          inputPlaceholder="Search name..."
          getRequestUrl={handleRequest}
          valueCallback={d => setTeacherId(d.id)}
          dataFilter={(data => data.array)}
          nameGetter={(t => `${t.firstName} ${t.lastName}`)}
        />
      </DialogHOC>
    </>
  );
};

AddTeacherModalButton.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddTeacherModalButton;
