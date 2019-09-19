import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivitiesList from '../../../../../../common/activitiesList';
import PanelTitle from '../../../../../../common/panelTitle';
import {
  getAllRequest,
} from '../../../../../../../store/student/activities/actions';


const ActivitiesSection = ({ ids, activities, get }) => {
  const {
    subjectId, sectionId,
  } = ids;
  useEffect(() => {
    get(subjectId, sectionId);
  }, []);

  function linkGenerator(activityId) {
    return `/mysubjects/${subjectId}/sections/${sectionId}/activities/${activityId}`;
  }

  return (
    <Paper className="panel">
      <PanelTitle title="Activities:" />
      <ActivitiesList
        activities={activities}
        linkGenerator={linkGenerator}
      />
    </Paper>
  );
};

ActivitiesSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  activities: PropTypes.arrayOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return { activities: state.activities.activities };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesSection);
