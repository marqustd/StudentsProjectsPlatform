import React, { useEffect, useState } from 'react';
import {
  Typography, Button, Divider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogButton from '../../../../../../../../common/dialogButton';
import { obsoleteAdminRequest, restoreAdminRequest } from '../../../../../../../../../store/admin/users/actions';
import loaderObject from '../../../../../../../../../utility/loaders/admin/users';
import '../../style.scss';

const AdminView = ({
  switchToEdit,
  user,
  obsoleteAdmin, restoreAdmin,
  loaders,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_USER);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [loaders]);


  function obsoleteUser() {
    obsoleteAdmin(user.id);
  }

  function reopenUser() {
    restoreAdmin(user.id);
  }

  const { isObsolete } = user;

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
      <Typography variant="body2" align="left" gutterBottom>
        {user.firstName || ''}
      </Typography>
      <Divider />
      <Typography variant="h6" align="left">
        Second name
      </Typography>
      <Typography variant="body2" align="left" gutterBottom>
        {user.lastName || ''}
      </Typography>
      <Divider />
      <Typography variant="h6" align="left">
        Email address
      </Typography>
      <Typography variant="body2" align="left" gutterBottom>
        {user.email || ''}
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
          buttonText={isObsolete ? 'Reopen' : 'Obsolete'}
          dialogDescription={isObsolete ? 'Do you want to reopen this user?' : 'Do you want to obsolete this user?'}
          dialogTitle={isObsolete ? 'Reponen user' : 'Obsolete user'}
          isLoading={isLoading}
          onOk={isObsolete ? reopenUser : obsoleteUser}
          theme={theme}
        />
      </footer>
    </>
  );
};

AdminView.propTypes = {
  switchToEdit: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  obsoleteAdmin: PropTypes.func.isRequired,
  restoreAdmin: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.users.user,
    loaders: state.users.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    obsoleteAdmin: obsoleteAdminRequest,
    restoreAdmin: restoreAdminRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
