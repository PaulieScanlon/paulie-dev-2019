import React from 'react';
import PropTypes from 'prop-types';

const DateStamp = ({ date }) => {
  return <time className="leading-6 font-semibold text-primary">{date}</time>;
};

DateStamp.propTypes = {
  /** date string from frontmatter */
  date: PropTypes.string.isRequired
};

export default DateStamp;
