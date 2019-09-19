import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core';
import {
  LibraryBooksOutlined,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const ManagerNaviList = () => (
  <>
    <List>
      <ListItem button component={NavLink} to="/subjects">
        <ListItemIcon><LibraryBooksOutlined /></ListItemIcon>
        <ListItemText primary="My subjects" />
      </ListItem>
    </List>
    <Divider />
  </>
);

export default ManagerNaviList;
