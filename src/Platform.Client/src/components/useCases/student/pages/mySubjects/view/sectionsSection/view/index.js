import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRequest, eventActions } from '../../../../../../../../store/student/sections/actions';
import { eventHandler } from '../../../../../../../../utility/helpers/handlers';
import { Infos } from '../../../../../../../../utility/events/student/sections';
import LoadingPage from '../../../../../../../pages/loading/index';

const { eventRemoveRequest } = eventActions.actions;
const SectionsSection = ({
  subjectId, sectionId, get, handleEvent, sectionsState,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(subjectId, sectionId);
  }, []);

  const { events, section } = sectionsState;

  useEffect(() => {
    eventHandler(
      events,
      Infos.GET_COMPLETED.code,
      handleEvent,
      () => setLoaded(true),
    );
  }, [events]);

  const { name, topicName } = section;

  return (
    <>
      {loaded ? (
        <div>
          <Typography variant="headline">{`Section name: ${name}`}</Typography>
          <Typography variant="headline">{`Topic name: ${topicName}`}</Typography>
          <Button>
            <Link to={`/mysubjects/${subjectId}/sections/${sectionId}`}>Show details</Link>
          </Button>
        </div>
      ) : <LoadingPage />}
    </>
  );
};

SectionsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  sectionId: PropTypes.number.isRequired,
  sectionsState: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    sectionsState: state.sections,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    handleEvent: eventRemoveRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionsSection);
