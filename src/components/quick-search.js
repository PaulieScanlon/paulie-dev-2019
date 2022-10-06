import React from 'react';
import PropTypes from 'prop-types';

const QuickSearch = ({ onClick }) => {
  return (
    <button
      type="button"
      className="w-full flex justify-between items-center font-medium text-tertiary transition-all duration-300 rounded border border-outline bg-surface px-3 py-2 hover:text-white hover:bg-muted/20"
      onClick={onClick}
    >
      <span className="flex items-center gap-x-3">
        <svg aria-hidden="true" className="h-4 w-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </span>

      <kbd className="flex gap-1 font-sans font-semibold">
        <abbr title="Command" className="no-underline">
          ⌘
        </abbr>
        K
      </kbd>
    </button>
  );
};

QuickSearch.propTypes = {
  /** onClick handler required for use in SiteSearch */
  onClick: PropTypes.func.isRequired
};

export default QuickSearch;
