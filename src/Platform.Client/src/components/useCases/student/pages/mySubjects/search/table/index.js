import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import CommonTable, { extendWithLinks } from '../../../../../../common/table';

const SearchTable = ({
  subjects, totalSubjects, loadMore, refreshCallback, checkForRefresh, isLoading,
}) => {
  const headerKeyPairs = [
    { title: 'Name', key: 'name' },
    { title: 'Head Teacher', key: 'teacherName' },
  ];

  const data = extendWithLinks(subjects, x => `/mysubjects/${x.subjectId}`);

  return (
    <Paper className="panel-table">
      <CommonTable
        title="My subjects"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalSubjects}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh}
        isLoading={isLoading}
        hasLinks
      />
    </Paper>
  );
};


SearchTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  checkForRefresh: PropTypes.func.isRequired,
  refreshCallback: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalSubjects: PropTypes.number.isRequired,
};
export default SearchTable;
