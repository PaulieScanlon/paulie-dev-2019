import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import Seo from '../components/seo';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

import Accordion from '../components/accordion';
import AllDaysChart from '../components/all-days-chart';
import AllYearsChart from '../components/all-years-chart';
import AllTagsChart from '../components/all-tags-chart';
import AllPublisherChart from '../components/all-publisher-chart';
import LatestReaction from '../components/latest-reaction';
import LatestReactionDom from '../components/latest-reaction-dom';
import ThreeScene from '../components/three-scene';
import SiteViewChart from '../components/site-view-chart';
import RecentGitHubUserEvent from '../components/recent-github-user-events';

const Page = ({
  data: {
    pagesJson: {
      frontmatter: { title },
      heading,
      body
    }
  },

  serverData: {
    serverResponse: { faunaAllreactions, gaAnalytics, faunaLatestReaction, webmentions }
  }
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // console.log(webmentions);

  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{title}</small>
      <h1>{heading}</h1>
      <p className="mb-16">{body}</p>

      <div className="grid gap-24 min-w-full">
        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Published by Month</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by month.</p>
          <AllYearsChart />
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Published by Day</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by day.</p>
          <AllDaysChart />
        </section>

        <section className="grid md:grid-cols-2 gap-24 md:gap-8">
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Articles By Publisher</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by publisher.</p>
            <AllPublisherChart />
          </div>
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Tags By Usage</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by tag.</p>
            <AllTagsChart />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-24 md:gap-8">
          <div className="block">
            <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Country</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Site view counts for top 10 countries.</p>
            <div className="h-[405px] flex items-center justify-center rounded border border-outline bg-surface px-4 sm:px-6 py-6">
              {gaAnalytics?.data ? (
                <ul className="w-full  m-0 p-0 ">
                  {gaAnalytics.data.top10Countries.map((row, index) => {
                    const { flag, country, totalUsers } = row;
                    return (
                      <li key={index} className="m-0 p-0 flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <span className="mt-1">{getUnicodeFlagIcon(flag)}</span>
                          <span>{country}</span>
                        </div>
                        <span className="font-semibold">{`x${totalUsers}`}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center p-4 text-center">
                  <div>
                    <span role="img" aria-label="Firecracker" className="text-xl">
                      🧨
                    </span>
                  </div>
                  <small className="text-red-500 text-sm leading-tight">Google Analytics Error</small>
                </div>
              )}
            </div>
            <div className="mt-2 leading-tight">
              <div className="leading-tight">
                <small className="text-slate-400 text-xs">Data from </small>
                <a
                  href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs"
                >
                  Google Analytics Data API V1 (Beta)
                </a>
              </div>
              <time className="block text-slate-400 text-xs">Last 30 Days</time>
            </div>
          </div>
          <div className="block overflow-x-scroll">
            <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Location</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Latitude / Longitude of site visitors.</p>
            <div className="flex items-center justify-center w-full h-[405px] rounded border border-outline bg-surface cursor-move">
              {isLoaded ? <ThreeScene /> : null}
            </div>
            <div className="mt-2 leading-tight">
              <div className="leading-tight">
                <small className="text-slate-400 text-xs">Data from </small>
                <a
                  href="https://developers.google.com/analytics/devguides/reporting/core/v3"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs"
                >
                  Google Analytics Core Reporting API V3
                </a>
              </div>
              <time className="block text-slate-400 text-xs">Last 30 Days</time>
            </div>
          </div>
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Amount</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Recent site visit counts.</p>
          {gaAnalytics?.data ? (
            <SiteViewChart data={gaAnalytics.data.latestPageViews} />
          ) : (
            <div className="bg-surface p-4 border border-outline rounded">
              <div className="flex flex-col justify-center items-center p-4 text-center">
                <div>
                  <span role="img" aria-label="Firecracker" className="text-xl">
                    🧨
                  </span>
                </div>
                <small className="text-red-500 text-sm leading-tight">Google Analytics Error</small>
              </div>
            </div>
          )}
          <div className="mt-2 leading-tight">
            <div className="leading-tight">
              <small className="text-slate-400 text-xs">Data from </small>
              <a
                href="https://developers.google.com/analytics/devguides/reporting/data/v1?hl=en"
                target="_blank"
                rel="noreferrer"
                className="text-xs"
              >
                Google Analytics Data API V1 (Beta)
              </a>
            </div>
            <time className="block text-slate-400 text-xs">Last 30 Days</time>
          </div>
        </section>

        <section>
          {isLoaded ? (
            <LatestReaction />
          ) : (
            <Fragment>
              {faunaLatestReaction?.data ? (
                <LatestReactionDom
                  isLoaded={false}
                  isLoading={false}
                  hasJavascript={true}
                  title={faunaLatestReaction.data.title}
                  reaction={faunaLatestReaction.data.reaction}
                  slug={faunaLatestReaction.data.slug}
                  date={faunaLatestReaction.data.date}
                />
              ) : null}
            </Fragment>
          )}
          <div className="mt-2 leading-tight">
            <small className="text-slate-400 text-xs">Powered by </small>
            <a href="https://fauna.com/" target="_blank" rel="noreferrer" className="text-xs">
              Fauna
            </a>
          </div>
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">GitHub Activity</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Recent GitHub Activity.</p>
          <RecentGitHubUserEvent />
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">All Reactions</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total reaction counts collected from around the site.</p>
          {faunaAllreactions?.data ? (
            <Accordion reactions={faunaAllreactions} />
          ) : (
            <div className="flex gap-4 items-center p-2">
              <span role="img" aria-label="Firecracker" className="text-xl">
                🧨
              </span>
              <small className="text-red-500 text-sm leading-tight">Fauna Error</small>
            </div>
          )}
          <div className="mt-2 leading-tight">
            <small className="text-slate-400 text-xs">Powered by </small>
            <a href="https://fauna.com/" target="_blank" rel="noreferrer" className="text-xs">
              Fauna
            </a>
          </div>
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon text-center">Latest Webmentions</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base text-center">
            Webmentions feed for{' '}
            <a href="https://paulie.dev/" target="_blank" rel="noreferrer" className="text-salmon">
              paulie.dev
            </a>
            .
          </p>

          {webmentions?.data ? (
            <div className="mx-auto my-4 sm:max-w-lg">
              <ul className="m-0 p-0 list-none flex flex-wrap justify-center">
                {webmentions.data
                  .filter((mention) => mention.data.author)
                  .map((mention, index) => {
                    const {
                      data: {
                        author: { name, photo, url }
                      }
                    } = mention;

                    return (
                      <li key={index} className="m-0 -ml-3 p-0 w-8 h-8">
                        <a href={url} target="_blank" rel="noreferrer">
                          <img
                            alt={name}
                            src={photo}
                            className="block w-8 h-8 m-0 rounded-full overflow-hidden ring-2 ring-muted"
                          />
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : null}
        </section>
      </div>

      <AsideElement>
        <div className="flex flex-col gap-4">
          <GenericAside />
        </div>
      </AsideElement>
    </Fragment>
  );
};

export async function getServerData() {
  const faunaAllReactionsUtil = require('../utils/fauna-all-reactions-util');
  const gaAnalyticsUtil = require('../utils/ga-analytics-util');
  const faunaLatestReactionUtil = require('../utils/fauna-latest-reaction-util');
  const webmentionsUtil = require('../utils/webmentions-util');

  try {
    const faunaAllreactions = await faunaAllReactionsUtil();
    const gaAnalytics = await gaAnalyticsUtil();
    const faunaLatestReaction = await faunaLatestReactionUtil();
    const webmentions = await webmentionsUtil();

    return {
      props: {
        serverResponse: {
          faunaAllreactions,
          gaAnalytics,
          faunaLatestReaction,
          webmentions
        }
      }
    };
  } catch (error) {
    return {
      props: {
        serverResponse: {
          reactions: null,
          locations: null,
          latest: null,
          webmentions: null
        }
      }
    };
  }
}

export const query = graphql`
  query {
    pagesJson {
      fields {
        slug
      }
      frontmatter {
        title
      }
      heading
      body
    }
  }
`;

export default Page;

export const Head = ({
  data: {
    pagesJson: {
      fields: { slug },
      frontmatter: { title },
      body
    }
  }
}) => {
  return <Seo title={title} description={body} slug={slug} />;
};
