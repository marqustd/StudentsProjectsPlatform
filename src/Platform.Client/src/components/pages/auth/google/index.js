import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = ({ text, onSuccessHandler }) => {
  function onSuccess(e) {
    onSuccessHandler(e.tokenId, e.profileObj.email);
  }
  function onFailure(e) {
    console.log('failure');
    console.log(e);
  }
  return (
    <GoogleLogin
      clientId="142298743224-eviumitetmvlb49qiin66eb30mngaoa1.apps.googleusercontent.com" // TODO: Hide clientId :)
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText={text}
      responseType="permission"
      redirectUri="http://localhost:8080" // TODO: Use global variable
    />
  );
};

GoogleAuth.propTypes = {
  onSuccessHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default GoogleAuth;
