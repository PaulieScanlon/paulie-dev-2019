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

const Page = ({
  data: {
    pagesJson: {
      frontmatter: { title },
      heading,
      body
    }
  },
  serverData: {
    serverResponse: { reactions, locations, latest }
  }
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Articles By Publisher</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">
              Total counts by publisher <small className="text-secondary">(excluding Gatsby)</small>.
            </p>
            <AllPublisherChart />
          </div>
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Tags By Usage</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by tag.</p>
            <AllTagsChart />
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="block">
            <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Country</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Page view counts for top 10 countries.</p>
            <div className="h-[405px] flex items-center justify-center rounded border border-outline bg-surface px-4 sm:px-6 py-6">
              {locations ? (
                <ul className="w-full  m-0 p-0 ">
                  {locations.data.map((row, index) => {
                    const { flag, name, amount } = row;
                    return (
                      <li key={index} className="m-0 p-0 flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <span className="mt-1">{getUnicodeFlagIcon(flag)}</span>
                          <span>{name}</span>
                        </div>
                        <span className="font-semibold">{`x${amount}`}</span>
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
          {isLoaded ? (
            <LatestReaction />
          ) : (
            <Fragment>
              {latest ? (
                <LatestReactionDom
                  isLoaded={false}
                  isLoading={false}
                  title={latest.data.title}
                  reaction={latest.data.reaction}
                  slug={latest.data.slug}
                  date={latest.data.date}
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
          <h2 className="m-0 text-2xl uppercase text-salmon">All Reactions</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total reaction counts collected from around the site.</p>
          {reactions ? (
            <Accordion reactions={reactions} />
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
      </div>

      <AsideElement>
        <GenericAside />
      </AsideElement>
    </Fragment>
  );
};

export async function getServerData() {
  const allReactionsUtil = require('../utils/get-all-reactions-util');
  const allLocationsUtil = require('../utils/get-all-locations-util');
  const latestReactionUtil = require('../utils/get-latest-reaction-util');

  try {
    const reactions = await allReactionsUtil.get();
    const locations = await allLocationsUtil.get();
    const latest = await latestReactionUtil.get();

    return {
      props: {
        serverResponse: {
          reactions,
          locations,
          latest
        }
      }
    };
  } catch (error) {
    return {
      props: {
        reactions: null,
        locations: null,
        latest: null
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
