import React, { useState } from 'react';
import GoogleRegister from './google';
import StandardRegister from './standard';

const RegisterPanel = () => {
  const [googleRegister, setGoogleRegister] = useState(false);
  const [googleTokenId, setGoogleTokenId] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');

  function swithToStandardRegister() {
    setGoogleRegister(false);
    setGoogleTokenId('');
  }

  function switchToGoogleRegister(tokenId, email) {
    setGoogleRegister(true);
    setGoogleTokenId(tokenId);
    setGoogleEmail(email);
  }

  return (
    <section className="register-panel">
      {googleRegister
        ? (
          <GoogleRegister
            switchHandler={swithToStandardRegister}
            tokenId={googleTokenId}
            email={googleEmail}
          />
        )
        : (
          <StandardRegister
            switchHandler={switchToGoogleRegister}
          />
        )}
    </section>
  );
};


export default RegisterPanel;
