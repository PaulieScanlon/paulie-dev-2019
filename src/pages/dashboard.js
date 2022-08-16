import React, { Fragment, useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import Seo from '../components/seo';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';
import AccordionItem from '../components/accordion-item';
import AllDaysChart from '../components/all-days-chart';
import AllYearsChart from '../components/all-years-chart';
import AllTagsChart from '../components/all-tags-chart';
import AllPublisherChart from '../components/all-publisher-chart';
import LatestReaction from '../components/latest-reaction';
import LatestReactionDom from '../components/latest-reaction-dom';

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
  const [hasJavascript, setHasJavascript] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setHasJavascript(true);
  }, []);

  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{title}</small>
      <h1>{heading}</h1>
      <p className="mb-16">{body}</p>

      <div className="grid gap-24 justify-center min-w-full">
        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Published by Month</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by month for, Articles, Posts and Streams.</p>
          <AllYearsChart />
        </section>

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Published by Day</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by day for, Articles, Posts and Streams.</p>
          <AllDaysChart />
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Articles By Publisher</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">
              I mainly write for Gatsby, but occasionally I'll publish elsewhere.
            </p>
            <AllPublisherChart />
          </div>
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Tags By Usage</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Total counts by tag for, Articles, Posts and Streams.</p>
            <AllTagsChart />
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Country</h2>
            <p className="mt-0 mb-4 text-slate-300 text-base">Page view counts for top 10 countries.</p>
            <ul className="h-[405px] m-0 p-0 rounded border border-outline bg-surface px-4 sm:px-6 py-6">
              {locations
                ? locations.data.map((row, index) => {
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
                  })
                : null}
            </ul>
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
              <time className="blog text-slate-400 text-xs">July 1, 2022 | Now</time>
            </div>
          </div>
        </section>

        <section>
          {hasJavascript ? (
            <LatestReaction />
          ) : (
            <LatestReactionDom
              hasJavascript={false}
              isLoading={false}
              title={latest.data.title}
              reaction={latest.data.reaction}
              slug={latest.data.slug}
              date={latest.data.date}
            />
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
          {reactions
            ? reactions.data
                .sort((a, b) => b.total - a.total)
                .map((item, index) => {
                  const { title, total, posts } = item;

                  const arrs = Object.values(posts);

                  return (
                    <AccordionItem
                      key={index}
                      title={title}
                      total={total}
                      index={index}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                    >
                      {arrs
                        .sort((a, b) => b.length - a.length)
                        .map((item, index) => {
                          const { slug } = item[0];
                          return (
                            <li key={index} className="p-0 m-0 flex gap-2 justify-between">
                              <Link to={slug} className="text-sm">
                                {slug}
                              </Link>
                              <div className="font-semibold text-sm">{`x${item.length}`}</div>
                            </li>
                          );
                        })}
                    </AccordionItem>
                  );
                })
            : null}
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
