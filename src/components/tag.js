import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ tag }) => {
  return (
    <span className="rounded border border-outline bg-surface text-secondary text-xs font-semibold px-2.5 py-0.5 ">
      {tag}
    </span>
  );
};

Tag.propTypes = {
  /** The tag to display */
  tag: PropTypes.string.isRequired
};

export default Tag;
