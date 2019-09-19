import React from 'react';
import {
  ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import Content from './content';

const NewSubjectPanel = () => (
  <ExpansionPanel className="subject-add">
    <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
      <Typography variant="h4" gutterBottom>
        Add subject
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Content />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default NewSubjectPanel;
