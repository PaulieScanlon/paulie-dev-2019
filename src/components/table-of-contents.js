import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import { stripLeadingSlash } from '../utils/strip-leading-slash';

const TableOfContents = ({ slug, items, depth }) => {
  const getStyles = (depth) => {
    const config = {
      0: ['text-base', 'text-slate-100'],
      1: ['text-base', 'text-slate-200'],
      2: ['text-sm', 'text-slate-300'],
      3: ['text-xs', 'text-slate-400']
    };

    const styles = [config[depth] ? config[depth].join(' ') : config[3].join(' ')];

    return [...styles];
  };

  return (
    <ul key={items} className="list-none m-0 p-0">
      {items.map((item, index) => {
        const hash = item.url ? stripLeadingSlash(item.url) : null;

        return (
          <li key={index} className={`m-0 py-0 pl-${depth > 0 ? 3 : 0}`}>
            {item.url ? (
              <Link
                id={hash}
                to={`${slug}${hash}`}
                className={`inline-flex items-center p-1 no-underline hover:text-white ${getStyles(depth)}`}
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
              </Link>
            ) : null}
            {item.items ? <TableOfContents slug={slug} items={item.items} depth={depth + 1} /> : null}
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
