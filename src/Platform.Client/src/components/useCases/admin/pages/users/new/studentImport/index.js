import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileUploader from '../../../../../../common/fileUploader';
import { ajaxRequest, removeRequest, ajaxTypes } from '../../../../../../../store/common/temporary/actions';
import './style.scss';
import { adminUrls } from '../../../../../../../utility/helpers/config';
import { guidGenerator } from '../../../../../../../utility/helpers/guid';
import { temporaryDataHandlers } from '../../../../../../../utility/helpers/handlers';
import { registerEvent } from '../../../../../../../store/common/events/actions';

const { dispose, getData } = temporaryDataHandlers;


const StudentImport = ({
  containers,
  ajax,
  removeContainer,
  notify,
}) => {
  const [importId] = useState(guidGenerator());
  function handleImport(file) {
    ajax(importId, adminUrls.users.IMPORT_STUDENTS, ajaxTypes.UPLOAD, file);
  }
  function importCallback(count) {
    notify({ message: `${count} users were added.` });
  }
  useEffect(() => {
    getData(containers, importId, null, null, importCallback);
  }, [containers]);

  useEffect(() => () => {
    dispose(importId, removeContainer);
  }, []);

  return (
    <div className="student-imp-panel">
      <FileUploader
        buttonContent={(
          <>Import
            <i
              style={{ marginLeft: '10px' }}
              className="fas fa-sign-in-alt"
            />
          </>
        )}
        buttonProps={{
          type: 'submit',
          fullWidth: true,
          variant: 'contained',
          color: 'primary',
          className: 'student-imp-button',
        }}
        uploadAction={handleImport}
      />
    </div>
  );
};

StudentImport.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.any).isRequired,
  ajax: PropTypes.func.isRequired,
  removeContainer: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    containers: state.temporary,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ajax: ajaxRequest,
    removeContainer: removeRequest,
    notify: registerEvent,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentImport);
