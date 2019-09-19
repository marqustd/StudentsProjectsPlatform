import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import PanelTitle from '../../../../../../common/panelTitle';
import SectionsTable from './search/table';
import SectionDetails from './view';

const SectionsSection = ({
  subjectId, sectionId,
}) => {
  const hasSection = sectionId > 0;
  return (
    <Paper className="panel">
      <PanelTitle title="Sections" />
      {hasSection
        ? <SectionDetails sectionId={sectionId} subjectId={subjectId} />
        : (
          <SectionsTable subjectId={subjectId} />
        )}
    </Paper>
  );
};

SectionsSection.propTypes = {
  subjectId: PropTypes.number.isRequired,
  sectionId: PropTypes.number.isRequired,
};

export default SectionsSection;
