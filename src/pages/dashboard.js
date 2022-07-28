import React, { Fragment, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Seo from '../components/seo';
import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';
import AccordionItem from '../components/accordion-item';
import AllDaysChart from '../components/all-days-chart';
import AllYearsChart from '../components/all-years-chart';

const Page = ({ serverData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const {
    pagesJson: { title, slug, body }
  } = useStaticQuery(graphql`
    {
      pagesJson {
        title
        slug
        body
      }
    }
  `);

  return (
    <Fragment>
      <Seo title={slug} description={body} slug={slug} />
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">{slug}</small>
      <h1>{title}</h1>
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
          <h2 className="m-0 text-2xl uppercase text-salmon">Reactions</h2>
          <p className="mt-0 mb-4 text-slate-300 text-base">Total reaction counts collected from around the site.</p>
          {serverData.serverResponse.reactions
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
            })}
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

  return {
    props: {
      serverResponse: await allReactionsUtil.get()
    }
  };
}

export default Page;
