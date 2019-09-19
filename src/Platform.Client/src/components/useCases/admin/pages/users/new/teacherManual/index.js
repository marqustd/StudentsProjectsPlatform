import React, { useState, useEffect } from 'react';
import {
  Button, Typography, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTeacherRequest, handleUsersEvent } from '../../../../../../../store/admin/users/actions';
import loaderObject from '../../../../../../../utility/loaders/admin/users';
import { usersErrors } from '../../../../../../../utility/events/admin/users';
import { registerEvent } from '../../../../../../../store/common/events/actions';
import './style.scss';

const TeacherManual = ({
  loaders, events, addTeacher, show, handleEvent,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.CREATE_TEACHER);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders[0]]);

  useEffect(() => {
    const event = events.find(e => e.code === usersErrors.NEW_TEACHER_DATA.code);
    if (event) {
      setIsValid(false);
      show(event);
      handleEvent(event.id);
    }
  }, [events[0]]);

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleCreate() {
    addTeacher(firstName, lastName, email);
  }

  return (
    <div className="teacher-man-panel">
      <FormControl className="teacher-man-first-name">
        <Typography variant="h6" gutterBottom>
        First name
        </Typography>
        <TextField
          error={!isValid}
          required
          fullWidth
          type="text"
          placeholder="First name"
          className="first-name-input"
          margin="normal"
          value={firstName}
          onChange={handleFirstName}
        />
      </FormControl>
      <FormControl className="teacher-man-last-name">
        <Typography variant="h6" gutterBottom>
        Last name
        </Typography>
        <TextField
          error={!isValid}
          required
          fullWidth
          type="text"
          placeholder="Last name"
          className="last-name-input"
          margin="normal"
          value={lastName}
          onChange={handleLastName}
        />
      </FormControl>
      <FormControl className="teacher-man-email">
        <Typography variant="h6" gutterBottom>
        Email address
        </Typography>
        <TextField
          error={!isValid}
          required
          fullWidth
          type="text"
          placeholder="Album number"
          className="email-input"
          margin="normal"
          value={email}
          onChange={handleEmail}
        />
      </FormControl>
      <Button
        disabled={!isValid || isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="teacher-man-button"
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

TeacherManual.propTypes = {
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  show: PropTypes.func.isRequired,
  addTeacher: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaders: state.users.loads,
    events: state.users.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    show: registerEvent,
    addTeacher: addTeacherRequest,
    handleEvent: handleUsersEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherManual);
