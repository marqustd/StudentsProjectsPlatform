import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommonTable, { extendWithLinks } from '../../../../../../common/table';
import AddTopicModalButton from './addModal';
import { getAllRequest, getMoreRequest, addRequest } from '../../../../../../../store/teacher/topics/actions';
import loaderObject from '../../../../../../../utility/loaders/teacher/topics';
import { loaderHandler, commonTableHandlers } from '../../../../../../../utility/helpers/handlers';

const { checkForRefresh } = commonTableHandlers;

const headerKeyPairs = [
  { key: 'name', title: 'Name' },
];

const TopicsSection = ({
  subjectId, get, getMore, add, topics, loaders,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  function refreshCallback() {
    get(subjectId, 0, searchPageSize);
  }

  useEffect(() => {
    loaderHandler(loaders,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading);
  }, [loaders]);


  useEffect(() => {
    refreshCallback();
  }, []);


  function loadMore(index) {
    getMore(subjectId, index, searchPageSize);
  }

  const { array, totalCount } = topics;
  const data = extendWithLinks(array, t => `/subjects/${subjectId}/topics/${t.topicId}`);

  return (
    <Paper className="panel-table">
      <CommonTable
        title="Available Topics:"
        headerKeyPairArray={headerKeyPairs}
        dataArrayWithLinks={data}
        dataTotalCount={totalCount}
        loadMore={loadMore}
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        isLoading={isLoading}
        hasLinks
      >
        <AddTopicModalButton add={topicName => add(subjectId, topicName)} />
      </CommonTable>
    </Paper>
  );
};

TopicsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  topics: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
    add: addRequest,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    topics: state.topics.topicsState,
    loaders: state.topics.loads,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsSection);
