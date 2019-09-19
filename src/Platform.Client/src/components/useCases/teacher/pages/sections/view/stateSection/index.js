import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Select, Button, MenuItem,
} from '@material-ui/core';
import EditableField from '../../../../../../common/editableField';

const SectionStatus = {
  open: 0,
  closed: 1,
  canceled: 2,
};

const sectionCapacity = Array.from({ length: 30 }, (v, k) => k + 1);


const StateSection = ({ ids, section, edit }) => {
  const { sectionId: id } = section;
  const [name, setName] = useState('');
  const [status, setStatus] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const { subjectId, topicId, sectionId } = ids;

  useEffect(() => {
    if (id === sectionId) {
      const {
        name: newName,
        capacity: newCapacity,
        status: newStatus,
      } = section;
      setName(newName);
      setStatus(newStatus);
      setCapacity(newCapacity);
    }
  }, [section]);

  function handleSave() {
    edit(subjectId, topicId, sectionId, name, status, capacity);
  }

  return (
    <Paper className="panel">
      <div className="divided">
        <EditableField name={name} changeName={setName} />
      </div>
      <div className="divided">
        <span style={{ fontSize: '21px', padding: '10px 15px 10px 0' }}>
          {'Section status:'}
        </span>
        <Select
          value={status}
          onChange={e => setStatus(e.target.value)}
          name="status"
        >
          {Object.keys(SectionStatus).map(k => (
            <MenuItem
              key={SectionStatus[k]}
              value={SectionStatus[k]}
            ><span style={{ fontSize: '21px', padding: '10px 15px' }}>{k}</span>
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="divided">
        <span style={{ fontSize: '21px', padding: '10px 15px 10px 0' }}>
          {'Section capacity:'}
        </span>
        <Select
          disabled={status !== SectionStatus.open}
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          name="capacity"
        >
          {sectionCapacity.map(x => (
            <MenuItem
              key={x}
              value={x}
            ><span style={{ fontSize: '21px', padding: '10px 15px' }}>{x}</span>
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="control-footer">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >Save Changes
        </Button>
      </div>
    </Paper>
  );
};

StateSection.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  edit: PropTypes.func.isRequired,
};

export default StateSection;
