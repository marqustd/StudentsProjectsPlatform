import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import Discussion from '../../../../../../common/discussion';
import PanelTitle from '../../../../../../common/panelTitle';
import { teacherUrls } from '../../../../../../../utility/helpers/config';

const DiscussionSection = ({ ids }) => {
  const {
    subjectId, semesterId, sectionId,
  } = ids;
  const { GET, POST: addUrl } = teacherUrls.sections.discussion;
  const getUrl = `${GET}
?subjectId=${subjectId}
&sectionId=${sectionId}`;

  function bodyCreator(content) {
    return {
      subjectId,
      semesterId,
      sectionId,
      content,
    };
  }

  return (
    <Paper className="panel">
      <PanelTitle title="Discussion:" />
      <Discussion
        getUrl={getUrl}
        postUrl={addUrl}
        bodyCreator={bodyCreator}
      />
    </Paper>
  );
};
DiscussionSection.propTypes = {
  ids: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DiscussionSection;
