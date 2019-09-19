
import React, { useState, useEffect } from 'react';
import {
  Button, Typography, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loaderObject from '../../../../../../../../../utility/loaders/admin/subjects';
import { registerEvent } from '../../../../../../../../../store/common/events/actions';
import { addRequest, handleEvent as handleSubjectEvent } from '../../../../../../../../../store/admin/subjects/actions';
import { Errors } from '../../../../../../../../../utility/events/admin/subjects';
import SmartSelect from '../../../../../../../../common/smartSelect';
import { adminUrls } from '../../../../../../../../../utility/helpers/config';

const AddSubject = ({
  loaders, events, addSubject, show, handleEvent,
}) => {
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidTeacher, setIsValidTeacher] = useState(true);

  useEffect(() => {
    if (!isValidTeacher) { setIsValidTeacher(true); }
  }, [teacherId]);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.ADD_SUBJECT);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders]);

  useEffect(() => {
    const event = events.find(e => e.code === Errors.SUBJECT_ADD_NAME_CONFLICT.code); // TODO
    if (event) {
      setIsValidName(false);
      show(event);
      handleEvent(event.id);
    }
  }, [events[0]]);

  function handleInput(setter) {
    return (e) => {
      if (!isValidName) { setIsValidName(true); }
      return setter(e.target.value);
    };
  }

  function handleCreate() {
    if (teacherId < 0) {
      setIsValidTeacher(false);
    } else { addSubject(name, teacherId); }
  }

  function handleRequest(search) {
    let url = `${adminUrls.users.GET_ALL_TEACHERS}?count=5`;
    if (search) {
      url += `&search=${search}`;
    }
    return url;
  }

  return (
    <div className="subject-add-panel">
      <FormControl className="subject-add-name">
        <Typography variant="h6" gutterBottom>
        Subject name
        </Typography>
        <TextField
          error={!isValidName}
          required
          fullWidth
          type="text"
          placeholder="Subject name"
          className="name-input"
          margin="normal"
          value={name}
          onChange={handleInput(setName)}
        />
      </FormControl>
      <FormControl className="subject-add-teacher">
        <Typography variant="h6" gutterBottom>
        Head teacher
        </Typography>
        <SmartSelect
          disabled={isLoading}
          error={!isValidTeacher}
          buttonText="Select teacher"
          inputPlaceholder="Search name..."
          getRequestUrl={handleRequest}
          valueCallback={d => setTeacherId(d.id)}
          dataFilter={(data => data.array)}
          nameGetter={(t => `${t.firstName} ${t.lastName}`)}
        />
      </FormControl>
      <Button
        disabled={!isValidName || !isValidTeacher || isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="subject-add-button"
        onClick={handleCreate}
      >{isLoading
        ? <CircularProgress color="primary" size={30} thickness={5} />
        : (
          <span>Create<i
            style={{ marginLeft: '10px' }}
            className="fas fa-sign-in-alt"
          />
          </span>
        )}
      </Button>
    </div>
  );
};


AddSubject.propTypes = {
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  show: PropTypes.func.isRequired,
  addSubject: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaders: state.subjectState.loads,
    events: state.subjectState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    show: registerEvent,
    addSubject: addRequest,
    handleEvent: handleSubjectEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);
