import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, InputBase, IconButton, MenuItem, Select, FormGroup, FormControlLabel, Switch,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { UserTypes as roles } from '../../../../../../../../utility/helpers/userTypes';

const UsersSearchBar = ({ role, manageSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchRole, setSearchRole] = useState(role);
  const [searchObsolete, setSearchObsolete] = useState(false);
  function manageSearchClick() {
    manageSearch(searchText, searchRole, searchObsolete);
  }

  function invokeSearch(e) {
    const key = e.keyCode || e.which;
    if (key === 13) { manageSearch(searchText, searchRole, searchObsolete); }
  }

  return (
    <div className="users-search-bar">
      <Paper style={{ paddingLeft: '10px' }}>
        <FormGroup row>
          <FormControlLabel
            style={{ margin: '0', paddingRight: '10px' }}
            control={(
              <InputBase
                onKeyUp={invokeSearch}
                placeholder="Search for users"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            )}
            label="in"
            labelPlacement="end"
          />
          <Select
            style={{ paddingLeft: '5px' }}
            value={searchRole}
            onChange={e => setSearchRole(e.target.value)}
            inputProps={{
              name: 'role',
              id: 'role-simple',
            }}
          >
            {Object.keys(roles).map(k => (
              <MenuItem
                key={roles[k].key}
                value={roles[k].key}
              >
                <span style={{ margin: '0 5px' }}>{`${roles[k].name}s`}</span>
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            style={{ margin: '0' }}
            control={(
              <Switch
                checked={searchObsolete}
                onChange={e => setSearchObsolete(e.target.checked)}
              />
            )}
            label="Include obsolete?"
          />
          <IconButton color="primary" aria-label="Users" onClick={manageSearchClick}>
            <SearchOutlined />
          </IconButton>
        </FormGroup>
      </Paper>
    </div>
  );
};

UsersSearchBar.propTypes = {
  role: PropTypes.number.isRequired,
  manageSearch: PropTypes.func.isRequired,
};

export default UsersSearchBar;
