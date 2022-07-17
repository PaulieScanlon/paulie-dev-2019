import React, { useState, useEffect, useRef } from 'react';

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
              username: 'PaulieScanlon',
              results: 20
            })
          })
        ).json();

        const userData = await (
          await fetch('https://paulieapi.gatsbyjs.io/api/get-github-user', {
            method: 'POST',
            body: JSON.stringify({
              username: 'PaulieScanlon'
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

  //   if (!isLoading) {
  //     console.log(response.events);
  //     console.log(response.user);
  //   }

  return (
    <div className="flex flex-col items-stretch rounded border border-outline bg-surface p-2 sm:py-4 px-2 sm:px-4">
      <div className="lg:h-16 mb-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          <div className="grid sm:grid-cols-auto-1fr gap-2 justify-center text-center sm:text-left items-center">
            <img
              src={response.user.avatar_url}
              alt={response.user.name}
              className="rounded-full border-2 border-outline h-16 w-16 m-0 mx-auto"
            />
            <div className="grid">
              <a
                href={response.user.html_url}
                target="_blank"
                rel="noreferrer"
                className="m-0 p-0 text-white text-base sm:text-lg font-semibold"
              >
                {response.user.html_url.replace(/^https?:\/\//, '')}
              </a>
              {/* <small className="m-0 text-sm">{response.user.bio}</small> */}
              <small className="m-0 text-sm">Public Repos &bull; {response.user.public_repos}</small>
              {/* <small className="m-0 text-sm">Created: &bull; {formatDatestamp(response.user.created_at)}</small> */}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5 fill-tertiary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="m-0 text-base text-white">Recent Events</h2>
      </div>
      <div className="rounded border border-outline bg-surface p-2 sm:p-4 bg-background h-96 overflow-y-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          <ul className="list-none m-0 p-0 overflow-y-auto overflow-x-hidden h-[355px]">
            {response.events.map((event, index) => {
              const {
                type,
                created_at,
                actor: { login },
                repo: { name }
              } = event;

              return (
                <li key={index} className="mt-0 rounded bg-surface p-3 leading-tight">
                  <strong className="block">
                    <span className={`inline-block bg-muted event-color-${type} rounded-full w-3 h-3 mr-2`} />
                    Event: <small className="font-normal">{type}</small>
                  </strong>
                  <small className="">{formatDatestamp(created_at, true)}</small>
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
