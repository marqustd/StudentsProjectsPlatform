import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText, Divider, Icon,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const StudentNaviList = () => (
  <>
    <List>
      <ListItem button component={NavLink} to="/subjects">
        <ListItemIcon><SearchOutlined /></ListItemIcon>
        <ListItemText primary="Find subject" />
      </ListItem>
      <ListItem button component={NavLink} to="/mysubjects/">
        <ListItemIcon><Icon className="far fa-folder" /></ListItemIcon>
        <ListItemText primary="My subjects" />
      </ListItem>
    </List>
    <Divider />
  </>
);

export default StudentNaviList;
