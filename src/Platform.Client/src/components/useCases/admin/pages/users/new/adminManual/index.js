import React, { useState, useEffect } from 'react';
import {
  Button, Typography, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAdminRequest, handleUsersEvent } from '../../../../../../../store/admin/users/actions';
import loaderObject from '../../../../../../../utility/loaders/admin/users';
import { usersErrors } from '../../../../../../../utility/events/admin/users';
import { registerEvent } from '../../../../../../../store/common/events/actions';

import './style.scss';

const AdminManual = ({
  loaders, events, addAdmin, show, handleEvent,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.CREATE_ADMIN);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders[0]]);

  useEffect(() => {
    const event = events.find(e => e.code === usersErrors.NEW_ADMIN_DATA.code);
    if (event) {
      setIsValid(false);
      show(event);
      handleEvent(event.id);
    }
  }, [events[0]]);

  function handleInput(setter) {
    return (e) => {
      if (!isValid) { setIsValid(true); }
      return setter(e.target.value);
    };
  }

  function handleCreate() {
    addAdmin(firstName, lastName, email);
  }

  return (
    <div className="admin-man-panel">
      <FormControl className="admin-man-first-name">
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
          onChange={handleInput(setFirstName)}
        />
      </FormControl>
      <FormControl className="admin-man-last-name">
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
          onChange={handleInput(setLastName)}
        />
      </FormControl>
      <FormControl className="admin-man-email">
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
          onChange={handleInput(setEmail)}
        />
      </FormControl>
      <Button
        disabled={!isValid || isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="admin-man-button"
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

AdminManual.propTypes = {
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  show: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
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
    addAdmin: addAdminRequest,
    handleEvent: handleUsersEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManual);
