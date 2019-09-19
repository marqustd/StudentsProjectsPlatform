import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TextField, Button, FormControlLabel, Checkbox,
} from '@material-ui/core';
import {
  loginRequest,
  googleLoginRequest,
  handleAuthEvent,
} from '../../../../store/common/auth/actions';
import { authErrors } from '../../../../utility/events/common/auth';
import { registerEvent } from '../../../../store/common/events/actions';
import GoogleLogin from '../google';
import './style.scss';

const LoginPanel = ({
  login, googleLogin, events, handleEvent, show,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  useEffect(() => {
    let event = events.find(e => e.code === authErrors.STANDARD_LOGIN_CREDENTIALS.code);
    if (event) {
      if (!invalidCredentials) {
        setInvalidCredentials(true);
      }
      show(event);
      handleEvent(event.id);
    }
    event = events.find(e => e.code === authErrors.GOOGLE_LOGIN_CREDENTIALS.code);
    if (event) {
      show(event);
      handleEvent(event.id);
    }
  }, [events]);


  function handleEmail(e) {
    setEmail(e.target.value);
    if (invalidCredentials) {
      setInvalidCredentials(false);
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    if (invalidCredentials) {
      setInvalidCredentials(false);
    }
  }

  function handleRemember(e) {
    setRemember(e.target.checked);
  }

  function handleLogin() {
    login(email, password);
  }

  function handleGoogleLogin(tokenId) {
    googleLogin(tokenId);
  }

  function isValid() {
    return (!invalidCredentials
    && email !== ''
    && password !== '');
  }

  return (
    <section className="login-panel">
      <div className="login-header">
        <span className="header-content">
          Log in
          <i
            className="fas fa-unlock-alt"
            style={{ marginLeft: '10px' }}
          />
        </span>
        <GoogleLogin text="Login with Google" onSuccessHandler={handleGoogleLogin} />
      </div>
      <div className="login-form">
        <TextField
          autoFocus
          error={invalidCredentials}
          required
          fullWidth
          type="email"
          label="Insert email"
          placeholder="Email"
          className="email-input"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleEmail}
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          type="password"
          label="Insert password"
          placeholder="Password"
          className="password-input"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={handlePassword}
        />
        <FormControlLabel
          className="remember-input"
          control={(
            <Checkbox
              onClick={handleRemember}
              checked={remember}
              value="remember"
              color="primary"
            />
          )}
          label="Remember me"
        />
        <Button
          disabled={!isValid()}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="login-button"
          onClick={handleLogin}
        >Sign in
          <i
            style={{ marginLeft: '10px' }}
            className="fas fa-sign-in-alt"
          />
        </Button>
      </div>
    </section>
  );
};

LoginPanel.propTypes = {
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
  handleEvent: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = {
  events: [],
};

function mapStateToProps(state) {
  return {
    events: state.auth.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: loginRequest,
    googleLogin: googleLoginRequest,
    handleEvent: handleAuthEvent,
    show: registerEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);
