import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Activity from '../../../../../../common/activity';
import { guidGenerator } from '../../../../../../../utility/helpers/guid';
import './style.scss';
import AddActivityModal from './addModal';
import PanelTitle from '../../../../../../common/panelTitle';
import {
  getAllRequest, addRequest, eventActions,
} from '../../../../../../../store/teacher/activityTemplates/actions';
import { eventHandler } from '../../../../../../../utility/helpers/handlers';
import { Infos } from '../../../../../../../utility/events/teacher/activities';
import LoadingPage from '../../../../../../pages/loading';

const { eventRemoveRequest } = eventActions.actions;
const ActivitiesSection = ({
  activities, get, add, ids, events, handleEvent,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { subjectId, topicId } = ids;

  function getTemplates() {
    get(subjectId, topicId);
  }

  useEffect(() => {
    eventHandler(
      events,
      Infos.ACTIVITIES_FETCHED.code,
      handleEvent,
      () => setLoaded(true),
    );
  }, [events]);

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <Paper className="panel">
      <PanelTitle title="Activities:" />
      <div className="activities">
        {loaded ? activities.map(d => (
          <div className="activity-container" key={`li_${guidGenerator()}`}>
            <Activity
              key={`activity_${guidGenerator()}`}
              name={d.name}
              link={`/subjects/${subjectId}/topics/${topicId}/activities/${d.activityId}`}
            />
          </div>
        ))
          : <LoadingPage />}
      </div>
      <AddActivityModal
        add={(name, includeArtifacts) => add(
          subjectId,
          topicId,
          name,
          includeArtifacts,
        )}
      />
      <Button onClick={getTemplates}>
        {'Refresh'}
      </Button>
    </Paper>
  );
};

ActivitiesSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  activities: PropTypes.arrayOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    activities: state.activityTemplates.activities,
    events: state.activityTemplates.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    add: addRequest,
    handleEvent: eventRemoveRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesSection);
