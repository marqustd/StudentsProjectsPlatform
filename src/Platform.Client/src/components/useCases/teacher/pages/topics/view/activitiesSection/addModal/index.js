import React, { useState } from 'react';
import {
  TextField, Button, Checkbox, FormControlLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddOutlined } from '@material-ui/icons';
import DialogHOC from '../../../../../../../common/dialogHOC';
import './style.scss';

const AddActivityModal = ({ add }) => {
  const [open, setOpen] = useState(false);
  const [includeArtifact, setIncludeArtifact] = useState(false);
  const [name, setName] = useState('');

  function handleCheckbox(e) {
    setIncludeArtifact(e.target.checked);
  }

  function handleAdd() {
    add(name, includeArtifact);
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        {'Add activity'}<AddOutlined />
      </Button>
      <DialogHOC
        isOpen={open}
        isLoading={false}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
        cancelCallback={() => setOpen(false)}
        confirmCallback={handleAdd}
        title="Add new activity"
        description=""
        onClose={() => setOpen(false)}
      >
        <>
          <div className="activity-name">
            <TextField
              fullWidth
              variant="standard"
              value={name}
              onChange={e => setName(e.target.value)}
              label="Activity name"
            />
          </div>
          <div className="activity-include-artifact">
            <FormControlLabel
              control={(
                <Checkbox
                  checked={includeArtifact}
                  onClick={handleCheckbox}
                  value="remember"
                  color="primary"
                />
          )}
              label="Include artifact?"
              labelPlacement="end"
            />
          </div>
        </>
      </DialogHOC>
    </>
  );
};

AddActivityModal.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddActivityModal;
