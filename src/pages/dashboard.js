import React, { Fragment, useState } from 'react';
import { graphql, Link } from 'gatsby';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import Seo from '../components/seo';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';
import AccordionItem from '../components/accordion-item';
import AllDaysChart from '../components/all-days-chart';
import AllYearsChart from '../components/all-years-chart';
import LatestReaction from '../components/latest-reaction';

const Page = ({
  data: {
    pagesJson: {
      frontmatter: { title },
      heading,
      body
    }
  },
  serverData: {
    serverResponse: { reactions, locations }
  }
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{title}</small>
      <h1>{heading}</h1>
      <p className="mb-16">{body}</p>

      <div className="grid gap-24">
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

        <section>
          <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Country</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Page view counts for top 10 countries.</p>
          <ul className="m-0 p-0 rounded border border-outline bg-surface/70 px-4 sm:px-6 py-6 min-h-[200px]">
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
        </section>

        <section>
          <LatestReaction />
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

  return {
    props: {
      serverResponse: {
        reactions: await allReactionsUtil.get(),
        locations: await allLocationsUtil.get()
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
