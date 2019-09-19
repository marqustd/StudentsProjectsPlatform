import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ModalButton from '../../../../../common/dialogButton';
import PanelTitle from '../../../../../common/panelTitle';
import ActivitiesSection from './activities';
import DiscussionSection from './discussion';

const SignedSection = ({
  signOut, ids, sectionName, sectionGrade,
}) => (
  <>
    <ActivitiesSection ids={ids} />
    <DiscussionSection ids={ids} />
    <Paper className="panel">
      <PanelTitle title={`Section name: ${sectionName}`} />
      <Typography variant="headline">{`Grade: ${sectionGrade === null ? 'None' : sectionGrade}`}</Typography>
      <div className="control-footer">
        <ModalButton
          buttonText="Sign out"
          cancelText="Cancel"
          dialogDescription="Do you want to sign out from this section?"
          dialogTitle="Sign out"
          okText="Confirm"
          onOk={signOut}
          buttonClass="sign-out-btn"
        />
      </div>
    </Paper>
  </>
);

SignedSection.propTypes = {
  signOut: PropTypes.func.isRequired,
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionGrade: PropTypes.number,
};

SignedSection.defaultProps = {
  sectionGrade: 0,
};

export default SignedSection;
