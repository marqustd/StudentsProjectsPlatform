import React from 'react';
import PropTypes from 'prop-types';
import DialogButton from '../../../../../../../../common/dialogButton';
import './style.scss';

const CheckModal = ({ check, isChecked, member }) => {
  function handleCheck() {
    check(!isChecked);
  }

  return (
    <>
      <DialogButton
        buttonClass="check-modal"
        okText="Confirm"
        dialogTitle={`Set this activity as ${isChecked ? 'Unchecked' : 'Checked'} for:`}
        dialogDescription={member}
        onOk={handleCheck}
        buttonText={isChecked ? 'Uncheck' : 'Check'}
      />
    </>
  );
};

CheckModal.propTypes = {
  check: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  member: PropTypes.string.isRequired,
};

export default CheckModal;
