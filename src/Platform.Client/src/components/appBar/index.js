import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest } from '../../store/common/auth/actions';
import './style.scss';

const ApplicationBar = ({
  openDrawer, closeDrawer, isDrawerOpen, logout,
}) => {
  const [accountMenu, setAccountMenu] = useState(false);
  const [anchor, setAnchor] = useState(null);

  function manageLogout() {
    logout();
    setAccountMenu(false);
  }

  function closeAccountMenu() {
    setAccountMenu(false);
  }

  function openAccountMenu(e) {
    setAnchor(e.currentTarget);
    setAccountMenu(true);
  }

  function handleDrawerButton() {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  const appBarClassName = `${isDrawerOpen ? 'fold-app-bar' : ''} app-navbar`;

  return (
    <AppBar position="fixed" classes={{ root: appBarClassName }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={handleDrawerButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
         SLOPE ⛷
        </Typography>

        <div>
          <IconButton
            aria-owns="menu-appbar"
            aria-haspopup="true"
            onClick={openAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchor}
            open={accountMenu}
            onClose={closeAccountMenu}
          >
            <MenuItem onClick={closeAccountMenu}>My account</MenuItem>
            <MenuItem onClick={manageLogout}>Logout</MenuItem>
          </Menu>
        </div>

      </Toolbar>
    </AppBar>
  );
};

ApplicationBar.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout: logoutRequest }, dispatch);
}

export default connect(null, mapDispatchToProps)(ApplicationBar);
