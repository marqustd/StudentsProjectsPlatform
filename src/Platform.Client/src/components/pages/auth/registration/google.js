import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, FormControlLabel, Checkbox,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { googleRegisterRequest, handleAuthEvent } from '../../../../store/common/auth/actions';
import { authErrors } from '../../../../utility/events/common/auth';
import { registerEvent } from '../../../../store/common/events/actions';

const GoogleRegister = ({
  switchHandler, tokenId, email,
  register, events, show,
  handleEvent,
}) => {
  const [agree, setAgree] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [albumNumber, setAlbumNumber] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  useEffect(() => {
    const event = events.find(e => e.code === authErrors.GOOGLE_REGISTER_CREDENTIALS.code);
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
      albumNumber,
      googleTokenId: tokenId,
      agree,
    });
  }

  function manageState(handler) {
    return (e) => {
      handler(e.target.value);
      if (invalidCredentials) {
        setInvalidCredentials(false);
      }
    };
  }

  function isValid() {
    return !invalidCredentials
    && firstName !== ''
    && lastName !== ''
    && albumNumber !== ''
    && agree;
  }

  return (
    <div className="google-register-panel">
      <div className="google-register-header">
        <span className="header-content">
            Register with Google
          <i
            className="fas fa-user-plus"
            style={{ marginLeft: '10px' }}
          />
        </span>
      </div>
      <div className="google-register-form">
        <TextField
          required
          fullWidth
          type="email"
          label="Google account email"
          placeholder="Google email"
          className="email-input"
          margin="normal"
          variant="outlined"
          value={email}
          disabled
        />
        <TextField
          error={invalidCredentials}
          required
          fullWidth
          type="text"
          label="Insert first name"
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
          type="text"
          label="Insert last name"
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
          type="text"
          label="Insert album number"
          placeholder="Album number"
          className="album-number-input"
          margin="normal"
          variant="outlined"
          value={albumNumber}
          onChange={manageState(setAlbumNumber)}
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
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="cancel-button"
          onClick={switchHandler}
        >Cancel
          <i
            style={{ marginLeft: '10px' }}
            className="fas fa-times"
          />
        </Button>
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

GoogleRegister.propTypes = {
  tokenId: PropTypes.string.isRequired,
  switchHandler: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.number),
  show: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

GoogleRegister.defaultProps = {
  events: [],
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register: googleRegisterRequest,
    handleEvent: handleAuthEvent,
    show: registerEvent,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    events: state.auth.events,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleRegister);
