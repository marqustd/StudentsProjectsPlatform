import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommonTable, { extendWithLinks } from '../../../../../../../../common/table';
import { getAllRequest, getMoreRequest } from '../../../../../../../../../store/student/sections/actions';
import { commonTableHandlers, loaderHandler } from '../../../../../../../../../utility/helpers/handlers';
import loaderObject from '../../../../../../../../../utility/loaders/teacher/sections';

const headerKey = [
  { key: 'name', title: 'section' },
  { key: 'capacity', title: 'Maximum capacity' },
  { key: 'membersCount', title: 'Members number' },
  { key: 'topicName', title: 'Topic' },
];

const { checkForRefresh } = commonTableHandlers;


const SectionsSection = ({
  subjectId, get, getMore, sections, loaders,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  useEffect(() => {
    loaderHandler(
      loaders,
      loaderObject.LOAD_TABLE,
      isLoading,
      setIsLoading,
    );
  }, [loaders]);

  function refreshCallback() {
    get(subjectId, 0, searchPageSize);
  }

  useEffect(() => {
    refreshCallback();
  }, []);


  function loadMore(index) {
    getMore(subjectId, index, searchPageSize);
  }

  const { array, totalCount } = sections;
  const data = extendWithLinks(array, s => `/mysubjects/${subjectId}/sections/${s.sectionId}`);

  return (
    <Paper className="panel-table">
      <CommonTable
        title="Sections"
        hasLinks
        refreshCallback={refreshCallback}
        checkForRefresh={checkForRefresh(refresh, setRefresh)}
        loadMore={loadMore}
        headerKeyPairArray={headerKey}
        dataTotalCount={totalCount}
        dataArrayWithLinks={data}
        isLoading={isLoading}
      />
    </Paper>
  );
};


SectionsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  get: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  sections: PropTypes.objectOf(PropTypes.any).isRequired,
  loaders: PropTypes.arrayOf(PropTypes.number).isRequired,
};


function mapStateToProps(state) {
  return {
    sections: state.sections.sectionsArray,
    loaders: state.sections.loads,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getAllRequest,
    getMore: getMoreRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionsSection);
