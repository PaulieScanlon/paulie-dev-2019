import React, { Fragment, useState } from 'react';
import { Link } from 'gatsby';

import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

import { icons } from '../utils/reaction-paths';

const AccordionItem = ({ title, total, index, activeIndex, setActiveIndex, children }) => {
  const handleSetIndex = (index) => activeIndex !== index && setActiveIndex(index);

  const isActive = () => activeIndex === index;
  const icon = icons.filter((icon) => icon.name === title);

  return (
    <Fragment>
      <button
        onClick={() => handleSetIndex(isActive() ? null : index)}
        className="cursor-pointer flex gap-4 w-full justify-between px-4 py-2 mt-2 transition-all duration-300 rounded border border-outline bg-surface hover:bg-muted/20"
      >
        <div className="flex grow justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className={`bg-${isActive() ? 'salmon' : 'muted'} transition-all duration-300 rounded-full w-3 h-3`} />
            <div className="text-white capitalize">{title}</div>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="font-semibold">{`x${total}`}</div>
            <div
              className={`rounded-full p-0.5 bg-${isActive() ? 'salmon' : 'muted'} text-${
                isActive() ? 'slate-100' : 'slate-300'
              }`}
            >
              <svg
                aria-labelledby={`reaction-${title}`}
                title={title}
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <title id={`reaction-${title}`}>{title}</title>
                <g key={index} dangerouslySetInnerHTML={{ __html: icon[0].paths.map((path) => path) }} />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {activeIndex === index && (
        <ul className="h-[300px] overflow-scroll flex flex-col gap-3 list-none m-0 px-8 py-4 border border-l-outline border-t-transparent border-b-outline border-r-outline">
          {children}
        </ul>
      )}
    </Fragment>
  );
};

const Page = ({ serverData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">Dashboard</small>
      <h1>Built-in Analytics</h1>
      <p className="mb-16">
        There's a whole lot of data points hidden within content creation, why not count them up and visualize them? —
        Work in progress
      </p>

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
                    <div key={index} className="flex gap-2 justify-between">
                      <Link to={slug} className="text-sm">
                        {slug}
                      </Link>
                      <div className="font-semibold text-sm">{`x${item.length}`}</div>
                    </div>
                  );
                })}
            </AccordionItem>
          );
        })}

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
