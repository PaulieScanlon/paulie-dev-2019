import React, { Fragment } from 'react';
import { Script } from 'gatsby';

import RootElement from './src/components/root-element';

import './src/styles/prism-shades-of-purple.css';
import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const element = document.getElementById(location.hash.split('#')[1]?.toLowerCase());

  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const pagePath = location ? location.pathname + location.search + location.hash : undefined;

  setTimeout(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pagePath });
    }
  }, 100);

  return true;
};

export const wrapRootElement = ({ element }) => {
  return (
    <Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`}
        strategy="off-main-thread"
        forward={[`gtag`]}
      />
      <Script
        id="gtag-config"
        strategy="off-main-thread"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`
        }}
      />
      <RootElement>{element}</RootElement>;
    </Fragment>
  );
};
