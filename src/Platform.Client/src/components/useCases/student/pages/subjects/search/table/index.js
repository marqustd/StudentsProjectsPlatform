import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
} from '@material-ui/core';
import CommonTable from '../../../../../../common/table';
import SignInModal from './signInModal/index';

const SearchTable = ({
  subjects, totalSubjects, loadMore, refreshCallback, checkForRefresh, isLoading, signIn,
}) => {
  const headerKeyPairs = [
    { title: 'Name', key: 'name' },
    { title: 'Head Teacher', key: 'teacherName' },
    { title: '', key: 'signIn' },
  ];

  const data = subjects.map(s => ({
    ...s,
    signIn: <SignInModal
      signIn={password => signIn(s.subjectId, password)}
      subjectName={s.name}
    />,
  }));

  return (
    <Paper className="panel-table">
      <CommonTable
        title="Available subjects"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalSubjects}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh}
        isLoading={isLoading}
      />
    </Paper>
  );
};


SearchTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  checkForRefresh: PropTypes.func.isRequired,
  refreshCallback: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalSubjects: PropTypes.number.isRequired,
};
export default SearchTable;
