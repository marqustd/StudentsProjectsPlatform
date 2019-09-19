import React, { useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import DialogHOC from '../../../../../../../common/dialogHOC';
import SmartSelect from '../../../../../../../common/smartSelect';
import { teacherUrls } from '../../../../../../../../utility/helpers/config';

const AddMemberModal = ({ add, semesterId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // eslint-disable-line
  const [memberId, setMemberId] = useState(-1);

  function handleAdd() {
    add(memberId);
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleRequest(search) {
    return `${teacherUrls.sections.members.SEARCH}?semesterId=${semesterId}&search=${search}`;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {'Add member'}
        <AddOutlined />
      </Button>
      <DialogHOC
        onClose={() => setOpen(false)}
        isLoading={loading}
        isOpen={open}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
        title="Add new member"
        description=""
        confirmCallback={handleAdd}
        cancelCallback={handleCancel}
      >
        <SmartSelect
          disabled={false}
          error={false}
          buttonText="Find member"
          inputPlaceholder="Search name..."
          getRequestUrl={handleRequest}
          valueCallback={d => setMemberId(d.id)}
          nameGetter={(t => `${t.firstName} ${t.lastName}`)}
        />
      </DialogHOC>
    </>
  );
};

AddMemberModal.propTypes = {
  add: PropTypes.func.isRequired,
  semesterId: PropTypes.number.isRequired,
};

export default AddMemberModal;
