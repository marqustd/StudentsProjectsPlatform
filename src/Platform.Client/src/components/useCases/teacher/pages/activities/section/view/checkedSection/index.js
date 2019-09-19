import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CommonTable from '../../../../../../../common/table';
import CheckModal from './checkModal';
import CheckAllModal from './checkAllModal';
import { loaderHandler, commonTableHandlers } from '../../../../../../../../utility/helpers/handlers';
import loaderObject from '../../../../../../../../utility/loaders/teacher/grades';
import {
  getAllRequest, getMoreRequest, checkRequest, checkAllRequest,
} from '../../../../../../../../store/teacher/checks/actions';


const { checkForRefresh } = commonTableHandlers;


const headerKeyPairs = [
  { key: 'name', title: 'Name' },
  { key: 'isChecked', title: 'Is Checked', format: c => (c ? '✅' : '❌') },
  { key: 'action', title: '' },
];


const CheckedSection = ({
  ids, get, getMore, check, checkAll, checks, loaders,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;
  const {
    subjectId, activityId,
  } = ids;

  function checkHandler(studentId) {
    return value => check(subjectId, activityId, studentId, value);
  }

  function checkAllHandler(value) {
    checkAll(subjectId, activityId, value);
  }

  function extendWithAction(data) {
    return data.map((d, i) => ({
      ...d,
      action: <CheckModal
        member={d.name}
        key={`${i}_checkModal`}
        isChecked={d.isChecked}
        check={checkHandler(d.studentId)}
      />,
    }));
  }

  function refreshCallback() {
    get(subjectId, activityId, 0, searchPageSize);
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
    getMore(subjectId, activityId, index, searchPageSize);
  }

  const { array, totalCount } = checks;
  return (
    <Paper className="panel-table">
      <CommonTable
        title="Checked students"
        dataArrayWithLinks={extendWithAction(array)}
        dataTotalCount={totalCount}
        isLoading={isLoading}
        headerKeyPairArray={headerKeyPairs}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
      >
        <CheckAllModal checkAll={() => checkAllHandler(true)} />
        <CheckAllModal checkAll={() => checkAllHandler(false)} uncheck />
      </CommonTable>
    </Paper>
  );
};

CheckedSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  checks: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
};


function mapStateToProps(state) {
  return {
    checks: state.checks.checkArray,
    loaders: state.checks.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
    check: checkRequest,
    checkAll: checkAllRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckedSection);
