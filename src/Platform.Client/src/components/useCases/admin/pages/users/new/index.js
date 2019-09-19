import React from 'react';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import StudentManual from './studentManual';
import StudentImport from './studentImport';
import TeacherManual from './teacherManual';
import TeacherImport from './teacherImport';
import AdminManual from './adminManual';
import './style.scss';

const NewUser = () => (
  <div className="new-user-panels">
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4" gutterBottom className="student-man-header">
          {'Create student manually'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <StudentManual />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4" gutterBottom className="teacher-man-header">
          {'Create teacher manually'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TeacherManual />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4" gutterBottom className="admin-man-header">
          {'Create admin manually'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <AdminManual />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4" gutterBottom className="student-imp-header">
          {"Import student's list"}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <StudentImport />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4" gutterBottom className="teacher-imp-header">
          {"Import teacher's list"}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TeacherImport />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
);

export default NewUser;
