import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import CommonTable from '../../../../../../../common/table';

const SearchTable = ({
  users, totalUsers, loadMore, refreshCallback, checkForRefresh, isLoading,
}) => {
  const headerKeyPairs = [
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Email Adress', key: 'email' }];


  return (
    <Paper className="find-users-table">
      <CommonTable
        title="Users"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={users}
        dataTotalCount={totalUsers}
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
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalUsers: PropTypes.number.isRequired,
};
export default SearchTable;
