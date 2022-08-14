import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Loading from '../components/loading';

import { icons } from '../utils/reaction-paths';

const LatestReactionDom = ({ isLoading, hasJavascript, title, reaction, slug, date }) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded border border-outline bg-surface px-4 sm:px-6 py-6 min-h-[270px]">
      {isLoading && hasJavascript ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
          {hasJavascript ? <div className="absolute top-0 left-0 h-[2px] bg-salmon animate-scaling-bar" /> : null}
          <div className="grid gap-4">
            <div className="justify-self-center rounded-full bg-salmon p-1">
              <svg
                aria-labelledby={`reaction-${title}`}
                title={title}
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <title id={`reaction-${title}`}>{title}</title>
                <g
                  dangerouslySetInnerHTML={{
                    __html: icons.filter((icon) => icon.name === reaction)[0].paths.map((path) => path)
                  }}
                />
              </svg>
            </div>
            <div className="grid gap-1">
              <h2 className="m-0 text-2xl text-center leading-6 font-semibold uppercase text-salmon">
                Latest Reaction
              </h2>
              <p className="m-0 text-base text-slate-300 text-center font-semibold">{title}</p>
              <time className="m-0 text-sm text-slate-300 text-center ">{date}</time>
            </div>
            <Link
              to={slug}
              target="_blank"
              rel="noreferrer"
              className="no-underline justify-self-center text-sm text-salmon text-center py-2 px-4 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
            >
              Check it out!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

LatestReactionDom.propTypes = {
  /** Determins if the progress bar is shown */
  hasJavascript: PropTypes.bool.isRequired,
  /** Determins if Spinner is shown */
  isLoading: PropTypes.bool.isRequired,
  /** The title the blog post */
  title: PropTypes.string.isRequired,
  /** The name of the reaction */
  reaction: PropTypes.string.isRequired,
  /** The slug of the post */
  slug: PropTypes.string.isRequired,
  /** The date the reacton was submitted */
  date: PropTypes.any
};

export default LatestReactionDom;
