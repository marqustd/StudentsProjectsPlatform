import React from 'react';
import {
  Paper, createMuiTheme, Typography, Button,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CloudDownloadOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import DialogButton from '../../../../../../common/dialogButton';
import ChangeStateBtn from './changeStateBtn';
import './style.scss';

const semesterState = [
  'Open',
  'Closed',
  'Canceled',
];


const obsoleteTheme = createMuiTheme({
  palette: {
    primary: {
      ...red,
      contrastText: 'white',
    },
  },
});

const restoreTheme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      contrastText: 'white',
    },
  },
});

const DetailsSection = ({
  semester, obsolete, restore, edit, reportLink,
}) => {
  const semesterName = semester.semesterName || '';
  const majorName = semester.majorName || '';
  const state = semesterState[semester.state];
  const isObsolete = semester.obsolete || false;
  const password = semester.password || 'N/A';

  return (
    <Paper className="panel">
      <Typography variant="headline">{`Semester: ${semesterName}`}</Typography>
      <Typography variant="headline">{`Major: ${majorName}`}</Typography>
      <Typography variant="headline">{`State: ${state}`}</Typography>
      <Typography variant="headline">{`Password: ${password}`}</Typography>
      <div className="control-footer">
        {semester.state === 1 && (
        <Button type="download" className="report-download" variant="contained">
          <a href={reportLink} download><span><CloudDownloadOutlined />{' Report'}</span></a>
        </Button>
        )}
        <ChangeStateBtn
          changeState={edit}
          semesterName={semesterName}
          state={state}
        />
        <DialogButton
          theme={isObsolete ? restoreTheme : obsoleteTheme}
          buttonText={`${isObsolete ? 'Restore' : 'Obsolete'} semester`}
          dialogTitle={`Do you want to ${isObsolete ? 'restore' : 'obsolete'} semester?`}
          dialogDescription={semesterName}
          onOk={() => (isObsolete ? restore() : obsolete())}
        />
      </div>
    </Paper>
  );
};

DetailsSection.propTypes = {
  reportLink: PropTypes.string.isRequired,
  semester: PropTypes.objectOf(PropTypes.any).isRequired,
  obsolete: PropTypes.func.isRequired,
  restore: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default DetailsSection;
