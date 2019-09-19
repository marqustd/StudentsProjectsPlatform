import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, IconButton } from '@material-ui/core';
import { EventAvailableOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './style.scss';

const Activity = ({ name, link }) => {
  const button = (
    <IconButton type="submit">
      <EventAvailableOutlined />
    </IconButton>
  );

  return (
    <Link
      to={link}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="activity">
        <FormControlLabel control={button} label={name} />
      </div>
    </Link>
  );
};

Activity.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Activity;
/*

##### Must have
- nazwe
- opis
- komentarze
- Czy przedawnione
- data waznosci?
- ocene
- Artefakt? (if checked |x|)
- osobna strona dla aktywnosci??? (nie glupi pomysl chyba)

 */
