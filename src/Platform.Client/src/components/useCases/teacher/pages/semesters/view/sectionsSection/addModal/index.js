import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import DialogHOC from '../../../../../../../common/dialogHOC';
import SmartSelect from '../../../../../../../common/smartSelect';
import { teacherUrls } from '../../../../../../../../utility/helpers/config';

const AddSectionModal = ({ add, subjectId }) => {
  const [capacity, setCapacity] = useState(0);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [topicId, setTopicId] = useState(-1);

  function handleCapacity(e) {
    setCapacity(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleRequest(search) {
    let url = `${teacherUrls.topics.GET_ALL}?subjectId=${subjectId}&count=5`;
    if (search) {
      url += `&search=${search}`;
    }
    return url;
  }

  function handleAdd() {
    add(topicId, name, capacity);
    setOpen(false);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        {'Add section '}
        <AddOutlined />
      </Button>
      <DialogHOC
        isLoading={false}
        isOpen={open}
        title="Add new section to semester"
        description=""
        onClose={() => setOpen(false)}
        confirmCallback={handleAdd}
        cancelCallback={() => setOpen(false)}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
      >
        <TextField
          style={{ padding: '10px 0' }}
          fullWidth
          label="Section name"
          value={name}
          onChange={handleName}
        />
        <TextField
          style={{ padding: '10px 0' }}
          fullWidth
          label="Section capacity"
          value={capacity}
          onChange={handleCapacity}
        />
        <SmartSelect
          disabled={false}
          error={false}
          buttonText="Find topic"
          inputPlaceholder="Search name..."
          getRequestUrl={handleRequest}
          valueCallback={d => setTopicId(d.topicId)}
          dataFilter={(data => data.array)}
          nameGetter={(t => t.name)}
        />
      </DialogHOC>
    </>
  );
};

AddSectionModal.propTypes = {
  subjectId: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
};

export default AddSectionModal;
