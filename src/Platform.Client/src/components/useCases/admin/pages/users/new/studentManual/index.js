import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, FormControl, Typography, Button, CircularProgress,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { usersErrors } from '../../../../../../../utility/events/admin/users';
import loaderObject from '../../../../../../../utility/loaders/admin/users';
import { registerEvent } from '../../../../../../../store/common/events/actions';
import { addStudentRequest, handleUsersEvent } from '../../../../../../../store/admin/users/actions';
import SmartSelect from '../../../../../../common/smartSelect';
import { adminUrls } from '../../../../../../../utility/helpers/config';
import './style.scss';


const StudentManual = ({
  addStudent, loaders, events, show, handleEvent,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [albumNumber, setAlbumNumber] = useState('');
  const [majorId, setMajorId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);


  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.CREATE_STUDENT);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders[0]]);

  useEffect(() => {
    const event = events.find(e => e.code === usersErrors.NEW_STUDENT_DATA.code);
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

  function handleAlbumNumber(e) {
    const { value } = e.target;
    if ((Number(value) > 0 && !value.includes('.') && !value.includes(' '))
|| value === '') {
      setAlbumNumber(value);
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

  function handleCreate() {
    addStudent(firstName, lastName, albumNumber, majorId);
  }

  return (
    <div className="student-man-panel">
      <FormControl className="student-man-first-name">
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
      <FormControl className="student-man-last-name">
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
      <FormControl className="student-man-album-number">
        <Typography variant="h6" gutterBottom>
        Album number
        </Typography>
        <TextField
          error={!isValid}
          required
          fullWidth
          type="text"
          placeholder="Album number"
          className="album-number-input"
          margin="normal"
          value={albumNumber}
          onChange={handleAlbumNumber}
        />
      </FormControl>
      <FormControl className="student-man-specialization">
        <Typography variant="h6" gutterBottom>
        Major
        </Typography>
        <SmartSelect
          buttonText="Select major"
          inputPlaceholder="Search for majors..."
          getRequestUrl={handleRequest}
          valueCallback={handleSmartSelectCallback}
          dataFilter={(data => data.array)}
          nameGetter={(m => `${m.name}`)}
        />
      </FormControl>
      <Button
        disabled={!isValid || isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="student-man-button"
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

StudentManual.propTypes = {
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  show: PropTypes.func.isRequired,
  addStudent: PropTypes.func.isRequired,
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
    addStudent: addStudentRequest,
    handleEvent: handleUsersEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentManual);
