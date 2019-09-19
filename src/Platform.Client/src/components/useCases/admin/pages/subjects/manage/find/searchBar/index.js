import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, InputBase, IconButton, FormGroup, FormControlLabel, Switch,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const SubjectsSearchBar = ({ manageSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchObsolete, setSearchObsolete] = useState(false);
  function manageSearchClick() {
    manageSearch(searchText, searchObsolete);
  }

  function invokeSearch(e) {
    const key = e.keyCode || e.which;
    if (key === 13) { manageSearch(searchText, searchObsolete); }
  }

  return (
    <div className="subjects-search-bar">
      <Paper style={{ paddingLeft: '10px' }}>
        <FormGroup row>
          <InputBase
            style={{ margin: '0', paddingRight: '10px' }}
            onKeyUp={invokeSearch}
            placeholder="Search for subjects"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
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
          <IconButton color="primary" aria-label="Subjects" onClick={manageSearchClick}>
            <SearchOutlined />
          </IconButton>
        </FormGroup>
      </Paper>
    </div>
  );
};

SubjectsSearchBar.propTypes = {
  manageSearch: PropTypes.func.isRequired,
};

export default SubjectsSearchBar;
