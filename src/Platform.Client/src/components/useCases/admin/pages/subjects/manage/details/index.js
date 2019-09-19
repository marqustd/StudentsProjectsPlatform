import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SubjectView from './view';
import SubjectEdit from './edit';
import { Infos } from '../../../../../../../utility/events/admin/subjects';
import { getRequest, handleEvent as handleSubjectEvent } from '../../../../../../../store/admin/subjects/actions';

const SubjectDetails = ({
  getSubject, match, events, handleEvent,
}) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const event = events.find(e => e.code === Infos.SUBJECT_FETCHED.code);
    if (event) {
      if (loading) { setLoading(false); }
      handleEvent(event.id);
    }
    // Add failed fetch, not found cases
  }, [events]);

  useEffect(() => {
    getSubject(match.params.id);
  }, []);

  return (
    <Paper className="details-panel">
      {!loading && (edit
        ? <SubjectEdit switchToView={() => setEdit(false)} />
        : <SubjectView switchToEdit={() => setEdit(true)} />)}
      {loading && <div>loading...</div>}
    </Paper>
  );
};

SubjectDetails.propTypes = {
  getSubject: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    events: state.subjectState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubject: getRequest,
    handleEvent: handleSubjectEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubjectDetails));
