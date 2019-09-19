import React, { useState } from 'react';
import {
  Button, Select, MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DialogHOC from '../../../../../../../common/dialogHOC';

const semesterState = [
  'Open',
  'Closed',
  'Canceled',
];

const StateButton = ({
  state, changeState, semesterName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempState, setTempState] = useState(state);

  function onClose() {
    setIsOpen(false);
    setTempState(state);
  }

  function onConfirm() {
    changeState(tempState);
    onClose();
  }

  function openDialog() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        type="button"
        variant="contained"
        onClick={openDialog}
      >Change state
      </Button>
      <DialogHOC
        onClose={onClose}
        title="Changes semester state"
        description={semesterName}
        isOpen={isOpen}
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        confirmCallback={onConfirm}
        cancelCallback={onClose}
      >
        <div className="modal-content">
          <Select
            className="state-selector"
            value={tempState}
            onChange={e => setTempState(e.target.value)}
            name="state"
          >
            {semesterState.map((elem, index) => (
              <MenuItem
                key={index}
                value={index}
              ><span style={{ fontSize: '21px', padding: '10px 15px' }}>{elem}</span>
              </MenuItem>
            ))}
          </Select>
        </div>

      </DialogHOC>
    </>
  );
};

StateButton.propTypes = {
  state: PropTypes.number.isRequired,
  changeState: PropTypes.func.isRequired,
  semesterName: PropTypes.string.isRequired,
};

export default StateButton;
