import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import DateTimeToRead from './date-time-to-read';

const PostCard = ({ link, title, thumbnail, timeToRead, date, dateModified, excerpt }) => {
  return (
    <li className="m-0 p-0 rounded border border-outline bg-surface transition-all shadow-lg hover:shadow-secondary/10 hover:-translate-y-2 ease-in-out duration-500">
      <Link to={link} className="block p-4 cursor-pointer no-underline hover:text-secondary ">
        <div className="flex items-center">
          <div className="hidden md:block rounded shadow-lg overflow-hidden shrink-0 w-[180px]">
            <GatsbyImage alt={title} image={getImage(thumbnail)} />
          </div>
          <div className="p-4">
            <DateTimeToRead date={dateModified ? dateModified : date} timeToRead={timeToRead} />
            <h3 className="m-0 text-xl text-white">{title}</h3>
            <p className="m-0 text-slate-300 text-base ">{excerpt}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

PostCard.propTypes = {
  /** The post to link to */
  link: PropTypes.string.isRequired,
  /** The title to display */
  title: PropTypes.string.isRequired,
  /** Gatsby Image Data */
  thumbnail: PropTypes.any.isRequired,
  /** The timeToRead to display */
  timeToRead: PropTypes.any.isRequired,
  /** The dateModified to display */
  dateModified: PropTypes.string.isRequired,
  /** The date to display */
  date: PropTypes.string.isRequired,
  /** The excerpt to display */
  excerpt: PropTypes.string.isRequired
};

export default PostCard;