import React from 'react';

import ThreeScene from '../components/three-scene';

const Page = () => {
  return (
    <section className="grid sm:grid-cols-2 gap-8">
      <div className="block">
        <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Country</h2>
        <p className="mt-0 mb-4 text-slate-300 text-base">Page view counts for top 10 countries.</p>
        <div className="h-[405px] flex items-center justify-center rounded border border-outline bg-surface px-4 sm:px-6 py-6"></div>
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
          <time className="block text-slate-400 text-xs">July 1, 2022 | Now</time>
        </div>
      </div>
      <div className="block overflow-x-scroll">
        <h2 className="m-0 text-2xl uppercase text-salmon">Visitors By Location</h2>
        <p className="mt-0 mb-4 text-slate-300 text-base">Latitude / Longitude of site visitors.</p>
        <div className="flex items-center justify-center w-full h-[405px] rounded border border-outline bg-surface cursor-move">
          <ThreeScene />
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
  );
};

export default Page;
