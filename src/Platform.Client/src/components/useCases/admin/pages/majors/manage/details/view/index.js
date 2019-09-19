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
import loaderObject from '../../../../../../../../utility/loaders/admin/majors';
import { obsoleteRequest, restoreRequest } from '../../../../../../../../store/admin/majors/actions';

const MajorView = ({
  switchToEdit,
  major,
  obsoleteMajor, restoreMajor,
  loaders,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_MAJOR);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, []);


  function obsolete() {
    obsoleteMajor(major.id);
  }

  function restore() {
    restoreMajor(major.id);
  }

  const { isObsolete } = major;

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
        {major.name || ''}
      </Typography>
      <Divider />
      <Typography variant="h6" align="left">
        Is Obsolete?
      </Typography>
      <Typography variant="body1" align="left" gutterBottom>
        {major.isObsolete ? 'Obsoleted' : 'Active'}
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
          dialogDescription={isObsolete ? 'Do you want to restore this major?' : 'Do you want to obsolete this major?'}
          dialogTitle={isObsolete ? 'Restore major' : 'Obsolete major'}
          isLoading={isLoading}
          onOk={isObsolete ? restore : obsolete}
          theme={theme}
        />
      </footer>
    </>
  );
};

MajorView.propTypes = {
  switchToEdit: PropTypes.func.isRequired,
  major: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  obsoleteMajor: PropTypes.func.isRequired,
  restoreMajor: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    major: state.majorState.major,
    loaders: state.majorState.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    obsoleteMajor: obsoleteRequest,
    restoreMajor: restoreRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MajorView);
