import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, FormControlLabel, Checkbox, createMuiTheme, Button,
} from '@material-ui/core';
import Red from '@material-ui/core/colors/red';
import EditableField from '../../../../../../../common/editableField';
import PanelTitle from '../../../../../../../common/panelTitle';
import DialogButton from '../../../../../../../common/dialogButton';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      ...Red,
      contrastText: 'white',
    },
  },
});

const NameSection = ({
  name, includeArtifact, isObsolete, edit, remove, reopen, obsolete,
}) => {
  const [include, setInclude] = useState(includeArtifact);
  const [title, setTitle] = useState(name);

  useEffect(() => {
    setInclude(include);
  }, [includeArtifact]);

  useEffect(() => {
    setTitle(name);
  }, [name]);

  return (
    <Paper className="panel">
      <PanelTitle title="Settings:" />
      <EditableField changeName={setTitle} name={title} />
      <div>
        <FormControlLabel
          control={(
            <Checkbox
              value="include"
              color="primary"
              checked={include}
              onClick={e => setInclude(e.target.checked)}
            />
        )}
          label="Include artifact?"
          labelPlacement="end"
        />
      </div>
      <div className="control-footer">
        {isObsolete
          ? (
            <>
              <DialogButton
                buttonClass="activity-delete-btn"
                theme={buttonTheme}
                dialogDescription={name}
                dialogTitle="Do you want to delete this activity?"
                buttonText="Delete"
                cancelText="Cancel"
                okText="Delete"
                onOk={remove}
              />
              <DialogButton
                dialogTitle="Do you want to reopen this activity?"
                dialogDescription={name}
                okText="Reopen"
                buttonText="Reopen"
                cancelText="Cancel"
                onOk={reopen}
              />
            </>
          )
          : (
            <DialogButton
              dialogTitle="Do you want to obsolete this activity?"
              dialogDescription={name}
              okText="Obsolete"
              buttonText="Obsolete"
              cancelText="Cancel"
              onOk={obsolete}
            />
          )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => edit(title, include)}
        >Save changes
        </Button>
      </div>
    </Paper>
  );
};

NameSection.propTypes = {
  name: PropTypes.string.isRequired,
  includeArtifact: PropTypes.bool.isRequired,
  isObsolete: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  obsolete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  reopen: PropTypes.func.isRequired,
};

export default NameSection;
