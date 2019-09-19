import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import CommonTable from '../../../../../../../common/table';
import '../style.scss';

const SearchTable = ({
  subjects, totalSubjects, loadMore, refreshCallback, checkForRefresh, isLoading,
}) => {
  const headerKeyPairs = [
    { title: 'Name', key: 'name' },
    { title: 'Is Obsolete', key: 'isObsolete', format: d => (d ? 'TRUE' : 'FALSE') },
    { title: 'Head Teacher', key: 'teacherName' },
  ];


  return (
    <Paper className="subjects-table">
      <CommonTable
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={subjects}
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
  refreshCallback: PropTypes.func.isRequired,
  checkForRefresh: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalSubjects: PropTypes.number.isRequired,
};
export default SearchTable;
