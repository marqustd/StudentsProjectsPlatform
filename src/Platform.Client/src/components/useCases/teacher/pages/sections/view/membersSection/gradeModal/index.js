import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, Button } from '@material-ui/core';
import DialogHOC from '../../../../../../../common/dialogHOC';

const grades = [2, 3, 4, 5];

const GradeModal = ({ gradeHandler }) => {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState(2);

  function handleGrade() {
    gradeHandler(grade);
    setOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Grade</Button>
      <DialogHOC
        isOpen={open}
        isLoading={false}
        cancelButtonText="Cancel"
        confirmButtonText="Grade"
        cancelCallback={() => setOpen(false)}
        confirmCallback={handleGrade}
        onClose={() => setOpen(false)}
        description=""
        title="Grade activity"
      >
        <Select
          value={grade}
          onChange={e => setGrade(e.target.value)}
          name="status"
        >
          {grades.map(g => (
            <MenuItem
              key={g}
              value={g}
            ><span key={`span_${g}`} style={{ fontSize: '21px', padding: '10px 15px' }}>{g}</span>
            </MenuItem>
          ))}
        </Select>
      </DialogHOC>
    </>
  );
};

GradeModal.propTypes = {
  gradeHandler: PropTypes.func.isRequired,
};

export default GradeModal;
