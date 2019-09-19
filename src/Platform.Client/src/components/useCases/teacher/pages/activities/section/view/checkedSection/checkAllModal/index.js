import React from 'react';
import PropTypes from 'prop-types';
import DialogButton from '../../../../../../../../common/dialogButton';
import './style.scss';

const CheckAllModal = ({ checkAll, uncheck }) => {
  function handleCheck() {
    checkAll();
  }

  return (
    <>
      <DialogButton
        buttonClass="check-all-modal"
        okText="Confirm"
        dialogTitle={`Do you want to set all to ${uncheck ? 'Unchecked' : 'Checked'}?`}
        onOk={handleCheck}
        buttonText={uncheck ? 'Uncheck All' : 'Check All'}
      />
    </>
  );
};

CheckAllModal.propTypes = {
  checkAll: PropTypes.func.isRequired,
  uncheck: PropTypes.bool,
};

CheckAllModal.defaultProps = {
  uncheck: false,
};

export default CheckAllModal;
