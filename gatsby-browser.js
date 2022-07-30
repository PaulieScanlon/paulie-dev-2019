import React from 'react';

import RootElement from './src/components/root-element';

import './src/styles/prism-shades-of-purple.css';
import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const pagePath = location ? location.pathname + location.search + location.hash : undefined;
  const element = document.getElementById(location.hash.split('#')[1]?.toLowerCase());

  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80
    });
  }

  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: pagePath });
      }
    }, 100);
  }

  return true;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
