import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  FormControl, MenuItem, InputBase, Menu, Button, ClickAwayListener, CircularProgress,
} from '@material-ui/core';
import { guidGenerator } from '../../../utility/helpers/guid';
import { ajaxRequest, removeRequest } from '../../../store/common/temporary/actions';
import DebounceFactory from '../../../utility/helpers/debouncer';
import './style.scss';

const debounce = new DebounceFactory();

const SmartSelect = ({
  width, error, disabled,
  getRequestUrl, buttonText, inputPlaceholder,
  valueCallback, dataFilter, nameGetter,
  temporary, getData, removeContainer,
}) => {
  const [componentId] = useState(guidGenerator());
  const [data, setData] = useState(null);
  const [name, setName] = useState(buttonText);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (temporary[componentId]) {
      if (dataFilter) {
        setData(dataFilter(temporary[componentId]));
      } else {
        setData(temporary[componentId]);
      }
      if (isLoading) { setTimeout(() => setIsLoading(false), 500); }
    }
  }, [temporary]);

  useEffect(() => () => {
    removeContainer(componentId);
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
    const { value } = e.target;
    debounce(() => {
      getData(componentId, getRequestUrl(value));
      setIsLoading(true);
    }, 1000);
  }

  function openMenu(e) {
    setAnchor(e.target);
    setIsOpen(true);
  }

  function handleClickAway() {
    setIsOpen(false);
  }

  function handleChoice(e) {
    const { target } = e;
    valueCallback(data[target.value]);
    setName(target.innerText);
    setIsOpen(false);
  }

  return (
    <FormControl className="smart-select">
      <Button
        color={error ? 'secondary' : 'primary'}
        disabled={disabled}
        onClick={openMenu}
        variant="outlined"
        fullWidth
      >{name}
      </Button>
      <Menu
        width={300}
        anchorEl={anchor}
        open={isOpen}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <>
            <MenuItem style={{ display: 'flex', width: `${width}px` }}>
              <InputBase
                autoFocus
                placeholder={inputPlaceholder}
                onChange={handleSearch}
                style={{ flex: 'auto' }}
                value={search}
              />
              {isLoading && <CircularProgress thickness={5} size={25} />}
            </MenuItem>
            {data !== null && data.map((d, i) => (
              <MenuItem
                onClick={handleChoice}
                key={i}
                value={i}
              >{nameGetter(d)}
              </MenuItem>
            ))}
          </>
        </ClickAwayListener>
      </Menu>
    </FormControl>
  );
};

SmartSelect.propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  getData: PropTypes.func.isRequired,
  removeContainer: PropTypes.func.isRequired,
  temporary: PropTypes.objectOf(PropTypes.any).isRequired,
  getRequestUrl: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  valueCallback: PropTypes.func.isRequired,
  dataFilter: PropTypes.func.isRequired,
  nameGetter: PropTypes.func.isRequired,
};

SmartSelect.defaultProps = {
  error: false,
  disabled: false,
  width: 300,
};

function mapStateToProps(state) {
  return {
    temporary: state.temporary,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getData: ajaxRequest,
    removeContainer: removeRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SmartSelect);
