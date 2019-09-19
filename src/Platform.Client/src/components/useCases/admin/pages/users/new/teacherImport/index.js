import React, { useEffect, useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRequest, removeRequest, ajaxTypes } from '../../../../../../../store/common/temporary/actions';
import FileUploader from '../../../../../../common/fileUploader';
import { adminUrls } from '../../../../../../../utility/helpers/config';
import { guidGenerator } from '../../../../../../../utility/helpers/guid';
import { temporaryDataHandlers } from '../../../../../../../utility/helpers/handlers';
import { registerEvent } from '../../../../../../../store/common/events/actions';

const { getData, dispose } = temporaryDataHandlers;

const TeacherImport = ({
  containers,
  ajax,
  removeContainer,
  notify,
}) => {
  const [importId] = useState(guidGenerator());
  function handleImport(file) {
    ajax(importId, adminUrls.users.IMPORT_TEACHERS, ajaxTypes.UPLOAD, file);
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
    <div className="teacher-imp-panel">
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
          className: 'teacher-imp-button',
        }}
        uploadAction={handleImport}
      />
    </div>
  );
};

TeacherImport.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TeacherImport);
