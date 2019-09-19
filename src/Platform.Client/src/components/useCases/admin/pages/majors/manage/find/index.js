import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommonTable from './table/index';
import MajorsSearchBar from './searchBar';
import CreateMajor from './createNew';
import { extendWithLinks } from '../../../../../../common/table';
import './style.scss';
import {
  getAllRequest,
  getMoreRequest,
} from '../../../../../../../store/admin/majors/actions';
import loaderObject from '../../../../../../../utility/loaders/admin/majors';

const MajorsPage = ({
  majorState,
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
    const loader = majorState.loads.find(l => l === loaderObject.LOAD_TABLE);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [majorState.loads]);

  useEffect(() => {
    refreshCallback();
  }, []);

  function linkExtender(major) {
    return `/manage/majors/${major.id}`;
  }


  function loadMore(index) {
    getMore(search, index, searchPageSize, obsolete);
  }

  const { majors } = majorState;
  return (
    <div className="majors-panel">
      <MajorsSearchBar
        manageSearch={manageSearch}
        search={search}
      />
      <CommonTable
        title="Majors"
        majors={extendWithLinks(majors.array, linkExtender)}
        totalMajors={majors.totalCount}
        loadMore={loadMore}
        resultSize={searchPageSize}
        checkForRefresh={checkForRefresh}
        refreshCallback={refreshCallback}
        isLoading={isLoading}
      />
      <CreateMajor />
    </div>
  );
};

MajorsPage.propTypes = {
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  majorState: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return { majorState: state.majorState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MajorsPage);
