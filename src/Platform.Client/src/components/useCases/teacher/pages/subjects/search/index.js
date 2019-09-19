import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubjectsTable from './table/index';
import SubjectsSearchBar from '../../../../../common/searchBar';
import { extendWithLinks } from '../../../../../common/table';
import {
  getAllRequest,
  getMoreRequest,
} from '../../../../../../store/teacher/subjects/actions';
import loaderObject from '../../../../../../utility/loaders/teacher/subjects';
import { loaderHandler, commonTableHandlers } from '../../../../../../utility/helpers/handlers';

const { checkForRefresh } = commonTableHandlers;
const SubjectsPage = ({
  subjectState,
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
      subjectState.loads,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading,
    );
  }, [subjectState.loads]);

  useEffect(() => {
    refreshCallback();
  }, []);

  function linkExtender(subject) {
    return `/subjects/${subject.subjectId}`;
  }

  function loadMore(index) {
    getMore(search, index, searchPageSize);
  }

  const { array, totalCount } = subjectState.subjectsState;

  return (
    <section className="page">
      <SubjectsSearchBar
        manageSearch={manageSearch}
        placeholder="Search for subjects"
      />
      <SubjectsTable
        subjects={extendWithLinks(array, linkExtender)}
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
  subjectState: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return { subjectState: state.subjects };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage);
