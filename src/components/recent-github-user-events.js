import React, { useState, useEffect, useRef, Fragment } from 'react';

import Loading from '../components/loading';

import { formatDatestamp } from '../utils/format-date-stamp';

const RecentGitHubUserEvent = () => {
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const getGitHubData = async () => {
      try {
        const eventsData = await (
          await fetch('https://paulieapi.gatsbyjs.io/api/get-github-user-events', {
            method: 'POST',
            body: JSON.stringify({
              username: 'gmarokov',
              results: 20
            })
          })
        ).json();

        const userData = await (
          await fetch('https://paulieapi.gatsbyjs.io/api/get-github-user', {
            method: 'POST',
            body: JSON.stringify({
              username: 'gmarokov'
            })
          })
        ).json();

        if (isMounted) {
          setResponse({
            events: eventsData.events,
            user: userData.user
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getGitHubData();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-stretch rounded border border-outline bg-surface p-4">
      <div className="lg:h-16 mb-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading className="fill-salmon" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-auto-1fr gap-2 justify-center text-center sm:text-left items-center">
            <img
              src={response.user.avatar_url}
              alt={response.user.name}
              className="rounded-full border-2 border-outline h-10 w-10 m-0 mx-auto"
            />
            <div className="grid">
              <a
                href={response.user.html_url}
                target="_blank"
                rel="noreferrer me"
                className="m-0 p-0 text-white text-base sm:text-lg font-semibold"
              >
                {response.user.html_url.replace(/^https?:\/\//, '')}
              </a>
              <small className="m-0 text-sm">Public Repos &bull; {response.user.public_repos}</small>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center ml-1 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5 fill-salmon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10,0.3c-5.4,0-9.8,4.4-9.8,9.8c0,4.6,3.2,8.5,7.5,9.5c0-0.1-0.1-0.3-0.1-0.5v-1.7c-0.4,0-1.1,0-1.2,0c-0.7,0-1.3-0.3-1.6-0.8c-0.3-0.6-0.4-1.5-1.2-2.1c-0.2-0.2-0.1-0.4,0.2-0.4c0.5,0.1,0.9,0.5,1.3,1c0.4,0.5,0.6,0.6,1.3,0.6c0.4,0,0.9,0,1.4-0.1c0.3-0.7,0.7-1.3,1.3-1.6c-3.3-0.3-4.8-2-4.8-4.2c0-1,0.4-1.9,1.1-2.7C5.1,6.6,4.8,5,5.4,4.4c1.5,0,2.4,1,2.6,1.2c0.7-0.3,1.5-0.4,2.4-0.4c0.9,0,1.7,0.1,2.4,0.4c0.2-0.3,1.1-1.2,2.6-1.2C16,5,15.7,6.6,15.5,7.4c0.7,0.8,1.1,1.7,1.1,2.6c0,2.2-1.6,3.8-4.8,4.2c0.9,0.5,1.6,1.8,1.6,2.8v2.2c0,0.1,0,0.1,0,0.2c3.8-1.3,6.6-5,6.6-9.3C19.8,4.7,15.4,0.3,10,0.3z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="m-0 text-base text-white">Recent Events</h2>
      </div>
      <div className="rounded border border-outline bg-surface p-2 sm:p-4 bg-background h-96 overflow-y-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading className="fill-salmon" />
          </div>
        ) : (
          <ul className="list-none m-0 p-0 overflow-y-auto overflow-x-hidden h-[355px]">
            {response.events.map((event, index) => {
              const {
                type,
                created_at,
                actor: { login },
                repo: { name },
                payload: { commits }
              } = event;

              return (
                <li key={index} className="mt-0 rounded bg-surface p-3 leading-tight">
                  <strong className="block">
                    <span className={`inline-block bg-muted event-color-${type} rounded-full w-3 h-3 mr-2`} />
                    Event: <small className="font-normal">{type}</small>
                  </strong>
                  <small className="text-secondary">{formatDatestamp(created_at, true)}</small>
                  <div className="grid gap-1 my-4">
                    <strong className="grid grid-cols-auto-1fr gap-2 items-start">
                      <span>User: </span>
                      <small className="font-normal mt-1">{login}</small>
                    </strong>
                    <strong className="grid grid-cols-auto-1fr gap-2 items-start">
                      <span>Repo: </span>
                      <small className="font-normal mt-1 break-all">{name}</small>
                    </strong>
                  </div>
                  {commits ? (
                    <Fragment>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 stroke-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        <strong className="text-sm">Commits</strong>
                      </div>
                      <ul className="m-0 p-0 list-none">
                        {commits.map((commit, index) => {
                          const { message } = commit;

                          return (
                            <li className="text-xs" key={index}>
                              {message}
                            </li>
                          );
                        })}
                      </ul>
                    </Fragment>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="mt-4 leading-tight">
        <small className="text-slate-400 text-xs">Powered by </small>
        <a href="https://paulieapi.gatsbyjs.io/" target="_blank" rel="noreferrer" className="text-xs">
          Paulie API
        </a>
      </div>
    </div>
  );
};

export default RecentGitHubUserEvent;
