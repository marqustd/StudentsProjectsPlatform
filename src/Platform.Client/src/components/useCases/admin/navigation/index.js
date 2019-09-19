import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core';
import {
  PersonAddOutlined, SearchOutlined, LibraryBooksOutlined,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const AdminNaviList = () => (
  <>
    <List>
      <ListItem button component={NavLink} to="/manage/users/new">
        <ListItemIcon><PersonAddOutlined /></ListItemIcon>
        <ListItemText primary="Create user" />
      </ListItem>
      <ListItem button component={NavLink} to="/manage/users">
        <ListItemIcon><SearchOutlined /></ListItemIcon>
        <ListItemText primary="Find user" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button component={NavLink} to="/manage/majors">
        <ListItemIcon><LibraryBooksOutlined /></ListItemIcon>
        <ListItemText primary="Majors" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button component={NavLink} to="/manage/subjects">
        <ListItemIcon><LibraryBooksOutlined /></ListItemIcon>
        <ListItemText primary="Subjects" />
      </ListItem>
    </List>
    <Divider />
  </>
);

export default AdminNaviList;
