import React, { useEffect, useState } from 'react';
import {
  Typography, Button, Divider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogButton from '../../../../../../../common/dialogButton';
import loaderObject from '../../../../../../../../utility/loaders/admin/subjects';
import { obsoleteRequest, restoreRequest } from '../../../../../../../../store/admin/subjects/actions';

const SubjectView = ({
  switchToEdit,
  subject,
  obsoleteSubject, restoreSubject,
  loaders,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_SUBJECT);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, []);


  function obsolete() {
    obsoleteSubject(subject.id);
  }

  function restore() {
    restoreSubject(subject.id);
  }

  const { isObsolete } = subject;

  const theme = createMuiTheme({
    palette: {
      primary: {
        ...(isObsolete ? green : red),
        contrastText: 'white',
      },
    },
  });

  return (
    <>
      <Typography variant="h6" align="left">
        First name
      </Typography>
      <Typography variant="body1" align="left" gutterBottom>
        {subject.name || ''}
      </Typography>
      <Divider />
      <Typography variant="h6" align="left">
        Is Obsolete?
      </Typography>
      <Typography variant="body1" align="left" gutterBottom>
        {subject.isObsolete ? 'Obsoleted' : 'Active'}
      </Typography>
      <Divider />
      <footer className="details-buttons">
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={switchToEdit}
        >Edit
        </Button>
        <DialogButton
          buttonText={isObsolete ? 'Restore' : 'Obsolete'}
          dialogDescription={isObsolete ? 'Do you want to restore this subject?' : 'Do you want to obsolete this subject?'}
          dialogTitle={isObsolete ? 'Restore subject' : 'Obsolete subject'}
          isLoading={isLoading}
          onOk={isObsolete ? restore : obsolete}
          theme={theme}
        />
      </footer>
    </>
  );
};

SubjectView.propTypes = {
  switchToEdit: PropTypes.func.isRequired,
  subject: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  obsoleteSubject: PropTypes.func.isRequired,
  restoreSubject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    subject: state.subjectState.subject,
    loaders: state.subjectState.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    obsoleteSubject: obsoleteRequest,
    restoreSubject: restoreRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SubjectView);
