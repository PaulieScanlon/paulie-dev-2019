import React from 'react';
import PropTypes from 'prop-types';

import { stripLeadingSlash } from '../utils/strip-leading-slash';

const TableOfContents = ({ items, depth }) => {
  return (
    <ul key={items} className="list-none m-0 p-0">
      {items.map((item, index) => {
        const newUrl = item.url ? stripLeadingSlash(item.url) : null;

        return (
          <li key={index} className={`m-0 py-0 pl-${depth > 0 ? 3 : 0}`}>
            {item.url ? (
              <a
                id={newUrl}
                href={newUrl}
                className={`inline-flex items-center p-1 no-underline text-${
                  depth > 0 ? 'slate-400' : 'slate-100'
                } text-${depth > 0 ? 'sm' : 'base'}`}
              >
                {depth > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1 mr-1 h-4 w-4 stroke-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                ) : null}
                {item.title}
              </a>
            ) : null}
            {item.items ? <TableOfContents items={item.items} depth={depth + 1} /> : null}
          </li>
        );
      })}
    </ul>
  );
};

TableOfContents.defaultProps = {
  depth: 0
};

TableOfContents.propTypes = {
  /** Array of headings and # links */
  items: PropTypes.any.isRequired,
  /** Determines the padding-left of a nested li */
  depth: PropTypes.number
};

export default TableOfContents;
