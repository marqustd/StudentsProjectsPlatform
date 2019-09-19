import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditableField from '../../../../../../common/editableField';
import PanelTitle from '../../../../../../common/panelTitle';

const NameSection = ({ name, edit }) => (
  <Paper className="panel">
    <PanelTitle title="Name:" />
    <EditableField changeName={edit} name={name} />
  </Paper>
);

NameSection.propTypes = {
  name: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
};

export default NameSection;
