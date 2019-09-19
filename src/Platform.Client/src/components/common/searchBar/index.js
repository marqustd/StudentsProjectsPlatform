import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, InputBase, IconButton, FormGroup,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import './style.scss';

const SearchBar = ({ manageSearch, placeholder }) => {
  const [searchText, setSearchText] = useState('');
  function manageSearchClick() {
    manageSearch(searchText);
  }

  function invokeSearch(e) {
    const key = e.keyCode || e.which;
    if (key === 13) { manageSearch(searchText); }
  }

  return (
    <div className="search-bar">
      <Paper style={{ paddingLeft: '10px' }}>
        <FormGroup row>
          <InputBase
            style={{ margin: '0', paddingRight: '10px', flex: 'auto' }}
            onKeyUp={invokeSearch}
            placeholder={placeholder}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <IconButton color="primary" aria-label="Search" onClick={manageSearchClick}>
            <SearchOutlined />
          </IconButton>
        </FormGroup>
      </Paper>
    </div>
  );
};

SearchBar.propTypes = {
  manageSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: '',
};

export default SearchBar;
