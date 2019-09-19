import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import CommonTable from '../../../../../../../common/table';
import '../style.scss';

const SearchTable = ({
  majors, totalMajors, loadMore, refreshCallback, checkForRefresh, isLoading,
}) => {
  const headerKeyPairs = [
    { title: 'Name', key: 'name' },
    { title: 'Is Obsolete', key: 'obsolete', format: d => (d ? 'TRUE' : 'FALSE') },
  ];


  return (
    <Paper className="majors-table">
      <CommonTable
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={majors}
        dataTotalCount={totalMajors}
        loadMore={loadMore}
        checkForRefresh={checkForRefresh}
        refreshCallback={refreshCallback}
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
  majors: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalMajors: PropTypes.number.isRequired,
};
export default SearchTable;
