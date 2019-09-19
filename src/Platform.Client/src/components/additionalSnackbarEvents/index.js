import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { handleEvent } from '../../store/common/events/actions';


const SideEventsHandler = ({
  handleEventProp, events, enqueueSnackbar,
}) => {
  useEffect(() => {
    if (events[0]) {
      enqueueSnackbar(`${events[0].message}`);
      handleEventProp(events[0].id);
    }
  }, [events[0]]);

  return (
    <div />
  );
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleEventProp: handleEvent }, dispatch);
}

function mapStateToProps(state) {
  return {
    events: state.events.events,
  };
}

SideEventsHandler.propTypes = {
  handleEventProp: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
  enqueueSnackbar: PropTypes.func.isRequired,
};

SideEventsHandler.defaultProps = {
  events: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SideEventsHandler));
