import React, { Fragment, useState } from 'react';
import { Link } from 'gatsby';

import AsideElement from '../components/aside-element';
import GenericAside from '../components/generic-aside';

import { icons } from '../utils/reaction-paths';

const AccordionItem = ({ title, amount, children, index, activeIndex, setActiveIndex }) => {
  const handleSetIndex = (index) => activeIndex !== index && setActiveIndex(index);

  const isActive = () => activeIndex === index;

  return (
    <Fragment>
      <div
        onClick={() => handleSetIndex(isActive() ? null : index)}
        className="cursor-pointer flex gap-4 w-full justify-between px-4 py-2 mt-2 transition-all duration-300 rounded border border-outline bg-surface hover:bg-muted/20"
      >
        <div className="flex grow justify-between">
          <div className="flex gap-4 items-center justify-center">
            <div
              className={`bg-${isActive() ? 'primary' : 'muted'} transition-all duration-300 rounded-full w-3 h-3`}
            />
            <div className="text-white capitalize">{title}</div>
          </div>
          <div className="text-white font-bold ">
            x<span className="capitalize">{amount}</span>
          </div>
        </div>
      </div>

      {activeIndex === index && (
        <ul className="flex flex-col gap-4 list-none m-0 px-8 py-4 border border-l-outline border-t-transparent border-b-outline border-r-outline">
          {children}
        </ul>
      )}
    </Fragment>
  );
};

const Page = ({
  serverData: {
    serverResponse: { reactions }
  }
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Fragment>
      <small className="mb-4 leading-6 font-semibold capitalize text-primary">Dashboard</small>
      <h1>Built-in Analytics</h1>
      <p className="mb-16">
        There's a whole lot of data points hidden within content creation, why not count them up and visualize them?
      </p>

      <h2 className="m-0 text-2xl uppercase text-salmon">Reactions</h2>
      <p className="mt-0 mb-4 text-slate-300 text-base">Total reaction counts collected from around the site.</p>
      <div>
        {Object.keys(reactions).map((key, index) => {
          return (
            <AccordionItem
              key={index}
              title={key}
              amount={reactions[key].length}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            >
              <div></div>
              {reactions[key].map((item, index) => {
                const { slug } = item;

                return (
                  <li key={index} className="m-0 p-0 text-base">
                    <Link to={slug}>{slug}</Link>
                  </li>
                );
              })}
            </AccordionItem>
          );
        })}
      </div>

      {/* temp stuff start */}
      {/* <div className="remark-highlight">
        <pre className="language-javascript !m-0">{JSON.stringify(reactions, null, 2)}</pre>
      </div> */}
      {/* temp stuff end */}
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
