import React, { useState } from 'react';
import {
  AppBar, Tab, Tabs, Paper,
} from '@material-ui/core';
import LoginPanel from './login';
import RegistrationPanel from './registration';
import './style.scss';

const AuthorizationPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  function handleChangeIndex(e, index) {
    setActiveTab(index);
  }

  function tabHandler() {
    switch (activeTab) {
      case 0:
        return { className: 'login-content', component: <LoginPanel /> };
      case 1:
        return { className: 'register-content', component: <RegistrationPanel /> };

      default:
        return { className: '', component: <div>EMPTY</div> };
    }
  }

  const { className, component } = tabHandler();

  const containerClass = `tab-content ${className}`;
  return (
    <section id="auth-page">
      <Paper className="auth-tile">
        <AppBar position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={handleChangeIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Log in" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        <div className="tab-container">
          <div className={containerClass}>
            {component}
          </div>
        </div>
      </Paper>
    </section>
  );
};


export default AuthorizationPage;
