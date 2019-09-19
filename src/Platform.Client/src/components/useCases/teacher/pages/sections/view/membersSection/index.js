import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CloseOutlined } from '@material-ui/icons';
import CommonTable from '../../../../../../common/table';
import DialogButton from '../../../../../../common/dialogButton';
import {
  getAllRequest, getMoreRequest,
  addRequest, removeRequest,
  gradeRequest, gradeAllRequest,
} from '../../../../../../../store/teacher/students/actions';
import AddMemberModal from './addModal';
import GradeAllModal from './gradeAllModal';
import GradeModal from './gradeModal';
import { commonTableHandlers, loaderHandler } from '../../../../../../../utility/helpers/handlers';
import loaderObject from '../../../../../../../utility/loaders/teacher/students';
import './style.scss';

const headerKeyPairs = [
  { key: 'name', title: 'Name' },
  { key: 'grade', title: 'Grade' },
  { key: 'gradeBtn', title: '' },
  { key: 'deleteBtn', title: '' },
];
const { checkForRefresh } = commonTableHandlers;
const MembersSection = ({
  ids,
  students, loaders,
  get, getMore,
  add, remove,
  grade, gradeAll,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;
  const { subjectId, sectionId, semesterId } = ids;

  useEffect(() => {
    loaderHandler(
      loaders,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading,
    );
  }, [loaders]);

  function refreshCallback() {
    get(subjectId, sectionId, 0, searchPageSize);
  }

  function loadMore(index) {
    getMore(subjectId, sectionId, index, searchPageSize);
  }

  useEffect(() => {
    refreshCallback();
  }, []);


  function handleAdd(studentId) {
    add(subjectId, sectionId, studentId);
  }

  const { array, totalCount } = students;
  const data = array.map((d, i) => ({
    ...d,
    gradeBtn: <GradeModal
      key={`${i}_grade_modal`}
      gradeHandler={gr => grade(subjectId, sectionId, d.studentId, gr)}
    />,
    deleteBtn: <DialogButton
      key={`${i}_delete_modal`}
      buttonClass="remove-member-btn"
      okText="Remove"
      cancelText="Cancel"
      dialogTitle="Do you want to remove member?"
      dialogDescription={d.name}
      icon={<CloseOutlined />}
      onOk={() => remove(subjectId, sectionId, d.studentId)}
    />,
  }));


  return (
    <Paper className="panel-table">
      <CommonTable
        title="Students"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalCount}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        isLoading={isLoading}
      >
        <AddMemberModal
          semesterId={semesterId}
          add={handleAdd}
        />
        <GradeAllModal
          gradeHandler={gr => gradeAll(subjectId, sectionId, gr)}
        />
      </CommonTable>
    </Paper>
  );
};

MembersSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  students: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
  grade: PropTypes.func.isRequired,
  gradeAll: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
    remove: removeRequest,
    add: addRequest,
    grade: gradeRequest,
    gradeAll: gradeAllRequest,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    students: state.students.studentsState,
    loaders: state.students.loads,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersSection);
