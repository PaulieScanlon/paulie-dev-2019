import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import DateStamp from './date-stamp';

const StreamCard = ({ link, title, logo, show, date, excerpt }) => {
  return (
    <li className="m-0 p-0 rounded border border-outline bg-surface transition-all shadow-lg hover:shadow-secondary/10 hover:-translate-y-2 ease-in-out duration-500">
      <Link to={link} className="block p-4 cursor-pointer no-underline hover:text-secondary ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <GatsbyImage alt={title} image={getImage(logo)} />
            <strong className="flex text-sm">
              {show} <span className="hidden sm:block ml-2 ">&bull;</span>
            </strong>
          </div>
          <DateStamp date={date} />
        </div>
        <h3 className="m-0 text-xl text-white">{title}</h3>
        <p className="m-0 text-slate-300 text-base ">{excerpt}</p>
      </Link>
    </li>
  );
};

StreamCard.propTypes = {
  /** The article to link to */
  link: PropTypes.string.isRequired,
  /** The title to display */
  title: PropTypes.string.isRequired,
  /** Gatsby Image Data */
  logo: PropTypes.any.isRequired,
  /** The show to display */
  show: PropTypes.string.isRequired,
  /** The date to display */
  date: PropTypes.string.isRequired,
  /** The excerpt to display */
  excerpt: PropTypes.string.isRequired
};

export default StreamCard;
