import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavigateNextOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import './style.scss';
import { bindActionCreators } from 'redux';
import { updateBreadcumb } from '../../../store/common/app/actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const Breadcrumb = ({ crumbs, update }) => {
  const lastIndex = crumbs.length - 1;

  return (
    (lastIndex > 0) ? (
      <Paper className="breadcrumb">
        {crumbs.map((c, i) => {
          if (i === lastIndex) {
            return <Typography className="crumb" key={guidGenerator()} color="textPrimary">{c.name}</Typography>;
          }
          if (i === 0) {
            return (
              <span key={guidGenerator()} className="crumb">
                <Link key={guidGenerator()} to={c.link} onClick={() => update([])}>{c.name}</Link>
                <NavigateNextOutlined key={guidGenerator()} fontSize="small" />
              </span>
            );
          }
          return (
            <span key={guidGenerator()} className="crumb">
              <Link to={c.link}>{c.name}</Link>
              <NavigateNextOutlined key={guidGenerator()} fontSize="small" />
            </span>
          );
        })}
      </Paper>
    ) : <div className="no-breadcrumb" />
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string,
        link: PropTypes.string,
      },
    ),
  ).isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(
  state => ({ crumbs: state.app.crumbs }),
  dispatch => bindActionCreators({ update: updateBreadcumb }, dispatch),
)(Breadcrumb);
