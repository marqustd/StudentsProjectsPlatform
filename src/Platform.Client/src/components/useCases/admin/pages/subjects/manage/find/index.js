import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubjectTable from './table/index';
import SubjectsSearchBar from './searchBar';
import { extendWithLinks } from '../../../../../../common/table';
import './style.scss';
import {
  getAllRequest,
  getMoreRequest,
} from '../../../../../../../store/admin/subjects/actions';
import CreateSubject from './createNew';
import loaderObject from '../../../../../../../utility/loaders/admin/subjects';

const SubjectsPage = ({
  subjectState,
  get,
  getMore,
}) => {
  const [search, setSearch] = useState('');
  const [obsolete, setObsolete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  function refreshCallback() {
    get(null, null, searchPageSize, obsolete);
  }

  function checkForRefresh() {
    if (refresh) {
      setRefresh(false);
      return true;
    }
    return false;
  }

  function manageSearch(newText, isObsolete) {
    setRefresh(true);
    setSearch(newText);
    setObsolete(isObsolete);
    get(newText, null, searchPageSize, isObsolete);
  }

  useEffect(() => {
    const loader = subjectState.loads.find(l => l === loaderObject.LOAD_TABLE);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [subjectState.loads]);

  useEffect(() => {
    refreshCallback();
  }, []);

  function linkExtender(subject) {
    return `/manage/subjects/${subject.subjectId}`;
  }


  function loadMore(index) {
    getMore(search, index, searchPageSize, obsolete);
  }

  const { subjects } = subjectState;
  return (
    <div className="subjects-panel">
      <SubjectsSearchBar
        manageSearch={manageSearch}
        search={search}
      />
      <SubjectTable
        title="Subjects"
        subjects={extendWithLinks(subjects.array, linkExtender)}
        totalSubjects={subjects.totalCount}
        loadMore={loadMore}
        resultSize={searchPageSize}
        checkForRefresh={checkForRefresh}
        refreshCallback={refreshCallback}
        isLoading={isLoading}
      />
      <CreateSubject />
    </div>
  );
};

SubjectsPage.propTypes = {
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  subjectState: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return { subjectState: state.subjectState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage);
