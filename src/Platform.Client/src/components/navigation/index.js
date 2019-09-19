
import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer, Divider, List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';
import {
  Home, ArrowBackTwoTone, ExitToApp,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { logoutRequest } from '../../store/common/auth/actions';
import './style.scss';

const Navigation = ({
  additionalNavi, isOpen, closeDrawer, logout,
}) => {
  const asideClassName = `${isOpen ? 'expand-navigation' : ''} basic-nagivation`;
  return (
    <aside className={asideClassName}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{ root: (isOpen ? 'expand-drawer' : '') }}
      >
        <Divider />
        <List>
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon><ArrowBackTwoTone /></ListItemIcon>
            <ListItemText primary="Hide menu" />
          </ListItem>
          <ListItem button component={NavLink} to="/home">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        {additionalNavi}
        <List>
          <ListItem button onClick={() => logout()}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </aside>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  additionalNavi: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout: logoutRequest }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Navigation));
