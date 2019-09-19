import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../common/panelTitle';
import ModalButton from '../../../../../common/dialogButton';

const NotSignedSection = ({ signIn, sectionName }) => (
  <Paper className="panel">
    <PanelTitle title={`Section name: ${sectionName}`} />
    <div className="control-footer">
      <ModalButton
        buttonText="Sign in"
        cancelText="Cancel"
        dialogDescription="Do you want to sign in to this section?"
        dialogTitle="Sign in"
        okText="Confirm"
        onOk={signIn}
        buttonClass="sign-in-button"
      />
    </div>
  </Paper>
);

NotSignedSection.propTypes = {
  signIn: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired,
};

export default NotSignedSection;
