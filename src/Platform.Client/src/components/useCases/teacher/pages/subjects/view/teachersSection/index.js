import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CommonTable from '../../../../../../common/table';
import AddTeacherModalButton from './addModal';
import DialogButton from '../../../../../../common/dialogButton';
import {
  getAllRequest, getMoreRequest, addRequest, removeRequest,
} from '../../../../../../../store/teacher/teachers/actions';
import { commonTableHandlers, loaderHandler } from '../../../../../../../utility/helpers/handlers';
import loaderObject from '../../../../../../../utility/loaders/teacher/teachers';
import './style.scss';

const { checkForRefresh } = commonTableHandlers;

const headerKeyPairs = [
  { key: 'name', title: 'Name' },
  { key: 'action', title: '' },
];

const TeachersSection = ({
  subjectId, get, getMore, remove, add, teachers, loaders,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  function refreshCallback() {
    get(subjectId, 0, searchPageSize);
  }

  useEffect(() => {
    refreshCallback();
  }, []);

  useEffect(() => {
    loaderHandler(
      loaders,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading,
    );
  }, [loaders]);


  function loadMore(index) {
    getMore(subjectId, index, searchPageSize);
  }

  const { array, totalCount } = teachers;
  const data = array.map(t => ({
    ...t,
    action: (
      <DialogButton
        buttonClass="remove-teacher"
        dialogTitle="Do you want to delete this teacher?"
        dialogDescription={t.name}
        okText="Delete"
        icon={<CloseOutlined />}
        onOk={() => remove(subjectId, t.teacherId)}
      />
    ),
  }));

  return (
    <Paper className="panel-table">
      <CommonTable
        title="Assigned Teachers:"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalCount}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        isLoading={isLoading}
      >
        <AddTeacherModalButton add={(teacherId) => { add(subjectId, teacherId); }} />
      </CommonTable>
    </Paper>
  );
};


TeachersSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  teachers: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
    add: addRequest,
    remove: removeRequest,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    teachers: state.teachers.teachersState,
    loaders: state.teachers.loads,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeachersSection);
