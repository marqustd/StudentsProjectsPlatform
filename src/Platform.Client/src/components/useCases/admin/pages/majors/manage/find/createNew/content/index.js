
import React, { useState, useEffect } from 'react';
import {
  Button, Typography, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loaderObject from '../../../../../../../../../utility/loaders/admin/majors';
import { registerEvent } from '../../../../../../../../../store/common/events/actions';
import { addRequest, handleEvent as handleMajorEvent } from '../../../../../../../../../store/admin/majors/actions';
import { Errors } from '../../../../../../../../../utility/events/admin/majors';

const AddMajor = ({
  loaders, events, addMajor, show, handleEvent,
}) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.ADD_MAJOR);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders]);

  useEffect(() => {
    const event = events.find(e => e.code === Errors.MAJOR_ADD_NAME_CONFLICT.code); // TODO
    if (event) {
      setIsValid(false);
      show(event);
      handleEvent(event.id);
    }
  }, [events[0]]);

  function handleInput(setter) {
    return (e) => {
      if (!isValid) { setIsValid(true); }
      return setter(e.target.value);
    };
  }

  function handleCreate() {
    addMajor(name);
  }


  return (
    <div className="major-add-panel">
      <FormControl className="major-add-panel-content">
        <Typography variant="h6" gutterBottom>
        Major name
        </Typography>
        <TextField
          error={!isValid}
          required
          fullWidth
          type="text"
          placeholder="Major name"
          className="name-input"
          margin="normal"
          value={name}
          onChange={handleInput(setName)}
        />
      </FormControl>
      <Button
        disabled={!isValid || isLoading}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="major-add-button"
        onClick={handleCreate}
      >{isLoading
        ? <CircularProgress color="primary" size={30} thickness={5} />
        : (
          <span>Create<i
            style={{ marginLeft: '10px' }}
            className="fas fa-sign-in-alt"
          />
          </span>
        )}
      </Button>
    </div>
  );
};


AddMajor.propTypes = {
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  show: PropTypes.func.isRequired,
  addMajor: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaders: state.majorState.loads,
    events: state.majorState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    show: registerEvent,
    addMajor: addRequest,
    handleEvent: handleMajorEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMajor);
