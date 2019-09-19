import React from 'react';
import {
  ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import AddMajorContent from './content';

const NewMajorPanel = () => (
  <ExpansionPanel className="major-add">
    <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
      <Typography variant="h4" gutterBottom>
        Add major
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <AddMajorContent />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default NewMajorPanel;
