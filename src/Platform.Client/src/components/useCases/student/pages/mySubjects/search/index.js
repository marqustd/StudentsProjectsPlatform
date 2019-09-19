import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubjectsTable from './table/index';
import SubjectsSearchBar from '../../../../../common/searchBar';
import {
  getAllRequest,
  getMoreRequest,
} from '../../../../../../store/student/mySubjects/actions';
import loaderObject from '../../../../../../utility/loaders/student/subjects';
import { loaderHandler, commonTableHandlers } from '../../../../../../utility/helpers/handlers';

const { checkForRefresh } = commonTableHandlers;
const SubjectsPage = ({
  subjectsState,
  get,
  getMore,
}) => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  function refreshCallback() {
    get(null, null, searchPageSize);
  }

  function manageSearch(newText) {
    setRefresh(true);
    setSearch(newText);
    get(newText, null, searchPageSize);
  }

  useEffect(() => {
    loaderHandler(
      subjectsState.loads,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading,
    );
  }, [subjectsState.loads]);

  useEffect(() => {
    refreshCallback();
  }, []);

  function loadMore(index) {
    getMore(search, index, searchPageSize);
  }

  const { array, totalCount } = subjectsState.subjectsArray;

  return (
    <section className="page">
      <SubjectsSearchBar
        manageSearch={manageSearch}
        placeholder="Search for subjects"
      />
      <SubjectsTable
        subjects={array}
        totalSubjects={totalCount}
        loadMore={loadMore}
        resultSize={searchPageSize}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        isLoading={isLoading}
      />
    </section>
  );
};

SubjectsPage.propTypes = {
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  subjectsState: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return { subjectsState: state.mySubjects };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage);
