import React, { useState, useEffect, useRef } from 'react';

import Loading from '../components/loading';

import { formatDatestamp } from '../utils/format-date-stamp';

const RecentTweets = () => {
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const getGitHubData = async () => {
      try {
        const tweetsData = await (
          await fetch('https://paulieapi.gatsbyjs.io/api/get-latest-tweets', {
            method: 'POST',
            body: JSON.stringify({
              id: 470012453
            })
          })
        ).json();

        const userData = await (
          await fetch('https://paulieapi.gatsbyjs.io/api/get-twitter-user', {
            method: 'POST',
            body: JSON.stringify({
              username: 'MarokovGeorgi'
            })
          })
        ).json();

        if (isMounted) {
          setResponse({
            tweets: tweetsData.tweets,
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
              src={response.user.profile_image_url}
              alt={response.user.name}
              className="rounded-full border-2 border-outline h-10 w-10 m-0 mx-auto"
            />
            <div className="grid">
              <a
                href={`https://twitter.com/${response.user.username}`}
                target="_blank"
                rel="noreferrer me"
                className="m-0 p-0 text-white text-base sm:text-lg font-semibold"
              >
                {`twitter.com/${response.user.username}`}
              </a>
              <small className="m-0 text-sm">Followers &bull; {response.user.public_metrics.followers_count}</small>
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
            d="M19.3,4.2c-0.7,0.3-1.4,0.5-2.2,0.6c0.8-0.5,1.4-1.2,1.7-2.1c-0.7,0.4-1.6,0.8-2.4,0.9c-0.7-0.7-1.7-1.2-2.8-1.2c-2.1,0-3.8,1.7-3.8,3.8c0,0.3,0,0.6,0.1,0.9C6.7,7,3.9,5.4,2,3.1C1.7,3.7,1.5,4.4,1.5,5.1c0,1.3,0.7,2.5,1.7,3.2C2.5,8.2,2,8,1.4,7.8c0,0,0,0,0,0c0,1.9,1.3,3.4,3.1,3.7c-0.3,0.1-0.7,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.9,2.6,3.6,2.7c-1.3,1-3,1.6-4.7,1.6c-0.3,0-0.6,0-0.9-0.1c1.7,1.1,3.7,1.7,5.9,1.7c7,0,10.9-5.8,10.9-10.9c0-0.2,0-0.3,0-0.5C18.1,5.7,18.8,5,19.3,4.2z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="m-0 text-base text-white">Recent Tweets</h2>
      </div>
      <div className="rounded border border-outline bg-surface p-2 sm:p-4 bg-background h-96 overflow-y-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading className="fill-salmon" />
          </div>
        ) : (
          <ul className="list-none m-0 p-0 overflow-y-auto overflow-x-hidden h-[355px]">
            {response.tweets.map((tweet, index) => {
              const { created_at, text } = tweet;
              return (
                <li key={index} className="mt-0 rounded bg-surface p-3 leading-tight">
                  <small className="text-secondary">{formatDatestamp(created_at, true)}</small>
                  <p className="text-sm">{text}</p>
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

export default RecentTweets;
