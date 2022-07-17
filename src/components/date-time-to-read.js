import React from 'react';
import PropTypes from 'prop-types';

import { formatDatestamp } from '../utils/format-date-stamp';

const DateTimeToRead = ({ date, timeToRead }) => {
  return (
    <small className="leading-6 font-semibold text-secondary">
      {formatDatestamp(date)} {timeToRead ? `${String.fromCodePoint(8226)} ${timeToRead} min` : null}
    </small>
  );
};

DateTimeToRead.propTypes = {
  /** date string from frontmatter */
  date: PropTypes.string.isRequired,
  /** timeToRead numher from frontmatter */
  timeToRead: PropTypes.number
};

export default DateTimeToRead;
