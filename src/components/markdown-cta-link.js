import React from 'react';
import PropTypes from 'prop-types';

const MarkdownCtaLink = ({ children, href }) => {
  return (
    <div className="flex my-16 items-center justify-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex flex-col items-center gap-2 no-underline text-primary text-center py-2 px-4 transition-all duration-300 rounded border border-primary/40 bg-surface hover:text-white hover:bg-primary/10"
      >
        {children}
      </a>
    </div>
  );
};

MarkdownCtaLink.propTypes = {
  /** The href to link to */
  href: PropTypes.string.isRequired
};

export default MarkdownCtaLink;
