import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Activity from '../activity';
import { guidGenerator } from '../../../utility/helpers/guid';


const ActivitiesList = ({ activities, linkGenerator }) => {
  let list = activities.map(d => (
    <div className="activity-container" key={`li_${guidGenerator()}`}>
      <Activity
        key={`activity_${guidGenerator()}`}
        name={d.name}
        link={linkGenerator(d.activityId)}
      />
    </div>
  ));

  if (list.length === 0) {
    list = <Typography>No activites</Typography>;
  }

  return (
    <div className="activities">
      {list}
    </div>
  );
};

ActivitiesList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkGenerator: PropTypes.func.isRequired,
};

export default ActivitiesList;
