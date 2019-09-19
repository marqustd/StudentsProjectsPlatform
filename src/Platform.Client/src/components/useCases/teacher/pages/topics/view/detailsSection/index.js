import React from 'react';
import PropTypes from 'prop-types';
import { Paper, createMuiTheme } from '@material-ui/core';
import Red from '@material-ui/core/colors/red';
import Green from '@material-ui/core/colors/green';
import TopicName from '../../../../../../common/editableField';
import DialogButton from '../../../../../../common/dialogButton';

const obsoleteTheme = createMuiTheme({
  palette: {
    primary: {
      ...Red,
      contrastText: 'white',
    },
  },
});

const restoreTheme = createMuiTheme({
  palette: {
    primary: {
      ...Green,
      contrastText: 'white',
    },
  },
});

const DetailsSection = ({
  isObsolete, name, edit, obsolete, restore,
}) => (
  <Paper className="panel">
    <TopicName name={name} changeName={edit} />
    <div className="control-footer">
      <DialogButton
        theme={isObsolete ? restoreTheme : obsoleteTheme}
        buttonText={`${isObsolete ? 'Restore' : 'Obsolete'} topic`}
        dialogTitle={`Do you want to ${isObsolete ? 'restore' : 'obsolete'} topic?`}
        dialogDescription={name}
        onOk={() => (isObsolete ? restore() : obsolete())}
      />
    </div>
  </Paper>
);

DetailsSection.propTypes = {
  name: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  obsolete: PropTypes.func.isRequired,
  restore: PropTypes.func.isRequired,
  isObsolete: PropTypes.bool.isRequired,
};

export default DetailsSection;
