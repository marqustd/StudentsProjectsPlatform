import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AdminView from './view';
import AdminEdit from './edit';
import { getAdminRequest, handleUsersEvent } from '../../../../../../../../store/admin/users/actions';
import { usersInfos } from '../../../../../../../../utility/events/admin/users';

const AdminDetails = ({
  getAdmin, match, events, handleEvent,
}) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const event = events.find(e => e.code === usersInfos.USER_FETCHED.code);
    if (event) {
      if (loading) { setLoading(false); }
      handleEvent(event.id);
    }
    // Add failed fetch, not found cases
  }, [events]);

  useEffect(() => {
    getAdmin(match.params.id);
  }, []);

  return (
    <Paper className="details-panel">
      {!loading && (edit
        ? <AdminEdit switchToView={() => setEdit(false)} />
        : <AdminView switchToEdit={() => setEdit(true)} />)}
      {loading && <div>loading...</div>}
    </Paper>
  );
};

AdminDetails.propTypes = {
  getAdmin: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    events: state.users.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAdmin: getAdminRequest,
    handleEvent: handleUsersEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminDetails));
