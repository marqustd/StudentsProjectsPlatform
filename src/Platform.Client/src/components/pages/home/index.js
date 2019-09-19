import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest } from '../../../store/common/auth/actions';


const index = () => (
  <div>
HOME
  </div>
);


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout: logoutRequest }, dispatch);
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
