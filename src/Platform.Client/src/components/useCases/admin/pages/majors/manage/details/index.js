import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MajorView from './view';
import MajorEdit from './edit';
import { Infos } from '../../../../../../../utility/events/admin/majors';
import { getRequest, handleEvent as handleMajorEvent } from '../../../../../../../store/admin/majors/actions';

const MajorDetails = ({
  getMajor, match, events, handleEvent,
}) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const event = events.find(e => e.code === Infos.MAJOR_FETCHED.code);
    if (event) {
      if (loading) { setLoading(false); }
      handleEvent(event.id);
    }
    // Add failed fetch, not found cases
  }, [events]);

  useEffect(() => {
    getMajor(match.params.id);
  }, []);

  return (
    <Paper className="details-panel">
      {!loading && (edit
        ? <MajorEdit switchToView={() => setEdit(false)} />
        : <MajorView switchToEdit={() => setEdit(true)} />)}
      {loading && <div>loading...</div>}
    </Paper>
  );
};

MajorDetails.propTypes = {
  getMajor: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    events: state.majorState.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMajor: getRequest,
    handleEvent: handleMajorEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MajorDetails));
