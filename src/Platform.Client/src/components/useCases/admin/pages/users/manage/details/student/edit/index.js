import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Divider, TextField, FormControl, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loaderObject from '../../../../../../../../../utility/loaders/admin/users';
import '../../style.scss';
import { editStudentRequest } from '../../../../../../../../../store/admin/users/actions';


const StudentEdit = ({
  user, switchToView, updateStudent, loaders,
}) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const loader = loaders.find(l => l === loaderObject.UPDATE_USER);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(() => { setIsLoading(false); switchToView(); }, 500);
    }
  }, [loaders]);

  function updateUser() {
    updateStudent({
      id: user.id, firstName, lastName, email,
    });
  }

  return (
    <>
      <Typography variant="h6" align="left">
        First name
      </Typography>
      <FormControl>
        <TextField
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </FormControl>
      <Divider />
      <Typography variant="h6" align="left">
        Second name
      </Typography>
      <FormControl>
        <TextField
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </FormControl>
      <Divider />
      <Typography variant="h6" align="left">
        Email address
      </Typography>
      <FormControl>
        <TextField
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <Divider />
      <footer className="details-buttons">
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={switchToView}
        >Cancel
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={updateUser}
        >{!isLoading
          ? 'Save'
          : <CircularProgress color="primary" size={30} thickness={5} />}
        </Button>
      </footer>
    </>
  );
};


StudentEdit.propTypes = {
  switchToView: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateStudent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.users.user,
    loaders: state.users.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStudent: editStudentRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);
