import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Divider, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loaderObject from '../../../../../../../../utility/loaders/admin/majors';
import { editRequest, handleEvent } from '../../../../../../../../store/admin/majors/actions';
import { Errors, Infos } from '../../../../../../../../utility/events/admin/majors';
import { registerEvent } from '../../../../../../../../store/common/events/actions';

const MajorEdit = ({
  major, switchToView, updateMajor, loaders, events, handleMajorEvent, show,
}) => {
  const [name, setName] = useState(major.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_MAJOR);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(() => { setIsLoading(false); }, 500);
    }
  }, [loaders]);


  useEffect(() => {
    // If edit failed
    let event = events.find(e => e.code === Errors.MAJOR_EDIT_NAME_CONFLICT.code);
    if (event) {
      setIsValid(false);
      handleMajorEvent(event.id);
      show(event);
    }
    // If edit was succesful
    event = events.find(e => e.code === Infos.MAJOR_UPDATED.code);
    if (event) {
      switchToView();
      handleMajorEvent(event.id);
      show(event);
    }
  }, [events]);

  function update() {
    updateMajor(major.id, name);
  }

  function handleInput(setter) {
    return (e) => {
      if (!isValid) { setIsValid(true); }
      setter(e.target.value);
    };
  }

  return (
    <>
      <Typography variant="h6" align="left">
       Major Name
      </Typography>
      <FormControl>
        <TextField
          error={!isValid}
          type="text"
          value={name}
          onChange={handleInput(setName)}
        />
      </FormControl>
      <Divider />
      <footer className="details-buttons">
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={switchToView}
        >Cancel
        </Button>
        <Button
          disabled={isLoading || !isValid}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={update}
        >{!isLoading
          ? 'Save'
          : <CircularProgress color="primary" size={30} thickness={5} />}
        </Button>
      </footer>
    </>
  );
};

MajorEdit.propTypes = {
  switchToView: PropTypes.func.isRequired,
  updateMajor: PropTypes.func.isRequired,
  major: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleMajorEvent: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    major: state.majorState.major,
    loaders: state.majorState.loads,
    events: state.majorState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateMajor: editRequest,
    handleMajorEvent: handleEvent,
    show: registerEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MajorEdit);
