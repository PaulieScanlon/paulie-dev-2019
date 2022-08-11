import React from 'react';
import PropTypes from 'prop-types';

const DateTimeToRead = ({ date }) => {
  return <small className="leading-6 font-semibold text-primary">{date}</small>;
};

DateTimeToRead.propTypes = {
  /** date string from frontmatter */
  date: PropTypes.string.isRequired
};

export default DateTimeToRead;
