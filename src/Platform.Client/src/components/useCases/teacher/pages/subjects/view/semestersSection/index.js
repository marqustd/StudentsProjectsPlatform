import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommonTable, { extendWithLinks } from '../../../../../../common/table';
import AddSemesterModalButton from './addModal';
import { getAllRequest, getMoreRequest, addRequest } from '../../../../../../../store/teacher/semesters/actions';
import { commonTableHandlers, loaderHandler } from '../../../../../../../utility/helpers/handlers';
import loaderObject from '../../../../../../../utility/loaders/teacher/semesters';

const { checkForRefresh } = commonTableHandlers;

const headerKeyPairs = [
  { key: 'semesterName', title: 'Name' },
  { key: 'majorName', title: 'Major' },
];

const SemestersSection = ({
  subjectId, get, getMore, add, semesters, loaders,
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
      isLoading, setIsLoading,
    );
  }, [loaders]);

  function loadMore(index) {
    getMore(subjectId, index, searchPageSize);
  }

  const { array, totalCount } = semesters;
  const data = extendWithLinks(array, s => `/subjects/${subjectId}/semesters/${s.semesterId}`);


  return (
    <Paper className="panel-table">
      <CommonTable
        title="Semesters:"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalCount}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        isLoading={isLoading}
        hasLinks
      >
        <AddSemesterModalButton add={(majorId, password) => add(subjectId, majorId, password)} />
      </CommonTable>
    </Paper>
  );
};

SemestersSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  semesters: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
};


function mapStateToProps(state) {
  return {
    semesters: state.semesters.semestersState,
    loaders: state.semesters.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
    add: addRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SemestersSection);
