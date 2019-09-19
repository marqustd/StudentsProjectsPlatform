import React, { useState, useEffect } from 'react';
import {
  TextField, Button, FormControlLabel, Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleRegister from '../google';
import { registerRequest, handleAuthEvent } from '../../../../store/common/auth/actions';
import { authErrors } from '../../../../utility/events/common/auth';
import { registerEvent } from '../../../../store/common/events/actions';
import './style.scss';

const RegistrationPanel = ({
  switchHandler, register, events, handleEvent, show,
}) => {
  // form data
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [albumNumber, setAlbumNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // validation
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  // labels
  const firstNameLabel = 'Insert first name';
  const lastNameLabel = 'Insert last name';
  const emailLabel = 'Insert email';
  const albumLabel = 'Insert album number';
  const passwordLabel = 'Insert password';
  const passwordConfirmLabel = 'Confirm password';

  function manageState(handler) {
    return (e) => {
      handler(e.target.value);
      if (invalidCredentials) {
        setInvalidCredentials(false);
      }
    };
  }

  useEffect(() => {
    const event = events.find(e => e.code === authErrors.STANDARD_REGISTER_CREDENTIALS.code);
    if (event) {
      if (!invalidCredentials) {
        setInvalidCredentials(true);
      }
      show(event);
      handleEvent(event.id);
    }
  }, [events]);


  function handleRegister() {
    register({
      firstName,
      lastName,
      email,
      albumNumber,
      password,
      confirmPassword,
      agree,
    });
  }

  function isValid() {
    return (agree
    && !invalidCredentials
    && firstName !== ''
    && lastName !== ''
    && email !== ''
    && albumNumber !== ''
    && password !== ''
    && confirmPassword !== '');
  }

  return (
    <div className="standard-register-panel">
      <div className="standard-register-header">
        <span className="header-content">
            Register
          <i
            className="fas fa-user-plus"
            style={{ marginLeft: '10px' }}
          />
        </span>
        <GoogleRegister text="Register with Google" onSuccessHandler={switchHandler} />
      </div>
      <div className="standard-register-form">
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          label={firstNameLabel}
          placeholder="First name"
          className="first-name-input"
          margin="normal"
          variant="outlined"
          value={firstName}
          onChange={manageState(setFirstName)}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          label={lastNameLabel}
          placeholder="Last name"
          className="last-name-input"
          margin="normal"
          variant="outlined"
          value={lastName}
          onChange={manageState(setLastName)}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          label={emailLabel}
          placeholder="Email"
          className="email-input"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={manageState(setEmail)}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          label={albumLabel}
          placeholder="Album's number"
          className="album-input"
          margin="normal"
          variant="outlined"
          value={albumNumber}
          onChange={manageState(setAlbumNumber)}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          type="password"
          label={passwordLabel}
          placeholder="Password"
          className="password-input"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={manageState(setPassword)}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          type="password"
          label={passwordConfirmLabel}
          placeholder="Password"
          className="confirm-password-input"
          margin="normal"
          variant="outlined"
          value={confirmPassword}
          onChange={manageState(setConfirmPassword)}
        />
        <FormControlLabel
          className="agree-input"
          control={(
            <Checkbox
              onClick={({ target }) => setAgree(target.checked)}
              checked={agree}
              value="remember"
              color="primary"
            />
          )}
          label="I agree to the Terms and Condition of Platform service"
        />
        <Button
          disabled={!isValid()}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="register-button"
          onClick={handleRegister}
        >Register
          <i
            style={{ marginLeft: '10px' }}
            className="fas fa-sign-in-alt"
          />
        </Button>
      </div>
    </div>
  );
};

RegistrationPanel.propTypes = {
  switchHandler: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.number),
  show: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

RegistrationPanel.defaultProps = {
  events: 0,
};

function mapStateToProps(state) {
  return {
    events: state.auth.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register: registerRequest,
    handleEvent: handleAuthEvent,
    show: registerEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPanel);
