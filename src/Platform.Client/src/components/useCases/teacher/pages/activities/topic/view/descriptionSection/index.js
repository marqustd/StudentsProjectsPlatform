import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import MarkdownEditor from '../../../../../../../common/markdown';
import PanelTitle from '../../../../../../../common/panelTitle';

const DescriptionSection = ({ description, edit }) => (
  <Paper className="panel">
    <PanelTitle title="Description:" />
    <div className="container">
      <MarkdownEditor maxWidth={1000} markdown={description} save={edit} />
    </div>
  </Paper>
);

DescriptionSection.propTypes = {
  description: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
};

export default DescriptionSection;
