import { Link } from 'gatsby';
import React, { useEffect, useState, useRef } from 'react';

import Loading from '../components/loading';

import { icons } from '../utils/reaction-paths';
import { formatDatestamp } from '../utils/format-date-stamp';

const LatestReaction = () => {
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({ title: '', reaction: '', slug: '', date: null });

  useEffect(() => {
    isMounted.current = true;
    const getLatestReaction = async () => {
      try {
        const response = await (await fetch('/api/get-latest-reaction')).json();
        setIsLoading(false);
        setResponse(response.reaction);
      } catch (error) {
        console.error(error);
      }
    };

    getLatestReaction();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const { title, reaction, slug, date } = response;

  return (
    <div className="flex items-center justify-center rounded border border-outline bg-surface/70 px-4 sm:px-6 py-6 min-h-[200px]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <div className="grid gap-4 justify-center">
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
            <h5 className="m-0 text-2xl text-center leading-6 font-semibold uppercase text-salmon">Latest Reaction</h5>
            <p className="m-0 text-base text-slate-300 text-center font-semibold">{title}</p>
            <p className="m-0 text-sm text-slate-300 text-center ">{formatDatestamp(date, true)}</p>
          </div>
          <Link
            to={slug}
            target="_blank"
            rel="noreferrer"
            className="no-underline text-sm text-salmon text-center py-2 px-4 transition-all duration-300 rounded border border-outline bg-surface hover:text-white hover:bg-muted/20"
          >
            Check it out!
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestReaction;
