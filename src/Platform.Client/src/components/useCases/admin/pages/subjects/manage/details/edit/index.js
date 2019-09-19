import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Divider, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loaderObject from '../../../../../../../../utility/loaders/admin/subjects';
import { editRequest, handleEvent } from '../../../../../../../../store/admin/subjects/actions';
import { Errors, Infos } from '../../../../../../../../utility/events/admin/subjects';
import { registerEvent } from '../../../../../../../../store/common/events/actions';

const SubjectEdit = ({
  subject, switchToView, updateSubject, loaders, events, handleSubjectEvent, show,
}) => {
  const [name, setName] = useState(subject.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidName, setIsValidName] = useState(true);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_SUBJECT);
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
    let event = events.find(e => e.code === Errors.SUBJECT_EDIT_NAME_CONFLICT.code);
    if (event) {
      setIsValidName(false);
      handleSubjectEvent(event.id);
      show(event);
    }
    // If edit was succesful
    event = events.find(e => e.code === Infos.SUBJECT_UPDATED.code);
    if (event) {
      switchToView();
      handleSubjectEvent(event.id);
      show(event);
    }
  }, [events]);

  function update() {
    updateSubject(subject.id, name);
  }

  function handleInput(setter) {
    return (e) => {
      if (!isValidName) { setIsValidName(true); }
      setter(e.target.value);
    };
  }

  return (
    <>
      <FormControl>
        <Typography variant="h6" align="left">
       Subject Name
        </Typography>
        <TextField
          error={!isValidName}
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
          disabled={isLoading || !isValidName}
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

SubjectEdit.propTypes = {
  switchToView: PropTypes.func.isRequired,
  updateSubject: PropTypes.func.isRequired,
  subject: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSubjectEvent: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    subject: state.subjectState.subject,
    loaders: state.subjectState.loads,
    events: state.subjectState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateSubject: editRequest,
    handleSubjectEvent: handleEvent,
    show: registerEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEdit);
